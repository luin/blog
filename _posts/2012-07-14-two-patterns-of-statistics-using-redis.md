---
title: "使用Redis做产品统计的两种模式"
tags:
  - bitset
  - Redis
  - statistics
---

产品运行过程中及时记录收集并分析统计数据对产品的持续改进有重要的指导作用。其中有两个很常见的统计模式：每小时新增的用户数量和一周内活跃的用户(对于一个漂流瓶应用，可能是每天都扔瓶子或捞瓶子的用户)数量。在实际开发中我使用 Redis 来实现这两个模式。

<!-- more -->

## 每小时新增用户数量
每小时新增的用户数量可以用 Redis 的 Hashes 数据类型来实现。Key 名为日期的 `yymmdd` 表示法，Field 名为小时数，取值范围是 0-23，Field 的值即为该天该小时的新用户数量。例如当2012年7月14日21点有新用户注册时，只要执行“HINCRBY 120714 21 1”即可。
存储结构如下图所示：
<img src="/assets/images/2012-07-14_two-patterns-of-statistics-using-redis.gif" alt="" title="redis hash data type" width="100%" height="auto" class="fill" />
这种存储方式不仅存储读取都很方便，而且直观，很容易就能实现统计从某天某小时到某天某小时总的新用户数量。

## 一周内活跃的用户
统计活跃用户必须给每个用户一个表示其当天是否活跃的布尔标记，可想而知如果用户数很多的话，其占用的存储空间会很大。这时我们可以借助 Redis 的 Bit 数据类型（准确讲就是 String 数据类型）的 SETBIT 接口，该接口可以在 Redis 里实现按位存储，空间利用率极高。使用这种方法的前提是每个用户需要有一个自增的 ID，假如 ID 为 3 的人在2012年7月14日活跃过了，则执行“SETBIT activeusers:120714 3 1”即可，此时该 Key 的二进制存储情况为：

`activeusers:120714  0001`

同理如果 ID 为 12 的用户在同日活跃过了，标记后该 Key 的二进制存储情况为：

`activeusers:120714  0001000000001`

那么如果想计算一周内持续活跃的用户该怎么办呢？很简单，只要把一周的数据做 AND 操作即可。至于计算一周内活跃过的用户或一周内一天都没活跃过的用户则仅仅更换布尔运算符即可实现。

本来这篇日志我着重想讲在 Node.js 中如何处理通过 Redis 的 GET 接口获得的二进制数据（因为在Node.js没有直接操作此类数据的方法），不过写日志时看了下 Redis 的文档，竟然发现了 Redis 2.6 中新增加了 <a href="http://redis.io/commands/bitcount" target="_blank">BITCOUNT</a> 和 <a href="http://redis.io/commands/bitop" target="_blank">BITOP</a> 两个接口，前者可以获得 Key 中的 Bit 数（即当天活跃用户数），后者可以实现 Key 的 AND, OR, NOT, XOR 操作。不过令人欣慰的是截至目前 Redis 最新稳定版本仍然是 2.4.15（我这是什么心态啊）。
