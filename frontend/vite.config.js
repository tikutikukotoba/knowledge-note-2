/** @type {import('vite').UserConfig} */
export default {
  assetsInclude: ['src/templates/**/*.html'],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}