[![npm](https://img.shields.io/npm/v/cozy-scripts-vanilla.svg)](https://www.npmjs.com/package/cozy-scripts-vanilla)
[![NPM Licence shield](https://img.shields.io/npm/l/cozy-scripts-vanilla.svg)](https://github.com/CPatchane/cozy-scripts-vanilla/tree/master/packages/cozy-scripts-vanilla/LICENSE)
[![npm](https://img.shields.io/npm/dm/cozy-scripts-vanilla.svg)]()
[![dependencies Status](https://david-dm.org/cpatchane/create-cozy-app/status.svg?path=packages/cozy-scripts-vanilla)](https://david-dm.org/cpatchane/create-cozy-app?path=packages/cozy-scripts-vanilla)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

# Cozy Scripts Vanilla

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
