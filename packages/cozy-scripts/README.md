[![npm](https://img.shields.io/npm/v/cozy-scripts.svg)](https://www.npmjs.com/package/cozy-scripts)
[![NPM Licence shield](https://img.shields.io/npm/l/cozy-scripts.svg)](https://github.com/CPatchane/cozy-scripts/blob/master/packages/cozy-scripts/LICENSE)
[![Travis](https://img.shields.io/travis/CPatchane/cozy-scripts.svg)]()
[![npm](https://img.shields.io/npm/dm/cozy-scripts.svg)]()
[![David](https://david-dm.org/CPatchane/cozy-scripts.svg)](https://david-dm.org/CPatchane/cozy-scripts)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

# Cozy Scripts

`cozy-scripts` is a script bundle designed to be run by `create-cozy-app`. This latter will just create the root folder and then run `cozy-scripts init` inside it.

All the template structure is handled by `cozy-scripts`. After the initialisation, you should have the following folder structure:

```
mycozyapp/
    CONTRIBUTING.md
    LICENSE
    README.md
    manifest.webapp
    node_modules/
    package.json
    yarn.lock
    src/
        assets/
        components/
            App.jsx
            Nav.jsx
            Sidebar.jsx
        lib/store.js
        locales/en.json
        styles/
            index.styl
            nav.css
        targets/
            browser/
                index.ejs
                index.jsx
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

### `cozy-scripts` CLI

`cozy-scripts` make available some scripts to be used inside your application (used by default in applications created from `create-cozy-app`)

##### `cozy-scripts --show-config`

This command will output the webpack config computed according your current global variable `NODE_ENV`.

##### `cozy-scripts build`

This command will run webpack in a one shot execution of webpack (without files watching mode so) in a quiter way. It's recommended for production build.

##### `cozy-scripts watch`

Unlike the previous command, this will run webpack using the files watching mode. Each time you will modify a file, a new build will triggered. It's recommended for development build.

##### `cozy-scripts standalone`

Do the same thing than the previous command with webpack in a watching mode but also run a server (`webpack-dev-server`) to serve your application (as a static application) on the url `http://localhost:8888`

## Community

### Maintainer

The lead maintainer for `cozy-scripts` and tooling is [@CPatchane](https://github.com/CPatchane), send him a :beers: to say hello!

### What's Cozy?

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

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
