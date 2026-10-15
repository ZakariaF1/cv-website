import './StackTags.css'

/** Devicon slug (or null) for stack tag labels. */
const ICONS = {
  'C# / .NET': 'csharp',
  'ASP.NET Core': 'dotnetcore',
  'AWS SQS': 'amazonwebservices',
  PostgreSQL: 'postgresql',
  Angular: 'angular',
  TypeScript: 'typescript',
  'Oracle DB': 'oracle',
  Azure: 'azure',
  'Azure Functions': 'azure',
  'Azure Logic Apps': 'azure',
  Elasticsearch: 'elasticsearch',
  'SQL Server': 'microsoftsqlserver',
  MVC: 'dotnetcore',
  'Entity Framework': 'dotnetcore',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Python: 'python',
  Streamlit: 'streamlit',
  FastAPI: 'fastapi',
  JavaScript: 'javascript',
  Chrome: 'chrome',
  'HTML/CSS': 'html5',
  React: 'react',
  Vite: 'vitejs',
  CSS: 'css3',
  Vercel: 'vercel',
  Playwright: 'playwright',
}

/** simple-icons slug when no Devicon exists (e.g. Progress / Telerik). */
const SIMPLE_ICONS = {
  'Telerik Kendo': 'progress',
}

const INVERT = new Set(['amazonwebservices', 'vercel'])

function TagIcon({ name }) {
  const simple = SIMPLE_ICONS[name]
  if (simple) {
    return (
      <img
        src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${simple}.svg`}
        alt=""
        className="stack-tag-icon stack-tag-icon-invert"
        aria-hidden="true"
      />
    )
  }

  const icon = ICONS[name]
  if (!icon) return null
  const invert = INVERT.has(icon)
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
      alt=""
      className={`stack-tag-icon${invert ? ' stack-tag-icon-invert' : ''}`}
      aria-hidden="true"
      onError={(e) => {
        if (e.target.src.includes('-original')) {
          e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-plain.svg`
        } else {
          e.target.style.display = 'none'
        }
      }}
    />
  )
}

/**
 * @param {{ tags: Array<{ name: string, core?: boolean }>, label?: string }} props
 */
export default function StackTags({ tags, label }) {
  if (!tags?.length) return null

  return (
    <div className="stack-row">
      {label && <span className="stack-label">{label}</span>}
      {tags.map((tag) => (
        <span
          key={tag.name}
          className={`stack-tag${tag.core ? ' core' : ''}`}
        >
          <TagIcon name={tag.name} />
          {tag.name}
        </span>
      ))}
    </div>
  )
}
