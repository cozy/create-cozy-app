'use strict'

import { I18n } from 'cozy-ui/react/I18n'

const I18nComponent = new I18n({
  lang: 'en',
  dictRequire: (lang) => require(`../../src/locales/${lang}`)
})

export const mockT = I18nComponent.getChildContext().t

export const mockF = I18nComponent.getChildContext().f
