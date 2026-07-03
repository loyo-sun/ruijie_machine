# Ruijie Astro Static Site Prototype

这是瑞捷机械英文官网轻量化方案的 Astro 测试站，基于静态站生成技术构建，支持快速部署和灵活的内容维护。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器访问
http://localhost:4321
```

### 构建生产版本

```bash
npm run build
```

生成的静态文件位于 `dist/` 目录，可直接部署到任何静态托管服务。

### 启动可视化编辑器

```bash
npm run editor
```

在浏览器访问 `http://127.0.0.1:4388/`，用于编辑和发布 News & Resources 文章。

---

## 📚 核心功能

### ✅ 静态站点生成
- 使用 Astro 构建高性能静态网站
- SEO 友好，支持自定义 meta 标签和 canonical URL
- 集成 Schema.org 结构化数据

### ✅ Netlify 部署
- 自动构建和发布
- 构建配置见 `netlify.toml`
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

### ✅ Markdown 内容管理
- 所有文章使用 Markdown 编写
- 存放路径：`src/content/resources/*.md`
- 自动生成列表页（`/resources/`）和详情页（`/resources/[slug]/`）
- 支持可视化编辑器

**详细说明** → [Markdown 内容维护指南](docs/markdown-content-maintenance.md)

### ✅ Netlify Forms 询盘表单
- 首页集成项目询盘表单
- 自动邮件通知和后台管理
- 支持自定义成功页（`/thank-you`）
- 集成防垃圾邮件机制（honeypot）

**详细说明** → [Netlify Forms 配置指南](docs/netlify-forms-setup.md)

### ✅ Google Tag Manager + GA4
- 通过 GTM 统一管理所有跟踪代码
- 支持 GA4 页面浏览和事件跟踪
- 支持表单提交转化跟踪
- 环境变量配置，灵活切换

**详细说明** → [GA4 + GTM 完整配置指南](docs/ga4-gtm-setup-guide.md)

---

## ⚙️ 环境变量配置

### 本地开发

1. 复制环境变量模板：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件：
   ```env
   PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

### Netlify 生产环境

1. 登录 Netlify Dashboard
2. 进入站点 → **Site settings** → **Environment variables**
3. 添加变量：
   - Key: `PUBLIC_GTM_ID`
   - Value: `GTM-XXXXXXX`（你的实际 GTM 容器 ID）

**注意**：只需配置 GTM ID，GA4 和其他跟踪代码在 GTM 后台管理。

---

## 📝 内容维护

### News & Resources 文章

#### 方法 1：直接创建 Markdown 文件

1. 在 `src/content/resources/` 创建新的 `.md` 文件
2. 使用以下模板：

```markdown
---
title: "Article Title"
description: "One sentence SEO description."
date: "2026-07-03"
category: "Planning Guide"
tags:
  - smart girder yard
  - bridge girder production
featured: false
---

Article body starts here.
```

3. 保存后运行 `npm run dev` 或 `npm run build` 查看效果
4. 提交到 GitHub，Netlify 自动部署

#### 方法 2：使用可视化编辑器

```bash
npm run editor
```

- 访问 `http://127.0.0.1:4388/`
- 可视化编辑界面
- 支持图片上传
- 支持草稿保存和直接发布

**详细说明** → [Markdown 内容维护指南](docs/markdown-content-maintenance.md)

---

## 🎨 设计风格

当前首页采用 **Clean Industrial** 风格：

- **配色**：白底、工程绿、钢灰、少量安全橙
- **定位**：B2B 工程官网，专业且易读
- **首页功能**：风格选择区块（便于后续评审和切换）

---

## 📊 分析和跟踪

### Google Tag Manager (GTM)

项目采用 GTM 作为标签管理中心，优势：

- ✅ 无需修改代码即可添加/修改跟踪
- ✅ 集中管理 GA4、Facebook Pixel、LinkedIn Insight Tag
- ✅ 灵活配置触发器和事件

**配置步骤**：

1. 创建 GTM 容器
2. 获取容器 ID（格式：`GTM-XXXXXXX`）
3. 配置环境变量 `PUBLIC_GTM_ID`
4. 在 GTM 后台添加 GA4 代码和事件

**完整指南** → [GA4 + GTM 完整配置指南](docs/ga4-gtm-setup-guide.md)

### Google Analytics 4 (GA4)

- 通过 GTM 部署
- 支持页面浏览、事件跟踪、转化跟踪
- 建议在 GTM 中配置表单提交事件（`generate_lead`）

### Google Search Console (GSC)

GSC 不需要在代码中配置：

1. 部署网站后访问 [Google Search Console](https://search.google.com/search-console/)
2. 添加网站资源
3. 选择验证方式：
   - **推荐**：通过 Google Analytics 验证（最简单）
   - 或通过 DNS TXT 记录验证
   - 或上传 HTML 验证文件到 `public/` 目录

---

## 🗂️ 项目结构

```
9_Astro_site/
├── docs/                          # 文档目录
│   ├── ga4-gtm-setup-guide.md    # GA4 + GTM 配置指南
│   ├── markdown-content-maintenance.md  # Markdown 内容维护指南
│   ├── netlify-forms-setup.md    # Netlify Forms 配置指南
│   └── resource-drafts/          # 文章草稿存放目录
├── public/                        # 静态资源
│   ├── favicon.svg
│   ├── beam-factory-diagram.svg
│   └── resource-images/          # 文章图片目录
├── src/
│   ├── components/               # 可复用组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ...
│   ├── content/                  # 内容集合
│   │   └── resources/            # News & Resources 文章
│   │       ├── fixed-bed-vs-smart-girder-yard.md
│   │       ├── in-mold-curing-precast-beam-production.md
│   │       └── project-data-for-precast-beam-factory-design.md
│   ├── layouts/                  # 布局模板
│   │   └── BaseLayout.astro      # 基础布局（含 GTM 集成）
│   ├── pages/                    # 页面路由
│   │   ├── index.astro           # 首页
│   │   ├── thank-you.astro       # 表单成功页
│   │   └── resources/
│   │       ├── index.astro       # 文章列表页
│   │       └── [slug].astro      # 文章详情页（动态路由）
│   ├── styles/                   # 全局样式
│   │   └── global.css
│   └── content.config.ts         # 内容集合配置
├── tools/
│   └── resource-editor-server.mjs  # 可视化编辑器
├── .env.example                  # 环境变量模板
├── astro.config.mjs              # Astro 配置
├── netlify.toml                  # Netlify 部署配置
├── package.json
└── README.md                     # 本文件
```

---

## 📖 详细文档

| 主题 | 文档路径 | 说明 |
|------|---------|------|
| **Markdown 内容维护** | [docs/markdown-content-maintenance.md](docs/markdown-content-maintenance.md) | 如何添加和编辑 News & Resources 文章 |
| **Netlify Forms 配置** | [docs/netlify-forms-setup.md](docs/netlify-forms-setup.md) | 询盘表单部署和后台设置 |
| **GA4 + GTM 配置** | [docs/ga4-gtm-setup-guide.md](docs/ga4-gtm-setup-guide.md) | Google Analytics 4 和 Tag Manager 完整配置 |

---

## 🔧 常见问题

### Q: 如何添加新的页面？

在 `src/pages/` 目录创建新的 `.astro` 文件，文件名即为 URL 路径。

例如：
- `src/pages/about.astro` → `/about/`
- `src/pages/solutions/index.astro` → `/solutions/`

### Q: 如何修改网站标题和描述？

每个页面在 `<BaseLayout>` 组件中设置：

```astro
<BaseLayout
  title="Your Page Title | Ruijie Machinery"
  description="Your SEO description"
  canonical="/your-page/"
>
```

### Q: 如何更换网站域名？

1. 编辑 `astro.config.mjs`：
   ```javascript
   export default defineConfig({
     site: "https://www.your-new-domain.com",
     output: "static"
   });
   ```

2. 在 Netlify 后台设置自定义域名

3. 更新 DNS 记录

### Q: 如何添加更多表单字段？

编辑 `src/pages/index.astro` 中的表单 HTML，确保保留 Netlify Forms 必需的属性：

- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- `form-name` 隐藏字段

**详细说明** → [Netlify Forms 配置指南](docs/netlify-forms-setup.md)

### Q: 本地开发时会影响 GA4 数据吗？

会的。建议：

- 使用单独的 GA4 测试 property
- 或在 GTM 中设置触发条件，排除 `localhost`

**详细说明** → [GA4 + GTM 完整配置指南](docs/ga4-gtm-setup-guide.md)

---

## 🚢 部署流程

### 首次部署到 Netlify

1. 将代码推送到 GitHub
2. 登录 [Netlify](https://app.netlify.com/)
3. 点击 **Add new site** → **Import an existing project**
4. 连接 GitHub 仓库
5. 构建设置会自动从 `netlify.toml` 读取
6. 点击 **Deploy site**

### 后续更新

提交代码到 GitHub 后，Netlify 会自动触发构建和部署。

---

## 📞 技术栈

- **框架**：[Astro](https://astro.build/) - 现代静态站点生成器
- **部署**：[Netlify](https://www.netlify.com/) - 静态站点托管
- **表单**：[Netlify Forms](https://www.netlify.com/products/forms/) - 服务端表单处理
- **分析**：[Google Tag Manager](https://tagmanager.google.com/) + [GA4](https://analytics.google.com/)
- **内容**：Markdown + Frontmatter
- **样式**：原生 CSS

---

## 📄 许可

内部项目，仅供瑞捷机械使用。

---

**最后更新**：2026-07-03  
**维护者**：Ruijie Overseas Marketing Team
