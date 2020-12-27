---
title: "Good Practices to Structure an Express App"
tags:
  - Node.js
---
Having heavily used the [Express](http://expressjs.com) framework for 3 years, I’ve discovered a few patterns and conventions to structure an Express app. These patterns make my code significantly cleaner and easier to follow. Here they are.

## 1. RESTful Routes

While there are many ways we can set up routes, the most important thing to keep in mind is to put the URL definition and its routes (i.e. middlewares) in the same place.

When writing code like `app.get('/users', require('./routes').getUsers)`, you are actually making your application fragmented instead of modular because the coupling between a URL and it's route is in fact relatively high.

For example, when making some changes on the [named parameter](http://expressjs.com/4x/api.html#req.params) of the URL, you have to alter the route accordingly. If the url and the route definition are in different places, it takes more time to find them and change them both during development.

To modularize my Express app, what I do instead is to separate the routes by resources. In RESTful programming, a resource is similar to an object instance in an object-oriented programming language. The coupling between resources is low and each resource is relatively self-contained, which means they can be separated naturally.

<!-- more -->

Since Express can mount apps as middlewares, I create an app for each resource, and put them in their own modules. I put these modules in a sub-folder (e.g. `/routes`). Here's the structure of a typical Express project following this convention:

    project
      |- routes
      |   |- index.js
      |   |- users.js
      |   |- projects.js
      |   |- tasks.js
      |- app.js

`routes/index.js` is used to load all the routes:

```javascript
var routes = require('node-require-directory')(__dirname);

module.exports = function(app) {
  Object.keys(routes).forEach(function(key) {
    if (key === 'index') return;
    app.use('/' + key, routes[key]);
  });
};
```

Then it's easy to load all the routes in the `app.js` by just requiring the `routes/index.js`:

```javascript
require('./routes')(app);
```

Notice that the mount path of a route is the basename of its source file. So we can define the user resource in the file `routes/users.js` like this:

```javascript
var express = require('express');
var app = module.exports = express();

app.get('/:userId', function() {
  // do something
});
```

It would be mounted as `/users/:userId` instead of `/:userId` because `app.js` used `/users` as the path prefix. Awesome!

## 2. Global variables

> Global variables are evil.

Global variables are variables that are accessible from every scope in your project, even in different modules.

Many people think that global variables are evil and refuse to use them in their projects. But I believe that rational use of them can make your project more efficient to develop. For instance, database connections (or models if you are using ORM or ODM) are very well suited to be defined as global variables because they are used pervasively in a typical Express project.

The simplest way to create a global variable is to declare a variable without the `var` keyword. However, I strongly oppose this way because of its potential ambiguity. It is not clear whether a variable was intended as a global variable or if the developer forgot the `var`.

Instead, I declare a global variable by adding it to the `GLOBAL` object:

```javascript
> GLOBAL.str = 'this is a global variable';
'this is a global variable'
> str
'this is a global variable'
```

I am a huge fan of ORM/ODM, and [Mongoose](http://mongoosejs.com) and [Sequelize](http://sequelizejs.com) are often used in my Express projects. When I use them, I would be bound to expose the ORM/ODM models as global variables so that I can access them everywhere:

```javascript
User.find({ email: req.body.email }, function(err, user) {
  // ...
});
```

In the code above, the global variable `User` is a Mongoose model.

## 3. Dependency Injection

Middleware is a low-level concept of the [Connect](http://www.senchalabs.org/connect/), and it's not applicable to every scenario we come across when coding on a higher level. For instance, if you want to pass variables between middlewares, you have to tack on properties to `req`, which seems odd and uncontrollable(that you couldn't point out easily which middleware add what properties to `req`).

To avoid this problem, I wrote a library to bring dependency injection to the Express. Visit it's [GitHub page](https://github.com/luin/express-di) to learn about what is it and how to use it.

I always create a `factories` folder to store all the dependencies in my Express app like this:

```
project
  |- factories
  |   |- user.js
  |   |- index.js
  |- app.js
```

Just like routes, `factories/index.js` is used to load all the factories:

```javascript
var factories = require('node-require-directory')(__dirname);

module.exports = function(app) {
  Object.keys(factories).forEach(function(key) {
    if (key === 'index') return;
    app.factory(key, factories[key]);
  });
};
```

And in the `app.js`, we can `require` all the factories like this:

```javascript
require('./factories')(app);
```

## 4. Configuration

[Node-config](https://github.com/lorenwest/node-config) is an awesome configuration system for Node.js. It loads different configurations according to the runtime environments (specified by `NODE_ENV`), and It's easy to use the configuration in the code, just `var config = require('config')`.

In my Express app, there's a `config` folder to hold all the configuration files. However, considering a config can vary between deploys, the only file to check into version control  is a sample config file named `_sample.yaml`. When deploying the app, just copy `_sample.yaml` to `$NODE_ENV.yaml`, usually `production.yaml`.

What's more, when using an automatic deployment script, it's not easy to change the configuration file. Luckily, Node-config supports environment variables and command line arguments as well.

## Conclusion

I created a small reference app to codify a standard Express app structure. You can see it [here](https://github.com/luin/express-mongoose).
