/** Pinned CDN versions — do not use @latest (unreproducible). */
export const DEVICON_VERSION = '2.16.0'
/** 15.22.0 has OpenAI/Claude/Cursor/Ollama; Microsoft brand was dropped — use Azure for Graph. */
export const SIMPLE_ICONS_VERSION = '15.22.0'
export const MDI_VERSION = '7.4.47'

const DEVICON_BASE = `https://cdn.jsdelivr.net/gh/devicons/devicon@${DEVICON_VERSION}/icons`
const SIMPLE_BASE = `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons`
const MDI_BASE = `https://cdn.jsdelivr.net/npm/@mdi/svg@${MDI_VERSION}/svg`

/** Devicons that need invert on dark backgrounds. */
const INVERT_DEVICON = new Set(['github', 'vercel', 'amazonwebservices'])

/** Prefer wordmark asset (some -original.svg files 403 on jsDelivr). */
const WORDMARK = new Set(['amazonwebservices'])

/**
 * Resolve a skill/stack icon to a CDN URL descriptor.
 * @param {{ icon?: string|null, simple?: boolean, mdi?: boolean } | string | null | undefined} spec
 *   - Skills data: `{ icon, simple?, mdi? }`
 *   - Stack tag name string looked up via STACK_BY_NAME
 * @returns {{ src: string, invert: boolean, onError?: (e: Event) => void } | null}
 */
export function resolveIcon(spec) {
  if (spec == null) return null

  if (typeof spec === 'string') {
    const mapped = STACK_BY_NAME[spec]
    if (!mapped) return null
    return resolveIcon(mapped)
  }

  const { icon, simple, mdi } = spec
  if (!icon) return null

  if (mdi) {
    return {
      src: `${MDI_BASE}/${icon}.svg`,
      invert: true,
    }
  }

  if (simple) {
    return {
      src: `${SIMPLE_BASE}/${icon}.svg`,
      invert: true,
    }
  }

  const file = WORDMARK.has(icon) ? `${icon}-original-wordmark.svg` : `${icon}-original.svg`
  return {
    src: `${DEVICON_BASE}/${icon}/${file}`,
    invert: INVERT_DEVICON.has(icon),
    onError: makeDeviconFallback(icon),
  }
}

function makeDeviconFallback(icon) {
  return (e) => {
    const el = e.target
    if (!(el instanceof HTMLImageElement)) return
    if (el.src.includes('-original-wordmark')) {
      el.src = `${DEVICON_BASE}/${icon}/${icon}-plain-wordmark.svg`
    } else if (el.src.includes('-original.svg')) {
      el.src = `${DEVICON_BASE}/${icon}/${icon}-original-wordmark.svg`
    } else if (el.src.includes('-plain-wordmark')) {
      el.src = `${DEVICON_BASE}/${icon}/${icon}-plain.svg`
    } else {
      el.style.display = 'none'
    }
  }
}

/** Stack tag label → icon spec (shared by Experience / Projects). */
export const STACK_BY_NAME = {
  'C# / .NET': { icon: 'csharp' },
  'ASP.NET Core': { icon: 'dotnetcore' },
  'AWS SQS': { icon: 'amazonwebservices' },
  PostgreSQL: { icon: 'postgresql' },
  Angular: { icon: 'angular' },
  TypeScript: { icon: 'typescript' },
  'Oracle DB': { icon: 'oracle' },
  SonarQube: { icon: 'sonarqube' },
  Azure: { icon: 'azure' },
  'Azure Functions': { icon: 'azure' },
  'Azure Logic Apps': { icon: 'azure' },
  Elasticsearch: { icon: 'elasticsearch' },
  'SQL Server': { icon: 'microsoftsqlserver' },
  SSIS: { icon: 'microsoftsqlserver' },
  MVC: { icon: 'dotnetcore' },
  'Entity Framework': { icon: 'dotnetcore' },
  MySQL: { icon: 'mysql' },
  MongoDB: { icon: 'mongodb' },
  Python: { icon: 'python' },
  Streamlit: { icon: 'streamlit' },
  FastAPI: { icon: 'fastapi' },
  JavaScript: { icon: 'javascript' },
  Chrome: { icon: 'chrome' },
  'Chrome Extension': { icon: 'chrome' },
  'HTML/CSS': { icon: 'html5' },
  React: { icon: 'react' },
  Vite: { icon: 'vitejs' },
  CSS: { icon: 'css3' },
  Vercel: { icon: 'vercel' },
  Playwright: { icon: 'playwright' },
  'Telerik Kendo': { icon: 'progress', simple: true },
  Ollama: { icon: 'ollama', simple: true },
  OpenAI: { icon: 'openai', simple: true },
  'OpenAI API': { icon: 'openai', simple: true },
  Resend: { icon: 'resend', simple: true },
  'Microsoft Graph': { icon: 'azure' },
  ETL: { icon: 'transit-connection-variant', mdi: true },
  RAG: { icon: 'brain', mdi: true },
  SSR: { icon: 'server', mdi: true },
  SEO: { icon: 'magnify', mdi: true },
  'YNAB API': { icon: 'wallet', mdi: true },
}
