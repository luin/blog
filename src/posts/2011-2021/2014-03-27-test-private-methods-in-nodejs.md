---
title: "在 Node.js 中测试模块的内部成员"
tags:
  - Node.js
  - testing
---

模块（Module）的内部成员是指没有通过 `module.exports` 导出的变量或函数。如下面的示例模块：

```javascript
var A = function () {
  // 执行某些操作
};

module.exports = function B() {
  A();
};
```

其中函数 `A` 就是该模块的内部成员，而命名函数表达式（Named Function Expression） `B` 则是该模块的公开成员。绝大多数情况下，单元测试只关注模块的公开成员，这是因为公开成员代表着模块的接口与功能，而内部成员则与模块的具体实现相关。对模块的内部成员进行测试，意味着测试代码需要了解模块的实现细节，导致测试代码与实现代码高度耦合，进而阻碍日后对代码的重构，这显然违背了单元测试的本意。而且实践 TDD 时，测试先于实现，更谈不上对模块的实现细节进行测试了。

然而凡事都有例外，实践时并不能百分之百地保证测试代码不需要直接访问模块内部成员。下面本文将就两种情况对如何测试模块内部成员进行介绍。

<!-- more -->

## 1. 引入的外部模块

当要测试的模块包含依赖外部资源的操作（如请求网络数据）时，我们需要 [Stub](http://en.wikipedia.org/wiki/Test_stub) 该操作。考虑下面的代码：

```javascript
// 文件名：get_url_content.js
var request = require("request");

module.exports = function (url, callback) {
  request.get(url, function (err, res, body) {
    callback(err, body);
  });
};
```

该模块通过引入 [Request](https://github.com/mikeal/request) 库，提供了一个获取网页内容的接口。显然在测试时我们需要对 `request.get` 进行 Stub。然而因为 `request` 并未被导出（即为内部成员），无法直接被外界访问，所以在测试代码中直接操作 `request.get` 看上去很难实现。不过特殊的是，使用 `require` 函数引入外部模块时，Node.js 会根据模块的实际文件路径进行缓存，同一路径的模块只会加载一次。这就意味着同一进程的多个模块引入同一外部模块时，得到的是同一对象。即如果在测试代码中同样引入 Request 模块并对其 `get` 方法进行 Stub，就如同在要测试的模块中对 `request.get` 进行 Stub。于是测试代码可以写成：

```javascript
var sinon = require("sinon");
var getUrlContent = require("./get_url_content");
var request = require("request");

describe("getUrlContent(url, callback)", function () {
  var url = "http://example.com";
  var body = "source code";
  beforeEach(function () {
    sinon.stub(request, "get").withArgs(url).yields(null, null, body);
  });

  it("should return the source code", function (done) {
    getUrlContent(url, function (err, result) {
      result.should.eql(body);
      done();
    });
  });

  afterEach(function () {
    request.get.restore();
  });
});
```

上面的代码使用了 [Sinon](http://sinonjs.org) 库实现 Stub。Sinon 是一个非常好用的测试辅助框架，提供了对 Spy, Stub 和 Mock 的支持。

## 2. 对内部定义的成员测试

如果要测试的内部成员是在模块中定义的而非通过 `require` 加载而来，对其测试就变得相对困难了。让我们再回头看文章开头的例子：

```javascript
// 文件名：module_b.js
var A = function () {
  // 执行某些操作
};

module.exports = function B() {
  A();
};
```

如果要对函数 `A` 进行测试，因为 `A` 并未导出，所以在测试代码中通过 `require` 引入该模块是无法直接访问到 `A` 的，更谈不上测试。这时可以使用 [Rewire 库](https://github.com/jhnns/rewire) 提供的 `rewire` 方法来代替 `require` 以实现访问内部成员的目的。`rewire` 的工作方式和 `require` 几乎相同，只不过前者额外为被引入的模块提供两个方法 `__get__` 和 `__set__`，分别用来读取和写入该模块的内部成员。

首先使用 `npm install rewire` 来安装 Rewire，然后在测试代码中使用 `rewire` 来引入要测试的模块（即上面的 module_b.js）：

```javascript
var rewire = require("rewire");
var B = rewire("./module_b");

var A = B.__get__("A");
```

上面的代码中，我们使用 `B.__get__('A')` 就可以获得 B 模块中的内部成员 `A`，进而可以对 `A` 进行测试。使用 Rewire 使得测试模块内部成员变得非常简单，但是务必要注意永远不要让其出现在非测试代码中，因为 Rewire 会破坏 Node.js 的模块系统，从而导致代码混乱。
