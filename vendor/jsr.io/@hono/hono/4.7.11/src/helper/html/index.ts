/**
 * @module
 * html Helper for Hono.
 */

import { escapeToBuffer, raw, resolveCallbackSync, stringBufferToString } from '../../utils/html.ts'
import type { HtmlEscaped, HtmlEscapedString, StringBufferWithCallbacks } from '../../utils/html.ts'

export { raw }

export const html = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): HtmlEscapedString | Promise<HtmlEscapedString> => {
  const buffer: StringBufferWithCallbacks = [''] as StringBufferWithCallbacks

  for (let i = 0, len = strings.length - 1; i < len; i++) {
    buffer[0] += strings[i]

    const children = Array.isArray(values[i])
      ? (values[i] as Array<unknown>).flat(Infinity)
      : [values[i]]
    for (let i = 0, len = children.length; i < len; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = children[i] as any
      if (typeof child === 'string') {
        escapeToBuffer(child, buffer)
      } else if (typeof child === 'number') {
        ;(buffer[0] as string) += child
      } else if (typeof child === 'boolean' || child === null || child === undefined) {
        continue
      } else if (typeof child === 'object' && (child as HtmlEscaped).isEscaped) {
        if ((child as HtmlEscapedString).callbacks) {
          buffer.unshift('', child)
        } else {
          const tmp = child.toString()
          if (tmp instanceof Promise) {
            buffer.unshift('', tmp)
          } else {
            buffer[0] += tmp
          }
        }
      } else if (child instanceof Promise) {
        buffer.unshift('', child)
      } else {
        escapeToBuffer(child.toString(), buffer)
      }
    }
  }
  buffer[0] += strings.at(-1) as string

  return buffer.length === 1
    ? 'callbacks' in buffer
      ? raw(resolveCallbackSync(raw(buffer[0], buffer.callbacks)))
      : raw(buffer[0])
    : stringBufferToString(buffer, buffer.callbacks)
}
