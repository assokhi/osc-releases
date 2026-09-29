import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // dist/docs.html, served at /docs by Cloudflare's default html_handling
  build: { format: "file" },
  // One PowerShell line is the only code on the site; plain <pre> keeps the HTML free of inline styles
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
    // Never inline scripts: the CSP in public/_headers allows scripts from 'self' only
    build: { assetsInlineLimit: 0 },
  },
});
