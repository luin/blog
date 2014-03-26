Title: Express 框架 middleware 的依赖问题与解决方案
Tags: dependency, injection, express, express-di, middleware, node.js

作为 Node 社区最受欢迎的框架，[Express](http://expressjs.com) 在沿用 [Connect](http://www.senchalabs.org/connect/) 的 middleware 机制的同时，还提供了在定义路由时使用的 route-specific middleware（下面称“路由中间件”）。路由中间件与 Connect 的 middleware 十分相似，可以用来执行预载入资源或校验请求等操作。然而由于路由中间件的用法非常自由，导致开发时很容易写出难以维护的代码。这篇文章就将介绍路由中间件之间高耦合的问题以及相应的解决方案。

下面是使用路由中间件从数据库载入用户资料的示例，这段代码来自 [TJ](http://tjholowaychuk.com)（Express 的作者）的一个 [Screencast](http://www.screenr.com/elL)：

    :::javascript
    var loadUser = function(req, res, next) {
      User.findById(req.session.userId, function(err, user) {
        if (err) return next(err);
        req.currentUser = user;
        next();
      });
    };

    app.get('/dashboard', loadUser, function(req, res) {
      res.render('dashboard', { user: req.currentUser });
    });

在上面的代码中，我们定义了路由中间件 `loadUser`。`loadUser` 从数据库中读取用户数据后，将 `user` 对象通过 `req` 的 `currentUser` 属性传递给下一个路由中间件。这种通过 `req` 对象的属性传递数据的模式在 Express 中很常见。当项目比较小的时候这种模式非常方便易用，可是随着项目不断发展，这种模式会暴露出不少问题，至于具体有哪些问题，请继续往下看。

<!-- more -->

现在我们需要限制只有管理员可以访问 dashboard 页面，代码如下：

    :::javascript
    var loadUser = function(req, res, next) {
      User.findById(req.session.userId, function(err, user) {
        if (err) return next(err);
        req.currentUser = user;
        next();
      });
    };

    var role = function(role) {
      return function(req, res, next) {
        if (!req.currentUser || req.currentUser.role !== role) {
          return next(new Error('access denied'));
        }
        next();
      };
    };

    app.get('/dashboard', loadUser, role('admin'), function(req, res) {
      res.render('dashboard', { user: req.currentUser });
    });

我们又定义了一个路由中间件 `role()`，当用户的角色不是管理员时该中间件就会传出异常。虽然需求已经满足，但是上面这段代码存在两个问题：

1. 如果要使用 `role()` 中间件，就必须在前面引入 `loadUser` 中间件，即实际上 `loadUser` 是 `role()` 的一个隐含依赖，然而“中间件”的语义无法表现出依赖关系，导致代码可读性大大降低。</li>
2. 在渲染 dashboard 页面时我们使用了 `req.currentUser` 对象，然而我们并不明确地知道 `currentUser` 这个属性是前面的哪个路由中间件（`loadUser` 还是 `role()`）加到 `req` 上的，代码可读性较差，对重构亦不友好。路由中间件的定义和路由的定义存放在不同的文件时这个问题更加明显。</li>

随着网站的复杂，单个路由上的路由中间件的数量增多，上述两个问题会越来越严重。如下面这个有些极端的例子：

    :::javascript
    var middleware1 = function(req, res, next) {
      req.a = 1;
      next();
    };

    var middleware2 = function(req, res, next) {
      req.b = { age: 20 };
      next();
    };

    var middleware3 = function(req, res, next) {
      req.c = 1;
      next();
    };

    var middleware4 = function(req, res, next) {
      if (req.b.age < 18) {
        return next(new Error('access denied'));
      }
      next();
    };

    app.get('/', middleware1, middleware2, middleware3, middleware4, function(req, res) {
      res.render('index', { a: req.a });
    });

在上面的例子中，我们定义了 4 个路由中间件，其中可以分析出，`middleware4` 依赖于 `middleware2`，`middleware1` 为 `req` 加上了 `a` 属性，此外 `middleware3` 并没有用到。可以看到此时我们的代码已经混乱不堪了：开发者很难看出到底是哪个中间件向 `req` 添加了什么属性，更难轻易指出中间件的依赖关系。当我们要定义另外一个路由时，如果我们想使用 `req.a`，就不得不找到前面这 4 个路由中间件的定义挨个看 `req.a` 是在哪定义的，如果这些中间件定义在不同的文件中，那么这一过程无疑非常痛苦。

## 解决方案：依赖注入
使用过 <a href="http://angularjs.org">Angular</a> 框架的人可能会对其中的依赖注入模式印象深刻。依赖注入是一种解决代码依赖的软件设计模式，具体可以查阅维基百科或设计模式相关的书籍。

在 Angular 中，一个 Controller 一般会需要若干个依赖，比如 `$http`（用来读取网络资源）或 `$location`（用来获取、设置当前网页的 URL）。比起在 Controller 中手工引入并创建这些依赖，Angular 借助依赖注入模式使得我们可以直接在 Controller 函数中通过形参声明所需要的依赖，而 Angular 会根据形参列表将对应的依赖作为实参传入。如：

    :::javascript
    function Controller($http, $location) {
      // 此处可以直接使用 $http 和 $location 两个依赖
    }

实践表明这种模式在处理依赖关系时非常方便。受此启发，我开发了 <a href="https://github.com/luin/express-di">express-di</a> 插件，能够把依赖注入模式引入到 Express 中以解决路由中间件的依赖问题。使用方法非常简单，首先使用 npm 来安装：

    :::shell
    $ npm install --save express-di

而后在 Express 项目中引入 express-di 就可以了：

    :::javascript
    var express = require('express');
    // Require express-di
    require('express-di');
    var app = express();

此时你的 Express 项目中的所有路由中间件都支持依赖注入了！让我们回过头来看看有了 express-di 后我们能够把上面那个 loadUser 的例子改成什么样：

    :::javascript
    app.factory('currentUser', function(req, res, next) {
      User.findById(req.session.userId, next);
    });

    var role = function(role) {
      return function(currentUser, next) {
        if (!currentUser || currentUser.role !== role) {
          return next(new Error('access denied'));
        }
        next();
      };
    };

    app.get('/dashboard', role('admin'), function(currentUser, res) {
      res.render('dashboard', { user: currentUser });
    });

这段代码和之前的代码有两个显著不同的地方：

1. 去除 `loadUser` 中间件，将其本质化，即转换成它本身的角色：依赖。我们使用 express-di 提供的 `app.factory` 方法定义依赖，该方法接收两个参数，第一个参数是依赖名称，第二个参数是依赖的定义函数，定义函数和 Connect 的 middleware 相似，唯一的不同是前者中的 `next` 函数接受两个参数，第一个参数是 node.js 的惯例——err，当 err 为非 [cci lang="javascript"]null` 时，定义函数会和普通的路由中间件一样将 err 传出；第二个参数是该依赖对应的值。</li>
2. 将路由中间件的形参从 `(req, res, next)` 转变为依赖声明。如 `role()` 中间件中声明了 `currentUser` 和 `next` 两个依赖，而最后一个中间件（即负责渲染视图的函数）则声明了 `currentUser` 和 `res` 两个依赖。</li>

可以明显看到，express-di 模块通过将路由中间件中作为依赖的部分提取出来进行语义化，从而解决了前文中提到的问题。另外 express-di 模块预定义了 3 个依赖，分别为 `req`, `res` 和 `next`，使得其可以完美兼容传统的路由中间件的定义，不会有任何兼容问题。

### 对子 App 的支持
当项目比较大的时候，我们经常会将项目拆分成多个 express app，如：

    :::javascript
    var express = require('express');
    var mainApp = express();
    var subApp = express();
    mainApp.use(subApp);

上面代码中，`subApp` 是 `mainApp` 的子 App。express-di 对这种使用方法提供了非常好的支持，子 App 会继承父 App 定义的依赖，同时子 App 定义的依赖不会影响到父 App，例子如下：

    :::javascript
    var express = require('express');
    require('express-di');
    var mainApp = express();
    var subApp = express();
    mainApp.use(subApp);

    mainApp.factory('parents', function(req, res, next) {
      next(null, 'parents');
    });

    subApp.factory('children', function(req, res, next) {
      next(null, 'children');
    });

    mainApp.get('/parents', function(children, res) {
      res.json(children);
    });

    subApp.get('/children', function(parents, res) {
      res.json(parents);
    });

上述代码执行后，访问 /parents 时程序会报错，提示 "Unrecognized dependency: children"，而访问 /children 时，页面会打印出 "parents"。

### 性能与缓存
express-di 模块会在程序启动阶段解析依赖，启动后就和普通的 Express 项目没有区别了，性能并不受影响。同时单个请求中的同一个依赖会被缓存起来，只执行一次，所以使用 express-di 反而可能会比使用传统模式写出来的代码拥有更好的性能。

### 单元测试
当你通过依赖注入模式将依赖引入路由后，你会发现在单元测试时可以非常方便地将 mock 对象传入路由，而这正是依赖注入模式的另一个好处。

## 结论
我在最近的几个 Express 项目中使用了 express-di 模块，并惊喜地发现这个模块使项目代码的可读性和可维护性大大增加。而且因为 express-di 兼容传统的路由定义方法，你可以非常方便地在现有的项目中引入 express-di，从而使新定义的路由能享受依赖注入带来的便利，同时又无需对老的代码做任何修整。

项目地址在：<a href="https://github.com/luin/express-di">https://github.com/luin/express-di</a>。欢迎 star 或提 issue！
