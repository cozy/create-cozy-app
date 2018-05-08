<h1 align="center">Cozy Scripts Vanilla</h1>

<div align="center">
  <a href="https://www.npmjs.com/package/cozy-scripts-vanilla">
    <img src="https://img.shields.io/npm/v/cozy-scripts-vanilla.svg" alt="npm version" />
  </a>
  <a href="https://github.com/CPatchane/create-cozy-app/blob/master/packages/cozy-scripts-vanilla/LICENSE">
    <img src="https://img.shields.io/npm/l/cozy-scripts-vanilla.svg" alt="license" />
  </a>
  <a href="https://travis-ci.org/CPatchane/create-cozy-app">
    <img src="https://img.shields.io/travis/CPatchane/create-cozy-app.svg" alt="travis" />
  </a>
  <a href="https://npmcharts.com/compare/cozy-scripts-vanilla">
    <img src="https://img.shields.io/npm/dm/cozy-scripts-vanilla.svg" alt="npm downloads" />
  </a>
  <a href="https://david-dm.org/cpatchane/create-cozy-app?path=packages/cozy-scripts-vanilla">
    <img src="https://david-dm.org/cpatchane/create-cozy-app/status.svg?path=packages/cozy-scripts-vanilla" alt="david-dm" />
  </a>
  <a href="https://renovateapp.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate" />
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://facebook.github.io/jest/img/jest-badge.svg" alt="tested with jest" />
  </a>
</div>

### What's cozy-scripts-vanilla?

`cozy-scripts-vanilla` is a script bundle designed to be run by `create-cozy-app`. This latter will just create the root folder and then run the `node_modules/cozy-scripts-vanilla/scripts/init.js` script inside it.

All the template structure is handled by `cozy-scripts-vanilla`. After the initialisation, you should have the following folder structure:

```
mycozyapp/
    LICENSE
    README.md
    manifest.webapp
    index.html
    view2.html
    assets/
        icon-app.svg
        sprites.svg
    scripts/
        init.js
    styles/
        cozy-ui.min.css
        index.css
        app.css
        nav.css
    .editorconfig
```

The bootstraped application will have two views (`/` and `/view2`).

And that's it, the application is ready to be served by a Cozy.

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
