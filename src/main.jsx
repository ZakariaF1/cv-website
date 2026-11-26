import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const Root = (
  <StrictMode>
    <App />
  </StrictMode>
)

const container = document.getElementById('root')

if (container.hasChildNodes()) {
  hydrateRoot(container, Root)
} else {
  createRoot(container).render(Root)
}
