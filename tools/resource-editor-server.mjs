import { createServer } from "node:http";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const editorFile = path.join(rootDir, "docs", "resource-editor", "index.html");
const draftDir = path.join(rootDir, "docs", "resource-drafts");
const publishDir = path.join(rootDir, "src", "content", "resources");
const port = Number(process.env.RESOURCE_EDITOR_PORT ?? 4388);
const host = "127.0.0.1";

const categories = [
  { label: "新闻动态", value: "News" },
  { label: "对比分析", value: "Comparison" },
  { label: "规划指南", value: "Planning Guide" },
  { label: "技术资料", value: "Technical Resource" },
  { label: "案例研究", value: "Case Study" },
  { label: "公司更新", value: "Company Update" }
];

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function escapeYaml(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function buildMarkdown(payload) {
  const tags = normalizeTags(payload.tags);
  const body = String(payload.body ?? "").trim();
  const lines = [
    "---",
    `title: "${escapeYaml(payload.title)}"`,
    `description: "${escapeYaml(payload.description)}"`,
    `date: "${escapeYaml(payload.date)}"`,
    `category: "${escapeYaml(payload.category)}"`,
    "tags:",
    ...(tags.length > 0 ? tags.map((tag) => `  - ${tag}`) : ["  - smart girder yard"]),
    `featured: ${payload.featured ? "true" : "false"}`,
    "---",
    "",
    body || "Write the article body here."
  ];

  return `${lines.join("\n")}\n`;
}

function validatePayload(payload) {
  const title = String(payload.title ?? "").trim();
  const date = String(payload.date ?? "").trim();
  const category = String(payload.category ?? "").trim();
  const body = String(payload.body ?? "").trim();
  const slug = slugify(payload.slug || title);
  const target = payload.target === "publish" || payload.target === "both" ? payload.target : "draft";

  if (!title) return { error: "请填写标题。" };
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "发布日期必须使用 YYYY-MM-DD 格式。" };
  if (!category) return { error: "请选择分类。" };
  if (!body) return { error: "请填写正文内容。" };
  if (!slug) return { error: "请填写或生成 URL slug。" };

  return {
    value: {
      title,
      description: String(payload.description ?? "").trim(),
      date,
      category,
      tags: normalizeTags(payload.tags),
      featured: Boolean(payload.featured),
      body,
      slug,
      target,
      overwrite: Boolean(payload.overwrite)
    }
  };
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdownFiles(directory, label) {
  try {
    const files = await readdir(directory);
    return files
      .filter((file) => file.endsWith(".md"))
      .sort()
      .map((file) => ({
        file,
        slug: file.replace(/\.md$/, ""),
        target: label
      }));
  } catch {
    return [];
  }
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${host}:${port}`);

    if ((request.method === "GET" || request.method === "HEAD") && (url.pathname === "/" || url.pathname === "/editor")) {
      const html = await readFile(editorFile, "utf8");
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : html);
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/meta") {
      sendJson(response, 200, { categories });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/articles") {
      const [drafts, published] = await Promise.all([
        listMarkdownFiles(draftDir, "draft"),
        listMarkdownFiles(publishDir, "published")
      ]);
      sendJson(response, 200, { drafts, published });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/save") {
      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody);
      const validation = validatePayload(payload);

      if (validation.error) {
        sendJson(response, 400, { ok: false, error: validation.error });
        return;
      }

      const value = validation.value;
      const markdown = buildMarkdown(value);
      const destinations = [];

      if (value.target === "draft" || value.target === "both") {
        destinations.push(path.join(draftDir, `${value.slug}.md`));
      }

      if (value.target === "publish" || value.target === "both") {
        destinations.push(path.join(publishDir, `${value.slug}.md`));
      }

      const existing = [];
      for (const destination of destinations) {
        if (await fileExists(destination)) {
          existing.push(path.relative(rootDir, destination));
        }
      }

      if (existing.length > 0 && !value.overwrite) {
        sendJson(response, 409, {
          ok: false,
          error: "文件已存在。如需替换，请勾选“允许覆盖”。",
          existing
        });
        return;
      }

      await Promise.all(destinations.map((destination) => writeFile(destination, markdown, "utf8")));

      sendJson(response, 200, {
        ok: true,
        slug: value.slug,
        url: `/resources/${value.slug}/`,
        files: destinations.map((destination) => path.relative(rootDir, destination)),
        markdown
      });
      return;
    }

    sendJson(response, 404, { ok: false, error: "未找到请求的接口。" });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "未知服务错误。"
    });
  }
});

server.listen(port, host, () => {
  console.log(`资源编辑器已启动：http://${host}:${port}/`);
});
