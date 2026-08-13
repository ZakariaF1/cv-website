import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { testCatalog } from './catalog.js'

function walkTestFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkTestFiles(path))
    else if (/\.test\.(js|jsx)$/.test(entry.name)) files.push(path)
  }
  return files
}

function testNamesIn(source) {
  return [...source.matchAll(/\bit\(\s*(['"])(.*?)\1/g)].map((match) => match[2])
}

describe('test catalog', () => {
  it('documents every characterizing test in the catalog', () => {
    const names = walkTestFiles('src').flatMap((file) => testNamesIn(readFileSync(file, 'utf8')))
    expect(testCatalog.map((entry) => entry.name).sort()).toEqual([...names].sort())
  })

  it('lists every catalog test in TEST_REPORT.md', () => {
    const report = readFileSync('TEST_REPORT.md', 'utf8')
    for (const entry of testCatalog) {
      expect(report.includes(entry.name), `missing test name: ${entry.name}`).toBe(true)
      expect(report.includes(entry.does), `missing summary: ${entry.does}`).toBe(true)
    }
  })
})
