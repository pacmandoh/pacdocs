---
title: 设计套件
head.description: 获取 PacDocs 的 'Assets'，例如徽标、版式和颜色
description: 欢迎来到 PacDocs 设计定义页面。 通过精心挑选颜色、版式和形状来重新定义身份，以展示 PacDocs 的性能、实用性和易用性。
navigation.icon: 'i-ph-palette'
links:
  - label: 'PacDocs Kit'
    size: 'lg'
    to: 'https://www.figma.com/'
    icon: 'i-simple-icons-figma'
    download: true
    color: 'white'
    target: '_blank'
---

## Logo 进程

PacDocs 标志将随着时间的推移逐渐演变，但在 `2.0` 之后骨头 🦴 将会一直是其设计中不变的元素。这些图标素材均来自于 [`Flaticon`](https://www.flaticon.com/) 和 `Nuxt`。

::div{class="hidden lg:block"}
![PacDocs Logo Timeline](/assets/design-kit/timeline-light.svg){class="dark:hidden w-full"}
![PacDocs Logo Timeline](/assets/design-kit/timeline-dark.svg){class="hidden dark:block w-full"}
::

::div{class="lg:hidden"}
![PacDocs Logo Timeline](/assets/design-kit/timeline-mobile-light.svg){class="dark:hidden w-full"}
![PacDocs Logo Timeline](/assets/design-kit/timeline-mobile-dark.svg){class="hidden dark:block w-full"}
::

## PacDocs Logo

PacDocs 这个构想起始于 2023 年中旬，最开始使用的的是 `WordPress` 随后接触到 `Hugo` 再推进到 `VuePress` 最后选择了 `Nuxt`。这些阶段中，将 PacmanServer 更名为 PacDocs。并将图标更换为现在的骨头 🦴 元素，这个图标获取自 [`Flaticon`](https://www.flaticon.com/) 中万圣节集合，这类骨头元素也在我最爱的日本军事风服装品牌 `wtaps` 早期的作品上经常出现。PacDocs 的标志由两个元素组成：X 状骨头元素和文字图标。 在大多数情况下，它们应该一起出现。

### Icon

::u-page-grid
  :design-kit-image-card{path="icon-pacdocs" name="Green"}
  :design-kit-image-card{path="icon-colorless-black" name="Black" background="bg-white"}
  :design-kit-image-card{path="icon-colorless-white" name="White" background="bg-gray-950"}
::

### Logo

::u-page-grid
  :design-kit-image-card{path="logo-pacdocs-white" name="PacDocs & white" background="bg-gray-950" full}
  :design-kit-image-card{path="logo-pacdocs-black" name="PacDocs & black" background="bg-white" full}
  :design-kit-image-card{path="logo-colorless-white" name="White" background="bg-gray-950" full}
  :design-kit-image-card{path="logo-colorless-black" name="Black" background="bg-white" full}
::

## 色彩板

PacDocs 的调色板基于其标志性的骨头 🦴 配色，并且经过仔细考虑，颜色可以在各种媒体设备上和谐一致。其中包括 `colorless` 版本，根据显示效果来确保设计保持特色。

::u-page-grid
  :design-kit-color-card{background="#acabb1" name="DarkGray"}
  :design-kit-color-card{background="#e0e0e2" name="LightGray"}
  :design-kit-color-card{background="#000000" name="Black"}
  :design-kit-color-card{background="#FFFFFF" name="White"}
::

## 字体 (DM Sans)

同 Nuxt 官网，PacDocs 的字体是来自[谷歌字体](https://fonts.google.com)的 DM Sans。选择这款字体是因为它在许多方面都与 PacDocs 标志的形状相似（连接点、顶点、结构的顶点等），从而在审美上具有一定的相关性。它既提供了现代感和庄重感，又为我们的视觉内容赋予了标志性的特征，同时并没有影响文本的可访问性。

该字体还是可变字体，使我们能够适应各种情境。

[DM Sans]{class="font-semibold text-5xl text-gray-900 dark:text-white"}

[The quick brown fox jumps over the lazy dog.]{class="font-semibold text-4xl text-gray-900 dark:text-white"}

### 使用

对于 PacDocs，99% 的情况下只会使用 Regular / Medium / Semibold 粗细的字重。如果你想使用，请避免使用 Light 和 Heavy。唯一的例外是在处理上标、下标字符时，也可以在字体大小超过 72px 时使用 Heavy。

在 Figma 中，默认只包含有限数量的 DM Sans 变体。要访问 DM Sans 的所有可用变量，你可以在此处下载（安装字体后记得重新启动 Figma）。

### 声明

构建 PacDocs 的设计套件和 `Figma` 套件的灵感均来源于 `Nuxt` 的设计套件 (包括 `Figma`)。
