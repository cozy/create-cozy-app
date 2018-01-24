# `cozy-scripts` configurations

## Table of content

- __[Bundles](#bundles)__
    - [`webpack.bundle.default.js`](#webpackbundledefaultjs)
    - [`webpack.bundle.vue.js`](#webpackbundlevuejs)
- __[Unit Configs](#unit-configs)__
    - [`webpack.config.base.js`](#webpackconfigbasejs)
    - [`webpack.config.cozy-ui.js`](#webpackconfigcozy-uijs)
    - [`webpack.config.cozy-ui.react.js`](#webpackconfigcozy-uireactjs)
    - [`webpack.config.eslint.js`](#webpackconfigeslintjs)
    - [`webpack.config.hash.js`](#webpackconfighashjs)
    - [`webpack.config.manifest.js`](#webpackconfigmanifestjs)
    - [`webpack.config.pictures.js`](#webpackconfigpicturesjs)
    - [`webpack.config.preact.js`](#webpackconfigpreactjs)
    - [`webpack.config.progress.js`](#webpackconfigprogressjs)
    - [`webpack.config.services.js`](#webpackconfigservicesjs)
    - [`webpack.config.vendors.js`](#webpackconfigvendorsjs)
    - [`webpack.config.vue.js`](#webpackconfigvuejs)
- __[Environments](#environments)__
    - [`webpack.environment.dev.js`](#webpackenvironmentdevjs)
    - [`webpack.environment.prod.js`](#webpackenvironmentprodjs)
- __[Targets](#targets)__
    - [`webpack.target.browser.js`](#webpacktargetbrowserjs)
    - [`webpack.target.mobile.js`](#webpacktargetmobilejs)
- __[Miscellaneous](#miscellaneous)__
    - [`webpack.vars.js`](#webpackvarsjs)

## Bundles

### `webpack.bundle.default.js`

This file is the default config bundle used for the application built from `cozy-scripts`. It uses all following configs files:
- `webpack.config.base.js`
- `webpack.config.cozy-ui.js`
- `webpack.config.cozy-ui.react.js`
- `webpack.config.eslint.js`
- `webpack.config.intents.js`
- `webpack.config.manifest.js`
- `webpack.config.pictures.js`
- `webpack.config.preact.js`
- `webpack.config.vendors.js`
- `webpack.environment.dev.js`
- `webpack.environment.prod.js`
- `webpack.target.browser.js`
- `webpack.target.mobile.js`
- `webpack.vars.js`

By default `cozy-scripts` uses this bundle in an opinionated way, but you can overload this configuration using a custom `app.config.js` in your application root directory:

```js
// app.config.js

// ES Modules
import configs from 'cozy-scripts/config/webpack.bundle.default.js'
import myConfig from './config/webpack.myconfig.js'
// or CommonJS
const configs = require('cozy-scripts/config/webpack.bundle.default.js')
const myConfig = require('./config/webpack.myconfig.js')

// it's possible to add many custom configurations using this way,
// the last will overwrite the previous in case of conflicts
module.exports = [configs, myConfig]
```

### `webpack.bundle.vue.js`

This file is the VueJS config bundle used for the application built from `cozy-scripts` with the option `--vue`. It uses all following configs files:
- `webpack.config.base.js`
- `webpack.config.cozy-ui.js`
- `webpack.config.eslint.js`
- `webpack.config.intents.js`
- `webpack.config.manifest.js`
- `webpack.config.pictures.js`
- `webpack.config.vendors.js`
- `webpack.config.vue.js`
- `webpack.environment.dev.js`
- `webpack.environment.prod.js`
- `webpack.target.browser.js`
- `webpack.target.mobile.js`
- `webpack.vars.js`

The `app.config.js` is needed to use this bundle since it's not the default one for `cozy-scripts`. But you can still overload it using a custom config like the default bundle:

```js
// app.config.js

// ES Modules
import configs from 'cozy-scripts/config/webpack.bundle.vue.js'
import myConfig from './config/webpack.myconfig.js'
// or CommonJS
const configs = require('cozy-scripts/config/webpack.bundle.vue.js')
const myConfig = require('./config/webpack.myconfig.js')

// it's possible to add many custom configurations using this way,
// the last will overwrite the previous in case of conflicts
module.exports = [configs, myConfig]
```

## Unit Configs

### `webpack.config.base.js`

The default basic configuration of the application.

##### Properties
- `output` to `[name].js` filename
- resolve:
    -  `modules` to `['node_modules', 'src']`
    - extensions: `.js`, `.json` and `.css`

##### Rules
- all `.js` (excluding `node_modules`, `cozy-bar` and `cozy-client-js`) to be loaded using `babel-loader` (with `cacheDirectory` option for caching in `node_modules/.cache/babel-loader`)
- all `.json` files to be loaded using `json-loader`
- all `.css` to be loaded using `extract-text-webpack-plugin` imported from `webpack.vars.js` with options:
    - `style-loader` as fallback
    - `css-loader` with `sourceMap`
    - `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`

A specific `noParse` property is enabled on `/localforage/dist`.

##### Plugins:
- `script-ext-html-webpack-plugin` to load the main application `.js` file using the `defer` attribute (to be loaded after the initial loading)
- `extract-text-webpack-plugin` imported from `webpack.vars.js`
- `postcss-assets-webpack-plugin` (logs from this plugin are shown only in `--debug` mode) to load all `.css` files with:
    - `css-mqpacker` (pack all CSS media query rules into one)
    - `postcss-discard-duplicates` (remove duplicates)
    - `postcss-discard-empty` (remove empty definitions)
    - `csswring` only in `production` environment to minify and remove comments (`preservehacks` enabled)

### `webpack.config.cozy-ui.js`

This configuration will allow to load styles from `cozy-ui`.

It adds a rule for all `.styl` files excluding `node_modules` and `node_modules/cozy-ui/react` to be loaded using:
- `style-loader` as fallback
- `css-loader` with `sourceMap`
- `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`
- `stylus-loader`

It uses two plugins:
- `svg-sprite-loader/plugin` to merge the built svg sprite from `cozy-ui` into the application's one
- `webpack.LoaderOptionsPlugin` to make the global stylus loader use the stylus from `cozy-ui`

### `webpack.config.cozy-ui.react.js`

This configuration is specific to `react` components usage from `cozy-ui`, since they currently need `css-modules`. This configuration file could be removed if this `cozy-ui` requirement disappear.

It adds a rule for all `.styl` files from `cozy-ui/react` to be loaded using:
- `style-loader` as fallback
- `css-loader` with `modules`, `sourceMap` and `[local]--[hash:base64:5]` as `localIdentName`
- `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`
- `stylus-loader`

### `webpack.config.eslint.js`

A rule to preload all `.js/.jsx` files with `eslint-loader` (excluding `node_modules`) extending [`babel-preset-cozy-app`](https://github.com/CPatchane/create-cozy-app/tree/master/packages/babel-preset-cozy-app)

### `webpack.config.hash.js`

A custom webpack plugin usage to extract the hash from built files for reference.

### `webpack.config.manifest.js`

A `copy-webpack-plugin` plugin usage to copy the `manifest.webapp`, `README.md` and `LICENSE` files to the output build folder.

Except for `production` environment, the `manifest.webapp` is transformed using a custom function to change the `slug` property value to `app` (to keep using `app.cozy.tools:8080` URL for different app development).

### `webpack.config.pictures.js`

This configuration will handle all pictures files.

It will add two rules:
- all `.svg` files in `sprites/` and `icons/` folders will be loaded using `svg-sprite-loader` with output name to `[name]_[hash]`. This loader will merge all SVG content to one `.svg` file and replace their reference to the matching `id`. Only one `.svg` sprite file will be loaded by the ouput application.
- all other `.svg`, `.png`, `.gif`, `.jpg`, `.jpeg` files will be loaded using `file-loader` with options:
    - `path` to `img`, the ouput folder
    - `name` to `[name].[hash].[ext]` for production environment, `[name].[ext]` for other environments

### `webpack.config.preact.js`

A config to resolve all `react` aliases using [`Preact`](https://preactjs.com) instead.

It will:
- resolve `.jsx` extensions
- add aliases:
    - `react` to `preact-compat`
    - `react-dom` to `preact-compat`
    - Due to [an HMR issue](https://github.com/developit/preact-compat/issues/392), `preact-compat` to `preact-compat/dist/preact-compat`
- add a rule for `.jsx` files excluding `node_modules` (exception for `node_modules/cozy-ui`) to be loaded using `babel-loader` (with `cacheDirectory` option for caching in `node_modules/.cache/babel-loader`)

### `webpack.config.progress.js`

This config will just add a custom webpack plugin to display a progress bar when webpack building/watching. It internally uses the included webpack plugin `webpack.ProgressPlugin`.

### `webpack.config.intents.js`

This is a specific configuration file to develop application intents for the Cozy platform.

It will:
- add a webpack entry: `src/targets/intents/intents.jsx`
- use `html-webpack-plugin` configured to use `index.ejs` HTML template from `src/targets/intents/` with options:
    - `title`: `name` property of the `package.json` + ` intents`
    - `filename`: `intents/index.html`, the output file
    - `chunks`: ['intents']
    - `inject` to `false`
    - `minify` with `collapseWhitespace` to `true`

### `webpack.config.vendors.js`

A `copy-webpack-plugin` plugin usage to copy all files from the `vendors/assets/` folder to the output build folder.

### `webpack.config.vue.js`

A config to use the VueJS (v2+) framework.

It will:
- resolve `.vue` extensions
- add a rule for `.vue` files, excluding `node_modules`, to be loaded using `vue-loader`.

## Environments

### `webpack.environment.dev.js`

##### Properties
- `devtool` to `#source-map`
- `externals` with `['cozy']` to exclude all `cozy.*` dependencies from the output bundle (since it will be serve by `ProvidePlugin`)

##### Rules
- load `cozy-bar` js and css files using `imports-loader`

##### Plugins:
- `webpack.DefinePlugin` to define globals variables at compile time:
    - `__DEVELOPMENT__` to `true`
    - `__STACK_ASSETS__` to `false`
- `webpack.ProvidePlugin` to provide `cozy-bar` and `cozy-client-js` from `node_modules` (in production, these modules will be provided to the application by the [`cozy-stack`](https://cozy.github.io/cozy-stack/client-app-dev.html#good-practices-for-your-application))
- `webpack.NamedModulesPlugin` will cause the relative path of the module to be displayed for hot module replacement
- `webpack.HotModuleReplacementPlugin` which allows all kinds of modules to be updated at runtime without the need for a full refresh

### `webpack.environment.prod.js`

##### Plugins:
- `webpack.optimize.OccurrenceOrderPlugin`
- `webpack.optimize.UglifyJsPlugin` with options:
    - `mangle` to `true`
    - `compress` with `warnings: false`
- `webpack.DefinePlugin` to define globals variables at compile time:
    - `process.env.NODE_ENV` to `production`
    - `__DEVELOPMENT__` to `false`
    - `__DEVTOOLS__` to `false`
    - `__STACK_ASSETS__` to `true`

## Targets

### `webpack.target.browser.js`

##### Properties
- `entry`: `index.jsx` from `src/targets/browser/`
- `output`: `build/` path with `filename` to `[name].js`
- `externals` with `{ 'cozy-client-js': 'cozy' }` to exclude `cozy-client-js` (via `cozy.*`) dependency from the output bundle

##### Plugins:
- `html-webpack-plugin` configured to use `index.ejs` HTML template from `src/targets/browser/` with options:
    - `title`: `name` property of the `package.json`
    - `inject` to `false`
    - `minify` with `collapseWhitespace` to `true`
- `webpack.DefinePlugin` to define globals variables at compile time:
    - `__TARGET__` to `browser`

### `webpack.target.mobile.js`

##### Properties
- `entry`: `index.jsx` from `src/targets/mobile`
- `output`: `src/targets/mobile/www` path

##### Plugins:
- `html-webpack-plugin` configured to use `index.ejs` HTML template from `src/targets/mobile/` with options:
    - `title`: `name` property of the `package.json`
    - `chunks`: ['app']
    - `inject` to `head`
    - `minify` with `collapseWhitespace` to `true`
- `webpack.DefinePlugin` to define globals variables at compile time:
    - `__ALLOW_HTTP__` to `false` if `production` environment, `true` for other environments
    - `__TARGET__` to `mobile`
    - `__APP_VERSION__` to the `version` property of the `package.json`
- `webpack.ProvidePlugin` to provide `cozy-bar` and `cozy-client-js` from `node_modules` (since it's for the native application, it's not served by the `cozy-stack` unlike the browser version)



## Miscellaneous

### `webpack.vars.js`

This file is used to get webpack variables. They are necessary to build correctly the application. It will export these following variables:
- `target` according to `NODE_ENV` global variable (`target:environment`)
- `environment` according to `NODE_ENV` global variable (`target:environment`)
- `extractor` which is the `extract-text-webpack-plugin` plugin instance. It's configured to output css files using `[name].[hash].min.css` format in 'production' environment and `[name].css` format in other environments.

> If no environment variable `NODE_ENV` is found, it will be `browser:development` by default.
