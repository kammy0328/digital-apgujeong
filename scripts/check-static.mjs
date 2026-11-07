import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const site = "https://digital-apgujeong.vercel.app";
const routes = ["", "/work", "/service", "/contact"];
for (const lang of ["ko", "en"])
  for (const route of routes) {
    const path = (lang === "en" ? "/en" : "") + route;
    const html = readFileSync(
      `dist/${path ? path.slice(1) + ".html" : "index.html"}`,
      "utf8",
    );
    assert(html.includes(`<html lang="${lang}">`));
    assert(html.includes(`rel="canonical" href="${site}${path || "/"}"`));
    for (const code of ["ko", "en", "x-default"])
      assert(html.includes(`hreflang="${code}"`));
    assert(!html.includes('<div id="root"></div>'));
    assert(html.includes("<main"));
    assert(html.includes("<h1"));
    if (route === "/work")
      assert(html.includes("Dragon Pony") || html.includes("드래곤포니"));
    if (route === "/service")
      assert(html.includes(lang === "en" ? "Skin texture" : "피부 결 정돈"));
    assert(!/style="[^"]*(?:^|;)opacity:0(?:;|")/.test(html));
    for (const json of html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ))
      JSON.parse(json[1]);
  }
const notFound = readFileSync("dist/404.html", "utf8");
assert(notFound.includes("noindex, follow"));
assert(notFound.includes("404"));
assert(!notFound.includes('rel="canonical"'));
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
assert.equal([...sitemap.matchAll(/<loc>/g)].length, 8);
assert(sitemap.includes(`${site}/en/work`));
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
assert(!config.rewrites?.some((r) => r.source === "/(.*)"));
assert.equal(config.cleanUrls, true);
console.log(
  "8 static pages: visible body, locale, canonical, alternates, structured data, sitemap and 404 checks passed",
);
