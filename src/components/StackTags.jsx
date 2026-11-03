import './StackTags.css'
import { resolveIcon } from '../lib/icons'

function TagIcon({ name }) {
  const resolved = resolveIcon(name)
  if (!resolved) return null

  return (
    <img
      src={resolved.src}
      alt=""
      className={`stack-tag-icon${resolved.invert ? ' stack-tag-icon-invert' : ''}`}
      aria-hidden="true"
      onError={resolved.onError}
    />
  )
}

/**
 * @param {{ tags: Array<{ name: string }>, label?: string }} props
 */
export default function StackTags({ tags, label }) {
  if (!tags?.length) return null

  return (
    <div className="stack-row">
      {label && <span className="stack-label">{label}</span>}
      {tags.map((tag) => (
        <span key={tag.name} className="stack-tag">
          <TagIcon name={tag.name} />
          {tag.name}
        </span>
      ))}
    </div>
  )
}
