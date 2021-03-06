---
title: "只需 4 步，手把手教你如何实现滤镜功能"
tags:
  - algorithm
---

滤镜对于照片而言，起到的是雪中送炭和锦上添花的作用。优秀的滤镜，能让随手之作显得别有风味，又能为已经绝色的照片画龙点睛。现在几乎凡是和照片相关的应用程序都有滤镜功能，而相较而言介绍滤镜原理和实现的文章又少之又少，为此我专门写了这篇文章来系统地讲解滤镜是如何实现的。

## 什么是滤镜

滤镜最初是指安装在相机镜头前过滤自然光的附加镜头，用来实现调色和添加效果。一些数字图像处理软件（最著名的如 Adobe Photoshop）提供了一些特定的预设工具用来实现相机滤镜的效果，这些工具也就自然而然地被称作“滤镜”。软件实现的滤镜可以模拟大部分的镜头滤镜，如色温变换滤镜（LB）和强调滤镜等，但由于无法再现拍摄环境，软件滤镜无法复原照片中未包含的信息，进而也难以实现偏光镜和紫外线滤色镜（UV）的效果。

<img src="/assets/images/2014-06-15_implement-instagram-like-filters/lens-collection.jpg" alt="相机滤镜" />

## 实现滤镜的步骤
就模拟镜头滤镜而言，实现软件滤镜无外乎是对照片中的色彩进行映射的过程。然而软件滤镜并不止于此，复杂的软件滤镜还需要为照片增加光线变化（如 LOMO 的暗角效果）、材质和相框等，最近美图秀秀针对国内环境问题推出的“去雾霾”滤镜正是复杂的软件滤镜的一种体现。不过再复杂的软件滤镜，实现起来也不外乎如下几个步骤。

### 1. 颜色映射
昏黄的颜色让人联想到古老与质朴，淡绿的颜色让人感到柔和与舒适：颜色是一张照片的灵魂，而实现滤镜最重要的一步就是颜色映射。颜色映射是指将原来照片中的每一种颜色，通过某种映射方法转换成另一种颜色。最常见也最简单的映射方法是查表法。

查表法的原理是在一张表中为每种颜色记录一个对应的映射目标颜色，当用查表法对一张照片做颜色映射时，只需要遍历照片的每个像素点，然后在表中找到该像素颜色对应的目标颜色，最后将该像素设置为目标颜色即可。查表法实现的前提是颜色的映射与周围的颜色无关，即一种颜色无论周围的颜色为何、无论其位于照片的哪个位置，其目标颜色都应该是相同的。

RGB 可以表示的颜色数量为 `256*256*256 = 16,777,216`，如果要记录每种颜色的映射结果，那么颜色表需要 一千六百多万条记录，这显然无法应用到实际的工程中。为了简化起见，一般每相近的 4 种颜色采用一条记录存储，这样颜色表只需要 `64 * 64 * 64 = 262,144` 条记录。

这里以 <a href="https://plus.google.com/105075060804712942346/posts">Lev Zelensky</a> 首先发表的一个基准颜色表为例：

<img src="/assets/images/2014-06-15_implement-instagram-like-filters/lookup-table.png" alt="基准颜色表" class="fill" />

上表将 262,144 种颜色分为 8 个块，每块 `64 * 64` 格，每一格的颜色都不同。进行颜色映射时，首先使用数字图像处理软件对该基准颜色表应用要模拟的滤镜来生成映射表（如下图），然后对要处理的照片的每个像素，从基准颜色表中找到该像素颜色的位置，然后在映射表的相应位置就可以得到目的颜色。

<img src="/assets/images/2014-06-15_implement-instagram-like-filters/lookup-table-yellow.png" alt="昏黄滤镜映射表" class="fill" />

Lev Zelensky 为 iOS/OS X 上著名的图像处理库 <a href="https://github.com/BradLarson/GPUImage">GPUImage</a> 加入了 <a href="https://github.com/BradLarson/GPUImage/blob/master/framework/Source/GPUImageLookupFilter.h"><code>GPUImageLookupFilter)</code></a> 方法来实现上述过程。


### 2. 叠加材质
只进行颜色映射就可以实现大部分简单的滤镜，然而复杂的滤镜需要更多的步骤来完成。其中最为典型的就是 <a href="http://en.wikipedia.org/wiki/Lomography">LOMO</a> 效果了。要实现 LOMO 效果，除了通过颜色映射让颜色更加鲜艳外，还需要为照片增加四周的暗角。首先需要一张暗角素材：

<img src="/assets/images/2014-06-15_implement-instagram-like-filters/overlay.png" alt="暗角素材" class="fill" />

然后将该素材叠在照片上，并应用 <a href="http://en.wikipedia.org/wiki/Blend_modes#Overlay">Overlay</a> 混合算法。

要注意的是根据材质不同，可以选择不同的混合算法。只是对暗角这一材质而言，Overlay 可以带来最好的效果。另外一点就是先进行颜色映射还是先叠加材质并没有固定的规则，需要根据实际效果进行选择。就 LOMO 暗角而言，先叠加材质的效果更好。

### 3. 应用相框

严格来说相框并不属于滤镜的一部分，但是考虑到好的相框可以为照片提色不少，这里也顺便提一句。根据相框的不同，应用的照片上的方法也不同，有的相框可以直接盖在照片上，有的则需要按照某种混合算法和照片进行混合，但无论哪种方式，应用相框都算是整个滤镜最简单的部分了。与相框类似的就是照片装饰物，比如一颗桃心或用户可以自定义的文字，实现照片装饰物并没有任何技术难度，唯一要记住的点就是不要胡乱的为你的滤镜加入装饰物，否则会让滤镜落入俗套。

### 4. 叠加
最终的滤镜效果可能需要反复叠加上面的步骤才能实现，比如 Instagram 的滤镜很多都是应用了多种材质才得以完成。这一过程需要设计者的保留充分的耐心，一点一点地琢磨，一款优秀的滤镜才能得以诞生。
