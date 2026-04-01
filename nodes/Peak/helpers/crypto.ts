import crypto from 'crypto';

export function hmacSha1Hex(key: string, message: string): string {
  return crypto.createHmac('sha1', key).update(message, 'utf8').digest('hex');
}