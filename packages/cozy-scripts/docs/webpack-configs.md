# The `cozy-scripts` configurations

## Table of content

- __[Introduction](#introduction)__
- __[Bundles](#bundles)__
    - [`webpack.bundle.default.js`](#webpackbundledefaultjs)
    - [`webpack.bundle.vue.js`](#webpackbundlevuejs)
- __[Unit Configs](#unit-configs)__
    - [`webpack.config.analyzer.js`](#webpackconfiganalyzerjs)
    - [`webpack.config.base.js`](#webpackconfigbasejs)
    - [`webpack.config.cozy-ui.js`](#webpackconfigcozy-uijs)
    - [`webpack.config.cozy-ui.react.js`](#webpackconfigcozy-uireactjs)
    - [`webpack.config.css-modules.js`](#webpackconfigcss-modulesjs)
    - [`webpack.config.eslint.js`](#webpackconfigeslintjs)
    - [`webpack.config.hash.js`](#webpackconfighashjs)
    - [`webpack.config.intents.js`](#webpackconfigintentsjs)
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


## Introduction

To build a Cozy application, `cozy-scripts` uses `webpack` under the hood, and this documentation is dedicated to all webpack configuration files.
In order to organize all these webpack configurations, they are classified in many files according to the concern.
Having many unit files for the configuration will also allow to support specific application needs without 'ejecting' (removing `cozy-scripts` dependency and copy all webpack configurations and dependencies to the application repository).
These files are supposed to be enoughly independant to be usable upon request as far as possible without conflicts.

#### Kind of config file:

__Bundle:__ A bundle regroup many unit configuration for a specific use case like the default \(P\)React application or an VueJS application.

__Environment:__ An environment config is in charge of provided variables and pluging specific to a compiling context (development or production for example).

__Target:__ A target means the one which will use the built. For now we only have to targets, `browser` for the default web application and `mobile` for the native mobile application using Cordova (in progress).


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

By default `cozy-scripts` uses this bundle in an opinionated way, but you can overload this configuration by creating a custom `app.config.js` in your application root directory:

```js
// app.config.js

// using ES Modules
import configs from 'cozy-scripts/config/webpack.bundle.default.js'
import myConfig from './config/webpack.myconfig.js'
// or using CommonJS
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

### `webpack.config.analyzer.js`

This file will only add the plugin [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer) to be run on with the `--analyzer` option.

It will run a server (on port `8889` to not be in conflict with the webpack dev server) and open an interactive treemap visualization of the contents of all your bundles in your browser.

### `webpack.config.base.js`

The default basic configuration of the application.

##### Properties
- `output` to `[name].js` filename
- resolve:
    -  `modules` to `['node_modules', 'src']`
    - extensions: `.js`, `.json` and `.css`

##### Rules
- all `.js` (excluding `node_modules`, `cozy-bar` and `cozy-client-js`) to be loaded using `babel-loader` (with `cacheDirectory` option for caching in `node_modules/.cache/babel-loader`)
- all `.css` to be loaded using options:
    - `mini-css-extract-plugin` extractor loader by default or `style-loader` for hot reloading
    - `css-loader` with `sourceMap`
    - `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`

A specific `noParse` property is enabled on `/localforage/dist`.

##### Plugins:
- `postcss-assets-webpack-plugin` (logs from this plugin are shown only in `--debug` mode) to load all `.css` files with:
    - `css-mqpacker` (pack all CSS media query rules into one)
    - `postcss-discard-duplicates` (remove duplicates)
    - `postcss-discard-empty` (remove empty definitions)
    - `csswring` only in `production` environment to minify and remove comments (`preservehacks` enabled)

### `webpack.config.cozy-ui.js`

This configuration will allow to load styles from `cozy-ui`.

It adds a rule for all `.styl` files excluding `node_modules` and `node_modules/cozy-ui/react` to be loaded using:
- `mini-css-extract-plugin` extractor loader by default or `style-loader` for hot reloading
- `css-loader` with `sourceMap`
- `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`
- `stylus-loader` using the custom stylus plugin from cozy-ui as option

It also uses `svg-sprite-loader/plugin` to merge the built svg sprite from `cozy-ui` into the application's one

### `webpack.config.cozy-ui.react.js`

This configuration is specific to `react` components usage from `cozy-ui`, since they currently need `css-modules`. This configuration file could be removed if this `cozy-ui` requirement disappear.

It adds a rule for all `.styl` files from `cozy-ui/react` to be loaded using:
- `mini-css-extract-plugin` extractor loader by default or `style-loader` for hot reloading
- `css-loader` with `modules`, `sourceMap` and `[local]--[hash:base64:5]` as `localIdentName`
- `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`
- `stylus-loader` using the custom stylus plugin from cozy-ui as option

### `webpack.config.css-modules.js`

This configuration will allow to use `css-modules` with stylus files. To overload previous stylus loaders, it uses the following `webpack-merge` `smartStrategy`: `{ 'modules.loaders': 'replace' }`.

It adds a rule for all `.styl` files excluding `node_modules` and `node_modules/cozy-ui/react` to be loaded using:
- `mini-css-extract-plugin` extractor loader by default or `style-loader` for hot reloading
- `css-loader` with `modules`, `sourceMap` and `[local]--[hash:base64:5]` as `localIdentName`
- `postcss-loader` to optimize css output code with `sourceMap` and `autoprefixer` plugin to `{ browsers: ['last 2 versions'] }`
- `stylus-loader`

### `webpack.config.eslint.js`

A rule to preload all `.js/.jsx` files with `eslint-loader` (excluding `node_modules`) extending [`babel-preset-cozy-app`](https://github.com/CPatchane/create-cozy-app/tree/master/packages/babel-preset-cozy-app)
The `emitWarning` option is set to true for production environment or if hot reload is enabled to force emitting warning and to avoid errors breaking the build.

### `webpack.config.intents.js`

This is a specific configuration file to develop application intents for the Cozy platform.

It will:
- add a webpack entry: the [`babel-polyfill`](https://babeljs.io/docs/en/babel-polyfill.html) import and the `src/targets/intents/intents.jsx` file
- use `html-webpack-plugin` configured to use `index.ejs` HTML template from `src/targets/intents/` with options:
    - `title`: `name` property of the `package.json` + ` intents`
    - `filename`: `intents/index.html`, the output file
    - `chunks`: ['intents']
    - `inject` to `false`
    - `minify` with `collapseWhitespace` to `true`

### `webpack.config.hash.js`

A custom webpack plugin usage to extract the hash from built files for reference.

### `webpack.config.manifest.js`

A `copy-webpack-plugin` plugin usage to copy the `manifest.webapp`, `README.md` and `LICENSE` files to the output build folder.

In the `production` environment, the `manifest.webapp` is transformed to include locales from the application `src/locales` folder (locales concerning manifest descriptions, permissions, names...). It will look for the `manifest` property (if found) of the locale `.json` file. So the `locales` property of the `manifest.webapp` will be an object of language slugs as properties and each slug matching the related locales found. The `langs` array in the manifest will also be computed according to the languages found in `src/locales`.

Except for `production` environment, the `manifest.webapp` is transformed using a custom function to change the `slug` property value to `app` (to keep using `app.cozy.tools:8080` URL for different app development).

### `webpack.config.pictures.js`

This configuration will handle all pictures files.

It will add two rules:
- all `.svg` files in `sprites/` and `icons/` folders will be loaded using `svg-sprite-loader` with output name to `[name]_[hash]`. This loader will merge all SVG content to one `.svg` file and replace their reference to the matching `id`. Only one `.svg` sprite file will be loaded by the ouput application.
- all other `.svg`, `.png`, `.gif`, `.jpg`, `.jpeg` files will be loaded using `file-loader` with options:
    - `path` to `img`, the ouput folder
    - `symbolId` to `[name].[hash].[ext]` for production environment, `[name].[ext]` for other environments

It also adds `svg-sprite-loader/plugin` as plugin to use it with the related loader.

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

### `webpack.config.services.js`

This config will provide a separate config to build app services using [Webpack multi-compiling](https://webpack.js.org/api/compiler/#multicompiler).
In this case, all services files (`.js` files in the `/src/targets/services/` folder) will be built using this separate webpack config.

This config will:
- use `__mergeStrategy` to drive the [`webpack-merge` strategy](docs/webpack-merge-strategy.md):
    - disable smart merging
    - use the `replace` mode `plugins`, `output` and `entry`
- define as webpack entry an array of all `.js` files contained in `/src/target/services` folder
- use as output the `/build/services` folder with `[name].js` as filename
- define the target as `'node'`
- disable devtool (boolean to `false`)
- define the global variable `__TARGET__` to `services` using the plugin `webpack.DefinePlugin`

This config will be used only if the webpack target is `browser`.

### `webpack.config.vendors.js`

A `copy-webpack-plugin` plugin usage to copy all files from the `vendors/assets/` folder to the output build folder.

This config will also process the application icon and run [`svgo`](https://github.com/svg/svgo) to optimize it if this is a SVG file.

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
- `mode` to `development`

##### Plugins:
- `webpack.DefinePlugin` to define globals variables at compiling time:
    - `__DEVELOPMENT__` to `true`
    - `__STACK_ASSETS__` to `false`
- `webpack.ProvidePlugin` to provide `cozy-bar` and `cozy-client-js` from `node_modules` (in production, these modules will be provided to the application by the [`cozy-stack`](https://cozy.github.io/cozy-stack/client-app-dev.html#good-practices-for-your-application))
- Copy (`copy-webpack-plugin`) the `cozy-bar.css` file from `node_modules` ot the app build to be able to develop on the `cozy-bar` using the app
- Add the `cozy-bar` css to the main html file via `html-webpack-include-assets-plugin`

Only in the hot reload mode:
- `webpack.HotModuleReplacementPlugin` which allows all kinds of modules to be updated at runtime without the need for a full refresh
- `write-file-webpack-plugin` to write all the build file from `webpack-dev-server` to the disk (necessary for the hot-reloading)

### `webpack.environment.prod.js`

##### Plugins:
- `webpack.optimize.OccurrenceOrderPlugin`
- `webpack.DefinePlugin` to define globals variables at compiling time:
    - `process.env.NODE_ENV` to `production`
    - `__DEVELOPMENT__` to `false`
    - `__DEVTOOLS__` to `false`
    - `__STACK_ASSETS__` to `true` if `target` different from `mobile`

In this production mode, webpack will automatically use the `UglifyJs` plugin to optimize the build (with default options).


## Targets

### `webpack.target.browser.js`

##### Properties
- `entry`: the [`babel-polyfill`](https://babeljs.io/docs/en/babel-polyfill.html) import and the `index.jsx` from `src/targets/browser/`
- `output`: `build/` path with `filename` to `[name].js` and `pathinfo` enabling only with the `COZY_SCRIPTS_DEBUG` mode
- `externals` with `{ 'cozy-client-js': 'cozy' }` to exclude `cozy-client-js` (via `cozy.*`) dependency from the output bundle

##### Plugins:
- `script-ext-html-webpack-plugin` to load the main application `.js` file using the `defer` attribute (to be loaded after the initial loading) and used with `html-webpack-plugin`
- `html-webpack-plugin` configured to use `index.ejs` HTML template from `src/targets/browser/` with options:
    - `title`: `name` property of the `package.json`
    - `inject` to `false`
    - `chunks`: ['app']
    - `minify` with `collapseWhitespace` to `true`
- `webpack.DefinePlugin` to define globals variables at compile time:
    - `__TARGET__` to `browser`

### `webpack.target.mobile.js`

##### Properties
- `entry`: the [`babel-polyfill`](https://babeljs.io/docs/en/babel-polyfill.html) import and the `index.jsx` from `src/targets/mobile`
- `output`: `src/targets/mobile/www` path and `pathinfo` enabling only with the `COZY_SCRIPTS_DEBUG` mode

##### Plugins:
- `script-ext-html-webpack-plugin` to load the main application `.js` file using the `defer` attribute (to be loaded after the initial loading) and used with `html-webpack-plugin`
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
- `addAnalyzer` according to the `COZY_SCRIPTS_ANALYZER` environment variable (used to get the `webpack-bundle-analyze` usage)
- `environment` according to `NODE_ENV` environment variable (`target:environment`)
- `getCSSLoader`, a function returing the correctly style lodaer to use (`mini-css-extract-plugin` loader by default and `style-loader` for hot reloading)
- `isDebugMode` according to the `COZY_SCRIPTS_DEBUG` environment variable (used to get into a debug mode of `cozy-scripts`)
- `target` according to `NODE_ENV` environment variable (`target:environment`)
- `useHotReload` according to the `HOT_RELOAD` environment variable to use hot reloading feature or not

> If no environment variable `NODE_ENV` is found, it will be `browser:development` by default.
