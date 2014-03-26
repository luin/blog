Title: 纯 CSS 实现高度与宽度成比例的效果
Tags: css, ratio

<div class="clearfix">
  <div class="left">
    最近在做一个产品列表页面，布局如右图所示。页面中有若干个 item，其中每个 item 都向左浮动，并包含在自适应浏览器窗口宽度的父元素中。
  </div>
  <aside class="right">
    <img src="{filename}/images/keep-height-relevant-to-width-using-css.png" width="190" height="200" />
  </aside>
</div>

item 元素的 CSS 定义如下：

    :::css
    .item {
      float: left;
      margin: 10px 2%;
      width: 21%;
    }

这时遇到的一个需求：__在保持 item 元素宽高比恒定（如高是宽的 1.618 倍）的情况下，使得 item 元素可以和父元素同比缩放。__ 我们知道，如果当 item 元素是图片，同时需要保持的宽高比恰好为图片本身的宽高比时，可以设置 item 的 `height` 为 `auto` 即可轻松实现这个需求。然而当 item 元素不是图片或者要保持的宽高比和图片本身的宽高比不同时，这个需求显得很难直接用 CSS 实现。

为此我放弃 CSS，直接用 JavaScript 绑定 `window` 的 `onresize` 事件来动态获取每个 item 的宽度，从而计算并设置其高度。

我一直在使用这个解决方案，直到今天调整样式时，突然想到这个需求竟然是可以只使用 CSS 解决的。

<!-- more -->

首先需要知道，一个元素的 `padding`，如果值是一个百分比，那这个百分比是相对于其父元素的宽度而言的，即使对于 `padding-bottom` 和 `padding-top` 也是如此。

另外，在计算 Overflow 时，是将元素的内容区域（即 `width` / `height` 对应的区域）和 Padding 区域一起计算的。换句话说，即使将元素的 `overflow` 设置为 `hidden`，“溢出”到 Padding 区域的内容也会照常显示。

综上两条所述，我们可以使用 `padding-bottom` 来代替 `height` 来实现高度与宽度成比例的效果。因为 item 元素的宽度是其父元素宽度的 21%，所以我们将 `padding-bottom` 设置为它的 1.618 倍，即 33.98%。同时将其 `height` 设置为 `0` 以使元素的“高度”等于 `padding-bottom` 的值，从而实现需要的效果。

最后 item 元素的 CSS 样式为：

    :::css
    .item {
      float: left;
      margin: 10px 5%;
      padding-bottom: 33.98%;
      width: 40%;
      height: 0;
    }

页面效果见 [http://jsfiddle.net/luin/25BbH/7/](http://jsfiddle.net/luin/25BbH/7/)，拖动窗口调整页面宽度，item 元素始终保持恒定的宽高比。

同样，这个解决方案也自然支持前文说的“当 item 元素是图片但要保持的宽高比和图片本身的宽高比不同”的情况，具体见我在 Ruby China 上的一篇回复：[图片 CSS：怎样才能“响应式+固定宽高比例”？](http://ruby-china.org/topics/17011#reply15)
