// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
import { isWindows } from "jsr:@std/internal@^1.0.9/os";

/**
 * The character used to separate entries in the PATH environment variable.
 * On Windows, this is `;`. On all other platforms, this is `:`.
 */
export const DELIMITER = isWindows ? ";" as const : ":" as const;
/**
 * The character used to separate components of a file path.
 * On Windows, this is `\`. On all other platforms, this is `/`.
 */
export const SEPARATOR = isWindows ? "\\" as const : "/" as const;
/**
 * A regular expression that matches one or more path separators.
 */
export const SEPARATOR_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
