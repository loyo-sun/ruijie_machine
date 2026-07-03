# 编辑器图片插入测试指南

## 问题诊断步骤

### 1. 打开浏览器开发者工具

在编辑器页面（http://127.0.0.1:4388/）按 F12 或右键 → 检查，打开开发者工具。

### 2. 查看 Console 选项卡

测试图片插入时，Console 应该显示：

```
插入图片按钮被点击
文件选择: File {...}
开始上传图片: your-image.png
服务器响应: {ok: true, fileName: "...", url: "/resource-images/..."}
图片插入成功
```

### 3. 常见问题排查

#### 问题 A：点击"插入图片"没反应
- **症状**：Console 没有显示"插入图片按钮被点击"
- **原因**：按钮事件未绑定
- **解决**：刷新页面，确保 JavaScript 加载完成

#### 问题 B：选择文件后没有上传
- **症状**：Console 显示"插入图片按钮被点击"，但没有"文件选择"
- **原因**：文件选择器被取消或文件类型不支持
- **解决**：确保选择的是图片文件（jpg, png, webp, gif, svg）

#### 问题 C：上传失败
- **症状**：Console 显示错误或"服务器响应"包含 error
- **原因**：
  - 图片超过 5MB
  - 文件类型不支持
  - 服务器未运行
- **解决**：
  - 压缩图片
  - 检查文件格式
  - 确认 `npm run editor` 正在运行

#### 问题 D：图片上传成功但不显示
- **症状**：Console 显示"图片插入成功"，但编辑器中看不到图片
- **原因**：DOM 插入问题
- **解决**：这个版本已经改用 DOM 方法插入，应该能正常显示

### 4. 手动测试步骤

1. **启动编辑器**
   ```bash
   cd /Users/chingsun/Documents/瑞捷机械/9_Astro_site
   npm run editor
   ```

2. **打开浏览器**
   - 访问 http://127.0.0.1:4388/
   - 打开开发者工具（F12）

3. **测试图片插入**
   - 在正文编辑器中点击一个位置（设置光标）
   - 点击"插入图片"按钮
   - 选择一张图片（建议 < 1MB）
   - 查看 Console 输出
   - 确认图片在编辑器中显示

4. **检查图片保存**
   - 图片应该保存在：
     - `public/resource-images/your-image-timestamp.jpg`
     - `docs/resource-drafts/assets/your-image-timestamp.jpg`

5. **测试 Markdown 生成**
   - 点击"预览效果"
   - 图片应该在预览中显示
   - 图片地址格式：`/resource-images/filename.jpg`

### 5. 验证完整流程

```bash
# 1. 创建测试文章
标题: Test Image Upload
URL: test-image-upload
发布日期: 今天
分类: Technical Resource
正文: 插入一张测试图片

# 2. 点击"发布到网站"
# 3. 检查生成的 Markdown 文件
cat src/content/resources/test-image-upload.md

# 应该包含类似：
# ![Image name](/resource-images/image-name-20260703123456.jpg)

# 4. 检查图片文件
ls -lh public/resource-images/
```

## 最新改进

### 改进点 1：使用 DOM 方法插入图片

之前使用 `document.execCommand("insertImage")`，现在改为：

```javascript
const img = document.createElement('img');
img.src = data.url;
img.alt = file.name.replace(/\.[^.]+$/, "");
img.style.maxWidth = '100%';
range.insertNode(img);
```

**优势**：
- 更可靠，不依赖浏览器对 execCommand 的支持
- 可以直接设置图片属性（alt, style）
- 避免某些浏览器的兼容性问题

### 改进点 2：添加调试输出

每个关键步骤都有 console.log：
- 按钮点击
- 文件选择
- 上传开始
- 服务器响应
- 插入成功

### 改进点 3：完善错误处理

使用 try-catch 捕获：
- 文件读取错误
- 网络请求错误
- DOM 操作错误

### 改进点 4：图片后自动添加段落

```javascript
const p = document.createElement('p');
p.innerHTML = '<br>';
img.parentNode.insertBefore(p, img.nextSibling);
```

这样插入图片后，光标可以继续在图片下方输入文字。

## 如果问题仍然存在

请提供以下信息：

1. **浏览器和版本**
   - 例如：Chrome 120, Safari 17, Firefox 121

2. **Console 完整输出**
   - 复制所有相关的 log 和 error

3. **Network 选项卡**
   - 查看 `/api/upload-image` 请求
   - 状态码（200, 400, 500?）
   - Response 内容

4. **具体操作步骤**
   - 什么时候出现问题
   - 能否重现

5. **截图**
   - 编辑器界面
   - 开发者工具 Console
   - 错误信息

## 备用方案：直接编辑 Markdown

如果图片插入功能暂时无法使用，可以：

1. **手动保存图片**
   ```bash
   # 将图片复制到项目目录
   cp ~/Downloads/your-image.jpg public/resource-images/
   ```

2. **在 Markdown 中引用**
   ```markdown
   ![Image description](/resource-images/your-image.jpg)
   ```

3. **使用 VS Code 或其他编辑器**
   - 直接编辑 `src/content/resources/*.md` 文件
   - 手动添加图片引用

## 后续优化计划

- [ ] 支持拖拽上传图片
- [ ] 支持粘贴剪贴板图片
- [ ] 图片预览缩略图
- [ ] 批量上传多张图片
- [ ] 图片自动压缩
- [ ] 图片管理界面

---

**更新时间**：2026-07-03  
**维护者**：Ruijie Overseas Marketing Team
