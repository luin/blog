---
title: "直播: 豌豆荚Hack Day!"
tags:
  - Hackathon
  - 豌豆荚
toc: false
---

前天和昨天参加了豌豆荚的 Hack Day，这次 Hack Day 的主题是“Hi Web, High Web! ”，要求是使用豌豆荚百宝袋创建一个 Web 应用。

赛前本来以为要仔细研读一下百宝袋的 API 才行，结果看了一下发现只有一个 API（汗）。功能是提供一个下载地址规范，符合该规范的链接会自动下载到豌豆荚连接的手机里，如果是 APK 则会自动安装（例如在线音乐网站可以把音乐的下载地址改成该 API 规范，则用户在百宝袋中点击音乐的下载链接就能把音乐下载到手机中了）。

每组 3 人，从周六中午开始开发，直到周日下午 14 点截止，比赛第一名的奖品是 15 寸高配 Retina MBP（嘘，我才不是为了这个来的呢）！我们组成员是 PHP 大牛小明和 Android 大牛琪森。经过我们 3 人的激烈头脑风暴，最终决定做一款位置分享应用，可以让用户发送短信给朋友来和朋友分享自己当前的位置，使用流程是：用户把手机连上电脑，打开豌豆荚百宝袋中我们的应用就可以看到自己的通讯录，选择一个联系人 A 并点击分享按钮，应用会向对方发送一条包含链接的短信，同时用户的手机上会出现一个应用叫“A 的位置”。当 A 打开短信时就能看到用户当前的位置，而同时用户打开“A 的位置”应用也能看到 A 的位置。

<!-- more -->

想想其他组要做的基本都是传统的资源整合网站，如电子书、图片打包下载什么的，就觉得大奖很近哈！

准备开发，晒一下工作环境：
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/1.jpg" alt="" title="工作环境" width="100%" height="auto" class="alignnone size-full wp-image-321" />

豌豆荚实验室的工作环境总体还是不错的，一间没有隔断的大屋子，摆着一排排整齐的工位。一个亮点则是，休息区有各种免费的饮料和水果，甚至工位间过道中都摆着好多的吃的。品种之多，供应时间之长绝对秒杀当年我心中的圣地：微软的水房啊！

午餐是日本料理，刺身寿司什么的，本来以为最多就是西红柿鸡蛋呢。

晚上 6 点，我负责的后台代码写的差不多了，是用 Node.js 和 Redis 开发的：
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/2.jpg" alt="" title="代码" width="100%" height="auto" class="alignnone size-full wp-image-323" />

晚饭是 pizza，"the Biggest Pizza in Beijing"，果然好大！看到后面的鲜果时光和蛋糕了吗，对比一下就知道 pizza 多大了，而且......目测有 50 个：
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/4.jpg" alt="" title="Pizza" width="100%" height="auto" class="alignnone size-full wp-image-325" />

夜宵！送夜宵的小哥你这么敬业啊，这是多少年难遇的雨啊，可是你却还把我们的夜宵送来了......推荐下管记烤翅，真乃业界良心！下面是 700 多串的鸡翅和羊肉串：
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/3.jpg" alt="" title="烤翅" width="100%" height="auto" class="alignnone size-full wp-image-324" />

琪森去接同学了，我和小明这部分基本做完，有点想回去睡觉呀，可是外面雨太大囧。于是我们就来到休息区畅饮......
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/5.jpg" alt="" title="休息区" width="100%" height="auto" class="alignnone size-full wp-image-326" />
(图中的美腿是小明的)

作为一名充满设计细胞的人，在百无聊赖之际开始画画，比较拿的出手的有：
这个
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/7.jpg" alt="" title="画1" width="100%" height="auto" class="alignnone size-full wp-image-330" />
这个
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/8.jpg" alt="" title="画2" width="100%" height="auto" class="alignnone size-full wp-image-329" />
和这个
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/9.jpg" alt="" title="画3" width="100%" height="auto" class="alignnone size-full wp-image-328" />
谢谢，想买画的欢迎联系我，可以签名。

熬不住了睡觉去......睡袋还是很有爱的，不过太热了，索性垫在地上。
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/6.jpg" alt="" title="睡袋" width="100%" height="auto" class="alignnone size-full wp-image-327" />
(脚是我的......)

起床，睡得真香！

上午琪森开始开发 Android 客户端。

中午是我最爱的水煮鱼哦和酸菜鱼哦！

14 点了，还没开发完，好在延长了半个小时......

15:30，终于调完了 Android 的 bug，可惜没资格参加评奖了，囧......

打道回府~哈哈这次 Hack Day 吃的真爽啊。

<strong>Update</strong>
哦忘记补上两张我们作品的截图哈:
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/21.jpg" alt="" title="找你1" width="100%" height="auto" class="alignnone size-full wp-image-335" />
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/11.jpg" alt="" title="找你2" width="100%" height="auto" class="alignnone size-full wp-image-334" />
鼓掌！

---~~~华丽的分割线~~~---
最后附上我正在做的一款 Wordpress 收费主题：
<img src="/assets/images/2012-07-23_wandoujia-hack-day-live/10.jpg" alt="" title="Wordpress Themes" width="100%" height="auto" class="alignnone size-full wp-image-331" />
用的是<a href="http://blog.labikyo.com/" target="_blank">欣越</a>的显示器，不只适合 Vim，还很适合画图嘛！

我是不是该多写点东西介绍一下这个主题来避免被人误会是在炫耀显示器？

MBP 屏幕里面是我在用的图标字体：<a href="http://fontello.com/" target="_blank">fontello</a>。之所以用图标字体而不是真正的图标是因为前者可以通过 CSS 自由控制颜色、大小和透明度等。另外在减少 HTTP 请求方面也比 CSS Sprite 技术更直观。
