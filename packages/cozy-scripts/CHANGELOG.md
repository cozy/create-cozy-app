# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.1](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@5.1.0...cozy-scripts@5.1.1) (2020-09-28)


### Bug Fixes

* Add relative node_modules in resolve.modules ([cb72c06](https://github.com/cozy/create-cozy-app/commit/cb72c06))





# [5.1.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@5.0.2...cozy-scripts@5.1.0) (2020-09-23)


### Features

* Cozy-scripts installs the stylint dependency ([83d96d5](https://github.com/cozy/create-cozy-app/commit/83d96d5))
* Share .stylintrc ([067a883](https://github.com/cozy/create-cozy-app/commit/067a883))





## [5.0.2](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@5.0.1...cozy-scripts@5.0.2) (2020-09-23)


### Bug Fixes

* Use cozy-scripts v5 ([cf6be83](https://github.com/cozy/create-cozy-app/commit/cf6be83))





## [5.0.1](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@5.0.0...cozy-scripts@5.0.1) (2020-09-15)


### Bug Fixes

* Prevent flaky builds ([fc95ebc](https://github.com/cozy/create-cozy-app/commit/fc95ebc))





# [5.0.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.4.0...cozy-scripts@5.0.0) (2020-09-08)


### Features

* Removes the stack in docker option ([e89ad78](https://github.com/cozy/create-cozy-app/commit/e89ad78))


### BREAKING CHANGES

* The --stack flag is no longer supported. As an
alternative, it's possible to directly run the stack either from source
or with Docker. The command to run the docker image is in the README.





# [4.4.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.3.3...cozy-scripts@4.4.0) (2020-08-31)


### Features

* Add check-locales script ([88e9d9e](https://github.com/cozy/create-cozy-app/commit/88e9d9e))





## [4.3.3](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.3.2...cozy-scripts@4.3.3) (2020-08-31)

**Note:** Version bump only for package cozy-scripts





## [4.3.2](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.3.1...cozy-scripts@4.3.2) (2020-08-25)


### Bug Fixes

* Deactivate hot reload for production ([d65fb1c](https://github.com/cozy/create-cozy-app/commit/d65fb1c))





## [4.3.1](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.3.0...cozy-scripts@4.3.1) (2020-08-20)


### Bug Fixes

* Add allowed hosts to fix "Invalid Host Header" error ([69093d6](https://github.com/cozy/create-cozy-app/commit/69093d6))





# [4.3.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.2.1...cozy-scripts@4.3.0) (2020-07-28)


### Features

* Add babel-preset-cozy-app ([c1b0f64](https://github.com/cozy/create-cozy-app/commit/c1b0f64))
* Add BreakpointsProvider ([14ce917](https://github.com/cozy/create-cozy-app/commit/14ce917))
* Have babel-jest and jest at the same version ([3e021fa](https://github.com/cozy/create-cozy-app/commit/3e021fa))
* Import stylesheet and utilities ([805ed45](https://github.com/cozy/create-cozy-app/commit/805ed45))
* Update deps inside app template package.json ([b616b63](https://github.com/cozy/create-cozy-app/commit/b616b63))
* Use the newer [@babel](https://github.com/babel)/polyfill ([659644f](https://github.com/cozy/create-cozy-app/commit/659644f))





## [4.2.1](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.2.0...cozy-scripts@4.2.1) (2020-07-21)


### Bug Fixes

* Provide cozyclientjs in dev mode ([#1334](https://github.com/cozy/create-cozy-app/issues/1334)) ([9d6b6e5](https://github.com/cozy/create-cozy-app/commit/9d6b6e5))





# [4.2.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.1.0...cozy-scripts@4.2.0) (2020-07-21)


### Features

* Automatically provide the bar via ProvidePlugin if used through cozy.bar ([f30bef4](https://github.com/cozy/create-cozy-app/commit/f30bef4))





# [4.1.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@4.0.0...cozy-scripts@4.1.0) (2020-06-08)


### Bug Fixes

* Having sourcemap to true here broke cozy-ui ([3e5235a](https://github.com/cozy/create-cozy-app/commit/3e5235a))


### Features

* Add devtool flag to CLI ([1e2e41d](https://github.com/cozy/create-cozy-app/commit/1e2e41d))
* Add eslint-plugin-react-hooks as dependency ([010dcf1](https://github.com/cozy/create-cozy-app/commit/010dcf1))
* Use HashModuleIds only in production ([157e723](https://github.com/cozy/create-cozy-app/commit/157e723))





# [4.0.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@3.0.0...cozy-scripts@4.0.0) (2020-06-04)


### Bug Fixes

* No browser option passed to autoprefixer ([8c8ac64](https://github.com/cozy/create-cozy-app/commit/8c8ac64))


### BREAKING CHANGES

* Apps must declare a .browserslistrc

Put the content below in `.browserslistrc`:

```
["extends browserslist-config-cozy"]
```





# [3.0.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@1.15.0...cozy-scripts@3.0.0) (2020-04-07)


### Features

* Update dependencies ([1dbf5fa](https://github.com/cozy/create-cozy-app/commit/1dbf5fa))


### BREAKING CHANGES

* Jest is updated from v23 to v24





# [2.0.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@1.15.0...cozy-scripts@2.0.0) (2020-04-07)


### Features

* Update dependencies ([1dbf5fa](https://github.com/cozy/create-cozy-app/commit/1dbf5fa))


### BREAKING CHANGES

* Jest is updated from v23 to v24





# [1.15.0](https://github.com/cozy/create-cozy-app/compare/cozy-scripts@1.14.1...cozy-scripts@1.15.0) (2020-04-01)


### Features

* Move dependencies to cozy-scripts ([9b2aee5](https://github.com/cozy/create-cozy-app/commit/9b2aee5))





## [1.14.1](https://github.com/CPatchane/create-cozy-app/compare/cozy-scripts@1.14.0...cozy-scripts@1.14.1) (2020-03-31)


### Bug Fixes

* Include plugins folder in what is shipped to npm ([a9212e5](https://github.com/CPatchane/create-cozy-app/commit/a9212e5))





# [1.14.0](https://github.com/CPatchane/create-cozy-app/compare/cozy-scripts@1.13.2...cozy-scripts@1.14.0) (2020-03-31)


### Bug Fixes

* Consider full parts of path when including pictures ([3800cf3](https://github.com/CPatchane/create-cozy-app/commit/3800cf3))
* Do not override manifest content from locales ([1a1f1db](https://github.com/CPatchane/create-cozy-app/commit/1a1f1db))
* Remove vue ref ([272860b](https://github.com/CPatchane/create-cozy-app/commit/272860b))


### Features

* A stack is not started by default ([bc79e9d](https://github.com/CPatchane/create-cozy-app/commit/bc79e9d))
* Add config snap ([6f697d8](https://github.com/CPatchane/create-cozy-app/commit/6f697d8))
* Add VersionPlugin ([cc895a6](https://github.com/CPatchane/create-cozy-app/commit/cc895a6))
* Hot reload defaults to true ([11e8b5b](https://github.com/CPatchane/create-cozy-app/commit/11e8b5b))
* Remove deprecated standalone in favor of start ([491ddf7](https://github.com/CPatchane/create-cozy-app/commit/491ddf7))
* Remove preact specific configs ([7fb443e](https://github.com/CPatchane/create-cozy-app/commit/7fb443e))
* Remove vue option ([5a25d25](https://github.com/CPatchane/create-cozy-app/commit/5a25d25))


### Performance Improvements

* Speed up webpack dev ([e7f4b14](https://github.com/CPatchane/create-cozy-app/commit/e7f4b14))
* Use cheaper source maps for development ([e4e91bc](https://github.com/CPatchane/create-cozy-app/commit/e4e91bc))
