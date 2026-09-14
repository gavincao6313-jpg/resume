# 个人简历站

用 React + TypeScript + Vite 构建的单页简历，所有内容由一份类型安全的数据源驱动，改数据即改简历。

## 技术栈

React 19 · TypeScript · Vite 8 · 纯 CSS（无 UI 框架）

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物输出到 dist/
```

## 数据源

全部简历内容集中在 `src/data/resume.ts`，由 `ResumeData` 接口约束结构：

| 字段 | 说明 |
|---|---|
| `personal` | 姓名、职位、联系方式、一句话定位与个人简介 |
| `stats` | 首屏数字概览，留空则不渲染 |
| `strengths` | 核心能力卡片，留空则不渲染 |
| `skills` | 技能分组 |
| `experience` | 工作经历时间线 |
| `projects` | 项目卡片，支持带标签的要点（`{ label, text }`） |
| `education` / `certifications` | 教育背景与资质认证 |

组件只负责渲染，不含任何硬编码文案；新增一段经历只需往数组里加一项。

## 环境变量

手机号等联系方式不写进仓库，改由环境变量注入：

```bash
cp .env.example .env.local   # 填入 VITE_PHONE
```

`.env.local` 已被 `.gitignore` 忽略。线上部署不配置 `VITE_PHONE` 时，页面自动不展示手机号。

## 部署

推送到 main 分支后由 Vercel 自动构建部署（框架预设 Vite，构建命令 `npm run build`，输出目录 `dist`）。
