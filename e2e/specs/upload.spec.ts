import { expect, test } from '@playwright/test'
import { cubeStl } from '../support/api'
import { stampQuotes, visit } from '../support/session'

test.describe('quote builder', () => {
  test.beforeEach(async ({ page }) => {
    await stampQuotes(page)
    await visit(page, '/')
  })

  test('rejects a file that is not STL', async ({ page }) => {
    await page.locator('input[type=file]').setInputFiles({
      name: 'model.obj',
      mimeType: 'text/plain',
      buffer: Buffer.from('o model'),
    })
    await expect(page.getByRole('alert')).toHaveText('Please upload a valid file (.stl)')
  })

  test('an STL gets a price, and changing layer height changes it', async ({ page }) => {
    const price = page.locator('[aria-label="Total price"]')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(price).toContainText('€')
    const at02 = await price.textContent()

    const quoted = page.waitForResponse((r) => r.url().endsWith('/api/quote') && r.request().method() === 'POST')
    await page.locator('label[for="layer01"]').click()
    expect((await quoted).status()).toBe(200)
    await expect(price).not.toHaveText(at02 ?? '')
  })

  test('changing material changes the price', async ({ page }) => {
    const price = page.locator('[aria-label="Total price"]')
    await page.locator('input[type=file]').setInputFiles({ name: 'cube.stl', mimeType: 'model/stl', buffer: cubeStl() })
    await expect(price).toContainText('€')
    const pla = await price.textContent()

    await page.locator('label[for="material-abs"]').click()
    await expect(price).not.toHaveText(pla ?? '')
  })
})
