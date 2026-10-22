import { defineConfig, type Connect } from 'vite'
import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const EXTENSIONS_PATH = '/extensiones-cabello-chetumal'

const retiredAdminRoute: Connect.NextHandleFunction = (request, response, next) => {
  const pathname = new URL(request.url || '/', 'http://localhost').pathname
  if (pathname === '/admin-demo' || pathname.startsWith('/admin-demo/')) {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(readFileSync(new URL('./public/404.html', import.meta.url)))
    return
  }
  next()
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'retired-admin-route',
      configureServer(server) { server.middlewares.use(retiredAdminRoute) },
      configurePreviewServer(server) { server.middlewares.use(retiredAdminRoute) },
    },
    {
      name: 'preview-extensions-html',
      configurePreviewServer(server) {
        server.middlewares.use((request, response, next) => {
          const url = new URL(request.url || '/', 'http://localhost')
          if (url.pathname === `${EXTENSIONS_PATH}/` || url.pathname === `${EXTENSIONS_PATH}/index.html`) {
            response.writeHead(308, { Location: `${EXTENSIONS_PATH}${url.search}` })
            response.end()
            return
          }
          if (url.pathname === EXTENSIONS_PATH) {
            request.url = `${EXTENSIONS_PATH}/index.html${url.search}`
          }
          next()
        })
      },
    },
  ],
})
