import { StrictMode } from 'react'
import { mountApp } from './lib/mountApp'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

mountApp(root, app, window.location.pathname)
