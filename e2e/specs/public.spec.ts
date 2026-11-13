import { expect, test } from '@playwright/test'
import { visit } from '../support/session'

test.describe('public pages', () => {
  test('home page shows the quote builder', async ({ page }) => {
    await visit(page, '/')
    await expect(page.getByRole('heading', { name: 'Upload 3D Models' })).toBeVisible()
  })

  test('materials are loaded from the API', async ({ page }) => {
    await visit(page, '/materials')
    await expect(page.getByRole('heading', { name: 'PLA White' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'PETG Clear' })).toBeVisible()
  })

  test('print presets are loaded from the API', async ({ page }) => {
    await visit(page, '/services')
    await expect(page.getByRole('cell', { name: 'Standard Quality' })).toBeVisible()
    await expect(page.getByRole('cell', { name: '0.2 mm' }).first()).toBeVisible()
  })

  test('footer pages exist', async ({ page }) => {
    await visit(page, '/privacy')
    await expect(page.getByRole('heading', { name: 'Privacy policy' })).toBeVisible()
  })

  test('profile needs a session and redirects to login', async ({ page }) => {
    await visit(page, '/profile')
    await expect(page).toHaveURL(/\/login/)
  })
})
