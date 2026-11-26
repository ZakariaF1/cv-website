/**
 * Vite + vite-prerender-plugin can hang after a successful React 19 prerender.
 * This wrapper exits once dist/index.html contains the expected CV text.
 */
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const markers = ['Senior Full Stack', 'Morningstar', 'Job Tracker']
const child = spawn('npx', ['vite', 'build'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
  cwd: process.cwd(),
  env: process.env,
})

let log = ''
const write = (chunk, stream) => {
  const text = chunk.toString()
  log += text
  stream.write(text)
}

child.stdout.on('data', (c) => write(c, process.stdout))
child.stderr.on('data', (c) => write(c, process.stderr))

let settled = false
const finish = (code) => {
  if (settled) return
  settled = true
  clearInterval(timer)
  try {
    child.kill()
  } catch {
    /* already exited */
  }
  process.exit(code)
}

const deadline = Date.now() + 90_000
const timer = setInterval(() => {
  if (!existsSync('dist/index.html')) {
    if (Date.now() > deadline) {
      console.error('\nBuild timed out before dist/index.html existed.')
      finish(1)
    }
    return
  }

  const html = readFileSync('dist/index.html', 'utf8')
  const prerendered = markers.every((m) => html.includes(m)) && log.includes('Prerendered')
  if (prerendered) {
    console.log('\nPrerender verified in dist/index.html — exiting (avoids known Vite/React hang).')
    finish(0)
    return
  }

  if (Date.now() > deadline) {
    console.error('\nBuild timed out waiting for prerender markers in dist/index.html.')
    finish(1)
  }
}, 250)

child.on('exit', (code, signal) => {
  if (settled) return
  if (code === 0) {
    finish(0)
    return
  }
  console.error(`\nvite build exited ${code ?? signal}`)
  finish(code ?? 1)
})
