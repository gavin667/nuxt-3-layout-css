// See https://phrase.com/blog/posts/nuxt-js-tutorial-i18n/#using-custom-number-formats

import { numberFormats } from '~/i18n/constants.js'

export default defineI18nConfig(() => ({
  legacy: false,
  numberFormats,
}))
