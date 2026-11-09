// Render the same React routes visitors see, not a separate crawler-only summary.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE = "https://digital-apgujeong.vercel.app";
const seo = JSON.parse(readFileSync(join(root, "src/data/seo.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");
const { render } = await import(
  pathToFileURL(join(root, ".ssr-build/entry-server.js"))
);
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const meta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`),
    (_, a, b) => a + esc(value) + b,
  );
const localize = (route, lang) =>
  lang === "en" ? `/en${route === "/" ? "" : route}` : route;
const alternates = (route) =>
  ["ko", "en", "x-default"]
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${SITE}${localize(route, lang === "en" ? "en" : "ko")}" />`,
    )
    .join("\n");
const visible = (body) =>
  body.replace(
    /style="([^"]*)"/g,
    (_, style) =>
      `style="${style.replace(/(?:^|;)opacity:0(?=;|$)/g, "").replace(/(?:^|;)transform:[^;]*/g, "")}"`,
  );
const sitemap = [];
for (const [route, page] of Object.entries(seo)) {
  for (const lang of ["ko", "en"]) {
    const path = localize(route, lang);
    let html = template.replace('<html lang="ko">', `<html lang="${lang}">`);
    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${esc(page.title[lang])}</title>`,
    );
    html = meta(html, "name", "description", page.description[lang]);
    for (const [attr, key, value] of [
      ["property", "og:title", page.title[lang]],
      ["property", "og:site_name", lang === "en" ? "diap" : "디지털 압구정"],
      ["property", "og:description", page.description[lang]],
      ["property", "og:url", SITE + path],
      ["property", "og:locale", lang === "en" ? "en_US" : "ko_KR"],
      ["property", "og:locale:alternate", lang === "en" ? "ko_KR" : "en_US"],
      ["name", "twitter:title", page.title[lang]],
      ["name", "twitter:description", page.description[lang]],
    ])
      html = meta(html, attr, key, value);
    html = html
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${path}$2`)
      .replace("</head>", alternates(route) + "\n</head>");
    // Initial motion styles are decorative; static HTML must be fully readable without JS.
    const body = visible(render(path));
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );
    const out =
      path === "/"
        ? join(dist, "index.html")
        : join(dist, path.slice(1) + ".html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    sitemap.push(
      `<url><loc>${SITE}${path}</loc>${["ko", "en", "x-default"].map((code) => `<xhtml:link rel="alternate" hreflang="${code}" href="${SITE}${localize(route, code === "en" ? "en" : "ko")}"/>`).join("")}</url>`,
    );
    console.log(`rendered ${path}`);
  }
}
let notFound = template.replace(
  /<title>[^<]*<\/title>/,
  "<title>페이지 없음 / Page not found — diap</title>",
);
notFound = meta(notFound, "name", "robots", "noindex, follow").replace(
  /\s*<link rel="canonical"[^>]+>/,
  "",
);
notFound = notFound.replace(
  '<div id="root"></div>',
  `<div id="root">${visible(render("/404"))}</div>`,
);
writeFileSync(join(dist, "404.html"), notFound);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap.join("")}</urlset>`,
);
rmSync(join(root, ".ssr-build"), { recursive: true, force: true });
