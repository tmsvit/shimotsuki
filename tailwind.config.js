/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  server: {
    proxy: {
      '/api': {
        target: 'apikasugakure.eastus.cloudapp.azure.com',
        ws: true, // enable WebSocket proxy
        changeOrigin: true,
      },
    },
  },
}

