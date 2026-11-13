import { expect, test } from '@playwright/test'
import { PASSWORD } from '../support/env'
import { cubeStl, loginApi, registerUser } from '../support/api'
import { saveTestCard } from '../support/stripe'
import { createPool } from '../support/db'
import { logInThroughForm, stampQuotes, visit } from '../support/session'

test.describe('paying with a saved card', () => {
  let user: Awaited<ReturnType<typeof registerUser>>
  let token: string

  test.beforeAll(async () => {
    user = await registerUser('cards')
    token = await loginApi(user.email, PASSWORD)
    // Two cards, the first one set as default
    await saveTestCard(user.email, token, 'tok_visa', true)
    await saveTestCard(user.email, token, 'tok_mastercard', false)
  })

  test('checkout preselects the default card and pays with it', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(page.locator('[aria-label="Total price"]')).toContainText('€')
    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)

    const select = page.getByTestId('pay-with')
    await expect(select).toBeVisible()
    await expect(select.locator('option')).toHaveCount(3)
    await expect(select.locator('option').first()).toContainText('VISA')
    await expect(select.locator('option').first()).toContainText('(default)')
    await expect(select).toHaveValue(await select.locator('option').first().getAttribute('value') ?? '')

    await page.fill('#inputName', 'Probe')
    await page.fill('#inputSurname', 'User')
    await page.fill('#inputAddress', 'Via Test 1')
    await page.fill('#inputCity', 'Roma')
    await page.fill('#inputZip', '00100')
    await page.fill('#inputState', 'Italia')
    await page.getByRole('button', { name: 'Pay Now' }).click()
    await expect(page.getByText('Payment succeeded!')).toBeVisible({ timeout: 90_000 })
  })
  test('after paying, the profile opens with the order as processing, without a reload', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    // The profile was just shown, so its order list is now cached in memory
    const ordersTable = page.locator('table').nth(1)
    const processingBefore = await ordersTable.locator('tbody tr', { hasText: 'PROCESSING' }).count()

    await visit(page, '/')
    const quoted = page.waitForResponse((r) => r.url().endsWith('/api/quote') && r.request().method() === 'POST')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    expect((await quoted).status()).toBe(200)
    await expect(page.locator('[aria-label="Total price"]')).not.toHaveText(/€0\.00/)
    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)
    await page.fill('#inputName', 'Probe')
    await page.fill('#inputSurname', 'User')
    await page.fill('#inputAddress', 'Via Test 2')
    await page.fill('#inputCity', 'Roma')
    await page.fill('#inputZip', '00100')
    await page.fill('#inputState', 'Italia')
    await page.getByRole('button', { name: 'Pay Now' }).click()
    await expect(page.getByText('Payment succeeded!')).toBeVisible({ timeout: 90_000 })

    // In-app navigation, not a reload: the list must reflect the payment
    await page.locator('a[aria-label="Go to profile page"]').click()
    await expect(page).toHaveURL(/\/profile$/)
    await expect(ordersTable.locator('tbody tr', { hasText: 'PROCESSING' })).toHaveCount(processingBefore + 1)
    await expect(ordersTable.locator('tbody tr', { hasText: 'PENDING' })).toHaveCount(0)
  })
  test('a paid order offers Ask refund only once it is received', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/')
    const quoted = page.waitForResponse((r) => r.url().endsWith('/api/quote') && r.request().method() === 'POST')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    expect((await quoted).status()).toBe(200)
    await expect(page.locator('[aria-label="Total price"]')).not.toHaveText(/€0\.00/)
    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)
    const orderId = page.url().split('/').pop() as string
    await page.fill('#inputName', 'Probe')
    await page.fill('#inputSurname', 'User')
    await page.fill('#inputAddress', 'Via Test 3')
    await page.fill('#inputCity', 'Roma')
    await page.fill('#inputZip', '00100')
    await page.fill('#inputState', 'Italia')
    await page.getByRole('button', { name: 'Pay Now' }).click()
    await expect(page.getByText('Payment succeeded!')).toBeVisible({ timeout: 90_000 })

    await page.locator('a[aria-label="Go to profile page"]').click()
    await expect(page).toHaveURL(/\/profile$/)
    const ordersTable = page.locator('table').nth(1)
    // Paid but not received yet: no processing row offers a refund, nor Pay or Cancel
    const processingRows = ordersTable.locator('tbody tr', { hasText: 'PROCESSING' })
    await expect(processingRows.first()).toBeVisible()
    await expect(processingRows.getByRole('button', { name: 'Ask refund' })).toHaveCount(0)
    await expect(processingRows.getByRole('button', { name: 'Pay' })).toHaveCount(0)
    await expect(processingRows.getByRole('button', { name: 'Cancel' })).toHaveCount(0)

    // The order is delivered: set its status the way the shop will (here, directly in the database)
    const db = createPool()
    try {
      await db.query("UPDATE orders SET status = 'received' WHERE id = $1", [orderId])
    } finally {
      await db.end()
    }
    await visit(page, '/profile')
    const receivedRow = ordersTable.locator('tbody tr', { hasText: 'RECEIVED' }).first()
    await expect(receivedRow.getByRole('button', { name: 'Ask refund' })).toBeVisible()
    await expect(receivedRow.getByRole('button', { name: 'Pay' })).toHaveCount(0)

    page.once('dialog', (dialog) => dialog.accept())
    await receivedRow.getByRole('button', { name: 'Ask refund' }).click()
    await expect(ordersTable.getByText('Refund requested').first()).toBeVisible()
  })
})
