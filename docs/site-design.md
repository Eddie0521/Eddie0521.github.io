# Personal Website Design Document

## 1. 设计结论

这个网站应当做成一个内容优先的个人主页，而不是传统营销式作品集。首页第一屏直接回答三个问题：我是谁、我在做什么、如何找到我；后续用 `News`、`Projects`、`Blog` 承接当前动态、成果展示和长期写作。

设计方向是：现代、克制、干净极简的个人站。它借鉴 `zhangzjn.github.io` 的高信噪比结构，吸收开发者个人站的社交链接密度，并保留 Shiro 类博客的轻盈阅读体验，但不照搬任何一个项目的完整外观。

## 2. 用户体验目标

### 2.1 第一优先级

访问者打开首页后，应在 10 秒内理解：

- 站点主人是谁。
- 站点主人当前关注什么。
- 可以从哪里联系或进一步了解站点主人。
- 最近有什么更新。

### 2.2 体验原则

- 身份信息先出现，装饰元素后出现。
- 首页内容可快速扫描，不依赖长篇自我介绍。
- 导航只保留 `Home`、`Projects`、`Blog`，降低选择成本。
- `News` 要像动态流，但比社交媒体更克制、更可归档。
- 项目和文章分离，避免“成果展示”和“思考记录”互相干扰。
- 区块标题使用正常正文级标题尺寸，不使用 `Now`、`Selected`、`Writing` 这类 eyebrow。
- 明确的标题下不放说明性 helper copy，让页面更干净。
- 内容更新应通过 `src/content/` 中的 YAML 或 Markdown/MDX 完成，不让维护者频繁改页面结构。

## 3. 参考站点取舍

### 3.1 `zhangzjn.github.io`

保留：

- 首页信息直接、可信、没有多余包装。
- 列表式内容便于长期维护。
- 学术/个人履历感带来的稳定气质。

不照搬：

- 页面可以更有个人视觉记忆点。
- 社交链接和当前动态可以更突出。
- 移动端需要更现代的布局适配。

### 3.2 `coreychiu-portfolio-template`

保留：

- 现代作品集的清晰项目展示方式。
- 项目入口需要有标题、描述、标签和链接。

不照搬：

- 不采用过重的作品集模板结构。
- 不使用过多营销式分区、视觉卡片和大面积装饰。

### 3.3 `zmh-program.github.io`

保留：

- 头像、名称、身份、链接聚合的直接表达。
- 开发者个人身份的明确性。

不照搬：

- 不让首页变成单纯链接树。
- 内容重心仍然放在介绍、动态、项目和写作上。

### 3.4 `Innei/Shiro`

保留：

- 轻量、流畅、适合长期写作的阅读体验。
- 文章系统应支持 Markdown/MDX。

不照搬：

- 第一版不做复杂主题系统、评论系统、登录态或重型博客后台。
- 个人主页优先级高于完整社区化博客体验。

## 4. 信息架构

### 4.1 顶部导航

顶部只保留三个入口：

- `Home`：个人介绍、外部链接、News、精选项目、最新文章。
- `Projects`：项目归档页，用于展示作品、实验和工具。
- `Blog`：文章归档页，用于长期写作。

导航的作用是定位，不是展示所有内容。更多外部入口放在首页图标链接区。

### 4.2 首页结构

首页顺序：

1. Hero/Profile：头像、名称、身份、地点或状态、个人介绍。
2. Social Links：一横排图标链接。
3. News：列表式动态，可包含文字、图片和链接。
4. Projects：展示 2-3 个重点项目。
5. Blog：展示最近 3 篇文章。

这样排序的原因是：先建立“人”的可信度，再给出当前动态，最后让用户深入探索项目和文章。

### 4.3 Projects 页面

项目列表应保持极简，只包含：

- 项目名称。
- 一句话描述。
- 指向详情页的链接。

项目归档页不追求海报式展示，而是让访问者快速判断每个项目是什么、是否值得点开。更完整的论文式信息放在单个项目详情页。

### 4.4 Project Detail 页面

项目详情页用于承载类似 academic project website 的内容：

- 项目标题和一句话摘要。
- 作者、机构、venue 或发布时间。
- Paper、Code、Demo、Video、Dataset、Model、Website 等资源链接。
- Teaser 图片、视频或 YouTube iframe。
- Abstract、Highlights、System、Results、BibTeX 等正文区块。

视觉上可以比主页内容区稍宽，让图像和视频有展示空间，但仍然使用全站统一字体、边线、圆角和克制按钮，不引入 Bulma 或 FontAwesome 这类重模板依赖。

### 4.5 Blog 页面

文章列表应包含：

- 标题。
- 发布时间。
- 摘要。
- 标签或分类，第一版可选。

文章页重点是阅读体验：正文宽度克制、行高舒适、标题层级清晰。

## 5. 首页详细设计

### 5.1 第一屏布局

桌面端使用左右分栏：

- 左侧：头像、地点/状态、姓名、身份。
- 右侧：2 段个人介绍和图标链接。

移动端改为单列：

- 头像和姓名优先。
- 简介紧随其后。
- 图标链接自动换行。

这样做的原因是桌面端横向空间充足，左右分栏能形成类似名片和自述的关系；移动端则必须保证阅读顺序自然，不让用户横向寻找信息。

### 5.2 个人介绍文案

个人介绍应保持 2-3 段，每段 1-2 句。文案不应写成简历，也不应写成口号。

推荐结构：

- 第一句：我是谁，以及我主要做什么。
- 第二句：我关注的方向。
- 第三句：这个网站会放什么。

示例语气：

> I build small, durable tools and write about the decisions behind them.

中文站点也可以使用中英混合，但需要保持一致。若目标读者主要是国内用户，首页主文案应以中文为主，项目名、技术名和链接名保留英文。

### 5.3 社交图标链接

图标链接放在简介下方，采用横向排列。推荐入口：

- GitHub
- Email
- Blog
- RSS
- Telegram 或 X
- LinkedIn 或个人简历
- 其他内容平台

交互要求：

- 每个图标必须有 `aria-label` 和 `title`。
- hover 时只做轻微颜色和边框变化。
- active 时做轻微缩放，反馈点击行为。
- 外部链接应清楚，内部链接不需要伪装成外部平台。

### 5.4 News 区块

`News` 是首页的第二核心区块。它的作用不是完整博客，而是展示“这个人最近仍在更新、仍在思考、仍在做事”。

每条 News 包含：

- 日期。
- 标题。
- 简短正文。
- 可选链接。
- 可选图片。

内容类型：

- 项目上线。
- 新文章发布。
- 正在研究的问题。
- 读到的资料或链接。
- 小型生活/工作动态。

不建议：

- 过长段落。
- 高频碎碎念。
- 把 News 当成完整社交媒体流。

### 5.5 首页下半部分

`Projects` 和 `Blog` 在首页只放精选内容。首页不是归档页，不能把所有内容摊开。

推荐数量：

- `Projects`：2 个。
- `Blog`：3 篇。

这样能让首页保持轻，同时提供继续浏览的入口。

## 6. 视觉系统

### 6.1 视觉关键词

- Modern minimal
- Neutral surface
- Compact spacing
- Restrained motion
- Content-first

对应到用户体验：页面应让人感觉稳定、可信、清爽，打开后能直接进入内容，而不是被装饰和说明文案打断。

### 6.2 色彩

当前色彩方向：

- 背景：接近白色的中性浅灰。
- 主文字：低饱和近黑。
- 次级文字：中性灰绿。
- 强调色：低饱和深绿灰。
- 分割线：半透明低对比边线。

色彩用途：

- 背景负责保持干净和留白。
- 主文字负责清晰阅读。
- 强调色只用于 hover、重点链接和轻微交互反馈。
- 不使用大面积紫蓝渐变、玻璃拟态或装饰光斑。

### 6.3 字体

推荐策略：

- 正文使用系统 sans-serif，保证加载速度和跨平台稳定。
- 标题同样使用系统 sans-serif，保持现代克制和页面一致性。

当前方向：

- Body：`Avenir Next`, `Segoe UI`, `system-ui`, `sans-serif`
- Display：`Avenir Next`, `Segoe UI`, `system-ui`, `sans-serif`

原因：不引入外部字体能减少加载风险；统一 sans-serif 能让页面更干净，也避免区块标题显得过于海报化。

### 6.4 圆角与卡片

圆角控制在 `8px` 左右。卡片只用于重复内容，例如项目、文章、News 图片容器。

不使用嵌套卡片，不把每个页面分区都做成浮动卡片。页面主体应像连续的编辑版面，而不是很多独立模块堆叠。

### 6.5 动效

第一版只需要轻量交互：

- 链接 hover 的颜色/边框变化。
- 按钮或图标 active 时 `scale(0.96)`。
- 顶部导航 sticky，并带轻微背景模糊。

不做滚动视差、大面积入场动画或复杂页面转场。原因是个人站主要价值是信息和阅读，动效应帮助识别可点击元素，而不是抢注意力。

## 7. 内容模型

### 7.1 站点身份配置

站点身份信息放在：

```text
src/content/site.yaml
```

包含：

- `name`
- `title`
- `description`
- `location`
- `role`
- `avatar`
- `intro`
- `navigation`
- `socialLinks`

这样做的原因是：改个人信息不需要进入页面模板，后续替换头像、简介、链接更安全。

### 7.2 News 数据

News 放在：

```text
src/content/news.yaml
```

字段：

- `date`
- `title`
- `body`
- `href?`
- `image?`
- `imageAlt?`
- `draft?`

图片应放在 `public/` 下，路径由数据引用。

### 7.3 Projects 数据

Projects 列表信息始终来自 MDX frontmatter；普通项目的详情正文也放在同一个 MDX 文件：

```text
src/content/projects/*.mdx
```

字段：

- `title`
- `shortTitle?`
- `description`
- `authors?`
- `publishedAt?`
- `thumbnail?`
- `links?`
- `featured?`
- `draft?`

列表卡片由 frontmatter 自动生成，正文作为普通项目详情页内容。论文官网类项目可以额外新增 `src/pages/projects/<slug>.astro`，使用 `paper-page` 组件覆盖默认详情页。

### 7.4 Project Detail 内容

项目详情页使用 MDX：

```text
src/content/projects/
```

frontmatter 支持：

- `title`
- `shortTitle?`
- `description`
- `authors`
- `affiliations`
- `venue?`
- `publishedAt?`
- `heroImage?`
- `heroImageAlt?`
- `links`
- `draft`

图片和视频放在：

```text
public/projects/<slug>/
```

大型视频、数据集和模型不要直接提交到仓库，优先放外部平台并在 `links` 中引用。

### 7.5 Blog 内容

Blog 使用 MDX：

```text
src/content/blog/
```

每篇文章 frontmatter 至少包含：

- `title`
- `description`
- `publishedAt`
- `draft`

这样能支持静态生成、RSS 和后续内容扩展。

## 8. 响应式设计

### 8.1 桌面端

桌面端核心是横向节奏：

- 页面最大宽度控制在约 `1060px`。
- Hero 使用两列布局。
- News 和列表内容保持清晰间距。
- 顶部导航 sticky，但不压迫内容。

### 8.2 移动端

移动端核心是阅读顺序：

- Hero 改为单列。
- 头像尺寸缩小但仍然是第一视觉锚点。
- 图标链接允许换行。
- 导航可保持横向，但每个入口宽度要避免挤压。
- 所有文本不能溢出容器。

### 8.3 断点策略

不为每个设备单独设计。使用少量断点和流式布局：

- 大屏：左右分栏。
- 中小屏：缩小间距。
- 手机：单列。

## 9. 可访问性要求

- 所有图标链接必须有可读标签。
- 所有图片必须有准确 `alt`，纯装饰图片可留空但要有意识处理。
- 颜色对比要保证正文可读。
- 键盘 focus 状态必须明显。
- 导航当前页需要 `aria-current="page"`。
- 日期使用 `<time datetime="">`。

这些要求的目标不是为了形式合规，而是让网站在键盘、阅读器、弱网和不同设备上都能稳定使用。

## 10. 技术方案

### 10.1 推荐技术栈

- Astro：静态站点生成，适合个人主页和博客。
- MDX：支持文章内容和少量组件化写作。
- Lucide：统一图标系统。
- RSS：为长期写作保留订阅能力。
- Sitemap：便于搜索引擎索引。

### 10.2 不引入的能力

第一版不做：

- 登录系统。
- 评论系统。
- 数据库。
- 复杂后台。
- 主题市场。
- 全站搜索。
- 重型动画框架。

这些能力不是永远不能做，而是第一版不应让它们稀释首页和内容维护体验。

## 11. 文件结构建议

当前结构应保持为：

```text
src/
  components/
    Header.astro
    NewsList.astro
    ProjectPublicationRow.astro
    SectionTitle.astro
  content/
    site.yaml
    news.yaml
    blog/
    projects/
  layouts/
    BaseLayout.astro
  lib/
    content-data.ts
  pages/
    index.astro
    projects.astro
    blog/
  styles/
    global.css
docs/
  project-rules.md
  site-design.md
```

原则：页面负责组织结构，组件负责复用展示，`src/content/` 负责内容维护。

## 12. 内容更新流程

### 12.1 修改个人信息

编辑：

```text
src/content/site.yaml
```

适用于：

- 换头像。
- 改姓名。
- 改简介。
- 改社交链接。
- 改导航。

### 12.2 添加 News

编辑：

```text
src/content/news.yaml
```

News 会按日期倒序展示。

### 12.3 添加项目

新增 MDX：

```text
src/content/projects/<slug>.mdx
```

项目 frontmatter 负责列表信息，正文负责普通详情页内容。若需要论文官网样式，则复制 `src/templates/paper-page.astro` 到 `src/pages/projects/<slug>.astro`。

资源放在：

```text
public/projects/<slug>/
```

### 12.4 添加文章

在目录下新增 MDX：

```text
src/content/blog/
```

草稿使用：

```text
draft: true
```

## 13. 后续扩展路线

### 13.1 第二阶段

可考虑：

- Blog 标签页。
- Projects 按年份或类型过滤。
- 文章目录。
- 页面内搜索。

### 13.2 第三阶段

可考虑：

- 评论系统。
- 深色模式。
- 多语言。
- 更完整的项目详情页。

扩展原则：只有当内容规模真的变大时才增加复杂功能。不要为了“完整”提前加入维护成本。

## 14. 验收标准

### 14.1 视觉验收

- 首页第一屏能明确看到头像、姓名、身份、简介和图标链接。
- 页面没有营销式大 Hero、装饰性渐变背景或无意义卡片堆叠。
- News、Projects、Blog 的层级清晰。
- 桌面和手机端都没有文字溢出、遮挡或布局跳动。

### 14.2 内容验收

- 修改个人信息只需要改 `src/content/site.yaml`。
- 添加 News 只需要改 `src/content/news.yaml`。
- 添加普通项目只需要新增 `src/content/projects/*.mdx`。
- 添加论文项目页需要新增 `src/content/projects/*.mdx`，并复制 `src/templates/paper-page.astro` 到 `src/pages/projects/<slug>.astro`。
- 添加文章只需要新增 `src/content/blog/*.mdx`。

### 14.3 技术验收

每次实现变更后运行：

```bash
npm run build
```

涉及 Astro 内容结构时运行：

```bash
npm run check
```

构建产物 `dist/` 不应提交到版本库。

## 15. 最终方向

这个网站的核心不是“展示一个模板”，而是建立一个长期可维护的个人公开桌面。它应该让访问者快速知道你是谁，也让你自己愿意持续更新。设计上克制，内容上清楚，维护上轻，这三点比视觉特效更重要。
