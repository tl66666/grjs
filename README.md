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

## Agent 能力主线

个人网站把 Agent 作为贯穿项目的工程能力来展示，而不是把它当作一个泛化的聊天入口：职途 AI Agent 负责读取求职上下文、检索分层记忆并编排 22 个业务工具；DreamChord Agent 负责理解故事结构、调用素材与剧情工具并生成可审批的创作提案。两套系统都强调无 API Key 可用、结构化工具边界、写入前确认和执行后回执，重点体现 Agent 如何解决真实业务问题。

## 独立完成说明

四个核心项目均由本人独立完成，包括需求分析、产品流程设计、页面实现、接口与数据处理、调试修复、展示页整理和项目说明文档。Vibe Coding 是我的高效开发方式：借助 Codex、Claude Code、Trae、GitHub Copilot 等工具快速形成初版，再通过自主代码阅读、调试排错、测试验证和文档沉淀保证项目质量。

## 项目展示

### [职途 AI Agent](https://tl66666.github.io/ztai/static/showcase.html)

本地优先的 AI Agent 求职 Web 系统，把职业目标、简历、JD、模拟面试、机会跟进和复盘行动串成六步闭环。Agent 是项目主线：它能读取当前页面上下文、调用 22 个结构化工具、检索分层记忆并综合多个工具结果；确定性任务始终本地优先，有 API Key 时再增强完整简历改写与开放式表达。

技术栈：Python、Flask、SQLite、SQLite FTS5、原生 JavaScript、JSON Schema、Chart.js、Web Speech、MediaRecorder、Playwright、多模型 AI 接口。

实现重点：自研有界 Tool-Calling Runtime；ContextBuilder 重建权威上下文，MemoryStore 管理分层记忆，Orchestrator 控制工具预算，ToolRegistry 校验 22 个业务工具。写操作遵循“提议 → 预览 → 用户确认 → 领域服务执行 → 幂等回执”，不使用不准确的“ReAct 框架 / 13 个工具”表述。

项目卡媒体：

- `assets/portfolio/jobhunter/agent-local-desktop.webp`：无 API Key 的 Agent 桌面运行与行动优先级综合结果。
- `assets/portfolio/jobhunter/agent-interview-questions-desktop.webp`：选择简历后生成定制面试题的最新桌面运行结果。
- `assets/portfolio/jobhunter/career-hero-loop.mp4`：求职工作台首页 Hero 动态背景，保留原项目展示页的视觉入口。

### [星途自律舱](https://tl66666.github.io/xtzlc/)

星球养成式自律打卡微信小程序，将运动、饮食、学习、工作、计划、睡眠等目标转化为成长反馈，解决传统待办工具反馈弱、坚持成本高的问题。

技术栈：微信原生小程序、WXML、WXSS、JavaScript、云开发、Node.js Test Runner。

### [城会玩 2.0](https://tl66666.github.io/chw2.0/)

城市照片手账与旅行回忆归档微信小程序，以“城市”为照片和笔记容器，让用户按城市找回旅行中的美景、美食和记录。

技术栈：微信原生小程序、WXML、WXSS、JavaScript、图片上传、云存储、内容安全。

### [梦弦 DreamChord](https://tl66666.github.io/DreamChord/)

Web 端视觉小说创作平台，通过章节、场景、镜头卡三级结构组织剧情，支持流程图可视化、分支检测、角色与素材处理、播放器预览和项目感知 DreamChord Agent。Agent 采用自研 ReAct 风格执行链路，结合上下文、分层记忆、白名单工具与审批撤销机制；无 API Key 也能进行项目分析和创作知识问答。

技术栈：React、TypeScript、Vite、Express、Prisma、SQLite、React Flow、Sharp、Zustand、REST API、JWT。

展示卡片截图：

- `assets/portfolio/dreamchord/editor-stage-continuity.png`：故事编辑器与舞台状态连续性。
- `assets/portfolio/dreamchord/agent-workspace.png`：Agent 多对话工作区与项目上下文。
- `assets/portfolio/dreamchord/hero.png`：项目展示页首页 Hero 区背景图，仅用于卡片右侧视觉氛围。

## 目录结构

```text
.
├── index.html                 # 个人介绍网站主页面
├── 唐乐-简历.pdf               # 网站下载使用的最新简历
├── assets/                    # 项目截图、视频、二维码和展示素材
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
