<div align="center">

# 唐乐 · WORKS

**AI 应用 · Agent · 互动游戏 · 创作工具**

从一个具体问题，到一个可以体验的作品。

[个人网站](https://grjs.tl666.tech/) · [项目目录](https://grjs.tl666.tech/#selected-work) · [灯影古镇试玩](https://tl66666.github.io/lantern-shadow-town/) · [GitHub](https://github.com/tl66666)

![Static website](https://img.shields.io/badge/Website-HTML%20%2F%20CSS%20%2F%20JavaScript-284c3a?style=flat-square)
![Projects](https://img.shields.io/badge/Portfolio-8%20Projects-c78b35?style=flat-square)
![Education](https://img.shields.io/badge/软件工程-2027届-485b70?style=flat-square)

</div>

上海应用技术大学软件工程本科在读，通过 CET-6。项目实践涵盖模型接入、Agent 工具执行、Web 与小程序开发、互动体验和素材创作。使用 AI 工具辅助方案与编码，同时负责代码阅读、调试、功能验证和展示整理。

## 从这里开始

| 想了解什么 | 入口 |
| --- | --- |
| 看作品、职责与实现重点 | [个人网站 · 项目速览](https://grjs.tl666.tech/#selected-work) |
| 体验一个互动游戏 | [灯影古镇 · 在线试玩](https://tl66666.github.io/lantern-shadow-town/) |
| 查看活动现场与荣誉记录 | [微信开发者创新工坊](https://grjs.tl666.tech/award-wechat.html) / [TRAE AI 创造力大赛](https://grjs.tl666.tech/award-trae.html) |
| 查看原版简历 | [唐乐-简历.pdf](./唐乐-简历.pdf) |
| 主站暂不可用时 | [GitHub Pages 备用站](https://tl66666.github.io/grjs/) |

## 互动作品：灯影古镇

**Lantern Shadow Town** 是一款手势体感寻宝网页游戏。以手灯光晕探索古镇街景，在梦、福、诗、画四幕中寻找灵杰，解锁角色卡、集齐四印，再进入幸运转盘与结局。

[![灯影古镇 · 游戏首屏](assets/portfolio/lantern/title-screen.jpg)](https://tl66666.github.io/lantern-shadow-town/)

| 交互 | 实现 |
| --- | --- |
| 手势 / 鼠标双模式 | MediaPipe 手部追踪与鼠标驱动接入统一输入层，支持 I 键切换 |
| 停留充能 | 约 1.5 秒命中进度，结合防抖容差、移开衰减与目标轨迹 |
| 场景与角色 | 四幕关卡视频、灵杰角色卡、显影、配音与收集反馈 |
| 运行 | 原生 JavaScript、Canvas 2D、Web Audio、localStorage；提供 Node 静态服务与 GitHub Pages 入口 |

**[在线试玩 ↗](https://tl66666.github.io/lantern-shadow-town/)** · **[源码与完整说明 ↗](https://github.com/tl66666/lantern-shadow-town)**

建议使用 Chrome / Edge。鼠标模式无需摄像头；手势模式需摄像头授权及 HTTPS / localhost 环境，画面在浏览器本地推理。首次打开需要加载场景媒体。个人网站只展示截图和入口，进入试玩后再选择操作方式。

## 八个项目，各自解决什么问题

| 作品 | 场景与实现重点 | 本人贡献 | 体验 / 源码 |
| --- | --- | --- | --- |
| **和生序** | AI 健康记录；视觉识别、营养估算、用户校正与双端数据流程 | 独立开发：uni-app 双端、NestJS API、数据模型、模型接入、部署与 Android 打包 | [展示](https://tl66666.github.io/heshengxu-health/) / [源码](https://github.com/tl66666/heshengxu-health) |
| **职途 AI Agent** | 本地求职工作台；上下文、分层记忆、22 个结构化工具、写入前确认与回执 | 独立开发：React、FastAPI 及有界 Tool-Calling Runtime | [展示](https://tl66666.github.io/ztai/static/showcase.html) / [源码](https://github.com/tl66666/ztai) |
| **职途 ZhiTu** | 写简历、练面试、追投递；版本管理、SSE 流式、语音交互与 7 状态面试流程 | 本人负责全部前端与接口联调；Go / Gin / GORM 后端由队友完成 | [在线产品](https://zhitu.kralai.tech/) / [源码](https://github.com/tl66666/zhitu) |
| **梦弦 DreamChord** | 视觉小说创作；章节 / 场景 / 镜头卡、剧情流程图、素材处理与可审核 Agent 补丁 | 独立开发：React 编辑器、Express 服务、素材与播放器、Agent 工作流 | [展示](https://tl66666.github.io/DreamChord/) / [源码](https://github.com/tl66666/DreamChord) |
| **城会玩 2.0** | 按城市归档旅行照片、笔记与足迹，支持小队共享 | 独立开发：微信小程序、地图、云存储、归档和共享流程 | [展示 / 小程序码](https://tl66666.github.io/chw2.0/) / [源码](https://github.com/tl66666/chw2.0) |
| **星途自律舱** | 六类目标、自律打卡、星球成长、奖励与数据复盘 | 独立开发：计划、专注、成长规则、成就与统计模块 | [展示 / 小程序码](https://tl66666.github.io/xtzlc/) / [源码](https://github.com/tl66666/xtzlc) |
| **乐启星 LQX** | 音乐启蒙；音符与节奏练习、模型对话、数字人平台接入 | 独立开发：Web Audio 练习、学习进度、API 与数字人交互 | [在线体验](https://lqx-266.pages.dev/) / [源码](https://github.com/tl66666/lqx) |
| **灯影古镇** | 古镇体感寻宝；双模式输入、停留充能、四幕探索与角色收集 | 个人互动游戏作品：输入、关卡、渲染与音视频反馈的组合实现 | [在线试玩](https://tl66666.github.io/lantern-shadow-town/) / [源码](https://github.com/tl66666/lantern-shadow-town) |

两个“职途”是不同项目：**职途 AI Agent** 是本地优先的个人工作台，**职途 ZhiTu** 是团队协作的线上求职产品。六个原有独立项目、一个前端协作项目及一个互动游戏作品分别说明贡献，不将队友的后端工作归为本人完成。

## 工程实践

- **模型进入业务流程**：以服务端代理保护密钥，处理结构化输出、超时、失败降级与用户校正。和生序的 49,479 条食物目录描述数据范围，营养结果仍需用户核对。
- **Agent 可控执行**：职途 Agent 用上下文装配、工具预算与 Schema 校验管理执行；写入遵循提议、预览、用户确认、领域服务执行和幂等回执。DreamChord 将创作建议变成可审核、可撤销的补丁。
- **前端状态与协作**：React / Vue 管理编辑、流式响应和语音流程；职途 ZhiTu 中明确前后端分工与联调边界。
- **互动反馈**：小程序用成长与成就表达进度；灯影古镇用停留充能、角色显影和音视频反馈组织探索体验。
- **运行与交付**：项目中使用 FastAPI、NestJS、Express、Prisma、SQLAlchemy、PostgreSQL、SQLite、Docker、Azure 与 CloudBase；不同项目按实际架构选用，不要求同一个项目包含全部技术。

项目规模与业务效果分开说明：工具数、目录条目、关卡数量属于实现范围，不作为准确率、用户规模或业务提升指标。AI 辅助编码之后仍需代码阅读、调试与验证。

## 企业实践与活动

**邦彦技术股份有限公司 · NuwaAI 智能体数字人部门 · Agent 实习工程师**

参与“邦小彦”企业 Agent 的设计与开发，围绕销售、SE 与管理者的收入链 S1-S14 场景开展实践；接入 NuwaAI 平台 API 制作数字人应用与互动游戏，参与素材、功能与交互验证。

**纷享销客生态 · 区域代理商客户项目**

在广州、佛山、珠海片区参与客户现场沟通，整理会议记录、需求清单与产品蓝图，并制作交互 Demo 支持方案演示与反馈迭代。

| 记录 | 结果与范围 |
| --- | --- |
| TRAE AI 创造力大赛 | 从 3.7 万余名参赛选手中入选年度 350 强；[活动记录](https://grjs.tl666.tech/award-trae.html) |
| 微信开发者创新工坊“广州·游园会友日” | 受期待的开发者 NO.2，2026.09.20；[活动记录](https://grjs.tl666.tech/award-wechat.html) |
| 妙悟 × 学习通全国高校 AI 应用创作大赛 | 完成创作任务，获荣誉证书 |
| 2026 小有可为 AI 向善创新挑战赛 | 初赛参赛证明 |
| 世界人工智能开源大赛（GOAI）、微信小程序开发大赛 | 参赛实践 |

## 这个网站如何组织

网站采用静态 HTML / CSS / JavaScript，没有构建步骤。黑金首屏与浅色作品目录形成阅读层次；八个作品可按 AI、前端协作、小程序、创作和互动游戏筛选。

- **首屏**：个人介绍、项目入口、简历下载以及明确标注的邮箱和电话。
- **作品目录**：问题、本人贡献、实现重点、运行方式与源码入口。
- **沉浸画廊**：八个项目直接切换，截图可打开原图，支持键盘操作及焦点恢复。
- **互动游戏**：独立的灯火主题展示区，跳转在线试玩，避免首页直接加载游戏资源或请求摄像头。
- **活动记录**：微信与 TRAE 各自拥有图文相册与原图入口。
- **动态效果**：背景视频按视口加载、离开后暂停；遵循系统减少动效与节省流量设置，页面不显示暂停动效按钮。
- **联系信息**：邮箱可发送邮件，电话可拨号，GitHub 可查看源码；没有 JavaScript 时项目链接仍可访问。

```text
index.html                    主页、作品目录与项目画廊数据
assets/recruiter.css           作品目录、联系卡片、游戏展示和视觉增强
assets/recruiter.js            筛选、视频管理、画廊导航与截图原图
assets/portfolio/              项目截图、视频与二维码
assets/portfolio/lantern/      灯影古镇真实截图
award-wechat.html              微信开发者活动记录
award-trae.html                TRAE 活动记录
assets/award-story.css / .js   活动相册共用样式与交互
唐乐-简历.pdf                  作者原版简历
tests/                        作品阅读和活动相册检查
```

## 本地预览与检查

在仓库根目录运行任意静态服务器，例如：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

打开 [http://127.0.0.1:8765/](http://127.0.0.1:8765/)。这只是作品集的预览服务；灯影古镇使用其独立在线入口和仓库。

```bash
node tests/award-story.test.cjs
node tests/recruiter-portfolio.test.cjs
```

活动相册检查使用 Node 内置模块。作品集浏览器检查需要 Playwright 与 Microsoft Edge；`PLAYWRIGHT_MODULE` 可指定 Playwright 模块路径，`PORTFOLIO_URL` 可覆盖预览地址。检查包括八个作品、游戏筛选、联系标签、原图查看、键盘焦点、系统减少动效、手机宽度及无脚本访问。

## 维护与发布

1. 项目截图与说明保持一致；新增作品需同步目录、`PROJECT_DATA`、计数与 README。游戏截图来源为[灯影古镇仓库](https://github.com/tl66666/lantern-shadow-town/tree/main/assets/screenshots)。
2. 活动详情的 `gallery-data`、初始图文与 `noscript` 图集同步更新。旧 `awards.html` 地址保留兼容跳转。
3. 简历沿用作者原文件；网站的简历链接稳定指向 `唐乐-简历.pdf`，本次视觉与作品更新不编辑 PDF。
4. 主域名使用 Cloudflare Pages 自动部署，GitHub Pages 为备用入口。推送 `main` 后等待部署与缓存刷新。
5. `output/`、`tmp/`、`.uploads/` 用于本地预览和临时材料，不作为正式网站上传。素材与使用说明见 [NOTICE.md](NOTICE.md)，作者信息见 [AUTHOR.md](AUTHOR.md)。

## 联系

**邮箱**：[2061790875@qq.com](mailto:2061790875@qq.com)

**电话**：18064871268

**GitHub**：[@tl66666](https://github.com/tl66666)
