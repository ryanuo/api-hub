// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  formatters: {
    markdown: true,
  },
})
