<h1 align="center">Create Cozy App</h1>

<div align="center">
  <a href="https://www.npmjs.com/package/create-cozy-app">
    <img src="https://img.shields.io/npm/v/create-cozy-app.svg" alt="npm version" />
  </a>
  <a href="https://github.com/CPatchane/create-cozy-app/blob/master/packages/create-cozy-app/LICENSE">
    <img src="https://img.shields.io/npm/l/create-cozy-app.svg" alt="license" />
  </a>
  <a href="https://travis-ci.org/CPatchane/create-cozy-app">
    <img src="https://img.shields.io/travis/CPatchane/create-cozy-app.svg" alt="travis" />
  </a>
  <a href="https://npmcharts.com/compare/create-cozy-app">
    <img src="https://img.shields.io/npm/dm/create-cozy-app.svg" alt="npm downloads" />
  </a>
  <a href="https://david-dm.org/cpatchane/create-cozy-app?path=packages/create-cozy-app">
    <img src="https://david-dm.org/cpatchane/create-cozy-app/status.svg?path=packages/create-cozy-app" alt="david-dm" />
  </a>
  <a href="https://renovateapp.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate" />
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="tested with jest" />
  </a>
</div>

### What's create-cozy-app?

`create-cozy-app` is a command line tool that creates a skeleton of an application for Cozy, using Cozy libraries.

This tool can be run as an installed CLI or by using `yarn create`, see below for more information.

By default, `create-cozy-app` will use the [`cozy-scripts`](https://github.com/CPatchane/create-cozy-app/tree/master/packages/cozy-scripts) scripts bundle to build your app based on React. 

__You can find a complete tutorial about creating a Cozy application using `create-cozy-app` in [the official documentation (docs.cozy.io)](https://docs.cozy.io/en/tutorials/app/).__

#### Requirements

 - NodeJS version 10 or higher;
 - [Yarn](https://yarnpkg.com): a NodeJS package manager, like `npm`;
 - a running [Cozy development environment](https://docs.cozy.io/en/dev/app/#install-the-development-environment)


### Running it via Yarn directly (highly recommended)

You can use `create-cozy-app` without installing it globally by using the `yarn create cozy-app` command to bootstrap your application:

```
yarn create cozy-app mycozyapp
```

You can find more information about `yarn create` in the [yarnpkg documentation](https://yarnpkg.com/lang/en/docs/cli/create/).

### Running it using the installed CLI

By installed the CLI, you will have to update it regularly to keep the app template up to date. It is why we recommend to use directly `yarn` like above which will always uses the last version of the CLI.

#### Install

Just use `yarn` to download and globally install the `create-cozy-app` CLI;

```
yarn global add create-cozy-app
```

#### CLI usage

Then, use the `create-cozy-app` command to bootstrap your application:

```
create-cozy-app mycozyapp
```

### Ready to go

The script will download some dependencies (may take a while) and ask you a few questions, then creates an application skeleton inside `mycozyapp`.

#### With stack from docker 

That's it! You can already start hacking:

```
cd mycozyapp
yarn start --stack
```

After the webpack build and the docker environment ready, the `mycozyapp` app here will be available at http://mycozyapp.cozy.tools:8080

#### With stack built from source

```
cd mycozyapp
yarn start
```


### Options

##### `--scripts-source` (useful for hacking)

You can pass a custom scripts package using the optional `--scripts-source` option, it can be one of:

- a __relative local path__ to a tarball (`fileRel:` prefix): `fileRel:./a-folder/my-cozy-scripts.tar.gz`
- an __absolute local path__ to a tarball (`fileAbs:` prefix): `fileAbs:/root/my-cozy-scripts.tar.gz`
- an __URL__ to a tarball (`url:` prefix): `url:https://myurl.com/my-cozy-scripts.tar.gz`
- a specific __npm version__ (`version:` prefix): `version:0.1.5`
- a specific __git commit/branch__ with name provided after the '#' (`git:` prefix): `git://github.com/CPatchane/cozy-scripts.git#master`


##### `--verbose`

Using this options, `create-cozy-app` will be run in a more verbose way, useful for debugging or understanding what the script does.


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

- Chatting with us on IRC `#cozycloud` on [Libera.Chat][libera]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]

## License

`create-cozy-app` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[libera]: https://web.libera.chat/#cozycloud
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
