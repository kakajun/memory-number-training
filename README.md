# 数字记忆训练


[![](https://camo.githubusercontent.com/28479a7a834310a667f36760a27283f7389e864a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f76322d646174657069636b65722e737667)](https://camo.githubusercontent.com/28479a7a834310a667f36760a27283f7389e864a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f76322d646174657069636b65722e737667) [![build status](https://github.com/kakajun/memory-number-training/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/kakajun/memory-number-training/actions/workflows/gh-pages.yml)

由于近期本人阅读了一本书《实战记忆》 由刘俊/著[2015.11], 很想训练一下自己的记忆，于是这个工程应运而生。

数字记忆训练是一个基于Web的应用程序，旨在帮助用户通过一系列有趣且具有挑战性的练习提高他们的数字记忆技能。利用不同的难度级别，用户可以逐步提高他们的记忆力、集中力和心理敏捷性。

数字编码: 指的是把枯燥散乱的数学编成生动的图片，我们按两位数以内的方式给这些数组编码，所以每个一位数和两位数都对应有独一无二的图片，记住了图片即记住了数字，把记忆数字变成记忆图片。

## 🚀 功能
- 💪 按序选图: 按序从00-99的顺序记忆,点击图片加载下一组
- 🔥 倒序选图: 倒序99-00的循序选图
- 🔋 随机选图: 00-99 乱序记忆图片
- 💡 看图说话: 随机出现一组图片,并且调用通义千问的大模型API, 对图片编故事进行记忆
- 🧠 对照表: 列举出图片和数字之间的关系
- 📐 圆周率: 快速记忆圆周率前51位数字


## 🛠️ 技术栈
- Vite
- Vue3
- element-plus
- TypeScript
- gh-pages - 用于发布到GitHub Pages

## 💡 预览图
![](https://github.com/kakajun/memory-number-training/blob/main/src/img/demo.png)
![](https://github.com/kakajun/memory-number-training/blob/main/src/img/demo2.png)

## 安装

要在本地设置此项目，请按照以下步骤操作：

```bash
git clone https://github.com/kakajun/memory-number-training.git
cd memory-number-training
npm install
```

## 使用

要在本地运行项目：

```bash
npm run dev
```

打开您的网页浏览器并访问 `http://127.0.0.1:5173/` 开始训练您的记忆力！

## 贡献

欢迎为数字记忆训练做出贡献！有需要可以邮箱联系我。

## 许可证

该项目根据MIT许可证授权 - 详情见LICENSE文件。
