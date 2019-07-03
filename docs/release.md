## Release process

`create-cozy-app` is a monorepo which uses [`lerna`](https://github.com/lerna/lerna/tree/master/commands/publish#readme)
to publish packages on npm. Each packages has independant versioning.

> :pushpin: You can see all packages concerned by your next release by running ` yarn lerna updated`

0. Be sure to be up to date on your local `master` branch

1. First of all, we have to reset yarn lockfiles of the packages we want to publish to avoid yarn missing modules issues: `yarn reset:yarn`

2. Generate the changelog via `lerna-changelog`: `yarn changelog`. The changelog will be displayed in the terminal, you can put it directly in your clipboard using `yarn changelog | pbcopy` on Linux/OSX (you need to have a token github `GITHUB_AUTH` in your node environment)

3. Copy the changelog into the `CHANGELOG.md` at the beginning (after the migration session) and replace `Unreleased` title by the next package(s) version(s) concerned by this release

4. Clean the renovate changelog parts by gathering all same packages update, here is an example:
   ```diff
   - [#1178](https://github.com/CPatchane/create-cozy-app/pull/1178) Update react monorepo to v16.8.5 ([@renovate[bot]](https://github.com/apps/renovate))
   - [#1179](https://github.com/CPatchane/create-cozy-app/pull/1179) Update react monorepo to v16.8.6 ([@renovate[bot]](https://github.com/apps/renovate))
   + [#1178](https://github.com/CPatchane/create-cozy-app/pull/1178), [#1179](https://github.com/CPatchane/create-cozy-app/pull/1179) Update react monorepo to v16.8.6 ([@renovate[bot]](https://github.com/apps/renovate))
   ```

5. Add, commit __and push__ those last changes (example of message: _release: :gem: Update changelog for next release + reset lockfiles (global v2.0.0)_).

6. Publish all packages by providing a release message: `node_modules/.bin/lerna publish -m "release: :rocket: Publish v2.0.0`. Lerna will automatically publish on npm and push related tags to the repository.
    > Running `yarn lerna` instead of `npm lerna` or `node_modules/.bin/lerna` may make lerna publishing to yarn repositories instead of npm ones

7. Update the release section on Github with the last changelog generated during this release process

__`create-cozy-app` is published :tada:__
