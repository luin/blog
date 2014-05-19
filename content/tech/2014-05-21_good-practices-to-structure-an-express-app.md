Title: Good practices to structure an Express app
Status: draft

Having been heavily using the Express framework for 3 years, I’ve discovered a few patterns and conventions to structure an Express app which makes my code significantly cleaner and easier to follow. Here they are.

## 1. Routing

While there are countless ways we can set up routes, the most important thing I honestly feel to keep in mind is to put the URL definition and it’s routes(aka middlewares) in the same place. 

When writing code like `app.get('/users', require('./routes').getUsers)`, you are actually making your application fragmented instead of modular because there is a relatively high coupling between the URL definition and it's routes: when making some changes on the [named parameter](http://expressjs.com/4x/api.html#req.params) of the URL, you have to alter the route accordingly, and what's more, it takes more time to find the routes by the URL which is very common during the stages of development.

> When things get bigger, they need to be made smaller.

To modularize my Express app, what I do instead is to separate the routes by resources. In RESTful programming, being the fundamental concept, a resource is similar to an object instance in an object-oriented programming language. The coupling between resources is low and each resource is relatively self-contained, which means they can be separate naturally.

In light of the fact that an Express app instance cannot only `use` a middleware but also another Express app instance(sub-app), I make each route an independent Express app, put each app in a separate file and expose them via the `module.exports` object. I put all these files into a sub-folder, eg: /routes. Here's the structure of a typical Express project I have written:

	project
	  |- routes
	  |   |- users.js
	  |   |- projects.js
	  |   |- tasks.js
	  |- app.js

Once we have the route files as described, it is not difficult to load them from `app.js`. Using the `fs` module, we can quickly load each module and `use` each of them. We do this before the app is launched. The `app.js` skeleton looks like so:

	var fs = require('fs'),
	    path = require('path');
		
	var routeDir = path.join(__dirname, 'routes'),
	    routes = fs.readdirSync(routeDir);
	    
	routes.forEach(function(routeFileName) {
	  var routeName = path.basename(routeFileName, '.js');
	  var routeModule = require(path.join(routeDir, routeFileName));
	  app.use('/' + routeName, routeModule);
	});

You may have noticed that we gave each route a mount path, which is the basename of the route file prefixed with a slash. Hence, for instance, when we type the following code in the `routes/users.js`:

	var express = require('express');
	var app = module.exports = express();
	
	app.get('/:userId', function() {
	  // do something
	});

After the user route being mounted, the final URL will be `/users/:userId` instead of `/:userId`. Freaking awesome!


## 2. Global variables

> Global variables are evil.

Global variables are variables that are accessible from every scope in your project, even in different modules.

I've seen numerous people state that global variables are evil and resist using them in their projects. I admit there's a problem if a project depends heavily on global variables, but with my own personal believe that rational use of them will lead your project more efficient to develop. For instance, database connections(or models if you are using ORM or ODM) are very well suited to be defined as global variables in respect that they are used pervasively in a typical Express project.

The simplest way to create a global variable is to declare a variable without the `var` keyword. However, I strongly oppose this way on account of ambiguity: It makes one wonder whether the variable was to be declared as a global variable or the developer just forgot using the `var`. Instead, I declare a global variable by adding the variable to the `GLOBAL` object:

	> GLOBAL.str = 'this is a global variable';
	'this is a global variable'
	> str
	'this is a global variable'

I am a huge fan of ORM/ODM, hence [Mongoose](http://mongoosejs.com) and [Sequelize](http://sequelizejs.com) are habitual frequenters of my Express projects. When I use them, I will be bound to expose the ORM/ODM models as global variables so that I can access them everywhere like this:

	User.find({ email: req.body.email }, function(err, user) {
		// ...
	});

In the code above, `User` is a Mongoose model which is a global variable.

## Conclusion

I created a small reference app to codify a standard Express app structure. You can see it [here](https://github.com/template-man/express-mongoose).
