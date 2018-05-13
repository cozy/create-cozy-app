<h1 align="center">Eslint Config Cozy App</h1>

<div align="center">
  <a href="https://www.npmjs.com/package/eslint-config-cozy-app">
    <img src="https://img.shields.io/npm/v/eslint-config-cozy-app.svg" alt="npm version" />
  </a>
  <a href="https://github.com/CPatchane/create-cozy-app/blob/master/packages/eslint-config-cozy-app/LICENSE">
    <img src="https://img.shields.io/npm/l/eslint-config-cozy-app.svg" alt="license" />
  </a>
  <a href="https://npmcharts.com/compare/eslint-config-cozy-app">
    <img src="https://img.shields.io/npm/dm/eslint-config-cozy-app.svg" alt="npm downloads" />
  </a>
  <a href="https://david-dm.org/cpatchane/create-cozy-app?path=packages/eslint-config-cozy-app">
    <img src="https://david-dm.org/cpatchane/create-cozy-app/status.svg?path=packages/eslint-config-cozy-app" alt="david-dm" />
  </a>
  <a href="https://renovateapp.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate" />
  </a>
</div>

### What's eslint-config-cozy-app?

Shareable configurations for Cozy Applications and scripts.

> This package is an ESLint shareable config already used by [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app).

To install:

```
yarn add --dev eslint-config-cozy-app
```

### Usage with a Create Cozy App projects

If you started your project using [`create-cozy-app`](https://github.com/CPatchane/create-cozy-app), you don't need to do anything, you should already have an `.eslintrc.json` configured to used this preset.

### Usage with other projects

In a file named `.eslintrc.json` (the ESLint configuration file), you can use the config by extending it. For example (see following available configurations documentation):

```json
{
    "extends": ["cozy-app"]
}
```

### Available configurations

#### Basics

Basic configuration for common Javascript code, this is the default configuration. To use in your `.eslintrc.json`:

```json
{
    "extends": ["cozy-app"]
}
```

Or if you want to use it explicitely:

```json
{
    "extends": ["cozy-app/basics"]
}
```

#### React

Configuration for React applications (basics configuration included). To use in your `.eslintrc.json`:

```json
{
    "extends": ["cozy-app/react"]
}
```


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

`eslint-config-cozy-app` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
