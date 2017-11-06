[![npm](https://img.shields.io/npm/v/eslint-config-cozy-app.svg)](https://www.npmjs.com/package/eslint-config-cozy-app)
[![NPM Licence shield](https://img.shields.io/npm/l/eslint-config-cozy-app.svg)](https://github.com/CPatchane/create-cozy-app/blob/master/packages/eslint-config-cozy-app/LICENSE)
[![npm](https://img.shields.io/npm/dm/eslint-config-cozy-app.svg)]()
[![David](https://david-dm.org/CPatchane/eslint-config-cozy-app.svg)](https://david-dm.org/CPatchane/eslint-config-cozy-app)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

# eslint-config-cozy-app

A shareable configuration for Cozy Application using Standard configs and `babel-eslint` parser with JSX support.

This package is an ESLint shareable config used by [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app).

### Usage with a Create Cozy App projects

If you started your project using [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app), you don't need to do anything, you should already have a `.eslintrc.json` configured to used this preset.

### Usage with other projects

In a file named `.eslintrc.json` (the ESLint configuration file), you can use the config using the following way:

```json
{
    "extends": ["cozy-app"]
}
```

## Community

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

`eslint-config-cozy-app` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
