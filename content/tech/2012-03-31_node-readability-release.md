Title: 让阅读更轻松，readability for node.js发布
Tags: commonjs, github, module, Node.js, open source, readability

Readability是从一个开源项目发展而来的产品，该项目托管在<a href="http://code.google.com/p/arc90labs-readability/" target="_blank">Google Code</a>上，不过现在已经不再维护。由于其最初设计在浏览器上运行，在node.js中难以使用，而且转换效果和Readability现在的服务也相差较大。所以这几天我重写了这个项目，具体更新内容附后。

项目托管在<a href="https://github.com/luin/node-readability" target="_blank">GitHub</a>上。

<!-- more -->

## 更新内容
* 重写代码，增强可读性，更符合node.js书写风格，实现CommonJS标准，并利于服务端调用；
* 支持GBK, GB2312等编码；
* 识别/兼容更多的视频网站；
* 增加提取文章标题功能；
* 对Wordpress搭建的博客进行特殊处理，效果更好；
* 性能优化（去除了针对IE浏览器的Hack，并使用了V8的trim函数代替正则表达式等）；
* 重写计算链接比率的部分，对页内锚点做了修正；
* 修复会忽略部分网站导航链接的问题；
* 修复会删除正文中独立img的bug；
* 增加debug开关；
* 支持中文标点(readability以标点作为判断正文依据之一)；
* 增加延迟求值功能，在迭代时速度更快（当不需要文章内容的情况下）；
* 支持图片、链接的相对路径转换。

## TODO
* 分析文章评论、Tag等;
* 更多性能提升;
* 兼容性改进;
* 增加测试、benchmark。
