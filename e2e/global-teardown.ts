import { promises as fs } from 'fs'
import path from 'path'
import { createPool } from './support/db'
import { EMAIL_PATTERN, SESSION_ID, API_ROOT, STAMP } from './support/env'

// Deletes only what this run created: the stamp selects users and quotes, and the
// dependent rows (orders, uploads) are removed before their parents. Counts are checked first.
export default async function globalTeardown() {
  const db = createPool()
  try {
    const users = await db.query('SELECT id FROM users WHERE email LIKE $1', [EMAIL_PATTERN])
    const userIds = users.rows.map((r) => r.id)
    const quotes = await db.query(
      'SELECT id, s3_key FROM quotes WHERE session_id = $1 OR user_id = ANY($2::uuid[])',
      [SESSION_ID, userIds],
    )
    const quoteIds = quotes.rows.map((r) => r.id)
    const orders = await db.query(
      'SELECT id FROM orders WHERE user_id = ANY($1::uuid[]) OR quote_id = ANY($2::uuid[])',
      [userIds, quoteIds],
    )
    console.log(`e2e cleanup (stamp ${STAMP}) found: users=${userIds.length} quotes=${quoteIds.length} orders=${orders.rows.length}`)

    const deleted = { orders: 0, quotes: 0, users: 0, files: 0 }
    if (orders.rows.length) {
      deleted.orders = (await db.query('DELETE FROM orders WHERE id = ANY($1::uuid[])', [orders.rows.map((r) => r.id)])).rowCount ?? 0
    }
    if (quoteIds.length) {
      deleted.quotes = (await db.query('DELETE FROM quotes WHERE id = ANY($1::uuid[])', [quoteIds])).rowCount ?? 0
      for (const row of quotes.rows) {
        if (!row.s3_key) continue
        await fs.unlink(path.join(API_ROOT, row.s3_key)).then(() => deleted.files++, () => undefined)
      }
    }
    if (userIds.length) {
      deleted.users = (await db.query('DELETE FROM users WHERE id = ANY($1::uuid[])', [userIds])).rowCount ?? 0
    }
    if (deleted.users !== userIds.length || deleted.quotes !== quoteIds.length) {
      throw new Error(`e2e cleanup mismatch: ${JSON.stringify(deleted)}`)
    }
    console.log(`e2e cleanup removed: ${JSON.stringify(deleted)}`)
  } finally {
    await db.end()
  }
}
