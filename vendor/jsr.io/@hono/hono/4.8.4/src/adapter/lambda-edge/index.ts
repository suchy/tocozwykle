/**
 * @module
 * Lambda@Edge Adapter for Hono.
 */

export { handle } from './handler.ts'
export { getConnInfo } from './conninfo.ts'
export type {
  Callback,
  CloudFrontConfig,
  CloudFrontRequest,
  CloudFrontResponse,
  CloudFrontEdgeEvent,
} from './handler.ts'
