# Markdown Resource Maintenance

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

## Frontmatter 模板

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
