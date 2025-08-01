import type { Hono } from '../../hono.ts'
import { METHOD_NAME_ALL } from '../../router.ts'
import type { Env, RouterRoute } from '../../types.ts'
import { findTargetHandler, isMiddleware } from '../../utils/handler.ts'

/**
 * Get dirname
 * @param path File Path
 * @returns Parent dir path
 */
export const dirname = (path: string): string => {
  const separatedPath = path.split(/[\/\\]/)
  return separatedPath.slice(0, -1).join('/') // Windows supports slash path
}

const normalizePath = (path: string): string => {
  return path.replace(/(\\)/g, '/').replace(/\/$/g, '')
}

const handleParent = (resultPaths: string[], beforeParentFlag: boolean): void => {
  if (resultPaths.length === 0 || beforeParentFlag) {
    resultPaths.push('..')
  } else {
    resultPaths.pop()
  }
}

const handleNonDot = (path: string, resultPaths: string[]): void => {
  path = path.replace(/^\.(?!.)/, '')
  if (path !== '') {
    resultPaths.push(path)
  }
}

const handleSegments = (paths: string[], resultPaths: string[]): void => {
  let beforeParentFlag = false
  for (const path of paths) {
    // Handle `..`
    if (path === '..') {
      handleParent(resultPaths, beforeParentFlag)
      beforeParentFlag = true
    } else {
      // Handle `.` or `abc`
      handleNonDot(path, resultPaths)
      beforeParentFlag = false
    }
  }
}

export const joinPaths = (...paths: string[]): string => {
  paths = paths.map(normalizePath)
  const resultPaths: string[] = []
  handleSegments(paths.join('/').split('/'), resultPaths)
  return (paths[0][0] === '/' ? '/' : '') + resultPaths.join('/')
}

interface FilterStaticGenerateRouteData {
  path: string
}

export const filterStaticGenerateRoutes = <E extends Env>(
  hono: Hono<E>
): FilterStaticGenerateRouteData[] => {
  return hono.routes.reduce((acc, { method, handler, path }: RouterRoute) => {
    const targetHandler = findTargetHandler(handler)
    if (['GET', METHOD_NAME_ALL].includes(method) && !isMiddleware(targetHandler)) {
      acc.push({ path })
    }
    return acc
  }, [] as FilterStaticGenerateRouteData[])
}

export const isDynamicRoute = (path: string): boolean => {
  return path.split('/').some((segment) => segment.startsWith(':') || segment.includes('*'))
}
