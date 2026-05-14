# Personal Website Template

这是一个内容优先的 Astro 个人网站模板，用来展示个人身份、近期动态、项目和写作。模板的维护入口集中在 `src/content/` 和 `public/`：用户只需要编辑 YAML、Markdown/MDX 和静态资源，不需要改 TypeScript 数据数组。

## 5 分钟替换成自己的网站

1. 安装依赖：

```bash
npm install
```

2. 修改个人信息：

```text
src/content/site.yaml
```

3. 替换头像和静态图片：

```text
public/avatar.png
public/avatar-transparent.png
public/projects/
```

4. 启动本地开发：

```bash
npm run dev
```

5. 发布前检查：

```bash
npm run build
```

## 内容维护入口

| 内容 | 文件或目录 |
| --- | --- |
| 站点身份、头像、简介、导航、社交链接 | `src/content/site.yaml` |
| 首页 News | `src/content/news.yaml` |
| Projects 列表和详情页 | `src/content/projects/*.mdx` |
| Blog 文章 | `src/content/blog/*.mdx` |
| 图片、视频、PDF 等静态资源 | `public/` |
| 项目规则 | `AGENTS.md`, `docs/project-rules.md` |
| 设计说明 | `docs/site-design.md` |

内容会通过 Astro Content Collections 校验。字段写错或缺失时，`npm run check` / `npm run build` 会给出错误。

## 修改个人信息

编辑：

```text
src/content/site.yaml
```

常用字段：

- `name`: 姓名。
- `brand`: 页脚或品牌位显示的 ID。
- `title`: 站点标题。
- `description`: 站点描述，用于 SEO 和 RSS。
- `location`: 地点或当前状态，可留空。
- `role`: 简短身份描述，可留空。
- `avatar`: 首页头像，对应 `public/` 下的路径。
- `topbarIcon`: 顶部栏图标，对应 `public/` 下的路径。
- `intro`: 首页简介段落。
- `navigation`: 顶部导航。
- `socialLinks`: 首页和页脚外部链接。

示例：

```yaml
site:
  name: "Your Name"
  brand: "your-id"
  title: "Personal Website"
  description: "Notes, projects, and writing."
  location: "Hangzhou"
  role: "Graduate student"
  avatar: "avatar.png"
  topbarIcon: "avatar-transparent.png"
  intro:
    - "I work on research projects and durable tools."
    - "This site collects my updates, projects, and writing."
  navigation:
    - label: "Home"
      href: "/"
    - label: "Projects"
      href: "/projects/"
    - label: "Blogs"
      href: "/blog/"
  socialLinks:
    - label: "GitHub"
      href: "https://github.com/your-name"
    - label: "Email"
      href: "mailto:you@example.com"
```

## 添加 News

编辑：

```text
src/content/news.yaml
```

每条 News 包含：

- `id`: 唯一 ID，建议使用英文短横线。
- `date`: 日期。
- `title`: 标题。
- `body`: 简短正文。
- `href`: 可选链接。
- `image`: 可选图片路径。
- `imageAlt`: 可选图片替代文本。
- `draft`: 可选，设为 `true` 时不展示。

示例：

```yaml
- id: "new-project"
  date: "2026-05-13"
  title: "New project released"
  body: "I published a small tool for maintaining personal websites."
  href: "/projects/new-project/"
```

News 应保持短、清楚、可扫描。更完整的内容应写成 Blog 或 Project 详情页。

## 添加 Project

Projects 有两种页面形态：

- `project-page`: 普通项目页，适合工具、实验、小项目、开源库。
- `paper-page`: 论文项目页，适合 academic project website。

### 普通项目页

复制模板：

```text
src/templates/project-page.mdx
```

到：

```text
src/content/projects/my-project.mdx
```

项目图片、视频和 PDF 建议放在：

```text
public/projects/my-project/
```

Project 的 frontmatter 同时驱动列表页和详情页。核心写法：

```mdx
---
title: "My Project"
shortTitle: "My Project"
description: "A concise one-sentence project summary."
authors:
  - "Your Name"
venue: "Personal project"
publishedAt: "2026-05-13"
heroImage: "/projects/my-project/teaser.png"
heroImageAlt: "A short description of the teaser image"
thumbnail: "/projects/my-project/thumbnail.png"
thumbnailAlt: "A short description of the thumbnail"
links:
  paper: "https://arxiv.org/abs/xxxx.xxxxx"
  code: "https://github.com/your-name/my-project"
  demo: "https://example.com"
  video: "https://www.youtube.com/watch?v=example"
  dataset: "https://huggingface.co/datasets/example"
  model: "https://huggingface.co/example/model"
  website: "https://example.com"
featured: true
draft: false
---

import BibTeXBlock from "@/components/BibTeXBlock.astro";
import ProjectSection from "@/components/ProjectSection.astro";

<ProjectSection title="Abstract">
Write the project summary here.
</ProjectSection>

<ProjectSection title="Highlights">
- One important point.
- Another important point.
</ProjectSection>

<ProjectSection title="BibTeX">
<BibTeXBlock code={`@misc{your2026project,
  title={My Project},
  author={Your Name},
  year={2026}
}`} />
</ProjectSection>
```

首页优先展示 `featured: true` 的项目；Projects 页面展示全部非 draft 项目。

### 论文项目页

论文项目页仍然需要一个 `src/content/projects/*.mdx` 条目，用来进入 Projects 列表；然后复制：

```text
src/templates/paper-page.astro
```

到：

```text
src/pages/projects/my-paper.astro
```

并把资源放到：

```text
public/projects/my-paper/
```

这样 `/projects/my-paper/` 会使用独立的论文项目页，自动覆盖默认的 `[slug]` 普通项目页。`IAMFlow` 就是这个模式的完整示例。

## 添加 Blog

在目录中新增 `.md` 或 `.mdx` 文件：

```text
src/content/blog/my-first-post.mdx
```

Blog frontmatter：

```mdx
---
title: "My first post"
description: "A short description for the blog list and meta tag."
publishedAt: "2026-05-13"
draft: false
---

Write your post here.
```

`draft: true` 的文章不会出现在列表页、首页或 RSS 中。

## 图片和资源

所有静态资源放在 `public/` 下，并使用以 `/` 开头的路径引用：

```text
public/projects/my-project/teaser.png
```

在内容文件中写：

```yaml
heroImage: "/projects/my-project/teaser.png"
```

大视频、大数据集和大模型不建议直接提交到仓库。优先放在 YouTube、Hugging Face、Zenodo、Google Drive 或 GitHub Releases，然后在项目页 `links` 中引用。

## 本地命令

```bash
npm run dev
npm run check
npm run build
npm run preview
```

`npm run build` 会先执行 `astro check`，再执行 `astro build`。

## GitHub Pages 部署

`astro.config.mjs` 支持通过环境变量配置站点地址和 base path：

```bash
SITE_URL="https://your-username.github.io"
BASE_PATH="/your-repo/"
```

如果部署到用户主页仓库，例如 `your-username.github.io`，通常使用：

```bash
SITE_URL="https://your-username.github.io"
BASE_PATH="/"
```

如果部署到项目仓库，例如 `your-username.github.io/my-site/`，通常使用：

```bash
SITE_URL="https://your-username.github.io"
BASE_PATH="/my-site/"
```

## 技术栈

- `Astro`: 静态站点框架。
- `MDX`: Project 和 Blog 内容格式。
- `Astro Content Collections`: YAML/MDX 内容校验与加载。
- `@astrojs/rss`: 生成 RSS。
- `@astrojs/sitemap`: 生成 sitemap。
- `lucide-astro`: 图标组件。

## 设计方向

这个模板不是装饰型 landing page。首页应保持直接、紧凑、内容优先：先展示身份、头像、简介和外部链接，再展示 News、Projects 和 Blogs。视觉上使用克制排版、细边线、安静背景和小交互状态，避免重型渐变和过度包装。
