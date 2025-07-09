import { customAlphabet } from 'nanoid';

export function randomString(prefix = '', length = 12) {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', length);

  return prefix ? `${prefix}_${nanoid()}` : nanoid();
}
