import memoize from 'lodash/memoize'

import { initTranslation } from 'cozy-ui/transpiled/react/I18n'

import { getClient } from 'src/utils/client'
import { getValues, initBar } from 'src/utils/bar'

/**
 * Memoize this function in its own file so that it is correctly memoized
 */
const setupApp = memoize(() => {
  const container = document.querySelector('[role=application]')
  const { lang, appName } = getValues(JSON.parse(container.dataset.cozy))
  const polyglot = initTranslation(lang, lang => require(`locales/${lang}`))
  const client = getClient()

  initBar({ client, container, lang, appName })

  return { container, client, lang, polyglot }
})

export default setupApp
