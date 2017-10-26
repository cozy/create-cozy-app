## Create Cozy App

### What's create-cozy-app?

`create-cozy-app` is a command line tool that create a skeleton of an application for Cozy, based on React, Redux and Cozy libraries.

#### Requirement

 - a running [Cozy development environment](https://docs.cozy.io/en/dev/app/#install-the-development-environment);
 - Node.js version 6 or higher;
 - [Yarn](https://yarnpkg.com). Yarn is a Node.js package manager, like `npm`;
 - knowledge of React / Redux / some build tools;


#### Install

Just use `yarn` to download and install the `create-cozy-app` command;

```
yarn global add create-cozy-app
```


#### Usage

Use the `create-cozy-app` command to bootstrap your application:

```
create-cozy-app mycozyapp
```

This will download some dependencies (may take a while) and ask you a few questions, then create an application skeleton inside `mycozyapp`

That's all! You can start hacking:

```
cd mycozyapp
yarn watch:standalone
```

After the webpack build, your app should be available at http://localhost:8888


#### Known limitations

For now, this project has only been tested on GNU/Linux and MacOS.


## Community

### Maintainer

The lead maintainer for create-cozy-app and tooling is [@CPatchane](https://github.com/cpatchane), send him a :beers: to say hello!

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

`create-cozy-app` is distributed under the MIT license.


[cozy]: https://cozy.io "Cozy Cloud"
[freenode]: http://webchat.freenode.net/?randomnick=1&channels=%23cozycloud&uio=d4
[forum]: https://forum.cozy.io/
[github]: https://github.com/cozy/
[twitter]: https://twitter.com/cozycloud
