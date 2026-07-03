# GA4 + GTM 配置指南

## 📋 概述

本项目通过 **Google Tag Manager (GTM)** 来管理所有跟踪代码，包括 GA4。这是最佳实践，优点：

- ✅ 无需修改代码即可添加/修改跟踪
- ✅ 在 GTM 中集中管理 GA4、转化事件、表单提交
- ✅ 便于后续添加其他营销工具（如 LinkedIn Insight Tag）

## 🎯 第一步：创建 Google Analytics 4 账号

### 1.1 创建 GA4 Property

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 点击左下角 **管理 (Admin)**
3. 在账号列下点击 **创建账号 (Create Account)**
   - 账号名称：`Ruijie Machinery`
   - 勾选数据共享设置
4. 创建 Property：
   - Property 名称：`Ruijie Overseas Website`
   - 时区：选择公司所在时区（如 `Asia/Shanghai`）
   - 货币：`USD` 或 `CNY`
5. 业务信息：
   - 行业类别：`Industrial and Manufacturing`
   - 企业规模：选择实际规模
   - 使用意图：勾选 `Generate leads`、`Examine user behavior`
6. 点击 **创建 (Create)**

### 1.2 设置数据流 (Data Stream)

1. 创建后自动进入数据流设置，或在 **管理 > 数据流** 中添加
2. 选择 **网站 (Web)**
3. 填写：
   - 网站网址：`https://www.ruijie-overseas.com`（填写实际域名）
   - 数据流名称：`Ruijie Overseas Main Site`
4. 点击 **创建数据流 (Create Stream)**
5. **重要**：先不要复制测量 ID（G-XXXXXXXXX），我们将通过 GTM 配置

---

## 🏷️ 第二步：创建 Google Tag Manager 容器

### 2.1 创建 GTM 账号和容器

1. 访问 [Google Tag Manager](https://tagmanager.google.com/)
2. 点击 **创建账号 (Create Account)**
3. 填写账号信息：
   - 账号名称：`Ruijie Machinery`
   - 国家/地区：选择公司所在国家
4. 设置容器：
   - 容器名称：`Ruijie Overseas Website`
   - 目标平台：选择 **网站 (Web)**
5. 点击 **创建 (Create)**，同意服务条款

### 2.2 获取 GTM 容器 ID

创建后会显示安装代码，容器 ID 格式为：**GTM-XXXXXXX**

**复制容器 ID**（例如：`GTM-ABC123D`）

---

## 🔧 第三步：在 Astro 站点中配置 GTM

### 3.1 本地开发环境

1. 在项目根目录创建 `.env` 文件（如果不存在）：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env`，填入 GTM ID：
   ```env
   PUBLIC_GTM_ID=GTM-ABC123D
   ```
   **注意**：将 `GTM-ABC123D` 替换为你的实际 GTM 容器 ID

3. 重启开发服务器：
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 `http://localhost:4321`，打开开发者工具：
   - **Chrome DevTools** → Network → 搜索 `gtm.js`
   - 如果看到请求，说明 GTM 已正确加载

### 3.2 Netlify 生产环境

1. 登录 [Netlify Dashboard](https://app.netlify.com/)
2. 进入你的站点
3. 点击 **Site settings** → **Environment variables**
4. 点击 **Add a variable**：
   - Key: `PUBLIC_GTM_ID`
   - Value: `GTM-ABC123D`（你的实际 GTM ID）
5. 点击 **Create variable**
6. 重新部署站点（触发新的构建）

---

## 📊 第四步：在 GTM 中配置 GA4

### 4.1 获取 GA4 测量 ID

1. 返回 [Google Analytics](https://analytics.google.com/)
2. 点击左下角 **管理 (Admin)**
3. 在 Property 列中，点击 **数据流 (Data Streams)**
4. 点击你创建的数据流（Ruijie Overseas Main Site）
5. 复制 **测量 ID**，格式为：**G-XXXXXXXXXX**

### 4.2 在 GTM 中添加 GA4 配置代码

1. 返回 [Google Tag Manager](https://tagmanager.google.com/)
2. 进入你的容器（Ruijie Overseas Website）

#### 步骤 1：创建 GA4 测量 ID 变量

1. 左侧菜单点击 **变量 (Variables)**
2. 在 **用户定义的变量 (User-Defined Variables)** 区域，点击 **新建 (New)**
3. 点击 **变量配置 (Variable Configuration)**
4. 选择 **常量 (Constant)**
5. 值：填入你的 GA4 测量 ID（如 `G-ABC123XYZ`）
6. 命名为：`GA4 Measurement ID`
7. 点击 **保存 (Save)**

#### 步骤 2：创建 GA4 配置代码

1. 左侧菜单点击 **代码 (Tags)**
2. 点击 **新建 (New)**
3. 点击 **代码配置 (Tag Configuration)**
4. 选择 **Google Analytics: GA4 配置 (Google Analytics: GA4 Configuration)**
5. 填写：
   - **测量 ID**：点击右侧 🧩 图标，选择刚创建的变量 `{{GA4 Measurement ID}}`
   - **配置设置 (Configuration Settings)**：
     - 点击展开，勾选 **启用增强型测量 (Enable Enhanced Measurement)**（可选，默认已在 GA4 启用）
6. 点击 **触发条件 (Triggering)**
7. 选择 **All Pages**（所有页面触发）
8. 命名代码为：`GA4 - Config`
9. 点击 **保存 (Save)**

---

## 📋 第五步：配置表单提交跟踪

### 5.1 创建表单提交触发器

1. 在 GTM 左侧菜单点击 **触发器 (Triggers)**
2. 点击 **新建 (New)**
3. 点击 **触发器配置 (Trigger Configuration)**
4. 选择 **表单提交 (Form Submission)**
5. 配置：
   - **等待标记 (Wait for Tags)**：勾选
   - **最长等待时间**：`2000` 毫秒
   - **启用验证检查 (Check Validation)**：勾选
   - **触发条件**：选择 **所有表单 (All Forms)** 或 **某些表单 (Some Forms)**
     - 如果选择 **某些表单**，可以添加条件：
       - Form ID → equals → `project-rfq`（项目询盘表单）
6. 命名为：`Form - Project RFQ Submit`
7. 点击 **保存 (Save)**

### 5.2 创建表单提交事件代码

1. 返回 **代码 (Tags)**，点击 **新建 (New)**
2. 点击 **代码配置 (Tag Configuration)**
3. 选择 **Google Analytics: GA4 事件 (Google Analytics: GA4 Event)**
4. 填写：
   - **配置代码 (Configuration Tag)**：选择 `GA4 - Config`
   - **事件名称 (Event Name)**：`generate_lead`（GA4 推荐事件名）
   - **事件参数 (Event Parameters)**（可选）：
     - 参数名称：`form_name`，值：`project_rfq`
     - 参数名称：`form_location`，值：`homepage`
5. 点击 **触发条件 (Triggering)**
6. 选择刚创建的触发器：`Form - Project RFQ Submit`
7. 命名代码为：`GA4 - Event - Form Submit`
8. 点击 **保存 (Save)**

---

## 🚀 第六步：发布 GTM 容器

### 6.1 预览和调试

1. 在 GTM 右上角点击 **预览 (Preview)**
2. 输入你的网站 URL（本地开发或已部署的 URL）：
   - 本地：`http://localhost:4321`
   - 生产：`https://your-netlify-site.netlify.app`
3. 点击 **Connect**
4. 在打开的网站中：
   - 浏览首页 → GTM 调试面板应该显示 `GA4 - Config` 已触发
   - 提交表单 → 应该显示 `GA4 - Event - Form Submit` 已触发
5. 在 GA4 实时报告中验证（**报告 > 实时**）

### 6.2 发布容器

1. 确认预览无误后，点击 GTM 右上角 **提交 (Submit)**
2. 填写版本信息：
   - 版本名称：`Initial GA4 Setup`
   - 版本说明：`Added GA4 config and form submission tracking`
3. 点击 **发布 (Publish)**

---

## ✅ 第七步：验证配置

### 7.1 使用 GA4 实时报告

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 左侧菜单点击 **报告 (Reports)** → **实时 (Realtime)**
3. 打开你的网站并浏览不同页面
4. 实时报告应该显示：
   - 活跃用户数
   - 页面浏览
   - 事件（包括表单提交）

### 7.2 使用浏览器扩展验证

推荐安装以下 Chrome 扩展：

1. **Google Tag Assistant Legacy**
   - 验证 GTM 和 GA4 代码是否正确加载

2. **GA Debugger**
   - 查看发送到 GA4 的事件详情

---

## 🔍 第八步：配置 Google Search Console

GSC 不需要在代码中配置，部署后验证域名即可。

### 8.1 添加网站资源

1. 访问 [Google Search Console](https://search.google.com/search-console/)
2. 点击 **添加资源 (Add Property)**
3. 选择验证方式：

#### 方式 1：网域验证（推荐）
- 输入：`ruijie-overseas.com`（不带协议）
- 需要在 DNS 添加 TXT 记录

#### 方式 2：网址前缀验证
- 输入：`https://www.ruijie-overseas.com`
- 可选验证方式：
  - **HTML 文件上传**（上传到 `public/` 目录）
  - **HTML 标记**（添加到 `BaseLayout.astro` 的 `<head>`）
  - **Google Analytics**（如果已配置 GA4）← 最简单

### 8.2 通过 GA4 验证（最简单）

1. 在 GSC 验证页面，选择 **Google Analytics**
2. 确保你的 GA4 已正确配置并有数据
3. 点击 **验证 (Verify)**

### 8.3 关联 GA4 和 GSC

1. 在 GA4 左下角点击 **管理 (Admin)**
2. 在 Property 列中，点击 **产品关联 (Product Links)** → **Search Console 链接**
3. 点击 **关联 (Link)**，选择你的 GSC 资源
4. 完成关联后，可在 GA4 中查看搜索查询数据

---

## 📈 关键事件和转化设置

### 9.1 在 GA4 中标记关键事件

1. 访问 GA4，左侧菜单点击 **配置 (Configure)** → **事件 (Events)**
2. 等待几分钟，直到 `generate_lead` 事件出现
3. 点击事件右侧的 **标记为关键事件 (Mark as key event)** 开关
4. 这样该事件会出现在转化报告中

### 9.2 其他推荐跟踪的事件

可在 GTM 中添加更多事件跟踪：

| 事件名称 | 触发条件 | 业务价值 |
|---------|---------|---------|
| `view_item` | 查看产品详情页 | 了解产品兴趣 |
| `file_download` | 下载白皮书/案例 | 高意向线索 |
| `click` | 点击 WhatsApp/Email | 直接联系意向 |
| `scroll` | 页面滚动 75% | 内容参与度 |

---

## 🛠️ 代码实现说明

### 当前实现方式

项目中 GTM 代码已在 `src/layouts/BaseLayout.astro` 中集成：

```astro
---
const gtmId = import.meta.env.PUBLIC_GTM_ID;
---

<!doctype html>
<html lang="en">
  <head>
    <!-- GTM Head Script -->
    {gtmId && (
      <script set:html={`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${gtmId}');`} />
    )}
  </head>
  <body>
    <!-- GTM Body Noscript -->
    {gtmId && (
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}...></iframe>
      </noscript>
    )}
    <slot />
  </body>
</html>
```

**工作原理**：
1. 从环境变量读取 `PUBLIC_GTM_ID`
2. 如果存在，注入 GTM 脚本到 `<head>` 和 `<body>`
3. GTM 加载后，执行容器中配置的所有代码（包括 GA4）

**优点**：
- ✅ 只需配置一个环境变量
- ✅ 所有跟踪逻辑在 GTM 中管理，无需修改代码
- ✅ 支持本地开发和生产环境

---

## 📝 常见问题

### Q1: 为什么选择 GTM 而不是直接安装 GA4？

**答**：GTM 是行业最佳实践，优势包括：
- 无需开发即可添加/修改跟踪
- 集中管理所有营销工具（GA4、Facebook Pixel、LinkedIn Insight Tag）
- 更灵活的事件跟踪和触发条件
- 更好的团队协作（营销团队可自行配置）

### Q2: 本地开发时会影响 GA4 数据吗？

**答**：会。建议：
- 开发时使用单独的 GA4 测试 property
- 或在 GTM 中设置触发条件，排除本地主机：
  - Page Hostname → does not contain → `localhost`

### Q3: Netlify Forms 提交会自动触发 GA4 事件吗？

**答**：不会。Netlify Forms 提交后会跳转到 `/thank-you`，需要：
- 在 GTM 中设置表单提交触发器（如上述配置）
- 或在 `/thank-you` 页面触发转化事件

### Q4: 如何测试表单提交事件？

**答**：
1. 启用 GTM 预览模式
2. 提交表单
3. 在 GTM 调试面板查看 `Form - Project RFQ Submit` 是否触发
4. 在 GA4 实时报告查看 `generate_lead` 事件

### Q5: 需要在每个页面都添加 GTM 代码吗？

**答**：不需要。所有页面都使用 `BaseLayout.astro`，GTM 代码已全局注入。

---

## 🎯 推荐配置清单

完成以下步骤后，你的 GA4 + GTM 配置即完整：

- [ ] 创建 GA4 Property 和数据流
- [ ] 创建 GTM 容器
- [ ] 在 `.env` 和 Netlify 配置 `PUBLIC_GTM_ID`
- [ ] 在 GTM 中添加 GA4 配置代码
- [ ] 配置表单提交跟踪
- [ ] 发布 GTM 容器
- [ ] 在 GA4 实时报告中验证
- [ ] 配置 Google Search Console
- [ ] 关联 GA4 和 GSC
- [ ] 标记 `generate_lead` 为关键事件

---

## 📚 参考资源

- [Google Tag Manager 文档](https://support.google.com/tagmanager)
- [GA4 设置指南](https://support.google.com/analytics/answer/9304153)
- [GA4 推荐事件名称](https://support.google.com/analytics/answer/9267735)
- [Netlify 环境变量文档](https://docs.netlify.com/environment-variables/overview/)

---

**更新日期**：2026-07-03  
**维护者**：Ruijie Overseas Marketing Team
