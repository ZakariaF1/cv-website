import { existsSync, readFileSync } from 'node:fs'
import { testCatalog } from '../src/test/catalog.js'

const junitPath = process.argv[2] ?? 'test-results.xml'

function parseJunit(xml) {
  const results = new Map()
  const testcasePattern =
    /<testcase\b([^>]*)(?:\/>|>([\s\S]*?)<\/testcase>)/g

  for (const match of xml.matchAll(testcasePattern)) {
    const attrs = match[1]
    const body = match[2] ?? ''
    const name = attrs.match(/\bname="([^"]+)"/)?.[1]
    if (!name) continue

    let status = 'passed'
    if (body.includes('<skipped')) status = 'skipped'
    else if (body.includes('<failure') || body.includes('<error')) status = 'failed'

    results.set(name, status)
    const title = name.split(' > ').at(-1)
    if (title) results.set(title, status)
  }

  return results
}

function statusFor(entry, results) {
  if (!results) return 'not run'
  return results.get(entry.name)
    ?? [...results].find(([name]) => name.endsWith(entry.name))?.[1]
    ?? 'missing'
}

function icon(status) {
  if (status === 'passed') return 'PASS'
  if (status === 'failed') return 'FAIL'
  if (status === 'skipped') return 'SKIP'
  return status.toUpperCase()
}

const results = existsSync(junitPath)
  ? parseJunit(readFileSync(junitPath, 'utf8'))
  : null

const failed = testCatalog.filter((entry) => statusFor(entry, results) === 'failed')

const lines = [
  '## Vitest test report',
  '',
  'Each test below includes what it checks. Failed rows are listed first in the log; use the test name to jump to the Vitest output.',
  '',
  '| Result | Group | Test | What it does |',
  '| ------ | ----- | ---- | ------------ |',
  ...testCatalog.map((entry) => {
    const status = statusFor(entry, results)
    return `| ${icon(status)} | ${entry.group} | ${entry.name} | ${entry.does} |`
  }),
  '',
]

if (failed.length) {
  lines.push('### Failed tests', '')
  for (const entry of failed) {
    lines.push(`- **${entry.name}** — ${entry.does}`)
  }
  lines.push('')
}

process.stdout.write(lines.join('\n'))
