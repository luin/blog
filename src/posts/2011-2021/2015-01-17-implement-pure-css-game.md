---
title: "纯 CSS 实现打地鼠游戏"
tags:
  - CSS
---

只借助 CSS 而不使用 JavaScript 来实现一个网页游戏并不需要什么新潮的技术，简单的几个选择器组合就能创造出意想不到的效果，再配合上 CSS3 的“绘图”能力，甚至可以做出不逊于 JavaScript 实现的网页游戏。
为了参加公司内的 CSS3 比赛，我连夜做了一个 CSS3 打地鼠游戏（其实准备时间挺长的，但是报了个名就忘记这回事了，交稿前两天被人提醒才想起来），如下：

<img src="/assets/images/2015-01-17_implement-pure-css-game/game.png" alt="游戏截图" />

进入游戏后，首先会有个开始按钮，点击开始后，游戏开始倒计时，同时不断地有地鼠从洞里钻出来，用鼠标点击地鼠即可得分（总分显示在顶部的记分板上）。15 秒后游戏结束，同时显示结束页面。

项目代码放在 <a href="https://github.com/luin/Hits-the-mole">GitHub</a> 上，也可以访问<a href="http://luin.github.io/Hits-the-mole/">在线 Demo</a>试玩。

这篇日志将介绍实现这个游戏的过程中我认为比较有意思的几个地方。

## 使用 CSS 绘制地鼠

由于是个纯 CSS 游戏，为了不使用图片，所有的游戏角色都使用了 CSS 进行绘制。在这个游戏中主要有两个元素：地洞和地鼠。地洞（你别骗我啦，那个明明就是马里奥的小绿桶嘛）画起来很简单，用一个元素和其 `:before` 伪元素结合，设置好位置和尺寸，加些渐变色就可以了。稍微复杂点的是地鼠的绘制，为了实现方便，我希望能<strong>只使用一个元素</strong>来绘制（稍候会介绍原因）。绘制步骤如下：

### 1. 首先找一个参照物

地鼠是什么样子的呢？虽然玩了很多次打地鼠游戏，其实我对地鼠的样子一点印象都没有。不过这怎么能难倒前 Go 语言爱好者的我呢！我淡定地打开了 Go 的官网，端详了一下那个可爱的吉祥物：

<img src="/assets/images/2015-01-17_implement-pure-css-game/gopher.png" alt="Go语言吉祥物" class="center" />

我们先来把地鼠分成 3 个部分，主体、左耳朵和右耳朵。其中主体可以使用元素本身表现，设置宽高和 `border-radius` 来实现圆角：

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="EaWBEV" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="EaWBEV">
  <span>See the Pen <a href="https://codepen.io/luin/pen/EaWBEV">
  EaWBEV</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

等等，根本不像啊！

下面关键的地方来了，怎么实现画眼睛和鼻子。因为 CSS <a href="http://caniuse.com/#search=multiple%20background">支持一个元素多个背景图</a>，而每个背景图不仅可以是由 `url` 指定的函数，还可以是一个 `gradient` 类型来表示渐变。由于眼睛和鼻子都是近似圆形的，所以可以用射线渐变 `radial-gradient` 来实现。技巧在于对透明色的使用，使得渐变看起来并不是充满整个元素的。请结合下面的代码来理解：

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="gbmNev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="gbmNev">
  <span>See the Pen <a href="https://codepen.io/luin/pen/gbmNev">
  gbmNev</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### 2. 使用 `:before` 和 `:after` 伪元素实现耳朵

耳朵和主体一样，也可以使用 `radial-gradient` 来绘制，这里不在赘述。效果如下：

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="azJgGd" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="azJgGd">
  <span>See the Pen <a href="https://codepen.io/luin/pen/azJgGd">
  azJgGd</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

等等！还是不对啊，下半身还没画呢，脚呢！

别担心，在游戏中地鼠是不会露出下半身的。

## “开始”按钮的实现

进入游戏后，会出现开始界面，只有用户点击了“开始”按钮后游戏才会开始。如果可以使用 JavaScript，那么只需要绑定按钮的 `click` 事件来实现相应逻辑，那么使用 CSS 要怎么实现呢？

其实方法很简单，只需要想一下 CSS/HTML 中怎么才能够保存状态即可。没错，就是 `input[type="checkbox"]`。只要用户点击了按钮，就把 checkbox 选中，接下来就可以用 CSS 的 `+` 和 `~` 选择符来设置游戏中其他元素的属性了。比如如果想要 checkbox 选中后令开始界面（`.start`）隐藏，只需要：

```css
input[type="checkbox"]:checked + .start {
  display: none;
}
```

借此我们可以把“点击按钮开始游戏”简化为“点击按钮选中 checkbox”，很容易想到可以使用 `label` 来实现按钮。在 HTML 中，点击 `label` 标签会自动选中其对应的表单元素，所以我们只需要把 checkbox 隐藏，并把 `label` 设置成按钮的样子即可。如下代码所示：

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="ByWgGO" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ByWgGO">
  <span>See the Pen <a href="https://codepen.io/luin/pen/ByWgGO">
  ByWgGO</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## 打地鼠的实现

实现打地鼠和实现“开始”按钮的思路是一样的，也是用户点击地鼠后设置其的 `checked` 属性，不同的是这里我们使用另一种方法来绘制地鼠：地鼠本身不是 `label`，而是 `input[type="radio"]`。至于为什么用 radio 而不是 checkbox 稍候会解释，在这一节中 radio 和 checkbox 都是可以的。

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="EaWBMy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="EaWBMy">
  <span>See the Pen <a href="https://codepen.io/luin/pen/EaWBMy">
  EaWBMy</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

要注意的是需要使用 `appearance: none` 来禁用 radio 元素的默认控件样式。

## 技巧：记分板

记分板的实现并不复杂，但是思路比较绕。在 CSS 中没有办法存放数据（可以使用 <a href="http://caniuse.com/#search=counter">CSS Counters</a>，但无法实现得分动画效果），使得记分板功能看起来很难实现。实际上我们可以这样想：要实现点击地鼠记分板加一，就要让地鼠和记分板联动起来。一般来说最容易想到的联动方式就是我们之前用过的 label + checkbox 和 `+`/`~` 选择器，实际上还有另一种联动方式，就是 radio。要知道拥有同一 name 的 一组 radio 同时只会有一个元素被选中，所以接下来就很容易想到可以让地鼠是一个 radio，同时记分板是一个 radio，两个元素拥有相同的 name 即可实现点击地鼠后记分板发生变化。

下面的问题就是怎么把记分板的 radio 的选中状态转换成具体数字了。思路是这样的：

0. 每个 radio 都占据一定高度
1. 每个分数都以一个元素的形式来展现，高度和 radio 相同
2. 使用一个 viewport 来显示当前分数，当 radio 被取消选中后，将其高度设置为 0，这样下面的分数就会向上升，使得当前对应的分数在 viewport 中显示出来。

整个结构如下图所示：

<img src="/assets/images/2015-01-17_implement-pure-css-game/score.png" alt="score结构图" class="center" />

示例代码如下（点击地鼠分数会变化）：

<p class="codepen" data-height="300" data-theme-id="11447" data-default-tab="css,result" data-user="luin" data-slug-hash="wBJLLR" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wBJLLR">
  <span>See the Pen <a href="https://codepen.io/luin/pen/wBJLLR">
  wBJLLR</a> by Zihua Li (<a href="https://codepen.io/luin">@luin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 总结

至此游戏的难点就介绍得差不多了，剩下的倒计时、地鼠钻入钻出都只不过是对 CSS Animation 的运用。使用纯 CSS 实现游戏的过程非常有意思，也很利于提高自己对 CSS 的理解，推荐大家都尝试一下。
