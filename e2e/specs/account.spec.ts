import { expect, test } from '@playwright/test'
import { probeEmail, PASSWORD } from '../support/env'
import { registerUser } from '../support/api'
import { logInThroughForm, submitLogin, visit } from '../support/session'

test.describe('account', () => {
  let user: Awaited<ReturnType<typeof registerUser>>

  test.beforeAll(async () => {
    user = await registerUser('account')
  })

  test('a wrong password is refused', async ({ page }) => {
    await submitLogin(page, user.email, 'not-the-password')
    await expect(page.getByText('Invalid email or password')).toBeVisible()
  })

  test('log in, see the profile, and log out', async ({ page }) => {
    await logInThroughForm(page, user.email, PASSWORD)
    await expect(page).toHaveURL('http://localhost:3000/profile')
    await expect(page.getByText(`${user.firstName} ${user.lastName}`).first()).toBeVisible()

    await page.getByRole('button', { name: 'Log out' }).click()
    await expect(page.getByRole('link', { name: 'Log in to your account' })).toBeVisible()
    await visit(page, '/profile')
    await expect(page).toHaveURL(/\/login/)
  })

  test('add two addresses, switch the default, and delete one', async ({ page }) => {
    await logInThroughForm(page, user.email, PASSWORD)
    await visit(page, '/profile')

    const addAddress = async (address: string) => {
      await page.getByRole('button', { name: 'add new' }).click()
      await page.fill('#inputName', 'Probe')
      await page.fill('#inputSurname', 'User')
      await page.fill('#inputAddress', address)
      await page.fill('#inputCity', 'Roma')
      await page.fill('#inputZip', '00100')
      await page.fill('#inputState', 'Italia')
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByText(address)).toBeVisible()
    }
    const cardFor = (address: string) => page.locator('#shipping .card', { hasText: address })
    await addAddress('Via Uno 1')
    await cardFor('Via Uno 1').getByRole('button', { name: 'SET DEFAULT' }).click()
    await expect(cardFor('Via Uno 1').getByText('DEFAULT', { exact: true })).toBeVisible()

    await addAddress('Via Due 2')
    await expect(cardFor('Via Due 2').getByRole('button', { name: 'SET DEFAULT' })).toBeVisible()
    await cardFor('Via Due 2').getByRole('button', { name: 'SET DEFAULT' }).click()
    await expect(cardFor('Via Due 2').getByText('DEFAULT', { exact: true })).toBeVisible()
    await expect(cardFor('Via Uno 1').getByText('DEFAULT', { exact: true })).toHaveCount(0)

    await cardFor('Via Uno 1').getByRole('button', { name: 'DELETE' }).click()
    await expect(page.getByText('Via Uno 1')).toHaveCount(0)
  })

  test('a new user can register from the form', async ({ page }) => {
    const email = probeEmail('registered')
    await visit(page, '/login')
    await page.getByRole('button', { name: 'Sign up for a new account' }).click()
    await page.fill('#firstName', 'Newbie')
    await page.fill('#lastName', 'Probe')
    await page.fill('#emailAddress', email)
    await page.fill('#password', PASSWORD)
    await page.fill('#confirmPassword', PASSWORD)
    await page.click('button[type=submit]')
    await expect(page).toHaveURL('http://localhost:3000/profile')
    await expect(page.getByText('Newbie Probe').first()).toBeVisible()
  })
})
