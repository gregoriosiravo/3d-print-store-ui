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
})
