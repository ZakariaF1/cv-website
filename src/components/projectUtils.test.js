import { describe, expect, it } from 'vitest'
import { buildMediaItems } from './projectUtils'

describe('buildMediaItems', () => {
  it('returns an empty list when the project has no video or screenshots', () => {
    expect(buildMediaItems({})).toEqual([])
    expect(buildMediaItems({ screenshots: [] })).toEqual([])
  })

  it('puts the demo video first, then screenshots in order', () => {
    expect(
      buildMediaItems({
        video: '/demo.webm',
        screenshots: ['/a.avif', '/b.avif'],
      }),
    ).toEqual([
      { type: 'video', src: '/demo.webm' },
      { type: 'img', src: '/a.avif' },
      { type: 'img', src: '/b.avif' },
    ])
  })

  it('returns only screenshots when there is no video', () => {
    expect(buildMediaItems({ screenshots: ['/a.avif'] })).toEqual([
      { type: 'img', src: '/a.avif' },
    ])
  })

  it('returns only the video when screenshots are missing', () => {
    expect(buildMediaItems({ video: '/demo.webm' })).toEqual([
      { type: 'video', src: '/demo.webm' },
    ])
  })
})
