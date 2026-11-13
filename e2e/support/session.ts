import type { Page } from '@playwright/test'
import { SESSION_ID } from './env'

// Tags every quote the page creates with the run's session id, so the teardown can find it
export async function stampQuotes(page: Page) {
  await page.route('**/api/quote', async (route) => {
    if (route.request().method() !== 'POST') return route.continue()
    await route.continue({
      headers: { ...route.request().headers(), 'x-session-id': SESSION_ID },
    })
  })
}

// Fills and submits the login form without waiting for the outcome
export async function submitLogin(page: Page, email: string, password: string) {
  await visit(page, '/login')
  await page.fill('#emailAddress', email)
  await page.fill('#password', password)
  await page.click('button[type=submit]')
}

// Logs in and waits until the API accepted it and the app has moved to the profile page,
// so the session cookie is in place before the test goes on
export async function logInThroughForm(page: Page, email: string, password: string) {
  await visit(page, '/login')
  await page.fill('#emailAddress', email)
  await page.fill('#password', password)
  await Promise.all([
    page.waitForResponse((r) => r.url().endsWith('/api/auth/login') && r.status() === 200),
    page.click('button[type=submit]'),
  ])
  await page.waitForURL(/\/profile$/)
  await page.waitForLoadState('networkidle')
}

// Opens a page and waits for it to hydrate: setting a file or filling a form earlier
// than that would reach the server-rendered markup, whose handlers are not attached yet
export async function visit(page: Page, path: string) {
  await page.goto(path)
  await page.waitForLoadState('networkidle')
}
