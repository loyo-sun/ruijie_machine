# Markdown 新闻/资源内容维护

在 `src/content/resources/` 文件夹中新增 `.md` 文件，即可生成新闻/资源详情页，并自动出现在 `/resources/` 列表页。

## 文件命名

建议使用英文小写和连字符：

```text
fixed-bed-vs-smart-girder-yard.md
project-data-for-precast-beam-factory-design.md
```

文件名会成为 URL：

```text
/resources/fixed-bed-vs-smart-girder-yard/
```

## Markdown 字段模板

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

## 字段说明

- `title`：文章标题，必填
- `description`：SEO描述和列表页摘要，建议填写
- `date`：发布日期，格式为 `YYYY-MM-DD`
- `category`：文章分类，例如 `Comparison`、`Planning Guide`、`Technical Resource`
- `tags`：关键词标签
- `featured`：是否作为重点文章

## 更新流程

1. 在 `src/content/resources/` 新建一个 `.md` 文件。
2. 按模板填写 frontmatter。
3. 在正文区用 Markdown 编写文章。
4. 运行 `npm run build` 验证。
5. 提交并推送到 GitHub，Netlify 会自动重新部署。

## 可视化编辑器

如果不想手写 Markdown frontmatter，可以启动本地可视化编辑器：

```bash
npm run editor
```

然后打开：

```text
http://127.0.0.1:4388/
```

编辑器支持：

- 输入标题
- 手动输入 URL 地址 slug
- 点选中文分类，保存时写入英文分类值
- 选择发布日期
- 输入 SEO 摘要
- 输入逗号分隔的标签
- 勾选是否设为重点文章
- 在可视化正文编辑区中排版文章
- 上传图片并自动保存到项目图片目录
- 选择保存目标

保存目标说明：

- `保存草稿到 docs`：保存到 `docs/resource-drafts/`，适合先存草稿，不会生成网站页面。
- `发布到网站`：保存到 `src/content/resources/`，会生成网站文章页。
- `草稿和发布都保存`：同时保存草稿和发布内容。

如果文件名已存在，编辑器会阻止覆盖；需要替换旧文件时，勾选 `允许覆盖同名文件`。

注意：URL slug 建议使用英文小写和连字符，例如：

```text
fixed-bed-vs-smart-girder-yard
```

如果标题是中文，编辑器不会自动生成可用英文 URL，需要手动填写。

## 图片保存

在编辑器中点击 `插入图片` 后，图片会保存到两个位置：

```text
public/resource-images/
docs/resource-drafts/assets/
```

Markdown正文会自动插入类似下面的图片地址：

```markdown
![Image alt](/resource-images/image-name.png)
```

`public/resource-images/` 中的图片会随网站一起部署到 Netlify，因此发布后的文章可以正常显示图片。
