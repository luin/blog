---
title: "Web 开发者怎么学 Node.js"
tags:
  - Node.js
  - web
---

如果你是一个 Web 开发者，想必你一定听过 Node.js。这篇文章会告诉你如何开始学习 Node.js。

这里假定你有过 Web 后端的开发经验，无论是 PHP, Python, Ruby 还是 Java。

<!-- more -->

## 1. 学习 JavaScript

接触过前端 JavaScript 开发的同学可以跳过这一部分，只需要确认你已经掌握了<strong>闭包</strong>和<strong>原型</strong>。

学习 JavaScript 我推荐以下书籍:
<a href="http://book.douban.com/subject/10546125/" target="_blank">《JavaScript 高级程序设计》</a>
这是一本这样的书：有人说它不适合入门，有人说它是入门的不二选择。总之它确实是从基础讲起，更重要的是，它是本好书。值得注意的是书中有些内容是和前端开发相关的，大可以略过不看。
<a href="http://book.douban.com/subject/3590768/" target="_blank">《JavaScript 语言精粹》</a>
依然是本好书，没啥可说的。

## 2. 学习 HTTP

相信 Web 后端开发者对 HTTP 都很熟悉，但仍然还是觉得顺便提一下比较好。

## 3. 学习 Node.js

Node.js 现在的中文资料不多，而且 Node.js 的更新速度很快，所以看英文资料会比较好。
Node.js 的官网是<a href="http://nodejs.org" target="_blank">http://nodejs.org</a>。学习 Node.js 要先从官网下载安装 node。官网页面下面有一个很不错的例子，用 6 行代码实现一个 Web Server，这个当做 Node.js 的“Hello World”很合适。需要说明的是，Node.js 写的 Web Server 是可以在生产环境下使用的，并且性能颇高。

之后推荐阅读<a href="http://www.nodebeginner.org" target="_blank">The Node Beginner Book</a>，讲的很通俗易懂（在页面上方可以选择中文版哦）。

接下来是最重量级的两个页面：<a href="http://nodeguide.com/beginner.html" target="_blank">Felix's Node.js Beginners Guide</a> 和 <a href="http://nodeguide.com/style.html" target="_blank">Felix's Node.js Style Guide</a>。Felix 是谁：

> Hi, I am Felix Geisendörfer, an early Node.js core contributor and co-founder of transloadit.com.

另外有闲的同学可以看看小羞怯同学 Ryan Dahl（Node.js 的创造者）的演讲视频 <a href="http://www.youtube.com/watch?v=jo_B4LTHi3I" target="_blank">Introduction to Node.js with Ryan Dahl</a> （如果你感兴趣，这是我在 YouTube 上完整看过的唯一一个正经的视频）。

最后，<a href="http://nodejs.org/api/" target="_blank">Node.js 官方文档</a>是你开发过程中会反复查阅的最重要的文档，相信我，你离不开它的。

## 自问自答

- Q: 有这么多东西要看，什么时候才能开发呢？

  A: 取决于你，我建议在看完 Felix's Node.js Beginners Guide 中 The module system 一节后就可以开始动手写小网站了，比如留言板，论坛什么的。其余的教程可以一边写一边看。

- Q: 用框架吗？用什么框架？

  A: 先不用框架写一个小网站，注意一定要是小网站。然后你会感叹 Node.js 写个网站好麻烦。这时你可以使用 <a href="http://expressjs.com" target="_blank">Express 框架</a>。学习 Express 的方法：看官网的 Guide，然后看例子，同时对照着例子查看官网的 API，最后看 Express 的源代码（这一步最好不要省略，这不仅能帮你理解 Express，也能让你学到很多 Node.js 的技巧，而且代码很短的哦）。

  等等，还有一个 Express 的超赞教程：<a href="http://dailyjs.com/tags.html#lmawa" target="_blank">Let's Make a Web App: Nodepad</a>，不过教程中用的 Express 是 2.\* 版本，现在已经是 3.0 了，有些地方有所区别，不过问题不大。

- Q: 使用哪个 Node.js 版本？

  A: 使用最新的，另外 Node.js 的版本号: 0.8.6，其中第二位奇数表示不稳定版，偶数是稳定版。

- Q: Node.js 有没有包管理器？

  A: 有，并且很好用：<a href="https://npmjs.org" target="_blank">Node Packaged Modules</a>
