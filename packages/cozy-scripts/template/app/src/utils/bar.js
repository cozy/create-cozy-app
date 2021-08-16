/* global cozy */
import manifest from '../../manifest.webapp'

const getDataOrDefault = (data, defaultData) => {
  return /^\{\{\..*\}\}$/.test(data) ? defaultData : data
}

/**
 * default data will allow to display correctly the cozy-bar
 * in the standalone (without cozy-stack connexion)
 */
export const getValues = ({ app, locale }) => {
  const defaultValues = {
    appIconDefault: require('src/targets/vendor/assets/icon.svg'),
    appNamePrefixDefault: manifest.name_prefix,
    appNameDefault: manifest.name,
    appLocaleDefault: 'en'
  }

  return {
    appName: getDataOrDefault(app.name, defaultValues.appNameDefault),
    appNamePrefix: getDataOrDefault(
      app.prefix,
      defaultValues.appNamePrefixDefault
    ),
    iconPath: getDataOrDefault(app.icon, defaultValues.appIconDefault),
    lang: getDataOrDefault(locale, defaultValues.appLocaleDefault)
  }
}

/**
 * Cozy bar initialization
 * @param {object} client - cozy client
 */
export const initBar = ({ client, root, lang, appName }) => {
  const { appNamePrefix, iconPath } = getValues(JSON.parse(root.dataset.cozy))

  cozy.bar.init({
    appName,
    appNamePrefix,
    cozyClient: client,
    iconPath,
    lang,
    replaceTitleOnMobile: false
  })
}
