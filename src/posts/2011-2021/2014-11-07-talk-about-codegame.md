---
title: "Code Game 对技术的选取"
tags:
  - JavaScript
  - CSS
  - game
---

这篇日志将以偏技术的角度介绍我最近在做的业余项目 Code Game，其中我会解释 Code Game 对某些技术是如何进行取舍的，包括为什么不使用 CoffeeScript 以及选择 Myth 代替 Less/Sass 的原因。

## Code Game 是什么

Code Game 是我花费一个月的业余时间完成的 AI 脚本对战平台，网址是 <a href="http://codegame.org">http://codegame.org</a>，玩家可以通过编写 JavaScript 脚本来控制游戏中的角色并与平台上的其他玩家进行竞赛。

Code Game 的灵感来源于大学时我在北航 MSTC(Microsoft Technology Club) 参与的 BigTank 项目。BigTank 是一个使用 C# 开发的 3D 坦克对战游戏，与传统坦克对战游戏由玩家直接操控坦克不同，BigTank 的玩家需要通过编写 Lua 脚本来分析游戏局势并控制自己的坦克行动，本质上是一个关于 AI 算法的 Online Judge 平台。基于 BigTank，MSTC 举办了编程挑战赛，在北航获得了很好的反响。可惜限于开发周期和当时的技术水平，BigTank 本身存在很多不足，包括游戏规则欠考虑、脚本解析器存在不少 Bug 等，种种这些都或多或少地影响了比赛的精彩程度。一个月前，我终于决定重新开发一套类似 BigTank 的平台来弥补遗憾。

## 功能

Code Game 的页面构成很简单，挨个介绍也并不会花费很多篇幅。用户使用 GitHub 账号登录网站会进入个人主页页面，在这个页面中玩家可以看到自己的资料和 AI 的排名：

<img src="/assets/images/2014-11-12_codegame/profile.png" alt="个人主页" />

点击“编写我的 AI”按钮就来到了脚本编写页面，该页面由支持代码高亮和自动补全的在线编辑器、可以实时看到脚本的运行效果的预览画面以及用来查看调试信息的控制台组成：

<img src="/assets/images/2014-11-12_codegame/editor.png" alt="编辑器" />

Code Game 每天会根据 AI 的胜率更新一次排行榜，通过排行榜可以看到每个玩家的排名，并且点击昵称可以进入其个人主页：

<img src="/assets/images/2014-11-12_codegame/rank.png" alt="排行榜" />

玩家可以在他人的个人主页向对方发起挑战，发起挑战后玩家会进入挑战页面，并看到两个脚本的对战情况，游戏结束后页面会告知玩家胜者及胜利原因：

<img src="/assets/images/2014-11-12_codegame/game.png" alt="挑战页面" />

## 技术架构

Code Game 的技术架构以及对技术的取舍理念是优先考虑开发效率，并在保证运行效率可接受的前提下尽量降低技术栈复杂度。

### 1. 开发语言

Code Game 使用 <a href="http://nodejs.org/">Node.js</a> 开发，除了我对其较熟悉以外，选择 Node.js 的另一个重要原因就是使用 Node.js 实现 JavaScript 脚本沙盒相较其他语言要容易得多。

### 2. 前端技术栈

前端使用了 <a href="http://gulpjs.com/">Gulp</a> + <a href="http://www.myth.io/">Myth</a> + <a href="http://browserify.org/">Browserify</a> + <a href="http://bohemiancoding.com/sketch/tool/">SketchTool</a>，下面分别详细介绍。

#### Gulp

平常的开发中，对于小型项目我一般会使用 Make 或 NPM 的 scripts 来进行构建任务。而 Code Game 由于需要构建的内容较多，所以选择了 Gulp。相较于更为流行的 Grunt，Gulp 的 Stream 理念使得完成同样的构建任务时编写的代码更少。在 Code Game 中，Gulp 中的任务分为两类：一类任务用来实现检测源文件的改动并自动编译，比如将基于 Myth 编写的 CSS 实时编译为可以被浏览器解析的 CSS；另一类任务则用来执行生产环境的构建，比如合并 CSS、压缩 JavaScript 等。

#### Myth

Myth 在各种 CSS 预处理语言中绝对算不上流行，在 GitHub 上其共被 3000 余人 star，虽然不算少，但相比 Less 这样动辄一万多 star 的项目说是冷门也毫不过分。Myth 的优势和它的口号一样：“CSS the way it was imagined.” Myth 可以让你提前使用 CSS 的高级特性而无需考虑浏览器兼容问题。举例来说，当用到 `transform` 属性时通常还需要额外加上浏览器前缀 `-webkit` 来兼容 Safari 和 旧版的 Chrome，如果要兼容 IE 9，则更是要加上 `-ms`。而使用 Myth 则不用操心这个问题：只需要写一个 `transform`，Myth 会在编译过程中自动加上需要的前缀。Myth 与 Less、Sass 这样的预处理语言最大的区别就在于写 Less 时你是在写 Less，写 Sass 时你是在写 Sass，而当你写 Myth 时，你就是在写 CSS。这一点十分重要，因为把标准和草案都算上，CSS 语言本身已经足够完备了，它支持变量：

```css
:root {
  --purple: #847ad1;
  --large: 10px;
}

a {
  color: var(--purple);
}

pre {
  padding: var(--large);
}
```

也支持数学计算：

```css
pre {
  margin: calc(var(--large) * 2);
}
```

甚至还支持颜色处理：

```css
a {
  color: var(--purple);
}

a:hover {
  color: color(var(--purple) tint(20%));
}
```

可以说需要用到的特性 CSS 本身就已经具备了，那么何必再使用另一种语言呢？更何况 Less 和 Sass 这样“强大”的预处理语言在带来开发上方便的同时也引入了很多问题，而大部分问题都可以归结到一点，即“你根本就不是在写 CSS”。看下面的 Less 代码：

```less
.container {
  width: 960px;
  overflow: hidden;
  .main {
    width: 61.8%;
    float: left;
    .post {
      background: #f00;
      .title {
        position: absolute;
        background: url("images/header-image.jpg");
      }
    }
  }
}
```

Less 支持的样式嵌套很容易诱使开发者写出上面这样层层嵌套的代码，编译成 CSS 后，最长的 Selector 是 `.container .main .post .title` ，以纯 CSS 的眼光来看，应该减少嵌套层数来提高性能（比如改成 `.post .title` ），亦或是优化类名来实现样式模块化（比如把 `.post .title` 改成 `.post-title` ）。然后一旦用 Less 写出来，就很难以 CSS 的角度来审视本就要编译成 CSS 的代码。很多使用 Less 或 Sass 的公司的 Style Guide 都会明确禁止过度嵌套，然而与其以规范来要求开发者，不如就单纯地使用 CSS，并享受 Myth 提供的便利来的方便自然。

#### Browserify

Browserify 可以非常方便地实现前端 JavaScript 的模块化。使用 Browserify，你可以在前端的 JavaScript 中使用和 Node.js 一样的模块加载方式，即 `require('modules')`，使得前后端 JavaScript 模块级复用成为了可能。Code Game 游戏沙盒部分的所有模块曾经是前后端共用的，当用户在编辑器中预览时沙盒运行在前端，当与其他玩家竞赛时，沙盒则运行在后端。同时 Browserify 作为一个构建工具，并不影响前端脚本的加载逻辑，换言之在使用 Browserify 的同时依然可以使用 RequireJS、SeaJS 这样的 Module Loader 以及 Combo Handler 等技术。

除了 Browserify 以外，Code Game 没有使用其他的 JavaScript 预处理工具。也没有使用 <a href="http://coffeescript.org/">CoffeeScript</a>、<a href="http://livescript.net/">LiveScript</a> 这样的语言替代 JavaScript，原因在于 JavaScript 在前端工程方面本身已经足够优秀，而 CoffeeScript 和 LiveScript 这样的语言在提供更“现代”的语法同时，也会大大降低代码的可控性。同 Less 和 CSS 的关系一样，CoffeeScript 与 JavaScript 在语言层面的差异会导致二者间代码逻辑的不调和。一个最明显的例子是 CoffeeScript 提供的 `class` 关键词使得其可以像<ruby><em>基于类</em><rt><a href="http://en.wikipedia.org/wiki/Class-based_programming">Class-based</a></rt></ruby>的语言一样实现和管理对象，然而 JavaScript 本身却是是<ruby><em>基于原型</em><rt><a href="http://en.wikipedia.org/wiki/Prototype-based_programming">Prototype-based</a></rt></ruby>的语言，当一个以基于类的思想编写的代码逻辑编译成基于原型的语言时，其间产生的落差已经不是语言之间的优劣可以衡量的了。更何况 CoffeeScript 语言本身就存在太多的问题，比如 CoffeeScript 的函数调用无需写 `()`，使得易读性大为下降（比较 `console.log x + 1` 和 `console.log x +1`），同时也引入了很多细节问题（比如无法实现 JavaScript 里的具名匿名函数 `invoke(function func() {})`），另外 CoffeeScript 生成的 JavaScript 虽然有很多最佳实践，但总体并不易读，也很容易生成冗余代码，比如：

```coffee
greet = (name) ->
  for time in ['morning', 'afternoon', 'nignt']
    console.log "Good #{time}, #{name}!"

greet 'Bob'
```

会生成：

```javascript
var greet;

greet = function (name) {
  var time, _i, _len, _ref, _results;
  _ref = ["morning", "afternoon", "nignt"];
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    time = _ref[_i];
    _results.push(console.log("Good " + time + ", " + name + "!"));
  }
  return _results;
};

greet("Bob");
```

虽然语句表达式化是好的，免去写 `return` 也是好的，但是 CoffeeScript 终究还是一门要编译成 JavaScript 的语言，本来简单的代码变得如此复杂，即使表面再光鲜又有什么意义呢。CoffeeScript 对于初级 JavaScript 程序员来说，可以帮助他们避免很多 JavaScript 的陷阱，也能更顺畅地写出最佳实践的代码，但从整体而言，一个富有经验的 JavaScript 开发者写出的 JavaScript 更可能要比 CoffeeScript 的可控性来的高。

#### SketchTool

之前做设计一直使用 Photoshop，直到见识到 Sketch 的威力后便很少碰 Photoshop 了。网上有很多文章讨论两者的设计优劣，所以不再赘述。这里主要介绍对开发者来说 Sketch 的优势。

相较 Photoshop，Sketch 最大的优势就是可以实现切图自动化，对于每个图层来都可以指定其导出格式以及文件名：

<img src="/assets/images/2014-11-12_codegame/sketch.png" alt="个人主页" />

更重要的是，Sketch 官方提供了命令行工具 SketchTool，可以通过命令将 Sketch 源文件按规则导出成图像文件，这意味着配合 Gulp 可以实现当修改 Sketch 的设计后自动切图。同时由于 Sketch 的文件普遍很小，所以甚至可以将其放入版本库中来维护其版本（自然这样也就无需将切好的图片放入版本库，因为这些图片可以由 Gulp 构建脚本生成）。

### 3. 沙盒的实现

在 Code Game 中最关键的一环就是沙盒的实现了。因为涉及到对战，所以比赛时双方选手的代码自然不能运行在前端以免让玩家看到对手的代码。所以 Code Game 采用如下流程来实现脚本对战：

0. 玩家在编辑器调试代码并保存；
1. 服务端将玩家的代码保存到 MySQL 数据库中；
2. 进行比赛时，服务端调集双方的代码，并在后端解析运行；
3. 运行结束后，将游戏“录像”传回前端；
4. 前端解析“录像”，并以动画形式展现给用户。

下面分三个部分着重介绍 3 和 5 两个过程。

#### 在后端解析玩家代码

这一过程是沙盒的意义所在。因为后端使用 Node.js 开发，而玩家的脚本本身是 JavaScript，所以解析脚本的过程本身就很简单，一个 `eval()` 即可。然而 `eval()` 并不能限制用户的脚本权限，从而使得用户的脚本可以访问 Node.js 的各种库函数，也会污染 Node.js 的全局变量，同时也无法对脚本的运行时间进行任何限制。

这个问题的解决方式是使用 Node.js 提供的 `script.runInNewContext()` 函数。`runInNewContext()` 函数接受两个参数：一个是全局变量对象，这个对象包含脚本可以使用的全部全局变量，在脚本中声明的全局变量也会保存在这个对象中；另一个是运行选项，可以在这个参数中指定脚本的超时时间，要注意的是这个参数是从 Node.js 0.11.x 开始支持的。

Code Game 定义了 `Sandbox` 类：

```javascript
var Sandbox = (module.exports = function (sandbox) {
  this.Math = Math;
  this.parseInt = parseInt;

  for (var key in sandbox) {
    if (sandbox.hasOwnProperty(key)) {
      this[key] = sandbox[key];
    }
  }
});
```

执行玩家脚本时，会实例化一个 `Sandbox` 实例作为全局变量对象，所以玩家能使用的全局变量只有 `Math` 和 `parseInt`。同时玩家的脚本都会声明一个 `onIdle()` 函数（具体可以参见<a href="http://codegame.org/doc">官网文档</a>），这个函数可以在之前的 `Sandbox` 实例 `sandbox` 中获取到。接下来需要实现在坦克空闲时执行 `onIdle()` 函数，如果直接调用 `sandbox.onIdle()` 来执行的话就无法借助 `runInNewContext()` 函数来实现超时检测了，所以 Code Game 使用如下的方法来解决这个问题：

```javascript
Player.prototype.onIdle = function (self, enemy, game) {
  var code = "onIdle(__self, __enemy, __game);";
  if (!this.script) {
    this.script = vm.createScript(code);
  }
  var start = Date.now();
  try {
    this.sandbox.__self = self;
    this.sandbox.__enemy = enemy;
    this.sandbox.__game = game;

    this.sandbox.print = function () {
      // ...
    };
    this.script.runInNewContext(this.sandbox, {
      timeout: 1500,
    });
  } catch (e) {
    // ...
  }
  this.runTime += Date.now() - start;
};
```

首先为 `__self`、`__enemy` 和 `__game` 这三个不对用户公开的全局变量赋相应的值，之后使用同样的 `Sandbox` 实例执行代码 `onIdle(__self, __enemy, __game)`。因为调用了 `runInNewContext()`，所以可以定义超时规则。

#### 录像文件的格式

为了将代码的执行结果在前端展示给用户，最重要的是把结果以一定规则记录下来，形成游戏录像。录像文件中记录了每个对象（坦克、子弹等）在每个帧的位置和执行的动作，如：

```javascript
[
  [
    {
      objectId: "6e723",
      type: "tank",
      direction: "right",
      position: [6, 7],
      action: "go",
    },
    {
      objectId: "4ad3f",
      type: "tank",
      direction: "left",
      position: [10, 2],
      action: "turn",
      value: "left",
    },
  ],
  [
    {
      objectId: "6e723",
      type: "tank",
      direction: "right",
      position: [6, 8],
      action: "go",
    },
  ],
];
```

首先录像的最外层是个数组，数组的一个元素代表一帧发生的所有动作。上面的示例录像中，第一帧坦克 6e723 从坐标 `(6, 7)` 向当前方向（右）前进了一个单位，同时坦克 4ad3f 向左转弯。第二帧坦克 6e723 从坐标 `(6, 8)` 继续前进了一步，同时坦克 4ad3f 没有执行任何操作。

理论上来说，录像文件中只要记录每个对象最初的状态和中间每步的动作即可使数据完整。然而可以注意到上面的录像样例中的每一帧都会把对象的所有信息记录下来，包括朝向和坐标。这使得前端播放录像时可以从任意一帧开始播放，而不需要从头开始初始化对象状态，另外由于 Code Game 的录像一般都很小（游戏限定 200 帧之内必须结束），所以这样记录从成本考量也可以接受。

#### 前端录像展示

一般而言在前端实现动画有如下几种方式：

0. 通过 JavaScript 操作 DOM；
1. 使用 CSS Animation；
2. Canvas 动画。

在开发 Code Game 项目时，首先排除的是 Canvas。虽然 Canvas 的性能优异且兼容性良好，但是就播放录像这样简单的需求而言使用 Canvas 开发相对繁琐。其次排除的是直接操作 DOM，因为 JavaScript 实现的动画进行微小的位移时会出现抖动，而 Code Game 开发时希望对战页面可以在移动设备上播放，同时用户可以自定义播放速度，这就使得小位移的动画非常容易出现。

所以最后采取的播放录像的动画方案是 CSS Animation。录像中的每个拥有 `objectId` 属性的对象都会为其生成 DOM 节点，节点的 ID 由 `objectid` 构成，同时根据 `type` 的不同为其赋予不同的背景图。具体的动画实现以下面的动作为例：

```javascript
{
  "objectId": "6e723",
  "type": "tank",
  "direction": "right",
  "position": [6, 7],
  "action": "go",
}
```

首先通过 JavaScript 找到 6e723 DOM 节点，然后根据当前游戏的 FPS 和地图大小 修改该节点的 Transition 时间，同时通过 `transform` 的 `translate` 操作来移动对象。

这样的实现存在一个问题，假设一个坦克不转向，一直前进了 10 个单位，前端会修改 10 次节点的 `transition` 和 `transform` 属性，每次只移动一个单位。而实际上对于这种情况可以优化成只修改一次属性，一次直接前进 10 个单位，当然 `transition` 的时间也要相应乘以 10。因为在游戏中坦克直线连续行进的地方很多，所以这种优化效果很明显。为此 Code Game 在前端会在解析录像前对录像进行优化，合并直线前进的操作。如上面的录像实例会被优化成：

```javascript
[
  [
    {
      objectId: "6e723",
      type: "tank",
      direction: "right",
      position: [6, 7],
      action: "go",
      frames: 2,
    },
    {
      objectId: "4ad3f",
      type: "tank",
      direction: "left",
      position: [10, 2],
      action: "turn",
      value: "left",
    },
  ],
  [],
];
```

坦克 6e723 在第一帧的动作中增加了 `frames: 2` 这个属性，表明一共前进了两帧，在之后播放动画时就可以大大降低修改 DOM 属性的次数了。

## 结语

这篇文章从开发 Code Game 项目的角度介绍了我对 Less/Sass 和 CoffeeScript 这些流行技术的取舍，以及在 Node.js 中开发沙盒的一些经验。然而技术本身其实并没有明显的优劣可言，只有基于特定项目和特定的开发者讨论时，关于“取舍”的话题才有意义。如果大家关于本文有什么想法，欢迎留言讨论。

另外 Code Game 已经<a href="http://github.com/luin/codegame">在 GitHub 上开源</a>，欢迎 Star！
