import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import deployment from "./vercel.json";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const route = req.path.replace(/\/+$/, "") || "/";
      const rule = deployment.redirects.find((item) => {
        const base = item.source.replace("/:path*", "");
        return (
          route === base ||
          (item.source.includes(":path*") && route.startsWith(base + "/"))
        );
      });
      if (rule) return res.redirect(308, rule.destination);
      next();
    });
    const pages = [
      "/",
      "/work",
      "/service",
      "/contact",
      "/en",
      "/en/work",
      "/en/service",
      "/en/contact",
    ];
    app.get(pages, (req, res) => {
      const route = req.path.replace(/\/+$/, "");
      res.sendFile(path.join(distPath, route ? `${route}.html` : "index.html"));
    });
    app.use(express.static(distPath, { extensions: ["html"] }));
    app.get("*", (req, res) => {
      res.status(404).sendFile(path.join(distPath, "404.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
