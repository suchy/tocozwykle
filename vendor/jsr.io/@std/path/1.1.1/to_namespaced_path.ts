// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.

import { isWindows } from "jsr:@std/internal@^1.0.9/os";
import { toNamespacedPath as posixToNamespacedPath } from "./posix/to_namespaced_path.ts";
import { toNamespacedPath as windowsToNamespacedPath } from "./windows/to_namespaced_path.ts";

/**
 * Resolves path to a namespace path.  This is a no-op on
 * non-windows systems.
 *
 * @example Usage
 * ```ts
 * import { toNamespacedPath } from "@std/path/to-namespaced-path";
 * import { assertEquals } from "@std/assert";
 *
 * if (Deno.build.os === "windows") {
 *   assertEquals(toNamespacedPath("C:\\foo\\bar"), "\\\\?\\C:\\foo\\bar");
 * } else {
 *   assertEquals(toNamespacedPath("/foo/bar"), "/foo/bar");
 * }
 * ```
 *
 * @param path Path to resolve to namespace.
 * @returns The resolved namespace path.
 */
export function toNamespacedPath(path: string): string {
  return isWindows
    ? windowsToNamespacedPath(path)
    : posixToNamespacedPath(path);
}
