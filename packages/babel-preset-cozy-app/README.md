[![npm](https://img.shields.io/npm/v/eslint-config-cozy-app.svg)](https://www.npmjs.com/package/eslint-config-cozy-app)
[![NPM Licence shield](https://img.shields.io/npm/l/babel-preset-cozy-app.svg)](https://github.com/CPatchane/create-cozy-app/blob/master/packages/babel-preset-cozy-app/LICENSE)
[![npm](https://img.shields.io/npm/dm/babel-preset-cozy-app.svg)]()
[![David](https://david-dm.org/CPatchane/babel-preset-cozy-app.svg)](https://david-dm.org/CPatchane/babel-preset-cozy-app)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

# babel-preset-cozy-app

A shareable configuration for Cozy Application with React and JSX support.

This package is a Babel preset used by [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app).

### Usage with a Create Cozy App projects

If you started your project using [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app), you don't need to do anything, you should already have a `.babelrc` configured to used this preset.

### Usage with other projects

If you want to use this preset, you first need to have Babel installed (cf [documentation](https://babeljs.io/docs/setup/)).

Then, in a file named `.babelrc` (the Babel configuration file), you can use the preset using the following way:

```json
{
    "presets": ["cozy-app"]
}
```

### Content

#### Presets:

- [`env`](https://github.com/babel/babel/tree/master/experimental/babel-preset-env) to add polyfills with the current configuration:

    ```javascript
    {
      targets: {
        chrome: 42,
        ie: 10,
        firefox: 40,
        browsers: ['last 2 versions']
      },
      useBuiltIns: false
    }
    ```

- [`react`](https://babeljs.io/docs/plugins/preset-react/) to support JSX and transform it to `createElement` calls.

#### Plugins:

- [`transform-object-rest-spread`](http://babeljs.io/docs/plugins/transform-object-rest-spread/) to transform rest properties for object destructuring assignment and spread properties for object literals. The `useBuiltIns` options is enable to directly use `Object.assign` considered as available or polyilled.

- [`transform-class-properties`](https://babeljs.io/docs/plugins/transform-class-properties/) to transform class attributes and methods with auto-binding to the class instance and no constructor needed.

- [`transfor-runtime`](https://babeljs.io/docs/plugins/transform-runtime/) only to polyfill generators (for async/await) here:

    ```js
    {
      helpers: false,
      polyfill: false,
      regenerator: true
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

`babel-preset-cozy-app` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
