Title: 减少异步嵌套，Express-promise
Tags: express, middleware, node.js, open source, promise

在使用 <a href="http://expressjs.com" target="_blank">Express</a> 框架开发网站或 API 时，经常会因为 Node.js 的异步流程造成逻辑代码中嵌套回调函数过多的问题。这时可以考虑使用 Promise 来简化这个流程。关于 Promise 可以参考以下资料：

<a href="http://www.infoq.com/cn/news/2011/09/js-promise" target="_blank">http://www.infoq.com/cn/news/2011/09/js-promise</a>
<a href="http://martinfowler.com/bliki/JavascriptPromise.html" target="_blank">http://martinfowler.com/bliki/JavascriptPromise.html</a>

现在 Node.js 很多 ORM/ODM 都通过 Promise 来返回查询、执行结果，而普通的 Node.js 风格回调函数可以很容易的转换成 Promise。

为此，我为 Express 框架开发了一个 middleware 用来更方便地使用 Promise。

<!-- more -->

例如，我们可能会经常写出如下代码：

    :::javascript
    app.get('/users/:userId', function(req, res) {
      User.find(req.params.userId).then(function(user) {
        Project.getMemo(req.params.userId).then(function(memo) {
          res.json({
            user: user,
            memo: memo
          });
        });
      });
    });

而使用 express-promise 后，上面的代码可以改写成：

    :::javascript
    app.get('/users/:userId', function(req, res) {
      res.json({
        user: User.find(req.params.userId),
        memo: Project.getMemo(req.params.userId)
      });
    });

更多实例可以见项目主页： <a href="https://github.com/luin/express-promise" target="_blank">https://github.com/luin/express-promise</a>

项目同样对 Mongoose 的 Query 对象提供了额外的支持。
