# Netlify Forms 设置指导

本文说明瑞捷英文网站上线到 Netlify 后，如何启用和验证询盘表单。

## 1. 当前网站表单配置

首页底部表单名称：

```text
project-rfq
```

代码中已经包含 Netlify Forms 所需属性：

```html
<form name="project-rfq" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you">
```

并且包含隐藏字段：

```html
<input type="hidden" name="form-name" value="project-rfq" />
```

所以你不需要在代码里额外安装插件。

## 2. Netlify 后台部署设置

在 Netlify 新建站点时选择 GitHub 仓库：

```text
loyo-sun/ruijie_machine
```

构建设置：

```text
Build command: npm run build
Publish directory: dist
```

Node 版本：

```text
20
```

本项目已经在 `netlify.toml` 中写入：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

正常情况下 Netlify 会自动读取。

## 3. 表单识别方式

Netlify Forms 会在构建后的 HTML 中扫描带有 `data-netlify="true"` 的表单。

首次部署成功后，进入 Netlify 后台：

```text
Site overview -> Forms
```

如果识别成功，你会看到：

```text
project-rfq
```

如果暂时看不到，先到线上网站提交一条测试询盘，再刷新 Forms 页面。

## 4. 测试提交

打开 Netlify 线上站点首页，找到底部询盘表单。

当前必填字段：

- Name
- E-mail
- Project Notes
- Consent to Contact

提交后应跳转到：

```text
/thank-you/
```

然后在 Netlify 后台查看：

```text
Forms -> project-rfq -> Verified submissions
```

## 5. 邮件通知设置

Netlify 后台进入：

```text
Forms -> project-rfq -> Form notifications
```

建议添加：

```text
Email notification
```

收件人建议：

```text
海外销售负责人邮箱
```

邮件标题建议：

```text
New website RFQ from Ruijie English Website
```

## 6. 垃圾信息与防护

当前代码已加入 honeypot 字段：

```text
bot-field
```

如果后续垃圾提交较多，可以在 Netlify Forms 中开启或增加：

- Spam filtering
- reCAPTCHA
- Netlify Identity / gated form

第一版不建议一开始就加复杂验证码，以免降低询盘转化率。

## 7. 表单字段调整原则

当前表单是低摩擦版本。

必填字段只保留：

- Name
- E-mail
- Project Notes

其他项目参数放在折叠区，并且全部非必填。

原因：

- 初次访问客户不一定愿意填写复杂项目参数。
- 海外B2B询盘第一步应降低提交阻力。
- 销售可以在后续邮件或会议中补齐国家、梁型、数量、工期、场地等信息。

## 8. 后续接入 CRM

Netlify Forms 第一阶段可用于验证询盘链路。

如果后续线索量上升，建议再接入：

- Zapier / Make
- HubSpot
- Zoho CRM
- 邮件自动回复
- Google Sheets 线索表

第一阶段建议先完成：

1. 表单可提交
2. 邮件可通知
3. 后台可查看线索
4. 销售可在48小时内跟进
