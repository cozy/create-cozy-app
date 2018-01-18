'use strict'
import getI18nMixin from '../../src/lib/I18n'

export const I18nTestMixin = getI18nMixin('en', appLocale =>
  require(`../../src/locales/${appLocale}`)
)

export default I18nTestMixin
