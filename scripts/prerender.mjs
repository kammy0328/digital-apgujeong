// After `vite build`: write one HTML file per route with its own title, description, canonical and
// social tags, plus a <noscript> summary. Crawlers (and link previews) then see correct metadata
// without running JavaScript. Vercel serves these files before falling back to the SPA rewrite.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE = "https://digital-apgujeong.vercel.app";
const seo = JSON.parse(readFileSync(join(root, "src/data/seo.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);

const NAV = [
  ["/", "홈"],
  ["/work", "작업물"],
  ["/service", "서비스"],
  ["/contact", "문의"],
];

for (const [route, meta] of Object.entries(seo)) {
  const title = meta.title.ko;
  const description = meta.description.ko;
  const url = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  const links = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join(" ");
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript><h1>${esc(title)}</h1><p>${esc(description)}</p><nav>${links}</nav></noscript>`,
  );
  const out = route === "/" ? join(dist, "index.html") : join(dist, route.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerendered ${route}`);
}
