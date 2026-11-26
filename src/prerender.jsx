import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/** Build-time prerender for findability (non-JS crawlers / View Source). */
export async function prerender() {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html }
}
