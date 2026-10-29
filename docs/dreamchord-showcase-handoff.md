# DreamChord 展示更新 · 2026-10-29

- 独立详解页：`project-dreamchord.html`，包含声音库、角色绑定、自动配音、语言、编辑器、音乐和可审核 Agent。
- 首页 `#work-dream` 和 `PROJECT_DATA` 中的 DreamChord 图集包含当前首页、声音工作流和故事设置截图；详解页增加封面 / 默认语言与首页三张功能卡片的实机展示。其他 7 个项目保持原数据。
- 图像在 `assets/portfolio/dreamchord/`：`home.webp`、`voices.webp`、`assignment.webp`、`automatic.webp`、`music.webp`、`editor.webp`、`flowchart.webp`、`agent.webp`。从 DreamChord 实际运行截图无损转为 WebP，可点击查看。
- `home-art.webp` 是原创新主视觉；`yuki-zh.wav` / `yuki-ja.wav` 是 Qwen3-TTS 预置合成样音，不是真人克隆，来源与哈希链接到 DreamChord 仓库。
- 页面没有登录信息、API Key、数据库或模型权重；声音需用户点击才播放，同时只播放一条。
- 项目代码与界面应在 DreamChord 仓库维护，本仓库只同步展示与经过验证的当前能力。不要把公开播放器描述成实时 TTS；当前自动合成发生在本机编辑器打开期间。
- 当前仓库已有与本任务无关的删除和未跟踪文件。提交展示时只暂存明确的 DreamChord 页面、README、对应新媒体和本交接文件，不包含其他改动。
- 简历使用作者 2026-10-29 提供的原始 `唐乐-简历.pdf`（当日第二次更新：纷享销客改为新 CRM 交付写法、邦彦改为设计开发口径），不重排或修改内容。根目录下载入口与 `assets/tangle-resume.pdf` 兼容副本字节一致，SHA256 为 `002bd3aadd5302de61757c65158d7fe08fe7ae221e1378e5b4efad939bfbb4e4`，首页链接按新哈希刷新缓存。

验证：`node tests/project-navigation.test.cjs`、`node tests/recruiter-portfolio.test.cjs`，以及桌面 / 手机的独立详解页和声音播放、截图放大。测试需要本地 8765 静态预览及已有 Playwright 运行环境。
