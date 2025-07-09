/**
 * @module
 * JWT utility.
 */

import { decode, sign, verify, verifyFromJwks } from './jwt.ts'
export const Jwt = { sign, verify, decode, verifyFromJwks }
