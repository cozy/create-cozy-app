/**
vue plugin that provides an I18n helper using a Higher Order Component.
*/

import { initTranslation } from './translation.js'
import { initFormat } from './format.js'

export const DEFAULT_LANG = 'en'

export function getI18nMixin (lang, dictRequire, defaultLang) {
  return {
    data: function () {
      return { lang }
    },
    methods: {
      t: initTranslation(lang, dictRequire, defaultLang),
      f: initFormat(lang, defaultLang)
    }
  }
}

export default getI18nMixin
