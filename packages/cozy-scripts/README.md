<h1 align="center">Cozy Scripts</h1>

<div align="center">
  <a href="https://www.npmjs.com/package/cozy-scripts">
    <img src="https://img.shields.io/npm/v/cozy-scripts.svg" alt="npm version" />
  </a>
  <a href="https://github.com/CPatchane/create-cozy-app/blob/master/packages/cozy-scripts/LICENSE">
    <img src="https://img.shields.io/npm/l/cozy-scripts.svg" alt="license" />
  </a>
  <a href="https://travis-ci.org/CPatchane/create-cozy-app">
    <img src="https://img.shields.io/travis/CPatchane/create-cozy-app.svg" alt="travis" />
  </a>
  <a href="https://npmjs.org/package/cozy-scripts">
    <img src="https://img.shields.io/npm/dm/cozy-scripts.svg" alt="npm downloads" />
  </a>
  <a href="https://david-dm.org/cpatchane/create-cozy-app?path=packages/cozy-scripts">
    <img src="https://david-dm.org/cpatchane/create-cozy-app/status.svg?path=packages/cozy-scripts" alt="david-dm" />
  </a>
  <a href="https://renovateapp.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate" />
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://facebook.github.io/jest/img/jest-badge.svg" alt="tested with jest" />
  </a>
</div>

</br>

### What's cozy-scripts?

`cozy-scripts` is a script bundle designed to be run by `create-cozy-app`. This latter will just create the root folder and then run the `node_modules/cozy-scripts/scripts/init.js` script inside it with some CLI options.

All the application template outline is handled by `cozy-scripts`.

To install:

```
yarn add --dev cozy-scripts
```

### Default template (`template` folder)

Using the default template, `cozy-scripts` will generate a \(P\)React/Redux application. After the initialisation, you should have the following folder structure:

<details>

```
mycozyapp/
    CONTRIBUTING.md
    LICENSE
    README.md
    jest.config.js
    manifest.webapp
    node_modules/
    package.json
    yarn.lock
    src/
        assets/
        components/
            App.jsx
            Sidebar.jsx
            HelloViews/
                Hello1.jsx
                Hello2.jsx
                Hello3.jsx
        lib/store.js
        locales/en.json
        styles/
            index.styl
            nav.css
        targets/
            browser/
                index.ejs
                index.jsx
            intents/
            mobile/
            vendor/
    test/
    .babelrc
    .editorconfig
    .eslintrc.json
    .github/
        .ISSUE_TEMPLATE
        .PULL_REQUEST_TEMPLATE
    .gitignore
    .stylintrc
    .travis.yml
    .tx/
        config
```

</details>

### VueJS 2+ template (`template-vue` folder)

Using the VueJS template, `cozy-scripts` will generate a VueJS/Vuex application. After the initialisation, you should have the following folder structure:

<details>

```
mycozyapp/
    app.config.js
    CONTRIBUTING.md
    LICENSE
    README.md
    jest.config.js
    manifest.webapp
    node_modules/
    package.json
    yarn.lock
    src/
        assets/
        components/
            App.vue
            Icon.vue
            HelloViews/
                Hello1.vue
                Hello2.vue
                Hello3.vue
        lib/
            store.js
            I18n/
        locales/en.json
        styles/
            index.styl
            nav.css
        targets/
            browser/
                index.ejs
                index.js
            intents/
            mobile/
            vendor/
    test/
    .babelrc
    .editorconfig
    .eslintrc.json
    .github/
        .ISSUE_TEMPLATE
        .PULL_REQUEST_TEMPLATE
    .gitignore
    .stylintrc
    .travis.yml
    .tx/
        config
```

</details>

### The `cozy-scripts` CLI

`cozy-scripts` make available some scripts to be used inside your application (used by default in applications created from `create-cozy-app`):

##### - `cozy-scripts --show-config`

This command will output the webpack config computed according your current global variable `NODE_ENV`. By default, the application will have some `yarn` scripts (in the `package.json`) to show the configurations according to different environments (dev, browser, mobile, prod...).

##### - `cozy-scripts build`

This command will run webpack in a one shot execution of webpack (without files watching mode so) in a quiter way. It's recommended for production build.
The built files (destined to the Cozy) will be in `build/`.

> A `--debug` options is available if you want to ouput more informations about webpack building in your console.

##### - `cozy-scripts watch`

Unlike the previous command, this will run webpack using the files watching mode. Each time you will modify a file, a new build will triggered. It's recommended for development build.
The built files (destined to the Cozy) will be in `build/`.

> A `--debug` options is available if you want to ouput more informations about webpack building in your console.

##### - `cozy-scripts standalone`

Do the same thing than the previous command with webpack in a watching mode but also run a server (`webpack-dev-server`) to serve your application (as a static application) on the url `http://localhost:8888`.

##### - `--production` or `--development` options

Allow to pass the wanted build mode to `cozy-scripts`. This mode will be overwritten by `process.env.NODE_ENV` usage (ex: `browser:development` for development usage with browser target).

##### - `--browser` or `--mobile` options

Allow to pass the wanted build target to `cozy-scripts`. This target will be overwritten by `process.env.NODE_ENV` usage (ex: `browser:development` for development usage with browser target).

##### - `--analyzer`

Use this option if you want to analyze your builds content using the webpack plugin [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer). It will open you browser with an interactive treemap visualization of the contents of all your bundles.

### The `cozy-scripts` webpack configuration

`cozy-scripts` is designed to used a default webpack configuration for a basic \(P\)React/Redux application which uses `cozy-ui` and `cozy-client-js`. But you can override or use your custom configuration files by creating a new `app.config.js` file in your application root folder. Here is an example to overload the default bundle config with a custom one:

```javascript
// myapp/app.config.js
module.exports = [
  require('cozy-scripts/config/webpack.bundle.default.js'),
  require('./config/webpack.myconfig.js')
]
```

You can find more information about webpack configuration files available via `cozy-scripts` in the dedicated [webpack configs documentation](docs/webpack-configs.md).

If you need more particular/complicated configurations and need to use the [`webpack-merge`](https://github.com/survivejs/webpack-merge#merging-with-strategies) smart mode or merge strategies, you can also find more information about in the dedicated [merge strategies documentation](docs/webpack-merge-strategies.md).


## Community

### What's Cozy?

<div align="center">
  <a href="https://cozy.io">
    <img src="https://cdn.rawgit.com/cozy/cozy-site/master/src/images/cozy-logo-name-horizontal-blue.svg" alt="cozy" height="48" />
  </a>
 </div>
 </br>

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.

### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


## License

`cozy-scripts` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
