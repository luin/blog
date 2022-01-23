---
title: "module.exports 还是 exports？"
tags:
  - commonjs
  - exports
  - JavaScript
  - module
  - Node.js
---

Node.js 通过实现 CommonJS 的 Modules/1.0 标准引入了模块（Module）概念，一个模块可以通过 `module.exports` 或 `exports` 将函数、变量等导出，以使其它 JavaScript 脚本通过 `require()` 函数引入并使用。

现在有一个问题：到底应该用 `module.exports` 还是用 `exports` 呢？

<!-- more -->

最好的方法就是查看 Node.js 的<a href="http://nodejs.org/api/modules.html#modules_the_module_object" target="_blank">官方文档中关于 module 的介绍</a>：

> In particular module.exports is the same as the exports object.

可以看出 `module.exports` 和 `exports` 其实是一样的。在代码里比较：

```javascript
console.log(module.exports === exports);
```

输出结果也是 `true`。

然而参照 <a href="http://stackoverflow.com/a/7142924" target="_blank">"module.exports vs exports in nodeJS"</a> 中的例子，考虑下面的代码：

```javascript
// a1.js
exports = function () {
  console.log("hi a2!");
};
```

```javascript
// a2.js
module.exports = function () {
  console.log("hi a2!");
};
```

```javascript
// b.js
console.log(require("./a1"));
console.log(require("./a2"));
```

执行 node b，输出结果如下：

```shell
{}
[Function]
```

可见 a1.js 的 function 导出失败了，而 a2 却成功了。原因是什么呢？搜索无果后我直接查看了 <a href="https://github.com/joyent/node/blob/master/lib/module.js" target="_blank">Node.js 的源代码</a>：

```javascript
// file path: node/lib/module.js

// ...
global.require = require;
global.exports = self.exports;
global.__filename = filename;
global.__dirname = dirname;
global.module = self;

return runInThisContext(content, filename, true);
// ...
```

这段代码的作用是为 `global` 赋属性并调用 `runInThisContext()` 函数运行模块(其内容已经事先读入到 `content` 变量)。模块中使用的 `exports` （即 `global.exports`）其实是对 `self.exports` 的引用，对 `exports`进行修改会影响到 `self.exports`，但如果对其赋值，`exports` 则不再是 `self.exports` 的引用了。而对 `module.exports` 赋值自然就没有问题。

了解这个，有些 Node.js 模块的源代码中的 `exports = module.exports = someObject` 也可以理解了：只使用 `module.exports = someObject` 的话 `module.exports` 引用的地址变了，而 `exports` 引用的还是之前的地址，所以下面的代码中再修改 `exports` 就不会再改变 `module.exports` 的值了。

## 总结

养成好习惯，如果不给 `exports` 本身赋值的话就用 `exports.sth = sobj`，如果要赋值的话则这样写：

```javascript
exports = module.exports = someObject;

exports.sth = sobj; // 如果还需要加入其他属性则这样写
```

## 更多阅读

1. <a href="http://wiki.commonjs.org/wiki/Modules/1.0" target="_blank">CommonJS Modules/1.0</a>
   CommonJS 的成果之一就是为 JavaScript 加入了 module 概念，Node.js 实现了其中 Modules/1.0 标准。在这个网站上可以看到其它实现该标准的项目，看看你写的模块还可以在哪个项目里用。
2. <a href="http://www.hacksparrow.com/node-js-exports-vs-module-exports.html" target="_blank">Exports vs module.exports</a>
   为数不多的讨论此问题的文章，讲得比较清楚，只是对 module.exports 和 exports 的关系没有说到本质。
