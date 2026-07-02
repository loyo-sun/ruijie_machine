# Ruijie Astro Static Site Prototype

这是瑞捷机械英文官网轻量化方案的 Astro 测试站，用于验证：

- Astro 静态站生成
- Netlify 部署
- Netlify Forms 询盘表单
- GA4 / GSC / GTM 基础接入
- Markdown / Astro 页面内容维护

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

Netlify 构建配置已经写入 `netlify.toml`：

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

## GTM / GA4 / GSC

优先建议只在代码中配置 GTM，再在 GTM 中管理 GA4、转化事件和表单提交事件。

1. 复制 `.env.example` 为 `.env`
2. 填入 `PUBLIC_GTM_ID=GTM-XXXXXXX`
3. Netlify 后台同步配置环境变量 `PUBLIC_GTM_ID`

GSC 不需要写入站点代码，部署后通过 Google Search Console 验证域名或 URL-prefix 即可。

## Netlify Forms

首页底部的 `project-rfq` 表单已经加入：

- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- `form-name` 隐藏字段
- 成功页 `/thank-you`
- 必填字段仅保留 `Name`、`E-mail`、`Project Notes`
- 其他项目参数放入 `Optional project details` 折叠区，全部为非必填

部署到 Netlify 后，表单会在 Netlify 后台自动识别。第一次部署后建议提交一条测试线索。

## 当前设计风格

当前首页采用 `Clean Industrial` 风格：白底、工程绿、钢灰、少量安全橙，适合第一版海外 B2B 工程官网。首页中保留了风格选择区块，便于后续评审切换。
