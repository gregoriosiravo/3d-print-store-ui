import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Every row a run creates carries this stamp: users by email, quotes by session id
export const STAMP = process.env.E2E_STAMP ?? String(Date.now())
export const EMAIL_PATTERN = `probe-${STAMP}-%@example.com`
export const SESSION_ID = `probe-${STAMP}`
export const probeEmail = (tag: string) => `probe-${STAMP}-${tag}@example.com`
export const PASSWORD = 'probe-password'

export const API = 'http://localhost:4000/api'
export const API_ROOT = fileURLToPath(new URL('../../../3d-print-shop-api', import.meta.url))

// Reads the API's .env so the e2e database access uses the same settings as the API
export function apiEnv(): Record<string, string> {
  const values: Record<string, string> = {}
  for (const line of readFileSync(path.join(API_ROOT, '.env'), 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.*)$/)
    if (match) values[match[1]] = match[2].replace(/^"|"$/g, '')
  }
  return values
}
