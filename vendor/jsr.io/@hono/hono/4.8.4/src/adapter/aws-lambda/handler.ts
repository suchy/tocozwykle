import type { Hono } from '../../hono.ts'
import type { Env, Schema } from '../../types.ts'
import { decodeBase64, encodeBase64 } from '../../utils/encode.ts'
import type {
  ALBRequestContext,
  ApiGatewayRequestContext,
  ApiGatewayRequestContextV2,
  Handler,
  LambdaContext,
} from './types.ts'

export type LambdaEvent = APIGatewayProxyEvent | APIGatewayProxyEventV2 | ALBProxyEvent

// When calling HTTP API or Lambda directly through function urls
export interface APIGatewayProxyEventV2 {
  version: string
  routeKey: string
  headers: Record<string, string | undefined>
  multiValueHeaders?: undefined
  cookies?: string[]
  rawPath: string
  rawQueryString: string
  body: string | null
  isBase64Encoded: boolean
  requestContext: ApiGatewayRequestContextV2
  queryStringParameters?: {
    [name: string]: string | undefined
  }
  pathParameters?: {
    [name: string]: string | undefined
  }
  stageVariables?: {
    [name: string]: string | undefined
  }
}

// When calling Lambda through an API Gateway
export interface APIGatewayProxyEvent {
  version: string
  httpMethod: string
  headers: Record<string, string | undefined>
  multiValueHeaders?: {
    [headerKey: string]: string[]
  }
  path: string
  body: string | null
  isBase64Encoded: boolean
  queryStringParameters?: Record<string, string | undefined>
  requestContext: ApiGatewayRequestContext
  resource: string
  multiValueQueryStringParameters?: {
    [parameterKey: string]: string[]
  }
  pathParameters?: Record<string, string>
  stageVariables?: Record<string, string>
}

// When calling Lambda through an Application Load Balancer
export interface ALBProxyEvent {
  httpMethod: string
  headers?: Record<string, string | undefined>
  multiValueHeaders?: Record<string, string[] | undefined>
  path: string
  body: string | null
  isBase64Encoded: boolean
  queryStringParameters?: Record<string, string | undefined>
  multiValueQueryStringParameters?: {
    [parameterKey: string]: string[]
  }
  requestContext: ALBRequestContext
}

type WithHeaders = {
  headers: Record<string, string>
  multiValueHeaders?: undefined
}
type WithMultiValueHeaders = {
  headers?: undefined
  multiValueHeaders: Record<string, string[]>
}

export type APIGatewayProxyResult = {
  statusCode: number
  statusDescription?: string
  body: string
  cookies?: string[]
  isBase64Encoded: boolean
} & (WithHeaders | WithMultiValueHeaders)

const getRequestContext = (
  event: LambdaEvent
): ApiGatewayRequestContext | ApiGatewayRequestContextV2 | ALBRequestContext => {
  return event.requestContext
}

const streamToNodeStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  writer: NodeJS.WritableStream
): Promise<void> => {
  let readResult = await reader.read()
  while (!readResult.done) {
    writer.write(readResult.value)
    readResult = await reader.read()
  }
  writer.end()
}

export const streamHandle = <
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/'
>(
  app: Hono<E, S, BasePath>
): Handler => {
  // @ts-expect-error awslambda is not a standard API
  return awslambda.streamifyResponse(
    async (event: LambdaEvent, responseStream: NodeJS.WritableStream, context: LambdaContext) => {
      const processor = getProcessor(event)
      try {
        const req = processor.createRequest(event)
        const requestContext = getRequestContext(event)

        const res = await app.fetch(req, {
          event,
          requestContext,
          context,
        })

        const headers: Record<string, string> = {}
        const cookies: string[] = []
        res.headers.forEach((value, name) => {
          if (name === 'set-cookie') {
            cookies.push(value)
          } else {
            headers[name] = value
          }
        })

        // Check content type
        const httpResponseMetadata = {
          statusCode: res.status,
          headers,
          cookies,
        }

        // Update response stream
        // @ts-expect-error awslambda is not a standard API
        responseStream = awslambda.HttpResponseStream.from(responseStream, httpResponseMetadata)

        if (res.body) {
          await streamToNodeStream(res.body.getReader(), responseStream)
        } else {
          responseStream.write('')
        }
      } catch (error) {
        console.error('Error processing request:', error)
        responseStream.write('Internal Server Error')
      } finally {
        responseStream.end()
      }
    }
  )
}

/**
 * Accepts events from API Gateway/ELB(`APIGatewayProxyEvent`) and directly through Function Url(`APIGatewayProxyEventV2`)
 */
export const handle = <E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'>(
  app: Hono<E, S, BasePath>
): (<L extends LambdaEvent>(
  event: L,
  lambdaContext?: LambdaContext
) => Promise<
  APIGatewayProxyResult &
    (L extends { multiValueHeaders: Record<string, string[]> }
      ? WithMultiValueHeaders
      : WithHeaders)
>) => {
  // @ts-expect-error FIXME: Fix return typing
  return async (event, lambdaContext?) => {
    const processor = getProcessor(event)

    const req = processor.createRequest(event)
    const requestContext = getRequestContext(event)

    const res = await app.fetch(req, {
      event,
      requestContext,
      lambdaContext,
    })

    return processor.createResult(event, res)
  }
}

export abstract class EventProcessor<E extends LambdaEvent> {
  protected abstract getPath(event: E): string

  protected abstract getMethod(event: E): string

  protected abstract getQueryString(event: E): string

  protected abstract getHeaders(event: E): Headers

  protected abstract getCookies(event: E, headers: Headers): void

  protected abstract setCookiesToResult(result: APIGatewayProxyResult, cookies: string[]): void

  createRequest(event: E): Request {
    const queryString = this.getQueryString(event)
    const domainName =
      event.requestContext && 'domainName' in event.requestContext
        ? event.requestContext.domainName
        : event.headers?.['host'] ?? event.multiValueHeaders?.['host']?.[0]
    const path = this.getPath(event)
    const urlPath = `https://${domainName}${path}`
    const url = queryString ? `${urlPath}?${queryString}` : urlPath

    const headers = this.getHeaders(event)

    const method = this.getMethod(event)
    const requestInit: RequestInit = {
      headers,
      method,
    }

    if (event.body) {
      requestInit.body = event.isBase64Encoded ? decodeBase64(event.body) : event.body
    }

    return new Request(url, requestInit)
  }

  async createResult(event: E, res: Response): Promise<APIGatewayProxyResult> {
    const contentType = res.headers.get('content-type')
    let isBase64Encoded = contentType && isContentTypeBinary(contentType) ? true : false

    if (!isBase64Encoded) {
      const contentEncoding = res.headers.get('content-encoding')
      isBase64Encoded = isContentEncodingBinary(contentEncoding)
    }

    const body = isBase64Encoded ? encodeBase64(await res.arrayBuffer()) : await res.text()

    const result: APIGatewayProxyResult = {
      body: body,
      statusCode: res.status,
      isBase64Encoded,
      ...(event.multiValueHeaders
        ? {
            multiValueHeaders: {},
          }
        : {
            headers: {},
          }),
    }

    this.setCookies(event, res, result)
    if (result.multiValueHeaders) {
      res.headers.forEach((value, key) => {
        result.multiValueHeaders[key] = [value]
      })
    } else {
      res.headers.forEach((value, key) => {
        result.headers[key] = value
      })
    }

    return result
  }

  setCookies(event: E, res: Response, result: APIGatewayProxyResult) {
    if (res.headers.has('set-cookie')) {
      const cookies = res.headers.getSetCookie
        ? res.headers.getSetCookie()
        : Array.from(res.headers.entries())
            .filter(([k]) => k === 'set-cookie')
            .map(([, v]) => v)

      if (Array.isArray(cookies)) {
        this.setCookiesToResult(result, cookies)
        res.headers.delete('set-cookie')
      }
    }
  }
}

export class EventV2Processor extends EventProcessor<APIGatewayProxyEventV2> {
  protected getPath(event: APIGatewayProxyEventV2): string {
    return event.rawPath
  }

  protected getMethod(event: APIGatewayProxyEventV2): string {
    return event.requestContext.http.method
  }

  protected getQueryString(event: APIGatewayProxyEventV2): string {
    return event.rawQueryString
  }

  protected getCookies(event: APIGatewayProxyEventV2, headers: Headers): void {
    if (Array.isArray(event.cookies)) {
      headers.set('Cookie', event.cookies.join('; '))
    }
  }

  protected setCookiesToResult(result: APIGatewayProxyResult, cookies: string[]): void {
    result.cookies = cookies
  }

  protected getHeaders(event: APIGatewayProxyEventV2): Headers {
    const headers = new Headers()
    this.getCookies(event, headers)
    if (event.headers) {
      for (const [k, v] of Object.entries(event.headers)) {
        if (v) {
          headers.set(k, v)
        }
      }
    }
    return headers
  }
}

const v2Processor: EventV2Processor = new EventV2Processor()

export class EventV1Processor extends EventProcessor<Exclude<LambdaEvent, APIGatewayProxyEventV2>> {
  protected getPath(event: Exclude<LambdaEvent, APIGatewayProxyEventV2>): string {
    return event.path
  }

  protected getMethod(event: Exclude<LambdaEvent, APIGatewayProxyEventV2>): string {
    return event.httpMethod
  }

  protected getQueryString(event: Exclude<LambdaEvent, APIGatewayProxyEventV2>): string {
    // In the case of gateway Integration either queryStringParameters or multiValueQueryStringParameters can be present not both
    if (event.multiValueQueryStringParameters) {
      return Object.entries(event.multiValueQueryStringParameters || {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value.join(`&${key}=`)}`)
        .join('&')
    } else {
      return Object.entries(event.queryStringParameters || {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    }
  }

  protected getCookies(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    event: Exclude<LambdaEvent, APIGatewayProxyEventV2>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    headers: Headers
  ): void {
    // nop
  }

  protected getHeaders(event: APIGatewayProxyEvent): Headers {
    const headers = new Headers()
    this.getCookies(event, headers)
    if (event.headers) {
      for (const [k, v] of Object.entries(event.headers)) {
        if (v) {
          headers.set(k, v)
        }
      }
    }
    if (event.multiValueHeaders) {
      for (const [k, values] of Object.entries(event.multiValueHeaders)) {
        if (values) {
          // avoid duplicating already set headers
          const foundK = headers.get(k)
          values.forEach((v) => (!foundK || !foundK.includes(v)) && headers.append(k, v))
        }
      }
    }
    return headers
  }

  protected setCookiesToResult(result: APIGatewayProxyResult, cookies: string[]): void {
    result.multiValueHeaders = {
      'set-cookie': cookies,
    }
  }
}

const v1Processor: EventV1Processor = new EventV1Processor()

export class ALBProcessor extends EventProcessor<ALBProxyEvent> {
  protected getHeaders(event: ALBProxyEvent): Headers {
    const headers = new Headers()
    // if multiValueHeaders is present the ALB will use it instead of the headers field
    // https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#multi-value-headers
    if (event.multiValueHeaders) {
      for (const [key, values] of Object.entries(event.multiValueHeaders)) {
        if (values && Array.isArray(values)) {
          // https://www.rfc-editor.org/rfc/rfc9110.html#name-common-rules-for-defining-f
          headers.set(key, values.join('; '))
        }
      }
    } else {
      for (const [key, value] of Object.entries(event.headers ?? {})) {
        if (value) {
          headers.set(key, value)
        }
      }
    }
    return headers
  }

  protected getPath(event: ALBProxyEvent): string {
    return event.path
  }

  protected getMethod(event: ALBProxyEvent): string {
    return event.httpMethod
  }

  protected getQueryString(event: ALBProxyEvent): string {
    // In the case of ALB Integration either queryStringParameters or multiValueQueryStringParameters can be present not both
    /*
      In other cases like when using the serverless framework, the event object does contain both queryStringParameters and multiValueQueryStringParameters:
      Below is an example event object for this URL: /payment/b8c55e69?select=amount&select=currency
      {
        ...
        queryStringParameters: { select: 'currency' },
        multiValueQueryStringParameters: { select: [ 'amount', 'currency' ] },
      }
      The expected results is for select to be an array with two items. However the pre-fix code is only returning one item ('currency') in the array.
      A simple fix would be to invert the if statement and check the multiValueQueryStringParameters first.
    */
    if (event.multiValueQueryStringParameters) {
      return Object.entries(event.multiValueQueryStringParameters || {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value.join(`&${key}=`)}`)
        .join('&')
    } else {
      return Object.entries(event.queryStringParameters || {})
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    }
  }

  protected getCookies(event: ALBProxyEvent, headers: Headers): void {
    let cookie
    if (event.multiValueHeaders) {
      cookie = event.multiValueHeaders['cookie']?.join('; ')
    } else {
      cookie = event.headers ? event.headers['cookie'] : undefined
    }
    if (cookie) {
      headers.append('Cookie', cookie)
    }
  }

  protected setCookiesToResult(result: APIGatewayProxyResult, cookies: string[]): void {
    // when multi value headers is enabled
    if (result.multiValueHeaders) {
      result.multiValueHeaders['set-cookie'] = cookies
    } else {
      // otherwise serialize the set-cookie
      result.headers['set-cookie'] = cookies.join(', ')
    }
  }
}

const albProcessor: ALBProcessor = new ALBProcessor()

export const getProcessor = (event: LambdaEvent): EventProcessor<LambdaEvent> => {
  if (isProxyEventALB(event)) {
    return albProcessor
  }
  if (isProxyEventV2(event)) {
    return v2Processor
  }
  return v1Processor
}

const isProxyEventALB = (event: LambdaEvent): event is ALBProxyEvent => {
  if (event.requestContext) {
    return Object.hasOwn(event.requestContext, 'elb')
  }
  return false
}

const isProxyEventV2 = (event: LambdaEvent): event is APIGatewayProxyEventV2 => {
  return Object.hasOwn(event, 'rawPath')
}

export const isContentTypeBinary = (contentType: string) => {
  return !/^(text\/(plain|html|css|javascript|csv).*|application\/(.*json|.*xml).*|image\/svg\+xml.*)$/.test(
    contentType
  )
}

export const isContentEncodingBinary = (contentEncoding: string | null) => {
  if (contentEncoding === null) {
    return false
  }
  return /^(gzip|deflate|compress|br)/.test(contentEncoding)
}
