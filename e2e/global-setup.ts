// Runs once before the workers start; the stamp reaches the workers through the environment
export default async function globalSetup() {
  process.env.E2E_STAMP = process.env.E2E_STAMP ?? String(Date.now())
  console.log(`e2e stamp: ${process.env.E2E_STAMP}`)
}
