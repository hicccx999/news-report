# 每日新闻报告

[![部署到 GitHub Pages](https://github.com/hicccx999/news-report/actions/workflows/deploy.yml/badge.svg)](https://github.com/hicccx999/news-report/actions/workflows/deploy.yml)

每日新闻汇总网站 - 使用 VitePress 构建

## 📰 网站功能

- 🎨 **精美界面** - 基于 VitePress 的现代化文档主题
- 🔍 **全文搜索** - 支持搜索所有新闻内容
- � **智能朗读** - 新闻内容朗读功能，可调节语速（0.5x - 2.0x）
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🌙 **深色模式** - 支持亮色/暗色主题切换
- 📂 **分类导航** - AI、科技、国内、国际、财经五大板块
- 🚀 **自动部署** - 推送即发布到 GitHub Pages

## 🔊 朗读功能使用说明

每篇新闻页面顶部都配备了智能朗读工具栏，包含以下功能：

### 功能特性
- **一键朗读** - 点击"朗读新闻"按钮开始朗读当前页面内容
- **暂停/继续** - 朗读过程中可以随时暂停和继续
- **停止朗读** - 完全停止朗读并重置进度
- **语速调节** - 通过滑块调整朗读速度（0.5x 慢速 - 2.0x 快速）
- **实时进度** - 显示当前朗读进度和正在朗读的文本内容

### 使用方法
1. 打开任意新闻页面
2. 页面顶部会显示朗读控制栏
3. 点击"🔊 朗读新闻"按钮开始朗读
4. 使用进度条下方可以看到当前朗读的文本
5. 调整"⚡ 速度"滑块可实时改变朗读速度
6. 点击"⏸️ 暂停朗读"可以暂停，再次点击继续
7. 点击"⏹️ 停止"按钮完全停止朗读

### 技术说明
- 使用浏览器内置的 Web Speech API (Speech Synthesis)
- 支持中文语音合成
- 无需额外插件或服务器支持
- 兼容现代浏览器（Chrome、Edge、Safari 等）

## 🗂️ 新闻分类

- **AI 人工智能** - 大模型、智能体、产业应用等前沿动态
- **科技前沿** - 量子计算、航空航天、半导体等技术突破
- **国内新闻** - 国内政经要闻、社会热点
- **国际新闻** - 全球政治经济外交动态
- **股市财经** - 股市分析、投资资讯

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看网站

### 构建静态文件

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 📝 添加新闻

1. 在 `news-archive/` 目录下创建新的 Markdown 文件
2. 文件命名格式：`{类别}_{日期}.md`，例如：`ai_2026-01-28.md`
3. 提交并推送到 GitHub，网站会自动更新

支持的类别前缀：
- `ai_` - AI 人工智能
- `tech_` - 科技前沿  
- `domestic_` - 国内新闻
- `international_` - 国际新闻
- `stocks_` - 股市财经

## 🌐 部署

本项目使用 GitHub Actions 自动部署到 GitHub Pages。

### 设置 GitHub Pages

1. 进入仓库设置 (Settings)
2. 找到 Pages 选项
3. Source 选择 "GitHub Actions"
4. 推送代码后会自动触发部署

网站地址：https://hicccx999.github.io/news-report/

## 📖 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 前端框架
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com/) - 静态网站托管

## 📄 许可证

MIT License
