---
title: "编码问题导致的 Headers already sent 错误"
tags:
  - php
  - utf8
toc: false
---

前些日子同学找我来说我帮他做的网站的注册功能失效了。我看了一下发现是由于 301 跳转失败导致的。
查看日志错误内容为：

> Warning: Cannot modify header information - headers already sent by (output started at...

但看了一下源代码却没有发现问题，在本机运行也一切正常。`<?php` 前面和 `?>` 后面都没有字符。

百思不得其解，使用 W3C 的 HTML 校验却发现了:

> Byte-Order Mark found in UTF-8 File.

才发现是由于他们在部署网站改配置时用记事本编辑保存成了 UTF-8 with BOM 导致的问题。解决方法也很简单，改成 without BOM 就好了。

由此可见编辑器对 Web 开发有多重要（我一直在用 Coda，很顺手）。

顺便提示一下 PHP 开发好习惯，就是只写 `<?php` 不写 `?>`，原因就是谁也不能保证啥时手贱在 `?>` 后面打些什么东西导致 Headers already sent 错误（当然如果你把 PHP 当模板语言用就不能不用 `?>` 了）。
