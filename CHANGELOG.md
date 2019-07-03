### Migrating an application from last v1.x.x

- `cozy-scripts` will now resolve via Webpack using `node_modules` relative path instead of an absolute one. It shouldn't break your application but please check your build about modules not found.
- Now  `cozy-scripts` will use transpiled components from `cozy-ui`, so you will have to __import manually the stylesheet__ like following (example in [the template](https://github.com/CPatchane/create-cozy-app/blob/master/packages/cozy-scripts/template/app/src/styles/index.css)):
  ```css
  /* styles/index.css */
  @import '~cozy-ui/react/stylesheet.css';
  ```
- We __highly recommend__ to use node v10 which is the last LTS node version, even if a node version >= `8.9.0` should work correctly with `cozy-scipts`
- CCA now uses __css-loader v3__ which has API breaking changes about modules usage: All modules options should be in the `modules` property which is now an object (see https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md#breaking-changes)
- To avoid some issues about `unexpected token` when running your application tests, we recommend to force babel jest on `.jsx` files [like for the template in this PR](https://github.com/CPatchane/create-cozy-app/pull/1259)
- `cozy-scripts` now handle public assets and icon. It means that if your application has public pages, assets like cozy-bar or cozy-client-js will be copied into the `build/public/` folder. For the app icon, `cozy-scripts` will read your application `manifest.webapp` file to know the build icon path. If your application has public pages, it will be built into `build/public/` and `cozy-scripts` will ensure that the built `manifest.webapp` will have the good public icon path.
- The `webpack.config.vendors` has been renamed to `webpack.config.assets`
- `cozy-scripts` now use Jest v24 for tests and eslint v6 for linting, some issues __could__ be due to those upgrade. Please refer to the [Jest changelog](https://github.com/facebook/jest/blob/master/CHANGELOG.md) or [ESlint changelog](https://github.com/eslint/eslint/blob/master/CHANGELOG.md) for more informations.

## cozy-scripts@2.0.0, cozy-scripts-vanilla@2.0.0, create-cozy-app@2.0.0 (2019-07-02)

#### :rewind: Aborted works
Those works has been included in the last beta (v2.0.0-beta.0) but was reverted since it brings too much breaking changes. They may be included in a next major version or not:
- Automaticallly generate the app favicons using `webapp-webpack-plugin` ([#1069](https://github.com/CPatchane/create-cozy-app/pull/1069))
- Change the `targets/vendor/assets` folder to `targets/assets` ([#1069](https://github.com/CPatchane/create-cozy-app/pull/1069))

#### :boom: Breaking Changes:
* `cozy-scripts`
  * [#1243](https://github.com/CPatchane/create-cozy-app/pull/1243) fix(deps): update dependency css-loader to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1106](https://github.com/CPatchane/create-cozy-app/pull/1106) Use only transpiled UI React components + upgrade cozy-ui to v19 ([@CPatchane](https://github.com/CPatchane))
  * [#1070](https://github.com/CPatchane/create-cozy-app/pull/1070) Use relative `node_modules` for webpack modules resolving ([@CPatchane](https://github.com/CPatchane))
  * [#1069](https://github.com/CPatchane/create-cozy-app/pull/1069), [#1249](https://github.com/CPatchane/create-cozy-app/pull/1249) Handle assets if public page + use browserlist for autoprefixer + update Jest to v24 ([@CPatchane](https://github.com/CPatchane))
* `create-cozy-app`
  * [#1255](https://github.com/CPatchane/create-cozy-app/pull/1255) Force node v10 usage ([@CPatchane](https://github.com/CPatchane))

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1145](https://github.com/CPatchane/create-cozy-app/pull/1145) feat: Don't use the slow stylus resolver ([@nono](https://github.com/nono))
  * [#1142](https://github.com/CPatchane/create-cozy-app/pull/1142) feat: Make SVGO optimize a bit more the SVGs ([@nono](https://github.com/nono))
  * [#1135](https://github.com/CPatchane/create-cozy-app/pull/1135) feat: Make the minification faster ([@nono](https://github.com/nono))

#### :bug: Bug Fixes:
* Internal
  * [#1146](https://github.com/CPatchane/create-cozy-app/pull/1146) chore: Fix yarn test ([@nono](https://github.com/nono))
* `cozy-scripts`
  * [#1263](https://github.com/CPatchane/create-cozy-app/pull/1263) Fix HMR with last webpack-dev-server version ([@CPatchane](https://github.com/CPatchane))
  * [#1259](https://github.com/CPatchane/create-cozy-app/pull/1259) Force using babel-jest for react app ([@CPatchane](https://github.com/CPatchane))
  * [#1258](https://github.com/CPatchane/create-cozy-app/pull/1258) Don't include clientjs if not used ([@CPatchane](https://github.com/CPatchane))
  * [#1237](https://github.com/CPatchane/create-cozy-app/pull/1237) fix: Safari 10 issue ([@Crash--](https://github.com/Crash--))
  * [#1222](https://github.com/CPatchane/create-cozy-app/pull/1222) fix: Support window in HMR env ([@Crash--](https://github.com/Crash--))
  * [#1144](https://github.com/CPatchane/create-cozy-app/pull/1144) fix(travis): Branches directive 🚑 ([@kosssi](https://github.com/kosssi))
* `cozy-scripts-vanilla`, `cozy-scripts`
  * [#1122](https://github.com/CPatchane/create-cozy-app/pull/1122) Avoid the glitch while loading the app ([@nono](https://github.com/nono))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1118](https://github.com/CPatchane/create-cozy-app/pull/1118), [#1121](https://github.com/CPatchane/create-cozy-app/pull/1121), [#1152](https://github.com/CPatchane/create-cozy-app/pull/1152), [#1181](https://github.com/CPatchane/create-cozy-app/pull/1181), [#1186](https://github.com/CPatchane/create-cozy-app/pull/1186), [#1218](https://github.com/CPatchane/create-cozy-app/pull/1218), [#1229](https://github.com/CPatchane/create-cozy-app/pull/1229), [#1252](https://github.com/CPatchane/create-cozy-app/pull/1252), [#1264](https://github.com/CPatchane/create-cozy-app/pull/1264)  chore(deps): update dependency react-hot-loader to v4.12.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1116](https://github.com/CPatchane/create-cozy-app/pull/1116), [#1126](https://github.com/CPatchane/create-cozy-app/pull/1126), [#1131](https://github.com/CPatchane/create-cozy-app/pull/1131), [#1168](https://github.com/CPatchane/create-cozy-app/pull/1168), [#1200](https://github.com/CPatchane/create-cozy-app/pull/1200), [#1248](https://github.com/CPatchane/create-cozy-app/pull/1248), [#1254](https://github.com/CPatchane/create-cozy-app/pull/1254), [#1256](https://github.com/CPatchane/create-cozy-app/pull/1256), [#1260](https://github.com/CPatchane/create-cozy-app/pull/1260), [#1261](https://github.com/CPatchane/create-cozy-app/pull/1261) fix(deps): update dependency cozy-ui to v21.4.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1104](https://github.com/CPatchane/create-cozy-app/pull/1104), [#1128](https://github.com/CPatchane/create-cozy-app/pull/1128), [#1134](https://github.com/CPatchane/create-cozy-app/pull/1134), [#1164](https://github.com/CPatchane/create-cozy-app/pull/1164), [#1201](https://github.com/CPatchane/create-cozy-app/pull/1201), [#1242](https://github.com/CPatchane/create-cozy-app/pull/1242), [#1257](https://github.com/CPatchane/create-cozy-app/pull/1257), [#1262](https://github.com/CPatchane/create-cozy-app/pull/1262) fix(deps): update dependency cozy-bar to v7.5.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1173](https://github.com/CPatchane/create-cozy-app/pull/1173) fix(deps): update dependency react-router-dom to v5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1157](https://github.com/CPatchane/create-cozy-app/pull/1157), [#1243](https://github.com/CPatchane/create-cozy-app/pull/1243) fix(deps): update dependency css-loader to v3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1107](https://github.com/CPatchane/create-cozy-app/pull/1107), [#1114](https://github.com/CPatchane/create-cozy-app/pull/1114), [#1124](https://github.com/CPatchane/create-cozy-app/pull/1124), [#1141](https://github.com/CPatchane/create-cozy-app/pull/1141), [#1166](https://github.com/CPatchane/create-cozy-app/pull/1166), [#1204](https://github.com/CPatchane/create-cozy-app/pull/1204), [#1216](https://github.com/CPatchane/create-cozy-app/pull/1216), [#1227](https://github.com/CPatchane/create-cozy-app/pull/1227), [#1244](https://github.com/CPatchane/create-cozy-app/pull/1244) fix(deps): update dependency cozy-client to v6.48.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1192](https://github.com/CPatchane/create-cozy-app/pull/1192) fix(deps): update dependency html-webpack-include-assets-plugin to v1.0.10 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1110](https://github.com/CPatchane/create-cozy-app/pull/1110), [#1143](https://github.com/CPatchane/create-cozy-app/pull/1143), [#1193](https://github.com/CPatchane/create-cozy-app/pull/1193), [#1208](https://github.com/CPatchane/create-cozy-app/pull/1208), [#1220](https://github.com/CPatchane/create-cozy-app/pull/1220), [#1224](https://github.com/CPatchane/create-cozy-app/pull/1224), [#1233](https://github.com/CPatchane/create-cozy-app/pull/1233), [#1253](https://github.com/CPatchane/create-cozy-app/pull/1253) fix(deps): update dependency webpack to v4.35.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1105](https://github.com/CPatchane/create-cozy-app/pull/1105), [#1247](https://github.com/CPatchane/create-cozy-app/pull/1247) chore(deps): update dependency eslint-plugin-vue to v5.2.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1234](https://github.com/CPatchane/create-cozy-app/pull/1234) fix(deps): update dependency file-loader to v4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1010](https://github.com/CPatchane/create-cozy-app/pull/1010), [#1111](https://github.com/CPatchane/create-cozy-app/pull/1111), [#1149](https://github.com/CPatchane/create-cozy-app/pull/1149), [#1170](https://github.com/CPatchane/create-cozy-app/pull/1170), [#1245](https://github.com/CPatchane/create-cozy-app/pull/1245) fix(deps): update dependency eslint to v6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1205](https://github.com/CPatchane/create-cozy-app/pull/1205), [#1246](https://github.com/CPatchane/create-cozy-app/pull/1246) chore(deps): update dependency eslint-plugin-react to v7.14.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1174](https://github.com/CPatchane/create-cozy-app/pull/1174), [#1180](https://github.com/CPatchane/create-cozy-app/pull/1180), [#1240](https://github.com/CPatchane/create-cozy-app/pull/1240) fix(deps): update dependency cozy-client-js to v0.16.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1241](https://github.com/CPatchane/create-cozy-app/pull/1241) fix(deps): update dependency node-polyglot to v2.3.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1206](https://github.com/CPatchane/create-cozy-app/pull/1206), [#1235](https://github.com/CPatchane/create-cozy-app/pull/1235) fix(deps): update dependency postcss to v7.0.17 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1113](https://github.com/CPatchane/create-cozy-app/pull/1113), [#1232](https://github.com/CPatchane/create-cozy-app/pull/1232) chore(deps): update dependency enzyme to v3.10.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1160](https://github.com/CPatchane/create-cozy-app/pull/1160), [#1219](https://github.com/CPatchane/create-cozy-app/pull/1219), [#1228](https://github.com/CPatchane/create-cozy-app/pull/1228) fix(deps): update dependency webpack-dev-server to v3.7.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1137](https://github.com/CPatchane/create-cozy-app/pull/1137), [#1165](https://github.com/CPatchane/create-cozy-app/pull/1165), [#1188](https://github.com/CPatchane/create-cozy-app/pull/1188), [#1210](https://github.com/CPatchane/create-cozy-app/pull/1210), [#1231](https://github.com/CPatchane/create-cozy-app/pull/1231) chore(deps): update dependency enzyme-adapter-react-16 to v1.14.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1120](https://github.com/CPatchane/create-cozy-app/pull/1120), [#1133](https://github.com/CPatchane/create-cozy-app/pull/1133), [#1155](tps://github.com/CPatchane/create-cozy-app/pull/1155), [#1169](https://github.com/CPatchane/create-cozy-app/pull/1169), [#1230](https://github.com/CPatchane/create-cozy-app/pull/1230) fix(deps): update dependency autoprefixer to v9.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1191](https://github.com/CPatchane/create-cozy-app/pull/1191), [#1226](https://github.com/CPatchane/create-cozy-app/pull/1226) fix(deps): update dependency mini-css-extract-plugin to v0.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1060](https://github.com/CPatchane/create-cozy-app/pull/1060), [#1194](https://github.com/CPatchane/create-cozy-app/pull/1194), [#1214](https://github.com/CPatchane/create-cozy-app/pull/1214) chore(deps): update dependency prettier to v1.18.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1239](https://github.com/CPatchane/create-cozy-app/pull/1239) fix(deps): update dependency babel-eslint to v10.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1112](https://github.com/CPatchane/create-cozy-app/pull/1112), [#1136](https://github.com/CPatchane/create-cozy-app/pull/1136), [#1175](https://github.com/CPatchane/create-cozy-app/pull/1175), [#1183](https://github.com/CPatchane/create-cozy-app/pull/1183), [#1202](https://github.com/CPatchane/create-cozy-app/pull/1202), [#1223](https://github.com/CPatchane/create-cozy-app/pull/1223) fix(deps): update dependency @babel/core to v7.4.5 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1123](https://github.com/CPatchane/create-cozy-app/pull/1123), [#1161](https://github.com/CPatchane/create-cozy-app/pull/1161), [#1177](https://github.com/CPatchane/create-cozy-app/pull/1177), [#1199](https://github.com/CPatchane/create-cozy-app/pull/1199) fix(deps): update dependency copy-webpack-plugin to v5.0.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1213](https://github.com/CPatchane/create-cozy-app/pull/1213) fix(deps): update dependency babel-loader to v8.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1212](https://github.com/CPatchane/create-cozy-app/pull/1212) chore(deps): update dependency eslint-plugin-prettier to v3.1.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1207](https://github.com/CPatchane/create-cozy-app/pull/1207) fix(deps): update dependency vuex to v3.1.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1203](https://github.com/CPatchane/create-cozy-app/pull/1203) fix(deps): update dependency svg-sprite-loader to v4.1.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1159](https://github.com/CPatchane/create-cozy-app/pull/1159), [#1197](https://github.com/CPatchane/create-cozy-app/pull/1197) fix(deps): update dependency webapp-webpack-plugin to v2.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1102](https://github.com/CPatchane/create-cozy-app/pull/1102), [#1150](https://github.com/CPatchane/create-cozy-app/pull/1150), [#1187](https://github.com/CPatchane/create-cozy-app/pull/1187) Update dependency webpack-bundle-analyzer to v3.3.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1189](https://github.com/CPatchane/create-cozy-app/pull/1189) Update dependency vue-router to v3.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1108](https://github.com/CPatchane/create-cozy-app/pull/1108), [#1129](https://github.com/CPatchane/create-cozy-app/pull/1129), [#1156](https://github.com/CPatchane/create-cozy-app/pull/1156), [#1178](https://github.com/CPatchane/create-cozy-app/pull/1178), [#1179](https://github.com/CPatchane/create-cozy-app/pull/1179) Update react monorepo to v16.8.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1132](https://github.com/CPatchane/create-cozy-app/pull/1132), [#1185](https://github.com/CPatchane/create-cozy-app/pull/1185), [#1195](https://github.com/CPatchane/create-cozy-app/pull/1195) Update dependency svgo to v1.2.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1097](https://github.com/CPatchane/create-cozy-app/pull/1097), [#1101](https://github.com/CPatchane/create-cozy-app/pull/1101), [#1130](https://github.com/CPatchane/create-cozy-app/pull/1130), [#1148](https://github.com/CPatchane/create-cozy-app/pull/1148), [#1167](https://github.com/CPatchane/create-cozy-app/pull/1167), [#1176](https://github.com/CPatchane/create-cozy-app/pull/1176) fix(deps): update vue monorepo to v2.6.10 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1049](https://github.com/CPatchane/create-cozy-app/pull/1049), [#1099](https://github.com/CPatchane/create-cozy-app/pull/1099), [#1162](https://github.com/CPatchane/create-cozy-app/pull/1162) Update dependency babel-preset-cozy-app to v1.5.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1153](https://github.com/CPatchane/create-cozy-app/pull/1153), [#1163](https://github.com/CPatchane/create-cozy-app/pull/1163) Update dependency eslint-config-cozy-app to v1.1.12 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1158](https://github.com/CPatchane/create-cozy-app/pull/1158), [#1172](https://github.com/CPatchane/create-cozy-app/pull/1172) Update dependency strip-ansi to v5.2.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1154](https://github.com/CPatchane/create-cozy-app/pull/1154) fix(deps): update dependency vue-jest to v3.0.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1117](https://github.com/CPatchane/create-cozy-app/pull/1117), [#1119](https://github.com/CPatchane/create-cozy-app/pull/1119), [#1147](https://github.com/CPatchane/create-cozy-app/pull/1147) chore(deps): update dependency vue-loader to v15.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1096](https://github.com/CPatchane/create-cozy-app/pull/1096) fix(deps): pin dependency webapp-webpack-plugin to 2.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `create-cozy-app`
  * [#1098](https://github.com/CPatchane/create-cozy-app/pull/1098), [#1151](https://github.com/CPatchane/create-cozy-app/pull/1151), [#1182](https://github.com/CPatchane/create-cozy-app/pull/1182) Update dependency ora to v3.4.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts`, `create-cozy-app`
  * [#1184](https://github.com/CPatchane/create-cozy-app/pull/1184) Update dependency commander to v2.20.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts-vanilla`, `cozy-scripts`, `create-cozy-app`
  * [#1211](https://github.com/CPatchane/create-cozy-app/pull/1211), [#1215](https://github.com/CPatchane/create-cozy-app/pull/1215), [#1251](https://github.com/CPatchane/create-cozy-app/pull/1251) fix(deps): update dependency fs-extra to v8.1.0 ([@renovate[bot]](https://github.com/apps/renovate))
* Internal
  * [#1100](https://github.com/CPatchane/create-cozy-app/pull/1100), [#1190](https://github.com/CPatchane/create-cozy-app/pull/1190), [#1217](https://github.com/CPatchane/create-cozy-app/pull/1217), [#1236](https://github.com/CPatchane/create-cozy-app/pull/1236) chore(deps): update dependency lerna to v3.15.0 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 3
- Bruno Michel ([@nono](https://github.com/nono))
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- kosssi ([@kosssi](https://github.com/kosssi))


## cozy-scripts@2.0.0-beta.0, cozy-scripts-vanilla@2.0.0-beta.0, create-cozy-app@2.0.0-beta.0 (2019-04-24)

#### :boom: Breaking Changes:
* `cozy-scripts`
  * [#1106](https://github.com/CPatchane/create-cozy-app/pull/1106) Use only transpiled UI React components + upgrade cozy-ui to v19 ([@CPatchane](https://github.com/CPatchane))
  * [#1070](https://github.com/CPatchane/create-cozy-app/pull/1070) Use relative `node_modules` for webpack modules resolving ([@CPatchane](https://github.com/CPatchane))
  * [#1069](https://github.com/CPatchane/create-cozy-app/pull/1069) Handle assets if public page + add favicons generator ([@CPatchane](https://github.com/CPatchane))

#### :nail_care: Enhancements:
* `cozy-scripts`
  * [#1145](https://github.com/CPatchane/create-cozy-app/pull/1145) feat: Don't use the slow stylus resolver ([@nono](https://github.com/nono))
  * [#1142](https://github.com/CPatchane/create-cozy-app/pull/1142) feat: Make SVGO optimize a bit more the SVGs ([@nono](https://github.com/nono))
  * [#1135](https://github.com/CPatchane/create-cozy-app/pull/1135) feat: Make the minification faster ([@nono](https://github.com/nono))

#### :bug: Bug Fixes:
* Other
  * [#1146](https://github.com/CPatchane/create-cozy-app/pull/1146) chore: Fix yarn test ([@nono](https://github.com/nono))
* `cozy-scripts`
  * [#1144](https://github.com/CPatchane/create-cozy-app/pull/1144) fix(travis): Branches directive 🚑 ([@kosssi](https://github.com/kosssi))
* `cozy-scripts-vanilla`, `cozy-scripts`
  * [#1122](https://github.com/CPatchane/create-cozy-app/pull/1122) Avoid the glitch while loading the app ([@nono](https://github.com/nono))

#### :arrow_up: Dependencies:
* `cozy-scripts`
  * [#1120](https://github.com/CPatchane/create-cozy-app/pull/1120), [#1133](https://github.com/CPatchane/create-cozy-app/pull/1133), [#1155](tps://github.com/CPatchane/create-cozy-app/pull/1155), [#1169](https://github.com/CPatchane/create-cozy-app/pull/1169) Update dependency autoprefixer to v9.5.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1137](https://github.com/CPatchane/create-cozy-app/pull/1137), [#1165](https://github.com/CPatchane/create-cozy-app/pull/1165), [#1188](https://github.com/CPatchane/create-cozy-app/pull/1188) Update dependency enzyme-adapter-react-16 to v1.12.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1102](https://github.com/CPatchane/create-cozy-app/pull/1102), [#1150](https://github.com/CPatchane/create-cozy-app/pull/1150), [#1187](https://github.com/CPatchane/create-cozy-app/pull/1187) Update dependency webpack-bundle-analyzer to v3.3.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1189](https://github.com/CPatchane/create-cozy-app/pull/1189) Update dependency vue-router to v3.0.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1116](https://github.com/CPatchane/create-cozy-app/pull/1116), [#1126](https://github.com/CPatchane/create-cozy-app/pull/1126), [#1131](https://github.com/CPatchane/create-cozy-app/pull/1131), [#1168](https://github.com/CPatchane/create-cozy-app/pull/1168) Update dependency cozy-ui to v19.24.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1060](https://github.com/CPatchane/create-cozy-app/pull/1060), [#1194](https://github.com/CPatchane/create-cozy-app/pull/1194) Update dependency prettier to v1.17.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1108](https://github.com/CPatchane/create-cozy-app/pull/1108), [#1129](https://github.com/CPatchane/create-cozy-app/pull/1129), [#1156](https://github.com/CPatchane/create-cozy-app/pull/1156), [#1178](https://github.com/CPatchane/create-cozy-app/pull/1178), [#1179](https://github.com/CPatchane/create-cozy-app/pull/1179) Update react monorepo to v16.8.6 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1191](https://github.com/CPatchane/create-cozy-app/pull/1191) Update dependency mini-css-extract-plugin to v0.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1110](https://github.com/CPatchane/create-cozy-app/pull/1110), [#1143](https://github.com/CPatchane/create-cozy-app/pull/1143), [#1193](https://github.com/CPatchane/create-cozy-app/pull/1193) Update dependency webpack to v4.30.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1132](https://github.com/CPatchane/create-cozy-app/pull/1132), [#1185](https://github.com/CPatchane/create-cozy-app/pull/1185), [#1195](https://github.com/CPatchane/create-cozy-app/pull/1195) Update dependency svgo to v1.2.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1183](https://github.com/CPatchane/create-cozy-app/pull/1183) Update dependency @babel/core to v7.4.3 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1118](https://github.com/CPatchane/create-cozy-app/pull/1118), [#1121](https://github.com/CPatchane/create-cozy-app/pull/1121), [#1152](https://github.com/CPatchane/create-cozy-app/pull/1152), [#1181](https://github.com/CPatchane/create-cozy-app/pull/1181) Update dependency react-hot-loader to v4.8.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1010](https://github.com/CPatchane/create-cozy-app/pull/1010), [#1111](https://github.com/CPatchane/create-cozy-app/pull/1111), [#1149](https://github.com/CPatchane/create-cozy-app/pull/1149), [#1170](https://github.com/CPatchane/create-cozy-app/pull/1170) Update dependency eslint to v5.16.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1174](https://github.com/CPatchane/create-cozy-app/pull/1174), [#1180](https://github.com/CPatchane/create-cozy-app/pull/1180) Update dependency cozy-client-js to v0.15.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1097](https://github.com/CPatchane/create-cozy-app/pull/1097), [#1101](https://github.com/CPatchane/create-cozy-app/pull/1101), [#1130](https://github.com/CPatchane/create-cozy-app/pull/1130), [#1148](https://github.com/CPatchane/create-cozy-app/pull/1148), [#1167](https://github.com/CPatchane/create-cozy-app/pull/1167), [#1176](https://github.com/CPatchane/create-cozy-app/pull/1176) fix(deps): update vue monorepo to v2.6.10 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1123](https://github.com/CPatchane/create-cozy-app/pull/1123), [#1161](https://github.com/CPatchane/create-cozy-app/pull/1161), [#1177](https://github.com/CPatchane/create-cozy-app/pull/1177) fix(deps): update dependency copy-webpack-plugin to v5.0.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1112](https://github.com/CPatchane/create-cozy-app/pull/1112), [#1136](https://github.com/CPatchane/create-cozy-app/pull/1136), [#1175](https://github.com/CPatchane/create-cozy-app/pull/1175) Update dependency @babel/core to v7.4.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1049](https://github.com/CPatchane/create-cozy-app/pull/1049), [#1099](https://github.com/CPatchane/create-cozy-app/pull/1099), [#1162](https://github.com/CPatchane/create-cozy-app/pull/1162) Update dependency babel-preset-cozy-app to v1.5.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1153](https://github.com/CPatchane/create-cozy-app/pull/1153), [#1163](https://github.com/CPatchane/create-cozy-app/pull/1163) Update dependency eslint-config-cozy-app to v1.1.12 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1158](https://github.com/CPatchane/create-cozy-app/pull/1158), [#1172](https://github.com/CPatchane/create-cozy-app/pull/1172) Update dependency strip-ansi to v5.2.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1104](https://github.com/CPatchane/create-cozy-app/pull/1104), [#1128](https://github.com/CPatchane/create-cozy-app/pull/1128), [#1134](https://github.com/CPatchane/create-cozy-app/pull/1134) Update dependency cozy-bar to v6.15.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1159](https://github.com/CPatchane/create-cozy-app/pull/1159) Update dependency webapp-webpack-plugin to v2.6.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1107](https://github.com/CPatchane/create-cozy-app/pull/1107), [#1114](https://github.com/CPatchane/create-cozy-app/pull/1114), [#1124](https://github.com/CPatchane/create-cozy-app/pull/1124), [#1141](https://github.com/CPatchane/create-cozy-app/pull/1141) Update dependency cozy-client to v6.9.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1157](https://github.com/CPatchane/create-cozy-app/pull/1157) fix(deps): update dependency css-loader to v2.1.1 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1154](https://github.com/CPatchane/create-cozy-app/pull/1154) fix(deps): update dependency vue-jest to v3.0.4 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1117](https://github.com/CPatchane/create-cozy-app/pull/1117), [#1119](https://github.com/CPatchane/create-cozy-app/pull/1119), [#1147](https://github.com/CPatchane/create-cozy-app/pull/1147) chore(deps): update dependency vue-loader to v15.7.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1105](https://github.com/CPatchane/create-cozy-app/pull/1105), [#1115](https://github.com/CPatchane/create-cozy-app/pull/1115) chore(deps): update dependency eslint-plugin-vue to v5.2.2 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1113](https://github.com/CPatchane/create-cozy-app/pull/1113) chore(deps): update dependency enzyme to v3.9.0 ([@renovate[bot]](https://github.com/apps/renovate))
  * [#1096](https://github.com/CPatchane/create-cozy-app/pull/1096) fix(deps): pin dependency webapp-webpack-plugin to 2.6.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `create-cozy-app`
  * [#1098](https://github.com/CPatchane/create-cozy-app/pull/1098), [#1151](https://github.com/CPatchane/create-cozy-app/pull/1151), [#1182](https://github.com/CPatchane/create-cozy-app/pull/1182) Update dependency ora to v3.4.0 ([@renovate[bot]](https://github.com/apps/renovate))
* `cozy-scripts`, `create-cozy-app`
  * [#1184](https://github.com/CPatchane/create-cozy-app/pull/1184) Update dependency commander to v2.20.0 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#1100](https://github.com/CPatchane/create-cozy-app/pull/1100), [#1109](https://github.com/CPatchane/create-cozy-app/pull/1109), [#1138](https://github.com/CPatchane/create-cozy-app/pull/1138) chore(deps): update dependency lerna to v3.13.1 ([@renovate[bot]](https://github.com/apps/renovate))

#### Committers: 3
- Bruno Michel ([@nono](https://github.com/nono))
- Cédric Patchane ([@CPatchane](https://github.com/CPatchane))
- kosssi ([@kosssi](https://github.com/kosssi))
