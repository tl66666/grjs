# 唐乐个人介绍网站

这是唐乐的个人介绍与项目作品集网站，用于展示软件开发能力、项目经历、简历和联系方式。网站内四个核心项目均由本人独立完成需求拆解、页面设计、功能开发、调试优化与展示页整理。

## 在线访问

- 个人介绍网站：[https://tl66666.github.io/grjs/](https://tl66666.github.io/grjs/)
- 在线简历下载：[唐乐-简历.pdf](./唐乐-简历.pdf)
- GitHub 主页：[@tl66666](https://github.com/tl66666)

## 网站定位

这个网站不是单纯的静态名片，而是一个面向求职展示的作品集页面。首页通过全屏视频、项目卡片、技术栈和开发流程说明，集中展示我能把需求拆解为页面、接口、数据结构和可运行作品的能力。AI 工具主要用于提升开发效率，最终代码理解、问题排查、功能验证和交付收口均由本人完成。

我目前关注的方向包括：

- 软件开发工程师
- Java / Python 开发
- 前端与全栈开发
- 微信小程序开发
- AI 协作开发与 Vibe Coding 项目交付

## 独立完成说明

四个核心项目均由本人独立完成，包括需求分析、产品流程设计、页面实现、接口与数据处理、调试修复、展示页整理和项目说明文档。Vibe Coding 是我的高效开发方式：借助 Codex、Claude Code、Trae、GitHub Copilot 等工具快速形成初版，再通过自主代码阅读、调试排错、测试验证和文档沉淀保证项目质量。

## 项目展示

### [职途 AI](https://tl66666.github.io/ztai/static/showcase.html)

AI Agent 求职辅助 Web 系统，围绕简历解析、JD 分析、岗位匹配、模拟面试和投递进度管理，解决求职准备流程分散的问题。

技术栈：Python、Flask、SQLite、JavaScript、Chart.js、MediaRecorder、REST API、多模型 AI 接口。

### [星途自律舱](https://tl66666.github.io/xtzlc/)

星球养成式自律打卡微信小程序，将运动、饮食、学习、工作、计划、睡眠等目标转化为成长反馈，解决传统待办工具反馈弱、坚持成本高的问题。

技术栈：微信原生小程序、WXML、WXSS、JavaScript、云开发、Node.js Test Runner。

### [城会玩 2.0](https://tl66666.github.io/chw2.0/)

城市照片手账与旅行回忆归档微信小程序，以“城市”为照片和笔记容器，让用户按城市找回旅行中的美景、美食和记录。

技术栈：微信原生小程序、WXML、WXSS、JavaScript、图片上传、云存储、内容安全。

### [梦弦 DreamChord](https://tl66666.github.io/DreamChord/)

Web 端视觉小说创作平台，通过章节、场景、镜头卡三级结构组织剧情，支持流程图可视化、分支检测、素材管理、AI 辅助创作和播放器预览。

技术栈：React、TypeScript、Vite、Tailwind CSS、framer-motion、Zustand、Express、Prisma、REST API、JWT。

## 目录结构

```text
.
├── index.html                 # 个人介绍网站主页面
├── 唐乐-简历.pdf               # 网站下载使用的最新简历
├── assets/                    # 项目图片、视频、二维码和备用简历
│   └── portfolio/             # 四个项目的展示素材
├── README.md                  # 仓库首页说明
├── AUTHOR.md                  # 作者与项目定位
├── NOTICE.md                  # 素材与使用说明
└── .nojekyll                  # GitHub Pages 静态资源配置
```

## 本地预览

这是一个纯静态网站，可以直接打开 `index.html` 预览；也可以使用任意静态服务器启动，例如：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 更新说明

- 首页下载按钮固定指向 `唐乐-简历.pdf`，更新简历时只需要替换这个文件。
- GitHub Pages 发布分支为 `main`，推送后通常需要等待一段时间才会刷新线上页面。
- `output/` 和 `.uploads/` 为本地截图、调试或临时输出目录，不作为正式网站内容上传。
