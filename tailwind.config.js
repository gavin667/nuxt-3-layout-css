const { storefrontBaseConfig, storefrontPlugins } = require('@sungodltd/vision')

export default {
  ...storefrontBaseConfig,
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue'
  ],
  plugins: [
    storefrontPlugins
  ]
}
