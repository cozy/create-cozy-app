Cozy Hello World
=============

[![Travis build status shield](https://img.shields.io/travis/CPatchane/cozy-hello-world/master.svg?style=flat-square
)](https://travis-ci.org/CPatchane/cozy-hello-world)
[![Greenkeeper badge](https://badges.greenkeeper.io/CPatchane/cozy-hello-world.svg?style=flat-square
)](https://greenkeeper.io/)
[![David](https://img.shields.io/david/cpatchane/cozy-hello-world.svg?style=flat-square
)](https://github.com/CPatchane/cozy-hello-world/blob/master/package.json)
[![David](https://img.shields.io/david/dev/cpatchane/cozy-hello-world.svg?style=flat-square
)](https://github.com/CPatchane/cozy-hello-world/blob/master/package.json)
[![license](https://img.shields.io/github/license/cpatchane/cozy-hello-world.svg?style=flat-square
)](https://github.com/CPatchane/cozy-hello-world/blob/master/LICENSE)

What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


What's cozy-hello-world?
---------------------

This repository is a client-side Hello World app for Cozy Cloud<sup>v3</sup>. We keep it up-to-date with our habits and best-practices. It allow you to start your app quickly from a functional basis. Indeed, the branch `build` of this repository contains all build files for the Hello World app and can be installed on a Cozy platform (local or not).


Use it
------

### Step 1: clone the app

```sh
$ git clone \
  --origin=template \
  --depth=1 \
  https://github.com/CPatchane/cozy-hello-world.git \
  my-app
```

### Step 2: already ready?

Now your app can already be builded by running `yarn watch` in order to be installed in a local Cozy for development. All you have to do is to replace all named parts to use your application name and configuration. Here are all files that you will need to update/replace:

* `package.json`
* `manifest.webapp`
* `.tx/config` (transifex configuration file if needed)
* `vendor/assets/icon.svg` (you can use any filename, it must just match with the `manifest.webapp` `icon` field)
* Move to the root and update the `.templates/README.md`
* Move to the root and update the `.templates/CONTRIBUTING.md`

### Step 3: add your own repository

Go to https://github.com/new and create a new repository for your app. Then add it to your app:

```sh
$ git remote add \
  origin \
  https://github.com/<USERNAME_GH>/<SLUG_GH>.git
$ git commit -am "Initial commit for my-app"
$ git push -u origin master:master
```

### That's it :rocket:!

Congrats! Your app is now fully set. You can start coding in [`src`](src), and run it through a [cozy-stack](https://cozy.github.io/cozy-stack/).


Community
---------

### Maintainer

The lead maintainer for cozy-hello-world and tooling is [@CPatchane](https://github.com/cpatchane), send him a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


License
-------

cozy-hello-world is distributed under the [AGPL v3 license][agpl-3.0].


[cozy]: https://cozy.io "Cozy Cloud"
[agpl-3.0]: https://www.gnu.org/licenses/agpl-3.0.html
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/mycozycloud
