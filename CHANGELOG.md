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


## cozy-scripts@1.13.1, cozy-scripts-vanilla@1.1.1 (2019-05-31)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1145](https://github.com/CPatchane/create-cozy-app/pull/1145) feat: Don't use the slow stylus resolver ([@nono](https://github.com/nono))
  * [#1142](https://github.com/CPatchane/create-cozy-app/pull/1142) feat: Make SVGO optimize a bit more the SVGs ([@nono](https://github.com/nono))
  * [#1135](https://github.com/CPatchane/create-cozy-app/pull/1135) feat: Make the minification faster ([@nono](https://github.com/nono))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1222](https://github.com/CPatchane/create-cozy-app/pull/1222) fix: Support window in HMR env ([@Crash--](https://github.com/Crash--))
* `cozy-scripts-vanilla`, `cozy-scripts`
  * [#1122](https://github.com/CPatchane/create-cozy-app/pull/1122) Avoid the glitch while loading the app ([@nono](https://github.com/nono))

#### Committers: 2
- Bruno Michel ([@nono](https://github.com/nono))
- Quentin Valmori ([@Crash--](https://github.com/Crash--))


## cozy-scripts@1.13.0 (2019-02-08)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1091](https://github.com/CPatchane/create-cozy-app/pull/1091) Improve app travis config ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1094](https://github.com/CPatchane/create-cozy-app/pull/1094) Wrong test for some React components ([@CPatchane](https://github.com/CPatchane))
  * [#1092](https://github.com/CPatchane/create-cozy-app/pull/1092) Remove hash usage for dev-server + provide contentBase option ([@CPatchane](https://github.com/CPatchane))

#### :memo: Documentations:
* `cozy-scripts`
  * [#1078](https://github.com/CPatchane/create-cozy-app/pull/1078) docs: Document COZY_FLAGS ([@Crash--](https://github.com/Crash--))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1087](https://github.com/CPatchane/create-cozy-app/pull/1087) fix(deps): update dependency cozy-client to v6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1075](https://github.com/CPatchane/create-cozy-app/pull/1075) chore(deps): update dependency enzyme-adapter-react-16 to v1.9.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1084](https://github.com/CPatchane/create-cozy-app/pull/1084), [#1095](https://github.com/CPatchane/create-cozy-app/pull/1095) fix(deps): update vue monorepo to v2.6.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1093](https://github.com/CPatchane/create-cozy-app/pull/1093) fix(deps): update dependency vue-jest to v3.0.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1077](https://github.com/CPatchane/create-cozy-app/pull/1077), [#1083](https://github.com/CPatchane/create-cozy-app/pull/1083),  [#1090](https://github.com/CPatchane/create-cozy-app/pull/1090) fix(deps): update dependency cozy-bar to v6.12.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1088](https://github.com/CPatchane/create-cozy-app/pull/1088) fix(deps): update react monorepo to v16.8.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1086](https://github.com/CPatchane/create-cozy-app/pull/1086) fix(deps): update dependency eslint-loader to v2.1.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1085](https://github.com/CPatchane/create-cozy-app/pull/1085) fix(deps): update dependency webpack to v4.29.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1082](https://github.com/CPatchane/create-cozy-app/pull/1082) chore(deps): update dependency @vue/test-utils to v1.0.0-beta.29 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1074](https://github.com/CPatchane/create-cozy-app/pull/1074) chore(deps): update dependency vue-loader to v15.6.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1079](https://github.com/CPatchane/create-cozy-app/pull/1079) fix(deps): update dependency autoprefixer to v9.4.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1080](https://github.com/CPatchane/create-cozy-app/pull/1080) chore(deps): update dependency react-hot-loader to v4.6.5 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1081](https://github.com/CPatchane/create-cozy-app/pull/1081), [#1089](https://github.com/CPatchane/create-cozy-app/pull/1089) chore(deps): update dependency lerna to v3.11.0 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- Quentin Valmori ([@Crash--](https://github.com/Crash--))


## cozy-scripts@1.12.2 (2019-01-23)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1073](https://github.com/CPatchane/create-cozy-app/pull/1073) Don't use absolute outputPath for file-loader ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* Other
  * [#1071](https://github.com/CPatchane/create-cozy-app/pull/1071) chore(deps): update dependency lerna to v3.10.7 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts`
  * [#1068](https://github.com/CPatchane/create-cozy-app/pull/1068) fix(deps): update dependency postcss to v7.0.14 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.12.1 (2019-01-21)

__Fix wrong previous version release 1.12.0__. v1.12.0 changes:

#### :sparkles: New Features:
* `cozy-scripts`
  * [#1058](https://github.com/CPatchane/create-cozy-app/pull/1058) Add cli more options (--port, --host and --config) ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1067](https://github.com/CPatchane/create-cozy-app/pull/1067) Fix progress bar width overflow ([@CPatchane](https://github.com/CPatchane))
  * [#1065](https://github.com/CPatchane/create-cozy-app/pull/1065) Make lint script failed correctly + fix vue app linting issues ([@CPatchane](https://github.com/CPatchane))
  * [#1061](https://github.com/CPatchane/create-cozy-app/pull/1061) Better handling img path for mobile and browser ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1066](https://github.com/CPatchane/create-cozy-app/pull/1066) fix(deps): update dependency autoprefixer to v9.4.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1064](https://github.com/CPatchane/create-cozy-app/pull/1064) fix(deps): update dependency eslint-config-cozy-app to v1.1.8 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1063](https://github.com/CPatchane/create-cozy-app/pull/1063) fix(deps): update dependency webpack to v4.29.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1062](https://github.com/CPatchane/create-cozy-app/pull/1062) fix(deps): update dependency html-webpack-include-assets-plugin to v1.0.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1057](https://github.com/CPatchane/create-cozy-app/pull/1057) fix(deps): update dependency vuex to v3.1.0 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1059](https://github.com/CPatchane/create-cozy-app/pull/1059) chore(deps): update dependency lerna to v3.10.6 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.12.0 (2019-01-21): __Use 1.12.1 instead__

#### :sparkles: New Features:
* `cozy-scripts`
  * [#1058](https://github.com/CPatchane/create-cozy-app/pull/1058) Add cli more options (--port, --host and --config) ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1067](https://github.com/CPatchane/create-cozy-app/pull/1067) Fix progress bar width overflow ([@CPatchane](https://github.com/CPatchane))
  * [#1065](https://github.com/CPatchane/create-cozy-app/pull/1065) Make lint script failed correctly + fix vue app linting issues ([@CPatchane](https://github.com/CPatchane))
  * [#1061](https://github.com/CPatchane/create-cozy-app/pull/1061) Better handling img path for mobile and browser ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1066](https://github.com/CPatchane/create-cozy-app/pull/1066) fix(deps): update dependency autoprefixer to v9.4.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1064](https://github.com/CPatchane/create-cozy-app/pull/1064) fix(deps): update dependency eslint-config-cozy-app to v1.1.8 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1063](https://github.com/CPatchane/create-cozy-app/pull/1063) fix(deps): update dependency webpack to v4.29.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1062](https://github.com/CPatchane/create-cozy-app/pull/1062) fix(deps): update dependency html-webpack-include-assets-plugin to v1.0.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1057](https://github.com/CPatchane/create-cozy-app/pull/1057) fix(deps): update dependency vuex to v3.1.0 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1059](https://github.com/CPatchane/create-cozy-app/pull/1059) chore(deps): update dependency lerna to v3.10.6 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.11.0 (2019-01-17)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1056](https://github.com/CPatchane/create-cozy-app/pull/1056) fix(public/intent): React / Preact config ([@Crash--](https://github.com/Crash--))
  * [#1054](https://github.com/CPatchane/create-cozy-app/pull/1054) fix: Downgrade webpack-dev-server to avoid host checking bug ([@cedricmessiant](https://github.com/cedricmessiant))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1055](https://github.com/CPatchane/create-cozy-app/pull/1055) chore(deps): update dependency eslint-plugin-react to v7.12.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1053](https://github.com/CPatchane/create-cozy-app/pull/1053) fix(deps): update dependency postcss to v7.0.13 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cédric Messiant ([@cedricmessiant](https://github.com/cedricmessiant))
- Quentin Valmori ([@Crash--](https://github.com/Crash--))


## cozy-scripts@1.10.0 (2019-01-14)

#### :sparkles: New Features:
* `cozy-scripts`
  * [#1028](https://github.com/CPatchane/create-cozy-app/pull/1028) feat(cozy-scripts): Handle flags at build time ([@drazik](https://github.com/drazik))

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1052](https://github.com/CPatchane/create-cozy-app/pull/1052) Handle services by default + build public/intents only for browser target ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1048](https://github.com/CPatchane/create-cozy-app/pull/1048) fix(deps): update dependency postcss to v7.0.11 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1050](https://github.com/CPatchane/create-cozy-app/pull/1050) fix(deps): update vue monorepo to v2.5.22 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1051](https://github.com/CPatchane/create-cozy-app/pull/1051) fix(deps): update dependency autoprefixer to v9.4.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1046](https://github.com/CPatchane/create-cozy-app/pull/1046) fix(deps): update dependency webpack to v4.28.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#968](https://github.com/CPatchane/create-cozy-app/pull/968) fix(deps): update dependency css-loader to v2 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1047](https://github.com/CPatchane/create-cozy-app/pull/1047) chore(deps): update dependency lerna to v3.10.5 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cyrille Perois ([@drazik](https://github.com/drazik))
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.9.0 (2019-01-10)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1042](https://github.com/CPatchane/create-cozy-app/pull/1042) Handling public assets ([@CPatchane](https://github.com/CPatchane))
  * [#1039](https://github.com/CPatchane/create-cozy-app/pull/1039) Remove externals property for services build ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1006](https://github.com/CPatchane/create-cozy-app/pull/1006) fix(deps): update dependency file-loader to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1040](https://github.com/CPatchane/create-cozy-app/pull/1040) fix(deps): update dependency postcss to v7.0.8 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1044](https://github.com/CPatchane/create-cozy-app/pull/1044) fix(deps): update dependency cozy-bar to v6.10.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1038](https://github.com/CPatchane/create-cozy-app/pull/1038) chore(deps): update dependency vue-loader to v15.5.1 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1037](https://github.com/CPatchane/create-cozy-app/pull/1037), [#1043](https://github.com/CPatchane/create-cozy-app/pull/1043) chore(deps): update dependency lerna to v3.10.2 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.8.0, create-cozy-app@1.1.0, cozy-scripts-vanilla@1.1.0 (2019-01-07)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1035](https://github.com/CPatchane/create-cozy-app/pull/1035) feat(cozy-scripts): Show regexp when using --show-config flag ([@drazik](https://github.com/drazik))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1036](https://github.com/CPatchane/create-cozy-app/pull/1036) Don't use hash for services files name ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1032](https://github.com/CPatchane/create-cozy-app/pull/1032) Update dependency webpack-merge to v4.2.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1031](https://github.com/CPatchane/create-cozy-app/pull/1031) chore(deps): update dependency vue-loader to v15.5.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1026](https://github.com/CPatchane/create-cozy-app/pull/1026) fix(deps): update dependency autoprefixer to v9.4.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1029](https://github.com/CPatchane/create-cozy-app/pull/1029) fix(deps): update dependency babel-loader to v8.0.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1030](https://github.com/CPatchane/create-cozy-app/pull/1030) fix(deps): update dependency cozy-bar to v6.9.8 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1027](https://github.com/CPatchane/create-cozy-app/pull/1027) fix(deps): update dependency eslint-config-cozy-app to v1.1.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1022](https://github.com/CPatchane/create-cozy-app/pull/1022), [#1024](https://github.com/CPatchane/create-cozy-app/pull/1024) chore(deps): update dependency eslint-plugin-react to v7.12.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1033](https://github.com/CPatchane/create-cozy-app/pull/1033) fix(deps): update dependency webpack-dev-server to v3.1.14 [security] ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1018](https://github.com/CPatchane/create-cozy-app/pull/1018) chore(deps): update dependency babel-preset-cozy-app to v1.2.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1019](https://github.com/CPatchane/create-cozy-app/pull/1019) chore(deps): update dependency @vue/test-utils to v1.0.0-beta.28 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1020](https://github.com/CPatchane/create-cozy-app/pull/1020) fix(deps): update dependency webpack to v4.28.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1023](https://github.com/CPatchane/create-cozy-app/pull/1023) chore(deps): update dependency eslint-plugin-vue to v5.1.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts-vanilla`, `cozy-scripts`, `create-cozy-app`
  * [#1034](https://github.com/CPatchane/create-cozy-app/pull/1034) fix(deps): update dependency chalk to v2.4.2 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1021](https://github.com/CPatchane/create-cozy-app/pull/1021), [#1025](https://github.com/CPatchane/create-cozy-app/pull/1025) chore(deps): update dependency lerna to v3.8.5 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cyrille Perois ([@drazik](https://github.com/drazik))
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))


## cozy-scripts@1.7.0 (2018-12-28)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1015](https://github.com/CPatchane/create-cozy-app/pull/1015) Better handling public assets ([@CPatchane](https://github.com/CPatchane))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1013](https://github.com/CPatchane/create-cozy-app/pull/1013) Build intents and public chunks in specific folders ([@CPatchane](https://github.com/CPatchane))
  * [#1014](https://github.com/CPatchane/create-cozy-app/pull/1014) Downgrade to DevServer 3.1.10 to avoid host checking bug ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1016](https://github.com/CPatchane/create-cozy-app/pull/1016) chore(deps): update dependency eslint-plugin-react to v7.12.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1017](https://github.com/CPatchane/create-cozy-app/pull/1017) chore(deps): update dependency eslint-plugin-prettier to v3.0.1 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.6.0 (2018-12-26)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#1011](https://github.com/CPatchane/create-cozy-app/pull/1011) fix: Use environment var instead of production ([@Crash--](https://github.com/Crash--))
  * [#1000](https://github.com/CPatchane/create-cozy-app/pull/1000) fix: Use relativepath for mobile ([@Crash--](https://github.com/Crash--))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1012](https://github.com/CPatchane/create-cozy-app/pull/1012) chore(deps): update dependency babel-preset-cozy-app to v1.2.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1007](https://github.com/CPatchane/create-cozy-app/pull/1007) fix(deps): update dependency webpack to v4.28.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#999](https://github.com/CPatchane/create-cozy-app/pull/999) chore(deps): update dependency react-hot-loader to v4.6.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1009](https://github.com/CPatchane/create-cozy-app/pull/1009) fix(deps): update dependency webpack-dev-server to v3.1.14 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#998](https://github.com/CPatchane/create-cozy-app/pull/998) chore(deps): update dependency babel-preset-cozy-app to v1.2.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1001](https://github.com/CPatchane/create-cozy-app/pull/1001) fix(deps): update dependency cozy-bar to v6.9.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1002](https://github.com/CPatchane/create-cozy-app/pull/1002) fix(deps): update dependency webpack to v4.28.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1005](https://github.com/CPatchane/create-cozy-app/pull/1005) fix(deps): update react monorepo to v16.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#996](https://github.com/CPatchane/create-cozy-app/pull/996) fix(deps): update dependency autoprefixer to v9.4.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#997](https://github.com/CPatchane/create-cozy-app/pull/997) fix(deps): update dependency postcss to v7.0.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#995](https://github.com/CPatchane/create-cozy-app/pull/995) fix(deps): update dependency @babel/core to v7.2.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#993](https://github.com/CPatchane/create-cozy-app/pull/993) chore(deps): update dependency react-hot-loader to v4.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1008](https://github.com/CPatchane/create-cozy-app/pull/1008) chore(deps): update dependency lerna to v3.8.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1004](https://github.com/CPatchane/create-cozy-app/pull/1004) chore(deps): update dependency lerna to v3.7.1 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Quentin Valmori ([@Crash--](https://github.com/Crash--))


## cozy-scripts@1.5.0 (2018-12-12)

#### :boom: Breaking Changes:
* `cozy-scripts`
  * [#991](https://github.com/CPatchane/create-cozy-app/pull/991) feat: BREAKING CHANGE don't auto-inject mobile chunks (mobile target only) ([@y-lohse](https://github.com/y-lohse))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#990](https://github.com/CPatchane/create-cozy-app/pull/990) fix: Expose react/preact on mobile ([@y-lohse](https://github.com/y-lohse))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#989](https://github.com/CPatchane/create-cozy-app/pull/989) fix(deps): update dependency vue-jest to v3.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#988](https://github.com/CPatchane/create-cozy-app/pull/988) fix(deps): update dependency cozy-bar to v6.9.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#966](https://github.com/CPatchane/create-cozy-app/pull/966), [#986](https://github.com/CPatchane/create-cozy-app/pull/986) fix(deps): update dependency cozy-ui to v17.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#985](https://github.com/CPatchane/create-cozy-app/pull/985), [#987](https://github.com/CPatchane/create-cozy-app/pull/987) fix(deps): update vue monorepo to v2.5.21 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 1
- Yannick Lohse ([@y-lohse](https://github.com/y-lohse))


## cozy-scripts@1.4.0 (2018-12-11)

#### :sparkles: New Features:
* `cozy-scripts`
  * [#984](https://github.com/CPatchane/create-cozy-app/pull/984) Handling application public page if exists ([@CPatchane](https://github.com/CPatchane))

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#981](https://github.com/CPatchane/create-cozy-app/pull/981) feat: Added loader for font files ([@y-lohse](https://github.com/y-lohse))
  * [#982](https://github.com/CPatchane/create-cozy-app/pull/982) Use only one vendors chunk ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#957](https://github.com/CPatchane/create-cozy-app/pull/957) fix(deps): update dependency cozy-bar to v6.9.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#976](https://github.com/CPatchane/create-cozy-app/pull/976) chore(deps): update dependency enzyme to v3.8.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#974](https://github.com/CPatchane/create-cozy-app/pull/974) fix(deps): update dependency webpack-merge to v4.1.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#979](https://github.com/CPatchane/create-cozy-app/pull/979) fix(deps): update dependency date-fns to v1.30.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#967](https://github.com/CPatchane/create-cozy-app/pull/967) fix(deps): update dependency mini-css-extract-plugin to v0.5.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#973](https://github.com/CPatchane/create-cozy-app/pull/973) chore(deps): update dependency @vue/test-utils to v1.0.0-beta.27 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#975](https://github.com/CPatchane/create-cozy-app/pull/975) chore(deps): update dependency enzyme-adapter-react-16 to v1.7.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#978](https://github.com/CPatchane/create-cozy-app/pull/978) fix(deps): update dependency eslint-config-cozy-app to v1.1.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#977](https://github.com/CPatchane/create-cozy-app/pull/977) chore(deps): update dependency babel-preset-cozy-app to v1.2.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#959](https://github.com/CPatchane/create-cozy-app/pull/959) fix(deps): update dependency @babel/core to v7.2.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#963](https://github.com/CPatchane/create-cozy-app/pull/963) fix(deps): update dependency cozy-ui to v17.4.9 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#964](https://github.com/CPatchane/create-cozy-app/pull/964) fix(deps): update dependency progress to v2.0.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#962](https://github.com/CPatchane/create-cozy-app/pull/962), [#965](https://github.com/CPatchane/create-cozy-app/pull/965) fix(deps): update dependency webpack to v4.27.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#961](https://github.com/CPatchane/create-cozy-app/pull/961) fix(deps): update dependency autoprefixer to v9.4.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#958](https://github.com/CPatchane/create-cozy-app/pull/958) chore(deps): update dependency eslint-plugin-vue to v5 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#971](https://github.com/CPatchane/create-cozy-app/pull/971) chore(deps): update dependency lerna to v3.6.0 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- Yannick Lohse ([@y-lohse](https://github.com/y-lohse))


## cozy-scripts@1.3.0 (2018-12-03)

#### :sparkles: New Features:
* `cozy-scripts`
  * [#952](https://github.com/CPatchane/create-cozy-app/pull/952) Use paths as functions + handle more CLI path options ([@CPatchane](https://github.com/CPatchane))

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#950](https://github.com/CPatchane/create-cozy-app/pull/950) Add `cs` CLI alias and CLI tests + improve CLI ([@CPatchane](https://github.com/CPatchane))
  * [#938](https://github.com/CPatchane/create-cozy-app/pull/938)  Use the correct folder name in finish logs ([@CPatchane](https://github.com/CPatchane))
  * [#949](https://github.com/CPatchane/create-cozy-app/pull/949) Add more expected filenames for init error handling ([@CPatchane](https://github.com/CPatchane))

#### :wrench: Chore:
* `cozy-scripts`
  * [#954](https://github.com/CPatchane/create-cozy-app/pull/954) Better environment variables handling code and paths testing ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#944](https://github.com/CPatchane/create-cozy-app/pull/944), [#945](https://github.com/CPatchane/create-cozy-app/pull/945), [#955](https://github.com/CPatchane/create-cozy-app/pull/955) fix(deps): update dependency cozy-ui to v17.4.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#956](https://github.com/CPatchane/create-cozy-app/pull/956) fix(deps): update dependency progress to v2.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#953](https://github.com/CPatchane/create-cozy-app/pull/953) fix(deps): update dependency autoprefixer to v9.4.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#951](https://github.com/CPatchane/create-cozy-app/pull/951) chore(deps): pin dependency strip-ansi to 5.0.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#940](https://github.com/CPatchane/create-cozy-app/pull/940) chore(deps): update dependency @vue/test-utils to v1.0.0-beta.26 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#946](https://github.com/CPatchane/create-cozy-app/pull/946) fix(deps): update dependency cozy-bar to v6.8.7 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#937](https://github.com/CPatchane/create-cozy-app/pull/937) fix(deps): update dependency vue-jest to v3.0.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#948](https://github.com/CPatchane/create-cozy-app/pull/948) chore(deps): update dependency prettier to v1.15.3 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#947](https://github.com/CPatchane/create-cozy-app/pull/947) chore(deps): update dependency lerna to v3.5.1 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.2.1 (2018-11-28)

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#942](https://github.com/CPatchane/create-cozy-app/pull/942) Don't automatically pass config to jest ([@CPatchane](https://github.com/CPatchane))
  * [#935](https://github.com/CPatchane/create-cozy-app/pull/935) Send cookies when fetching manifest.json ([@CPatchane](https://github.com/CPatchane))

#### :memo: Documentations:
* `cozy-scripts`
  * [#934](https://github.com/CPatchane/create-cozy-app/pull/934) Typos in contributing doc ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#939](https://github.com/CPatchane/create-cozy-app/pull/939) fix(deps): update dependency cozy-bar to v6.8.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#941](https://github.com/CPatchane/create-cozy-app/pull/941) fix(deps): update dependency cozy-ui to v17.2.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#936](https://github.com/CPatchane/create-cozy-app/pull/936) fix(deps): update dependency webpack to v4.26.1 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#943](https://github.com/CPatchane/create-cozy-app/pull/943) chore(deps): update dependency lerna to v3.5.0 ([@renovate[bot]](https://github.com/apps/renovate))


## cozy-scripts@1.2.0 (2018-11-24)

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#933](https://github.com/CPatchane/create-cozy-app/pull/933) Use app slug int output filename ([@CPatchane](https://github.com/CPatchane))
  * [#924](https://github.com/CPatchane/create-cozy-app/pull/924) Better assets include for dev (bar,client-js) ([@CPatchane](https://github.com/CPatchane))
  * [#923](https://github.com/CPatchane/create-cozy-app/pull/923) feat: Remove lint command on test ([@kosssi](https://github.com/kosssi))
  * [#921](https://github.com/CPatchane/create-cozy-app/pull/921) chore: Use renovate cozy config ([@kosssi](https://github.com/kosssi))

#### :bug: Bug Fixes:
* `cozy-scripts`
  * [#932](https://github.com/CPatchane/create-cozy-app/pull/932) Split React and Preact exposer into two exposers ([@CPatchane](https://github.com/CPatchane))
  * [#931](https://github.com/CPatchane/create-cozy-app/pull/931) Don't change state of unmounted component in React template ([@CPatchane](https://github.com/CPatchane))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#930](https://github.com/CPatchane/create-cozy-app/pull/930) fix(deps): update dependency vue-router to v3.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#928](https://github.com/CPatchane/create-cozy-app/pull/928) fix(deps): update dependency cozy-ui to v17 + add <IconSprite /> ([@renovate[bot]](https://github.com/apps/renovate))
  * [#926](https://github.com/CPatchane/create-cozy-app/pull/926) fix(deps): update dependency webpack to v4.26.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#929](https://github.com/CPatchane/create-cozy-app/pull/929) fix(deps): update dependency mini-css-extract-plugin to v0.4.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#925](https://github.com/CPatchane/create-cozy-app/pull/925) fix(deps): update dependency postcss to v7.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#922](https://github.com/CPatchane/create-cozy-app/pull/922) fix(deps): update dependency @babel/core to v7.1.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#920](https://github.com/CPatchane/create-cozy-app/pull/920) fix(deps): update react monorepo to v16.6.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#916](https://github.com/CPatchane/create-cozy-app/pull/916) fix(deps): update dependency eslint to v5.9.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#917](https://github.com/CPatchane/create-cozy-app/pull/917) chore(deps): update dependency prettier to v1.15.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#918](https://github.com/CPatchane/create-cozy-app/pull/918) fix(deps): update dependency script-ext-html-webpack-plugin to v2.1.3 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 2
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- kosssi ([@kosssi](https://github.com/kosssi))


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
