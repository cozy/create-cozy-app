import CozyClient from 'cozy-client'

import manifest from '../../manifest.webapp'
import schema from 'src/doctypes'

/**
 * Returns cozy client instance
 * @returns {object} cozy client instance
 */
export const getClient = () => {
  const root = document.querySelector('[role=application]')
  const data = JSON.parse(root.dataset.cozy)
  const protocol = window.location.protocol
  const cozyUrl = `${protocol}//${data.domain}`

  return new CozyClient({
    uri: cozyUrl,
    token: data.token,
    appMetadata: {
      slug: manifest.name,
      version: manifest.version
    },
    schema,
    store: false
  })
}
