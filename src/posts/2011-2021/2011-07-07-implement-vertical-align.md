---
title: "实现 vertical-align 的几种办法"
tags:
  - HTML
  - JavaScript
  - jQuery
  - plugin
---

一个简单的例子：

```html
<div style="vertical-align: middle; height: 100px;">
  <span>hello world!</span>
</div>
```

可以看到“hello world!”并没有垂直居中。网上有很多人从很多不同地方面进行分析，其实简单概括就一句话：
`vertical-align`的作用范围仅限`display: table-cell`或`display: inline-block`元素。

那么如何实现垂直居中呢？

<!-- more -->

最简单的方法，当父容器的高已知时，可以简单地设定要局中的元素的`line-height`为父容器的高度即可实现垂直局中。如：

```html
<div style="vertical-align: middle; height: 100px;">
  <span style="line-height: 100px;">hello world!</span>
</div>
```

第二个方法，当父容器高度未知，子元素高度已知时，可以依次这样做：

1. 设置父容器`position:relative`或`position:absolute`.
2. 设置子元素`position:absolute`且`top:50%`.
3. 设置子元素`margin-top: -子元素高度的二分之一`.

## 喜欢简单的方式？

喜欢简单的人们可以使用下面的 javascript 代码(需要 jQuery)，原理是在要垂直局中的元素外包一层:

```javascript
$(function () {
  $(".vertical-align-middle").wrapInner(
    '<table height="100%" width="100%">\
       <tr><td style="vertical-align: middle;"></td></tr>\
     </table>'
  );
});
```

注: 将要垂直居中的容器 class 设成`vertical-align-middle`即可，如前一例：

```html
<div class="vertical-align-middle" style="height: 100px;">
  <span>hello world!</span>
</div>
```

enjoy it!
