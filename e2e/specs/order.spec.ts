import { expect, test } from '@playwright/test'
import { PASSWORD } from '../support/env'
import { cubeStl, registerUser } from '../support/api'
import { logInThroughForm, stampQuotes, visit } from '../support/session'

test.describe('ordering as a signed-in customer', () => {
  let user: Awaited<ReturnType<typeof registerUser>>

  test.beforeAll(async () => {
    user = await registerUser('order')
  })

  test('order a quoted model, then cancel it from the profile', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(page.locator('[aria-label="Total price"]')).toContainText('€')

    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)
    await expect(page.getByRole('button', { name: 'Pay Now' })).toBeVisible()

    await visit(page, '/profile')
    const row = page.locator('table tbody tr', { hasText: 'PENDING' }).first()
    await expect(row).toBeVisible()
    await row.locator('.action-dots').click()
    page.once('dialog', (dialog) => dialog.accept())
    await row.getByRole('button', { name: 'Cancel' }).click()
    await expect(page.locator('table tbody tr', { hasText: 'CANCELLED' }).first()).toBeVisible()
  })

  test('a quote saved from the home page is listed in the profile without a reload', async ({ page }) => {
    await stampQuotes(page)
    const saver = await registerUser('saver')
    await logInThroughForm(page, saver.email, PASSWORD)
    await visit(page, '/')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(page.locator('[aria-label="Total price"]')).toContainText('€')

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Save current configuration' }).click()
    // In-app navigation, no reload: the list must come from the server state at that moment
    await page.locator('a[aria-label="Go to profile page"]').click()
    await expect(page).toHaveURL(/\/profile$/)
    await expect(page.locator('table').first().locator('tbody tr', { hasText: 'PENDING' }).first()).toBeVisible()
  })

  test('paying with a test card marks the order paid in the profile', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(page.locator('[aria-label="Total price"]')).toContainText('€')
    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)

    await page.fill('#inputName', 'Probe')
    await page.fill('#inputSurname', 'User')
    await page.fill('#inputAddress', 'Via Test 1')
    await page.fill('#inputCity', 'Roma')
    await page.fill('#inputZip', '00100')
    await page.fill('#inputState', 'Italia')

    // Stripe's Payment Element is a cross-origin iframe with the standard test card
    const card = page.frameLocator('iframe[title*="Secure payment input"]').first()
    await card.locator('input[name=number]').fill('4242424242424242')
    await card.locator('input[name=expiry]').fill('1234')
    await card.locator('input[name=cvc]').fill('123')
    await page.getByRole('button', { name: 'Pay Now' }).click()
    await expect(page.getByText('Payment succeeded!')).toBeVisible({ timeout: 90_000 })

    await visit(page, '/profile')
    await expect(page.locator('table tbody tr', { hasText: 'PROCESSING' }).first()).toBeVisible()
  })

  test('a guest who logs in from Order now lands on checkout', async ({ page }) => {
    await stampQuotes(page)
    await visit(page, '/')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(page.locator('[aria-label="Total price"]')).toContainText('€')

    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/login\?action=order-now&quoteId=/)

    await page.fill('#emailAddress', user.email)
    await page.fill('#password', PASSWORD)
    await page.click('button[type=submit]')
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)
    await expect(page.getByRole('button', { name: 'Pay Now' })).toBeVisible()
  })
  test('a cancelled order shows its label in orange', async ({ page }) => {
    await stampQuotes(page)
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/')
    const quoted = page.waitForResponse((r) => r.url().endsWith('/api/quote') && r.request().method() === 'POST')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    expect((await quoted).status()).toBe(200)
    await expect(page.locator('[aria-label="Total price"]')).not.toHaveText(/€0\.00/)
    await page.getByRole('button', { name: 'Order Now' }).click()
    await expect(page).toHaveURL(/\/checkout\/[0-9a-f-]{36}$/)

    await visit(page, '/profile')
    const ordersTable = page.locator('table').nth(1)
    const row = ordersTable.locator('tbody tr', { hasText: 'PENDING' }).first()
    page.once('dialog', (dialog) => dialog.accept())
    await row.getByRole('button', { name: 'Cancel' }).click()
    const label = ordersTable.locator('tbody tr span.text-cancelled', { hasText: 'Cancelled' }).first()
    await expect(label).toBeVisible()
    await expect(label).toHaveCSS('color', 'rgb(251, 146, 60)')
  })
})
