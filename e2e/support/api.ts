import { API, PASSWORD, probeEmail } from './env'

// Creates a verified-enough test user through the API (faster than the UI for setup)
export async function registerUser(tag: string, firstName = 'Probe', lastName = 'User') {
  const email = probeEmail(tag)
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: PASSWORD, firstName, lastName }),
  })
  // 409 means a retried worker already created this user in the same run (the stamp is unique per run)
  if (res.status !== 201 && res.status !== 409) throw new Error(`register ${email} failed: ${res.status}`)
  return { email, password: PASSWORD, firstName, lastName }
}

// A 40 mm cube as ASCII STL, uploaded from the browser in the tests
export function cubeStl(): Buffer {
  const s = 40
  const faces = [
    [[0, 0, 0], [1, 0, 0], [1, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 0, 1], [1, 1, 1], [1, 0, 1]], [[0, 0, 1], [0, 1, 1], [1, 1, 1]],
    [[0, 0, 0], [1, 0, 1], [1, 0, 0]], [[0, 0, 0], [0, 0, 1], [1, 0, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 1, 1]], [[0, 1, 0], [1, 1, 1], [0, 1, 1]],
    [[0, 0, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [0, 1, 1], [0, 0, 1]],
    [[1, 0, 0], [1, 0, 1], [1, 1, 1]], [[1, 0, 0], [1, 1, 1], [1, 1, 0]],
  ]
  const v = (p: number[]) => `vertex ${p[0] * s} ${p[1] * s} ${p[2] * s}`
  const lines = ['solid probe']
  for (const [a, b, c] of faces) {
    lines.push(' facet normal 0 0 0', '  outer loop', `   ${v(a)}`, `   ${v(b)}`, `   ${v(c)}`, '  endloop', ' endfacet')
  }
  lines.push('endsolid probe')
  return Buffer.from(lines.join('\n'))
}

// Signs in through the API and returns the bearer token, for setup that needs the API directly
export async function loginApi(email: string, password: string): Promise<string> {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (res.status !== 200) throw new Error(`login ${email} failed: ${res.status}`)
  return (await res.json()).token as string
}
