Cozy Scripts
=============

What's Cozy?
------------

![Cozy Logo](https://cdn.rawgit.com/cozy/cozy-guidelines/master/templates/cozy_logo_small.svg)

[Cozy] is a platform that brings all your web services in the same private space.  With it, your webapps and your devices can share data easily, providing you with a new experience. You can install Cozy on your own hardware where no one's tracking you.


What's create-cozy-app?
--------------------

:warning: __Working in progress...__ :warning:

> :pushpin: `create-cozy-app` uses only [`yarnpkg`](https://yarnpkg.com) to handle node modules for now. Please install it before using `create-cozy-app`.

#### Install

```
yarn global add create-cozy-app
```


#### Usage

This command will bootstrap your app in a folder 'my-app':

```
create-cozy-app my-app
```

Then enjoy it:

```
cd my-app
yarn watch:standalone
```

After the webpack build, your app should be available at http://localhost:8080

:warning: __Working in progress...__ :warning:

__Note:__ This package has been tested only on OS X Sierra for now.

Community
---------

### Maintainer

The lead maintainer for create-cozy-app and tooling is [@CPatchane](https://github.com/cpatchane), send him a :beers: to say hello!


### Get in touch

You can reach the Cozy Community by:

- Chatting with us on IRC [#cozycloud on Freenode][freenode]
- Posting on our [Forum][forum]
- Posting issues on the [Github repos][github]
- Say Hi! on [Twitter][twitter]


License
-------

create-cozy-app is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/mycozycloud
