### Migrating from v0.10.6

- With the __Webpack 4__, if you use `cozy-scripts` without custom configurations you don't need to do anything. But if you do use `app.config.js` to provided custom configurations, you'll need to update these configurations to be compatible with Webpack 4 and update related webpack packages/plugins/loaders.
- Now the default webpack config uses __React__, if your application was using `preact` with `preact-compat` as before, you will have to use the `preact` bundle in an `app.config.js` file like following:
  ```javascript
  // app.config.js
  module.exports = [require('cozy-scripts/config/webpack.bundle.preact')]
  ```
- CCA now uses __Babel 7__ which introduces some breaking changes:
  - You may need to use `babel.config.js` instead of a `.babelrc` file to set your Babel configuration (see [comment](https://github.com/CPatchane/create-cozy-app/pull/739#issuecomment-424646428)).
  - If you only use `babel-preset-cozy-app` in your application, you just need to have the latest version of this package. But if you use other babel core/configs/plugins, you will need to upgrade these dependencies to be compatible with Babel 7.
- `cozy-scripts` now installs `babel-jest` and `vue-jest` for you, you can remove them from your application and still use them (see [comment](https://github.com/CPatchane/create-cozy-app/pull/739#issuecomment-424646717))
- The `cozy-scripts standalone` command is now named `cozy-scripts start` and does much more than its predecessor
- If you want to have the __Hot Module Replacement__ working with your React application, you may need to use `react-hot-loader` in your main App component as in the [template](https://github.com/CPatchane/create-cozy-app/blob/cozy-scripts%401.0.0/packages/cozy-scripts/template/app/src/components/App.jsx)


## cozy-scripts@1.1.2, create-cozy-app@1.0.2, cozy-scripts-vanilla@1.0.1 (2018-11-09)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#914](https://github.com/CPatchane/create-cozy-app/pull/914) Exposes React for the cozy-bar ([@CPatchane](https://github.com/CPatchane))
  * [#913](https://github.com/CPatchane/create-cozy-app/pull/913) Prefer Terser for optimization with Webpack ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#894](https://github.com/CPatchane/create-cozy-app/pull/894) fix(deps): update dependency cozy-bar to v6.7.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#915](https://github.com/CPatchane/create-cozy-app/pull/915) fix(deps): pin dependencies ([@renovate[bot]](https://github.com/apps/renovate))
  * [#910](https://github.com/CPatchane/create-cozy-app/pull/910) fix(deps): update dependency cozy-client-js to v0.14.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#900](https://github.com/CPatchane/create-cozy-app/pull/900), [#902](https://github.com/CPatchane/create-cozy-app/pull/902) Update dependency webpack to v4.25.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#907](https://github.com/CPatchane/create-cozy-app/pull/907) Update dependency @babel/core to v7.1.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#908](https://github.com/CPatchane/create-cozy-app/pull/908) Update dependency prettier to v1.15.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#909](https://github.com/CPatchane/create-cozy-app/pull/909) Update react monorepo to v16.6.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#912](https://github.com/CPatchane/create-cozy-app/pull/912) Update dependency enzyme-adapter-react-16 to v1.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#897](https://github.com/CPatchane/create-cozy-app/pull/897), [#901](https://github.com/CPatchane/create-cozy-app/pull/901), [#904](https://github.com/CPatchane/create-cozy-app/pull/904) Update dependency script-ext-html-webpack-plugin to v2.1.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#898](https://github.com/CPatchane/create-cozy-app/pull/898) Update dependency react-hot-loader to v4.3.12 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#896](https://github.com/CPatchane/create-cozy-app/pull/896) Update dependency copy-webpack-plugin to v4.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts-vanilla`, `cozy-scripts`, `create-cozy-app`
  * [#911](https://github.com/CPatchane/create-cozy-app/pull/911) Update dependency fs-extra to v7.0.1 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.1.1 (2018-10-30)

#### :wrench: Chore:
* `cozy-scripts`
  * [#893](https://github.com/CPatchane/create-cozy-app/pull/893) Use writeToDisk intead of webpack plugin ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#885](https://github.com/CPatchane/create-cozy-app/pull/885) fix(deps): update dependency autoprefixer to v9.3.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#889](https://github.com/CPatchane/create-cozy-app/pull/889) fix(deps): update dependency eslint to v5.8.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#891](https://github.com/CPatchane/create-cozy-app/pull/891) fix(deps): update dependency css-loader to v1.0.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#890](https://github.com/CPatchane/create-cozy-app/pull/890) fix(deps): update dependency svg-sprite-loader to v4.1.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#892](https://github.com/CPatchane/create-cozy-app/pull/892) fix(deps): update dependency script-ext-html-webpack-plugin to v2.0.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#886](https://github.com/CPatchane/create-cozy-app/pull/886) fix(deps): update dependency cozy-client to v3.6.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#887](https://github.com/CPatchane/create-cozy-app/pull/887) fix(deps): update react monorepo to v16.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#888](https://github.com/CPatchane/create-cozy-app/pull/888) fix(deps): update dependency webpack to v4.23.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#883](https://github.com/CPatchane/create-cozy-app/pull/883) fix(deps): update dependency webpack-dev-server to v3.1.10 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#879](https://github.com/CPatchane/create-cozy-app/pull/879) fix(deps): update dependency cozy-ui to v13.2.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#880](https://github.com/CPatchane/create-cozy-app/pull/880) fix(deps): update dependency webpack to v4.22.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#882](https://github.com/CPatchane/create-cozy-app/pull/882) fix(deps): update dependency copy-webpack-plugin to v4.5.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#878](https://github.com/CPatchane/create-cozy-app/pull/878) fix(deps): update dependency eslint-config-cozy-app to v1.1.4 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#881](https://github.com/CPatchane/create-cozy-app/pull/881) chore(deps): update dependency lerna-changelog to v0.8.2 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.1.0 (2018-10-17)

#### :sparkles: New Features:
* `cozy-scripts`
  * [#869](https://github.com/CPatchane/create-cozy-app/pull/869) feat: Add lint script ([@drazik](https://github.com/drazik))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#874](https://github.com/CPatchane/create-cozy-app/pull/874), [#866](https://github.com/CPatchane/create-cozy-app/pull/866), [#864](https://github.com/CPatchane/create-cozy-app/pull/864) fix(deps): update dependency cozy-client to v3.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#876](https://github.com/CPatchane/create-cozy-app/pull/876), [#865](https://github.com/CPatchane/create-cozy-app/pull/865) fix(deps): update dependency cozy-bar to v6.4.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#872](https://github.com/CPatchane/create-cozy-app/pull/872), [#867](https://github.com/CPatchane/create-cozy-app/pull/867), [#862](https://github.com/CPatchane/create-cozy-app/pull/862) fix(deps): update dependency cozy-ui to v13.1.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#877](https://github.com/CPatchane/create-cozy-app/pull/877) fix(deps): update dependency progress to v2.0.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#875](https://github.com/CPatchane/create-cozy-app/pull/875), [#871](https://github.com/CPatchane/create-cozy-app/pull/871) fix(deps): update dependency autoprefixer to v9.2.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#873](https://github.com/CPatchane/create-cozy-app/pull/873) fix(deps): update dependency webpack-bundle-analyzer to v3.0.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#845](https://github.com/CPatchane/create-cozy-app/pull/845) chore(deps): update dependency enzyme to v3.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#870](https://github.com/CPatchane/create-cozy-app/pull/870) fix(deps): update dependency vue-jest to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#868](https://github.com/CPatchane/create-cozy-app/pull/868) chore(deps): update dependency eslint to v5.7.0 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Cyrille Perois ([@drazik](https://github.com/drazik))


## cozy-scripts@1.0.2, create-cozy-app@1.0.1 (2018-10-10)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#857](https://github.com/CPatchane/create-cozy-app/pull/857) Add `USE_REACT` env variable for cozy-ui ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#853](https://github.com/CPatchane/create-cozy-app/pull/853) Always write files on dev mode ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* Other
  * [#860](https://github.com/CPatchane/create-cozy-app/pull/860) chore(deps): update dependency lerna-changelog to v0.8.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#854](https://github.com/CPatchane/create-cozy-app/pull/854), [#842](https://github.com/CPatchane/create-cozy-app/pull/842) chore(deps): update dependency lerna to v3.4.3 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts`
  * [#852](https://github.com/CPatchane/create-cozy-app/pull/852), [#846](https://github.com/CPatchane/create-cozy-app/pull/846) fix(deps): update dependency cozy-client to v2.24.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#859](https://github.com/CPatchane/create-cozy-app/pull/859) fix(deps): update dependency mini-css-extract-plugin to v0.4.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#851](https://github.com/CPatchane/create-cozy-app/pull/851) fix(deps): update dependency cozy-bar to v6.3.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#856](https://github.com/CPatchane/create-cozy-app/pull/856), [#850](https://github.com/CPatchane/create-cozy-app/pull/850), [#843](https://github.com/CPatchane/create-cozy-app/pull/843) fix(deps): update dependency cozy-ui to v12.1.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#858](https://github.com/CPatchane/create-cozy-app/pull/858) fix(deps): update dependency html-webpack-include-assets-plugin to v1.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#855](https://github.com/CPatchane/create-cozy-app/pull/855) fix(deps): update dependency copy-webpack-plugin to v4.5.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#847](https://github.com/CPatchane/create-cozy-app/pull/847) fix(deps): update dependency style-loader to v0.23.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#844](https://github.com/CPatchane/create-cozy-app/pull/844) chore(deps): update dependency enzyme-adapter-react-16 to v1.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts`, `create-cozy-app`
  * [#848](https://github.com/CPatchane/create-cozy-app/pull/848) fix(deps): update dependency commander to v2.19.0 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.0.1 (2018-10-04)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#841](https://github.com/CPatchane/create-cozy-app/pull/841) Add missing postcss-discard-empty dependency ([@CPatchane](https://github.com/CPatchane))
  * [#840](https://github.com/CPatchane/create-cozy-app/pull/840) Fix: Exiting the script stops docker correctly ([@briced](https://github.com/briced))

#### Committers: 2
- Brice ([@briced](https://github.com/briced))
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))

## create-cozy-app@1.0.0, cozy-scripts@1.0.0, cozy-scripts-vanilla@1.0.0 (2018-10-03)

#### :boom: Breaking Changes:
* `cozy-scripts`
  * [#823](https://github.com/CPatchane/create-cozy-app/pull/823) Brand new `start` command replacing `standalone` command ([@CPatchane](https://github.com/CPatchane))
  * [#739](https://github.com/CPatchane/create-cozy-app/pull/739) Update babel packages to v8 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#792](https://github.com/CPatchane/create-cozy-app/pull/792) Use now react by default instead of preact ([@CPatchane](https://github.com/CPatchane))
  * [#758](https://github.com/CPatchane/create-cozy-app/pull/758) Upgrade to webpack 4 ([@CPatchane](https://github.com/CPatchane))

#### :sparkles: New Features:
* `cozy-scripts`, `create-cozy-app`
* `cozy-scripts`
  * [#794](https://github.com/CPatchane/create-cozy-app/pull/794) Add real HMR using `react-hot-loader` ([@CPatchane](https://github.com/CPatchane))
  * [#753](https://github.com/CPatchane/create-cozy-app/pull/753) Add new cozy-scripts `release` CLI ([@CPatchane](https://github.com/CPatchane))

#### :nail_care: Enhancements:
* `cozy-scripts`, `create-cozy-app`
  * [#837](https://github.com/CPatchane/create-cozy-app/pull/837) Global improvements/fixes ([@CPatchane](https://github.com/CPatchane))
* `cozy-scripts`
  * [#830](https://github.com/CPatchane/create-cozy-app/pull/830) Resolve src before node_modules ([@CPatchane](https://github.com/CPatchane))
  * [#829](https://github.com/CPatchane/create-cozy-app/pull/829) Enhance `start` command + remove `standalone` retro-compat ([@CPatchane](https://github.com/CPatchane))
  * [#828](https://github.com/CPatchane/create-cozy-app/pull/828) Better hash use and split chunks for better build performances ([@CPatchane](https://github.com/CPatchane))
  * [#802](https://github.com/CPatchane/create-cozy-app/pull/802) Add --fix on cozy-scripts ([@kosssi](https://github.com/kosssi))
  * [#790](https://github.com/CPatchane/create-cozy-app/pull/790) Development config improvements ([@CPatchane](https://github.com/CPatchane))
* `cozy-scripts-vanilla`, `cozy-scripts`
  * [#826](https://github.com/CPatchane/create-cozy-app/pull/826) Update html files for new stack variables ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#835](https://github.com/CPatchane/create-cozy-app/pull/835) Fix broken cozy-client in react app ([@CPatchane](https://github.com/CPatchane))
  * [#822](https://github.com/CPatchane/create-cozy-app/pull/822) Make debug option set debug env variable ([@CPatchane](https://github.com/CPatchane))
  * [#771](https://github.com/CPatchane/create-cozy-app/pull/771) Fix cozy-bar CSS in dev environment ([@gregorylegarec](https://github.com/gregorylegarec))

#### :wrench: Chore:
* `cozy-scripts-vanilla`, `cozy-scripts`, `create-cozy-app`
  * [#827](https://github.com/CPatchane/create-cozy-app/pull/827) Add eslint (cozy-app) and run it everywhere ([@CPatchane](https://github.com/CPatchane))

#### :memo: Documentations:
* `create-cozy-app`
  * [#838](https://github.com/CPatchane/create-cozy-app/pull/838) Minor doc changes ([@CPatchane](https://github.com/CPatchane))
* `cozy-scripts`
  * [#831](https://github.com/CPatchane/create-cozy-app/pull/831) Clean and enhance documentation ([@CPatchane](https://github.com/CPatchane))
  * [#812](https://github.com/CPatchane/create-cozy-app/pull/812) [WIP] Add documentation about HMR ([@CPatchane](https://github.com/CPatchane))
* `cozy-scripts-vanilla`, `cozy-scripts`
  * [#825](https://github.com/CPatchane/create-cozy-app/pull/825) Minor documentation improvements ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#839](https://github.com/CPatchane/create-cozy-app/pull/839), [#833](https://github.com/CPatchane/create-cozy-app/pull/833), [#793](https://github.com/CPatchane/create-cozy-app/pull/793), [#783](https://github.com/CPatchane/create-cozy-app/pull/783), [#729](https://github.com/CPatchane/create-cozy-app/pull/729) fix(deps): update dependency cozy-client to v2.23.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#836](https://github.com/CPatchane/create-cozy-app/pull/836), [#811](https://github.com/CPatchane/create-cozy-app/pull/811), [#806](https://github.com/CPatchane/create-cozy-app/pull/806) fix(deps): update dependency postcss to v7.0.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#834](https://github.com/CPatchane/create-cozy-app/pull/834), [#787](https://github.com/CPatchane/create-cozy-app/pull/787), [#784](https://github.com/CPatchane/create-cozy-app/pull/784) chore(deps): update dependency babel-preset-cozy-app to v1.2.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#832](https://github.com/CPatchane/create-cozy-app/pull/832) chore(deps): update dependency eslint-plugin-prettier to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#824](https://github.com/CPatchane/create-cozy-app/pull/824), [#821](https://github.com/CPatchane/create-cozy-app/pull/821) fix(deps): update dependency @babel/core to v7.1.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#820](https://github.com/CPatchane/create-cozy-app/pull/820), [#746](https://github.com/CPatchane/create-cozy-app/pull/746) chore(deps): update dependency eslint to v5.6.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#819](https://github.com/CPatchane/create-cozy-app/pull/819), [#778](https://github.com/CPatchane/create-cozy-app/pull/778) fix(deps): update dependency svg-sprite-loader to v4.1.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#818](https://github.com/CPatchane/create-cozy-app/pull/818), [#795](https://github.com/CPatchane/create-cozy-app/pull/795), [#779](https://github.com/CPatchane/create-cozy-app/pull/779), [#770](https://github.com/CPatchane/create-cozy-app/pull/770) fix(deps): update dependency cozy-bar to v6.3.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#817](https://github.com/CPatchane/create-cozy-app/pull/817), [#807](https://github.com/CPatchane/create-cozy-app/pull/807), [#800](https://github.com/CPatchane/create-cozy-app/pull/800), [#786](https://github.com/CPatchane/create-cozy-app/pull/786), [#772](https://github.com/CPatchane/create-cozy-app/pull/772), [#760](https://github.com/CPatchane/create-cozy-app/pull/760) fix(deps): update dependency cozy-ui to v11.3.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#816](https://github.com/CPatchane/create-cozy-app/pull/816) fix(deps): update dependency write-file-webpack-plugin to v4.4.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#815](https://github.com/CPatchane/create-cozy-app/pull/815), [#814](https://github.com/CPatchane/create-cozy-app/pull/814), [#739](https://github.com/CPatchane/create-cozy-app/pull/739) fix(deps): update dependency babel-loader to v8.0.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#813](https://github.com/CPatchane/create-cozy-app/pull/813), [#805](https://github.com/CPatchane/create-cozy-app/pull/805), [#738](https://github.com/CPatchane/create-cozy-app/pull/738) fix(deps): update dependency babel-eslint to v10.0.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#808](https://github.com/CPatchane/create-cozy-app/pull/808) chore(deps): update dependency eslint-plugin-prettier to v2.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#803](https://github.com/CPatchane/create-cozy-app/pull/803), [#799](https://github.com/CPatchane/create-cozy-app/pull/799), [#768](https://github.com/CPatchane/create-cozy-app/pull/768) fix(deps): update dependency webpack to v4.20.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#804](https://github.com/CPatchane/create-cozy-app/pull/804), [#797](https://github.com/CPatchane/create-cozy-app/pull/797) fix(deps): update dependency postcss-discard-duplicates to v4.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#796](https://github.com/CPatchane/create-cozy-app/pull/796) fix(deps): update dependency webpack-dev-server to v3.1.9 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#798](https://github.com/CPatchane/create-cozy-app/pull/798), [#769](https://github.com/CPatchane/create-cozy-app/pull/769) chore(deps): update dependency postcss-discard-empty to v4.0.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#788](https://github.com/CPatchane/create-cozy-app/pull/788), [#785](https://github.com/CPatchane/create-cozy-app/pull/785) fix(deps): update dependency eslint-config-cozy-app to v1.1.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#780](https://github.com/CPatchane/create-cozy-app/pull/780) chore(deps): update dependency prettier to v1.14.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#712](https://github.com/CPatchane/create-cozy-app/pull/712) chore(deps): update dependency enzyme to v3.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#711](https://github.com/CPatchane/create-cozy-app/pull/711) chore(deps): update dependency enzyme-adapter-react-16 to v1.5.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#781](https://github.com/CPatchane/create-cozy-app/pull/781) fix(deps): update dependency cozy-client-js to v0.13.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#782](https://github.com/CPatchane/create-cozy-app/pull/782) fix(deps): update dependency eslint-loader to v2.1.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#777](https://github.com/CPatchane/create-cozy-app/pull/777) fix(deps): update dependency html-webpack-include-assets-plugin to v1.0.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#761](https://github.com/CPatchane/create-cozy-app/pull/761) fix(deps): update jest monorepo to v23.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#766](https://github.com/CPatchane/create-cozy-app/pull/766) chore(deps): update react monorepo to v16.5.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#775](https://github.com/CPatchane/create-cozy-app/pull/775) fix(deps): update dependency mini-css-extract-plugin to v0.4.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#762](https://github.com/CPatchane/create-cozy-app/pull/762) fix(deps): update dependency webpack-bundle-analyzer to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#767](https://github.com/CPatchane/create-cozy-app/pull/767) fix(deps): update dependency svgo to v1.1.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#763](https://github.com/CPatchane/create-cozy-app/pull/763) chore(deps): update dependency vue-loader to v15.4.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#759](https://github.com/CPatchane/create-cozy-app/pull/759) chore(deps): update dependency @vue/test-utils to v1.0.0-beta.25 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#758](https://github.com/CPatchane/create-cozy-app/pull/758) Upgrade to webpack 4 ([@CPatchane](https://github.com/CPatchane))
* Other
  * [#764](https://github.com/CPatchane/create-cozy-app/pull/764) chore(deps): update dependency lerna to v3.4.0 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 3
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- Grégory Le Garec ([@gregorylegarec](https://github.com/gregorylegarec))
- kosssi ([@kosssi](https://github.com/kosssi))
