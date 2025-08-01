/**
 * @module
 * WebSocket Helper for Hono.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Context } from '../../context.ts'
import type { MiddlewareHandler, TypedResponse } from '../../types.ts'
import type { StatusCode } from '../../utils/http-status.ts'

/**
 * WebSocket Event Listeners type
 */
export interface WSEvents<T = unknown> {
  onOpen?: (evt: Event, ws: WSContext<T>) => void
  onMessage?: (evt: MessageEvent<WSMessageReceive>, ws: WSContext<T>) => void
  onClose?: (evt: CloseEvent, ws: WSContext<T>) => void
  onError?: (evt: Event, ws: WSContext<T>) => void
}

/**
 * Upgrade WebSocket Type
 */
export interface UpgradeWebSocket<T = unknown, U = any, _WSEvents = WSEvents<T>> {
  (createEvents: (c: Context) => _WSEvents | Promise<_WSEvents>, options?: U): MiddlewareHandler<
    any,
    string,
    {
      outputFormat: 'ws'
    }
  >
  (c: Context, events: _WSEvents, options?: U): Promise<
    Response & TypedResponse<{}, StatusCode, 'ws'>
  >
}

/**
 * ReadyState for WebSocket
 */
export type WSReadyState = 0 | 1 | 2 | 3

/**
 * An argument for WSContext class
 */
export interface WSContextInit<T = unknown> {
  send(data: string | ArrayBuffer | Uint8Array, options: SendOptions): void
  close(code?: number, reason?: string): void

  raw?: T
  readyState: WSReadyState
  url?: string | URL | null
  protocol?: string | null
}

/**
 * Options for sending message
 */
export interface SendOptions {
  compress?: boolean
}

/**
 * A context for controlling WebSockets
 */
export class WSContext<T = unknown> {
  #init: WSContextInit<T>
  constructor(init: WSContextInit<T>) {
    this.#init = init
    this.raw = init.raw
    this.url = init.url ? new URL(init.url) : null
    this.protocol = init.protocol ?? null
  }
  send(source: string | ArrayBuffer | Uint8Array, options?: SendOptions): void {
    this.#init.send(source, options ?? {})
  }
  raw?: T
  binaryType: BinaryType = 'arraybuffer'
  get readyState(): WSReadyState {
    return this.#init.readyState
  }
  url: URL | null
  protocol: string | null
  close(code?: number, reason?: string) {
    this.#init.close(code, reason)
  }
}

export type WSMessageReceive = string | Blob | ArrayBufferLike

export const createWSMessageEvent = (source: WSMessageReceive): MessageEvent<WSMessageReceive> => {
  return new MessageEvent<WSMessageReceive>('message', {
    data: source,
  })
}

export interface WebSocketHelperDefineContext {}
export type WebSocketHelperDefineHandler<T, U> = (
  c: Context,
  events: WSEvents<T>,
  options?: U
) => Promise<Response | void> | Response | void

/**
 * Create a WebSocket adapter/helper
 */
export const defineWebSocketHelper = <T = unknown, U = any>(
  handler: WebSocketHelperDefineHandler<T, U>
): UpgradeWebSocket<T, U> => {
  return ((
    ...args:
      | [createEvents: (c: Context) => WSEvents<T> | Promise<WSEvents<T>>, options?: U]
      | [c: Context, events: WSEvents<T>, options?: U]
  ) => {
    if (typeof args[0] === 'function') {
      const [createEvents, options] = args
      return async function upgradeWebSocket(c, next) {
        const events = await createEvents(c)
        const result = await handler(c, events, options as U)
        if (result) {
          return result
        }
        await next()
      }
    } else {
      const [c, events, options] = args as [c: Context, events: WSEvents<T>, options?: U]
      return (async () => {
        const upgraded = await handler(c, events, options as U)
        if (!upgraded) {
          throw new Error('Failed to upgrade WebSocket')
        }
        return upgraded
      })()
    }
  }) as UpgradeWebSocket<T, U>
}
