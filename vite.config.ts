import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const EXTENSIONS_PATH = '/extensiones-cabello-chetumal'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
