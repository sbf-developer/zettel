/**
 * Zettel — one file. Run: npx tsx app.tsx
 */
if (typeof document === "undefined") {
  const { readFileSync } = await import("node:fs")
  const { createServer } = await import("node:http")
  const { fileURLToPath } = await import("node:url")
  const { randomBytes } = await import("node:crypto")
  const src = readFileSync(fileURLToPath(import.meta.url), "utf8")
  const nonce = randomBytes(16).toString("base64")
  const html = (src.match(/\/\*html([\s\S]*?)html\*\//)?.[1]?.trim() ?? "")
    .replace('<script type="module">', `<script type="module" nonce="${nonce}">`)
  const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'nonce-${nonce}' https://esm.sh`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://ethereum.publicnode.com https://cloudflare-eth.com https://1rpc.io https://eth.drpc.org",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ")
  createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8", Allow: "GET, HEAD" })
      res.end("Method not allowed")
      return
    }
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
      "Content-Security-Policy": contentSecurityPolicy,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
    })
    res.end(req.method === "HEAD" ? undefined : html)
  }).listen(5173, "127.0.0.1", () => console.log("http://localhost:5173"))
}

/*html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="description" content="On-chain zettelkasten. Atomic notes, permanently linked." />
  <meta name="theme-color" content="#ffffff" />
  <title>Zettel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/svg+xml" sizes="32x32" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230a0a0a'/%3E%3Crect x='4' y='3' width='24' height='26' rx='3' fill='%23fff'/%3E%3Cpath d='M8 10h16M8 15h11M8 20h14' stroke='%230a0a0a' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='25' r='4.5' fill='%230a0a0a'/%3E%3C/svg%3E" />
  <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230a0a0a'/%3E%3Crect x='4' y='3' width='24' height='26' rx='3' fill='%23fff'/%3E%3Cpath d='M8 10h16M8 15h11M8 20h14' stroke='%230a0a0a' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='25' r='4.5' fill='%230a0a0a'/%3E%3C/svg%3E" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
      -webkit-text-size-adjust: 100%;
    }
    body {
      font-family: "Inter", system-ui, -apple-system, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #171717;
      background: #fff;
      min-height: 100vh;
      min-height: 100dvh;
      overflow-x: hidden;
    }
    button, textarea, input { font: inherit; }
    button {
      cursor: pointer;
      border: none;
      background: none;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    button:disabled { cursor: not-allowed; opacity: 0.45; }
    .btn-like:disabled.liked { opacity: 1; cursor: default; color: #0a0a0a; }

    .app { min-height: 100dvh; display: flex; flex-direction: column; }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(14px) saturate(1.12);
      -webkit-backdrop-filter: blur(14px) saturate(1.12);
      background: rgba(255, 255, 255, 0.88);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .topbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 20px;
      max-width: 920px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      min-width: 0;
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .topbar-left { gap: 14px; flex-shrink: 0; }
    .topbar-right { gap: 10px; margin-left: auto; flex-shrink: 0; }
    .topbar .brand { margin-bottom: 0; flex-shrink: 0; }
    .brand-btn {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
      border-radius: 6px;
      transition: opacity 0.15s ease;
    }
    .brand-btn:hover { opacity: 0.7; }
    .topbar .brand-sm .brand-mark { width: 18px; height: 18px; border-radius: 4px; }
    .topbar .brand-sm .brand-name { font-size: 15px; }
    .topbar .nav { flex: 0 0 auto; width: 198px; }
    .topbar .search-wrap {
      width: 200px;
      flex: 0 0 200px;
      margin-bottom: 0;
    }
    .topbar-account {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .topbar-account .wallet-addr {
      font-size: 11px;
      font-weight: 500;
      color: #737373;
      padding: 5px 9px;
      border-radius: 999px;
      background: #f5f5f5;
      border: none;
      max-width: 104px;
    }
    .search-icon { display: inline-flex; align-items: center; justify-content: center; color: #a3a3a3; flex-shrink: 0; }
    .sidebar { display: none !important; }

    .landing {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 20px;
      padding-top: max(32px, env(safe-area-inset-top));
      padding-bottom: max(32px, env(safe-area-inset-bottom));
    }
    .landing-inner {
      width: 100%;
      max-width: 380px;
      text-align: center;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .brand-lg { margin-bottom: 16px; }
    .brand-lg .brand-mark { width: 32px; height: 32px; border-radius: 8px; }
    .brand-lg .brand-name { font-size: 28px; }
    .brand-mark {
      width: 26px;
      height: 26px;
      border-radius: 7px;
      flex-shrink: 0;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230a0a0a'/%3E%3Crect x='4' y='3' width='24' height='26' rx='3' fill='%23fff'/%3E%3Cpath d='M8 10h16M8 15h11M8 20h14' stroke='%230a0a0a' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='25' r='4.5' fill='%230a0a0a'/%3E%3C/svg%3E") center/cover no-repeat;
    }
    .brand-name {
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.04em;
      color: #0a0a0a;
      line-height: 1;
    }
    .brand-sm .brand-mark { width: 20px; height: 20px; border-radius: 5px; }
    .brand-sm .brand-name { font-size: 16px; letter-spacing: -0.03em; }
    .tagline {
      color: #737373;
      font-size: 15px;
      margin-bottom: 32px;
      line-height: 1.55;
      letter-spacing: -0.01em;
    }
    .error {
      color: #dc2626;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 16px;
      word-break: break-word;
    }
    .wallet-help {
      text-align: left;
      font-size: 13px;
      color: #737373;
      line-height: 1.55;
      margin-bottom: 24px;
      padding: 16px;
      background: #fafafa;
      border-radius: 10px;
    }
    .wallet-help ol { padding-left: 18px; margin: 0; }
    .wallet-help li { margin-bottom: 6px; }
    .wallet-help li:last-child { margin-bottom: 0; }
    .wallet-list { display: flex; flex-direction: column; gap: 6px; width: 100%; }
    .wallet-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 48px;
      padding: 12px 14px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #171717;
      background: #fafafa;
      text-align: left;
      transition: background 0.15s ease;
    }
    .wallet-btn:hover:not(:disabled) { background: #f0f0f0; }
    .wallet-btn img { width: 22px; height: 22px; border-radius: 5px; flex-shrink: 0; }
    .wallet-btn span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      min-height: 40px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      transition: color 0.15s ease, background 0.15s ease;
    }
    .btn-primary {
      background: #0a0a0a;
      color: #fff;
      width: 100%;
    }
    .btn-primary:hover:not(:disabled) { background: #262626; }
    .btn-primary:disabled { background: #e5e5e5; color: #a3a3a3; }
    .btn-connect {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 9px 18px;
      min-height: 36px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: #171717;
      background: #fff;
      border: 1px solid #e5e5e5;
      width: auto;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .btn-connect:hover:not(:disabled) { border-color: #d4d4d4; background: #fafafa; }
    .btn-connect:disabled { opacity: 0.5; cursor: not-allowed; }
    .landing-actions { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; }
    .btn-ghost { color: #737373; padding: 8px 12px; font-weight: 500; }
    .btn-ghost:hover:not(:disabled) { color: #171717; }
    .btn-ghost.active { color: #0a0a0a; font-weight: 600; }
    .btn-like, .btn-action {
      color: #737373;
      font-size: 13px;
      font-weight: 500;
      padding: 6px 8px;
      min-height: auto;
      border-radius: 6px;
      gap: 5px;
    }
    .btn-like:hover:not(:disabled), .btn-action:hover:not(:disabled) { color: #171717; background: #f5f5f5; }
    .btn-like.liked { color: #0a0a0a; }
    .btn-sm { font-size: 13px; padding: 6px 10px; min-height: 32px; }
    .btn-xs { font-size: 12px; padding: 4px 8px; min-height: 28px; color: #a3a3a3; }
    .btn-xs:hover:not(:disabled) { color: #525252; }
    .btn-primary.btn-compact { width: auto; min-width: 96px; padding: 8px 16px; }

    .sidebar {
      padding: 20px 16px 16px;
      padding-top: max(20px, env(safe-area-inset-top));
    }
    .mobile-wallet {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .sidebar-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      min-width: 0;
    }
    .sidebar-foot { display: none; }
    .wallet-addr {
      font-variant-numeric: tabular-nums;
      font-size: 12px;
      font-weight: 500;
      color: #737373;
      letter-spacing: -0.01em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nav {
      position: relative;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      padding: 2px;
      border-radius: 8px;
      background: #fff;
      overflow: hidden;
      isolation: isolate;
    }
    .nav::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(165,165,175,0.5), rgba(255,255,255,0.92));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .nav-indicator {
      position: absolute;
      top: 2px;
      left: 2px;
      width: calc((100% - 4px) / 3);
      height: calc(100% - 4px);
      border-radius: 6px;
      background: #f5f5f5;
      box-shadow: none;
      transition: transform 0.28s cubic-bezier(0.34, 1.1, 0.64, 1), opacity 0.2s ease;
      will-change: transform;
      pointer-events: none;
      z-index: 0;
    }
    .nav-indicator-off { opacity: 0; }
    .nav-btn {
      position: relative;
      z-index: 1;
      flex: none;
      min-height: 28px;
      padding: 4px 6px;
      font-size: 12px;
      border-radius: 6px;
      background: transparent;
      color: #a3a3a3;
      transition: color 0.2s ease;
    }
    .nav-btn:hover:not(:disabled) { color: #525252; }
    .nav-btn.active { color: #171717; font-weight: 600; text-shadow: none; }

    .main {
      flex: 1;
      min-width: 0;
      padding: 20px 16px 48px;
      padding-bottom: max(48px, env(safe-area-inset-bottom));
    }
    .main-inner { max-width: 560px; margin: 0 auto; }
    .feed-list { display: flex; flex-direction: column; }

    .search-wrap {
      position: relative;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px 0 10px;
      min-height: 32px;
      border-radius: 8px;
      background: #fff;
      isolation: isolate;
    }
    .search-wrap::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 1px;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(165,165,175,0.5), rgba(255,255,255,0.92));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      flex: 1; min-width: 0; padding: 0 20px 0 0;
      border: none;
      background: transparent;
      color: #171717;
      font-size: 12px;
      letter-spacing: -0.01em;
    }
    .search-input::placeholder { color: #a3a3a3; }
    .search-input:focus { outline: none; }
    .search-clear {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: #a3a3a3;
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-clear:hover { color: #525252; }

    .card {
      display: flex;
      gap: 12px;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.12s ease;
    }
    .card:last-child { border-bottom: none; }
    .card-click { cursor: pointer; }
    .card-click:hover { background: #fafafa; margin: 0 -12px; padding-left: 12px; padding-right: 12px; border-radius: 10px; }
    .card-sm { padding: 12px 0; }
    .card-hero {
      padding: 8px 0 20px;
      border-bottom: 1px solid #ebebeb;
      margin-bottom: 4px;
    }
    .card-hero .content { font-size: 17px; color: #171717; margin-bottom: 14px; }
    .card-body { flex: 1; min-width: 0; }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      letter-spacing: -0.02em;
    }
    .avatar-sm { width: 28px; height: 28px; font-size: 10px; }
    .card-meta {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 4px;
      flex-wrap: wrap;
    }
    .author { font-size: 13px; font-weight: 600; color: #171717; letter-spacing: -0.02em; }
    .author-sm { font-size: 12px; font-weight: 600; }
    .author-link {
      border: 0;
      padding: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
      text-align: left;
    }
    .author-link:hover { text-decoration: underline; }
    .time { font-size: 12px; color: #a3a3a3; }
    .content {
      font-size: 15px;
      color: #262626;
      line-height: 1.55;
      margin-bottom: 8px;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: anywhere;
      letter-spacing: -0.011em;
    }
    .card-actions { display: flex; align-items: center; gap: 2px; margin-left: -8px; }
    .action-count { font-variant-numeric: tabular-nums; }
    .sync-hint { font-size: 12px; color: #a3a3a3; margin: 0 0 8px; padding: 0 2px; }

    .thread { margin-top: 4px; }
    .thread-item {
      position: relative;
      padding-left: 0;
    }
    .thread-item.depth-1 { padding-left: 20px; }
    .thread-item.depth-2 { padding-left: 36px; }
    .thread-item.depth-3,
    .thread-item.depth-4,
    .thread-item.depth-5 { padding-left: 48px; }
    .thread-item .card {
      border-bottom: 1px solid #f5f5f5;
      padding: 12px 0;
    }
    .thread-item .card-click:hover {
      margin: 0 -8px;
      padding-left: 8px;
      padding-right: 8px;
    }
    .reply-composer {
      margin-top: 16px;
      padding: 14px;
      border: 1px solid #ebebeb;
      border-radius: 12px;
      background: #fafafa;
    }
    .reply-target {
      font-size: 12px;
      color: #737373;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .reply-target strong { color: #171717; font-weight: 600; }
    .reply-composer .textarea {
      min-height: 72px;
      max-height: 180px;
      border-bottom: none;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .reply-composer .textarea:focus { border-color: #a3a3a3; }
    .reply-composer .editor-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 10px;
    }
    .reply-composer .char-count { margin: 0; }

    .editor { margin-top: 4px; }
    .editor-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: 8px;
    }
    .textarea {
      width: 100%;
      padding: 0 0 12px;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      border-radius: 0;
      background: transparent;
      color: #171717;
      resize: vertical;
      min-height: 140px;
      max-height: 50vh;
      line-height: 1.65;
      letter-spacing: -0.011em;
      transition: border-color 0.15s ease;
    }
    .textarea::placeholder { color: #a3a3a3; }
    .textarea:focus { outline: none; border-color: #171717; }
    .char-count { font-size: 12px; color: #a3a3a3; margin: 8px 0 16px; text-align: right; }
    .section-title { font-size: 16px; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.02em; color: #0a0a0a; }
    .section-sub { font-size: 13px; color: #737373; margin-bottom: 24px; line-height: 1.5; }
    .empty {
      padding: 64px 0;
      color: #a3a3a3;
      font-size: 14px;
      line-height: 1.55;
      letter-spacing: -0.01em;
      text-align: center;
    }
    .back { margin-bottom: 16px; color: #737373; }
    .replies-label {
      font-size: 12px;
      font-weight: 600;
      color: #737373;
      letter-spacing: 0.01em;
      margin: 20px 0 4px;
      padding: 0 2px;
    }
    .search-section { margin-bottom: 32px; }
    .search-label {
      font-size: 12px;
      font-weight: 500;
      color: #a3a3a3;
      letter-spacing: 0.02em;
      margin-bottom: 12px;
    }
    .user-result {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px 0;
      border-bottom: 1px solid #f5f5f5;
      text-align: left;
      transition: opacity 0.15s ease;
    }
    .user-result:hover { opacity: 0.7; }
    .user-result .author { flex: 1; min-width: 0; }
    .user-meta { font-size: 13px; color: #a3a3a3; flex-shrink: 0; }

    @media (min-width: 768px) {
      .landing-inner { max-width: 400px; }
      .topbar-inner { padding: 10px 24px; gap: 20px; }
      .topbar .search-wrap { width: 220px; flex-basis: 220px; }
      .main { padding: 24px 32px 64px; }
      .textarea { min-height: 160px; font-size: 16px; }
      .content { font-size: 15px; }
      .card-hero .content { font-size: 18px; }
      .landing { background: #fafafa; }
      .landing-inner {
        max-width: 400px;
        background: #fff;
        padding: 48px 40px;
        border-radius: 14px;
        border: 1px solid #f0f0f0;
      }
    }

    @media (min-width: 1024px) {
      body { background: #fff; }
      .main {
        padding: 28px 48px 64px;
        display: flex;
        justify-content: center;
      }
      .main-inner { width: 100%; max-width: 560px; }
    }

    @media (max-width: 640px) {
      .topbar-inner { gap: 10px; padding: 8px 12px; }
      .topbar-left { gap: 10px; }
      .topbar .nav { width: 168px; }
      .topbar .search-wrap { width: 132px; flex-basis: 132px; }
      .topbar-account .wallet-addr { display: none; }
      .nav-btn { font-size: 11px; padding: 4px 4px; }
      .thread-item.depth-1 { padding-left: 14px; }
      .thread-item.depth-2,
      .thread-item.depth-3,
      .thread-item.depth-4,
      .thread-item.depth-5 { padding-left: 24px; }
    }

    @media (max-width: 400px) {
      .topbar .search-wrap { width: 96px; flex-basis: 96px; }
      .topbar .nav { width: 150px; }
      .nav-btn { font-size: 10px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .btn, .card, .wallet-btn, .textarea, .user-result { transition: none; }
      .nav-indicator { transition: none; }
    }
  </style>
</head>
<body>
<div id="root"></div>
<script type="module">
import React, { useCallback, useEffect, useMemo, useRef, useState } from "https://esm.sh/react@19.2.7"
import { createRoot } from "https://esm.sh/react-dom@19.2.7/client"
import { createPublicClient, createWalletClient, custom, http, parseAbiItem, decodeEventLog } from "https://esm.sh/viem@2.55.2"
import { mainnet } from "https://esm.sh/viem@2.55.2/chains"

const MAX = 500 // UTF-8 bytes, enforced both here and in the contract
const RPCS = [
  "https://ethereum.publicnode.com",
  "https://cloudflare-eth.com",
  "https://1rpc.io/eth",
  "https://eth.drpc.org",
]
const POLL_MS = 30_000
// The contract address and deployment block are the permanent application root.
// Deploy the secure contract once and commit these values to every frontend build.
// Browser storage is not used for feed identity; every read starts from these values.
// Canonical Zettel feed — baked into source so any frontend instance loads the same chain data.
// Deploy once and paste the address + block here before publishing.
const ZETTEL_FEED = ""
const ZETTEL_FROM_BLOCK = "0"
const isAddr = (a) => typeof a === "string" && /^0x[a-fA-F0-9]{40}$/.test(a) && !/^0x0{40}$/i.test(a)
const canonicalFeedConfigured = () => isAddr(ZETTEL_FEED) && /^\d+$/.test(String(ZETTEL_FROM_BLOCK))
let sessionFeed = null
const setupMode = () => new URLSearchParams(location.search).get("setup") === "1"
const configuredFeed = () => canonicalFeedConfigured()
  ? { address: ZETTEL_FEED, block: ZETTEL_FROM_BLOCK }
  : sessionFeed
const BYTECODE = "0x608060405260015f553480156012575f5ffd5b506103e1806100205f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c80631252cb481461004357806361b8ce8c1461005f578063725009d31461007d575b5f5ffd5b61005d600480360381019061005891906101ef565b610099565b005b610067610107565b604051610074919061025b565b60405180910390f35b61009760048036038101906100929190610274565b61010c565b005b3373ffffffffffffffffffffffffffffffffffffffff165f5f8154809291906100c1906102cc565b919050557f9fcb19e60f699236a745fa8a0fc59ec21c36952f3230d3f494e5d3530cdbdb73858585426040516100fa949392919061036d565b60405180910390a3505050565b5f5481565b3373ffffffffffffffffffffffffffffffffffffffff16817fcf765d6f163c9b0d832e2a94f4c8e9bffd32a2c3ca5fdbb8cc67b5fe1441f41360405160405180910390a350565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f84011261017c5761017b61015b565b5b8235905067ffffffffffffffff8111156101995761019861015f565b5b6020830191508360018202830111156101b5576101b4610163565b5b9250929050565b5f819050919050565b6101ce816101bc565b81146101d8575f5ffd5b50565b5f813590506101e9816101c5565b92915050565b5f5f5f6040848603121561020657610205610153565b5b5f84013567ffffffffffffffff81111561022357610222610157565b5b61022f86828701610167565b93509350506020610242868287016101db565b9150509250925092565b610255816101bc565b82525050565b5f60208201905061026e5f83018461024c565b92915050565b5f6020828403121561028957610288610153565b5b5f610296848285016101db565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6102d6826101bc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036103085761030761029f565b5b600182019050919050565b5f82825260208201905092915050565b828183375f83830152505050565b5f601f19601f8301169050919050565b5f61034c8385610313565b9350610359838584610323565b61036283610331565b840190509392505050565b5f6060820190508181035f830152610386818688610341565b9050610395602083018561024c565b6103a2604083018461024c565b9594505050505056fea26469706673582212202847d4670012fd8b599a095be94807d434458001a5212164a29cf6b99b4a8e7b64736f6c634300081e0033"

// BYTECODE above is the pre-guard contract kept only for historical compatibility; it is never deployed.
// Current contract, compiled with Solidity 0.8.30 and optimizer enabled. It enforces
// non-empty/500-byte posts, valid parents, and one like per wallet at the contract layer.
const SECURE_BYTECODE = "0x608060405260015f553480156012575f5ffd5b50610442806100205f395ff3fe608060405234801561000f575f5ffd5b506004361061004a575f3560e01c806302c427871461004e5780631252cb481461009057806361b8ce8c146100a5578063725009d3146100bb575b5f5ffd5b61007b61005c3660046102e7565b600160209081525f928352604080842090915290825290205460ff1681565b60405190151581526020015b60405180910390f35b6100a361009e366004610320565b6100ce565b005b6100ad5f5481565b604051908152602001610087565b6100a36100c9366004610392565b6101f2565b5f54826101125760405162461bcd60e51b815260206004820152600d60248201526c115b5c1d1e4818dbdb9d195b9d609a1b60448201526064015b60405180910390fd5b6101f48311156101575760405162461bcd60e51b815260206004820152601060248201526f436f6e74656e7420746f6f206c6f6e6760801b6044820152606401610109565b811561019d5780821061019d5760405162461bcd60e51b815260206004820152600e60248201526d125b9d985b1a59081c185c995b9d60921b6044820152606401610109565b6101a88160016103a9565b5f55604051339082907f9fcb19e60f699236a745fa8a0fc59ec21c36952f3230d3f494e5d3530cdbdb73906101e49088908890889042906103ce565b60405180910390a350505050565b5f8111801561020157505f5481105b61023c5760405162461bcd60e51b815260206004820152600c60248201526b155b9adb9bdddb881c1bdcdd60a21b6044820152606401610109565b5f81815260016020908152604080832033845290915290205460ff16156102955760405162461bcd60e51b815260206004820152600d60248201526c105b1c9958591e481b1a5ad959609a1b6044820152606401610109565b5f818152600160208181526040808420338086529252808420805460ff19169093179092559051909183917fcf765d6f163c9b0d832e2a94f4c8e9bffd32a2c3ca5fdbb8cc67b5fe1441f4139190a350565b5f5f604083850312156102f8575f5ffd5b8235915060208301356001600160a01b0381168114610315575f5ffd5b809150509250929050565b5f5f5f60408486031215610332575f5ffd5b833567ffffffffffffffff811115610348575f5ffd5b8401601f81018613610358575f5ffd5b803567ffffffffffffffff81111561036e575f5ffd5b86602082840101111561037f575f5ffd5b6020918201979096509401359392505050565b5f602082840312156103a2575f5ffd5b5035919050565b808201808211156103c857634e487b7160e01b5f52601160045260245ffd5b92915050565b60608152836060820152838560808301375f608085830101525f6080601f19601f87011683010190508360208301528260408301529594505050505056fea2646970667358221220560275f21868a8909e0a7da68046865d4bfd3bf5fc04aa6352f1435da30a816564736f6c634300081e0033"
const RUNTIME_BYTES = 0x442
const SECURE_RUNTIME = `0x${SECURE_BYTECODE.slice(2 + 0x20 * 2, 2 + (0x20 + RUNTIME_BYTES) * 2)}`

const ABI = [
  parseAbiItem("event PostCreated(uint256 indexed id, address indexed author, string content, uint256 parentId, uint256 timestamp)"),
  parseAbiItem("event PostLiked(uint256 indexed postId, address indexed liker)"),
  parseAbiItem("function createPost(string content, uint256 parentId)"),
  parseAbiItem("function likePost(uint256 postId)"),
  parseAbiItem("function liked(uint256 postId, address liker) view returns (bool)"),
  parseAbiItem("function nextId() view returns (uint256)"),
]
const POST_EV = ABI[0]
const LIKE_EV = ABI[1]

const addrEq = (a, b) => a?.toLowerCase() === b?.toLowerCase()
const idString = (id) => typeof id === "bigint" ? id.toString() : String(id)
const isRootPost = (p) => idString(p?.parentId) === "0"
const postKey = (p) => `${(p.notebook ?? "").toLowerCase()}:${idString(p.id)}`
const likeKey = (notebook, id) => `${(notebook ?? "").toLowerCase()}:${idString(id)}`
const postFromArgs = (args, notebook) => ({
  id: idString(args.id),
  author: args.author,
  content: args.content,
  parentId: idString(args.parentId),
  timestamp: Number(args.timestamp),
  notebook: notebook ?? null,
})
const postsFromReceipt = (receipt) => {
  const out = []
  for (const log of receipt.logs) {
    try {
      const ev = decodeEventLog({ abi: [POST_EV], data: log.data, topics: log.topics })
      if (ev.eventName === "PostCreated") out.push(postFromArgs(ev.args, log.address))
    } catch (_) {}
  }
  return out
}
const mergePosts = (prev, add) => {
  const map = new Map(prev.map((p) => [`${(p.notebook ?? "").toLowerCase()}:${p.id}`, p]))
  for (const p of add) map.set(`${(p.notebook ?? "").toLowerCase()}:${p.id}`, p)
  return [...map.values()]
}
const applyChainPosts = (prev, chain) => {
  if (!chain.length && prev.length && contractAddr()) return prev
  return mergePosts(prev, chain)
}

const sharedFeedAddress = () => {
  return configuredFeed()
}

const feedsToLoad = () => {
  const primary = sharedFeedAddress()
  return primary ? [{ address: primary.address, block: primary.block }] : []
}

const feedConfig = () => {
  const shared = configuredFeed()
  if (shared) {
    return { address: shared.address, block: shared.block }
  }
  return null
}
const contractAddr = () => feedConfig()?.address ?? null
const fromBlock = () => BigInt(feedConfig()?.block ?? "0")

const short = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`
const utf8Length = (s) => new TextEncoder().encode(s).length
const sanitize = (s) => {
  let out = ""
  let bytes = 0
  for (const char of String(s ?? "").replace(/\u0000/g, "")) {
    const size = utf8Length(char)
    if (bytes + size > MAX) break
    out += char
    bytes += size
  }
  return out
}
const clean = (s) => sanitize(s).trim()
const byNew = (a, b) => b.timestamp - a.timestamp
const byOld = (a, b) => a.timestamp - b.timestamp
const avatarHue = (a) => {
  let h = 0
  const s = (a ?? "").toLowerCase()
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 360
}
const avatarStyle = (a) => ({ background: `hsl(${avatarHue(a)} 28% 42%)` })
const avatarLetters = (a) => (a ? a.slice(2, 4).toUpperCase() : "??")
const childrenOf = (posts, parent, seen = null) =>
  posts.filter((p) => p.parentId === idString(parent.id)
    && addrEq(p.notebook, parent.notebook)
    && (!seen || !seen.has(postKey(p)))).sort(byOld)
const countDescendants = (posts, parent) => {
  let n = 0
  const seen = new Set([postKey(parent)])
  const walk = (node) => {
    for (const c of childrenOf(posts, node, seen)) {
      seen.add(postKey(c))
      n++
      walk(c)
    }
  }
  walk(parent)
  return n
}
const fmtTime = (ts) => new Date(ts * 1000).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })

// Social timeline: all authors, top-level only, newest first, tie-break by likes & replies.
const buildSocialFeed = (posts, likes) => posts
  .filter((p) => isRootPost(p) && p.content?.trim())
  .map((p) => ({ ...p, replyCount: countDescendants(posts, p) }))
  .sort((a, b) => {
    const dt = b.timestamp - a.timestamp
    if (dt !== 0) return dt
    const dl = (likes.get(likeKey(b.notebook, b.id)) ?? 0) - (likes.get(likeKey(a.notebook, a.id)) ?? 0)
    if (dl !== 0) return dl
    return b.replyCount - a.replyCount
  })

const matchesAddr = (addr, q) => {
  const needle = q.trim().toLowerCase()
  if (!needle) return false
  const a = addr.toLowerCase()
  const bare = a.replace(/^0x/, "")
  const hex = needle.replace(/^0x/, "")
  return a.includes(needle) || bare.includes(hex)
}

const searchAll = (posts, q) => {
  const needle = q.trim().toLowerCase()
  if (!needle) return { users: [], posts: [] }
  const userCounts = new Map()
  for (const post of posts) {
    const key = post.author.toLowerCase()
    const current = userCounts.get(key)
    userCounts.set(key, { addr: current?.addr ?? post.author, count: (current?.count ?? 0) + 1 })
  }
  const users = [...userCounts.values()]
    .filter(({ addr }) => matchesAddr(addr, needle))
    .sort((a, b) => b.count - a.count)
  const matched = posts.filter((p) => p.content.toLowerCase().includes(needle)).sort(byNew)
  return { users, posts: matched }
}

let activeProvider = null

const providerName = (p) => {
  if (p.isPhantom) return "Phantom"
  if (p.isCoinbaseWallet) return "Coinbase Wallet"
  if (p.isMetaMask) return "MetaMask"
  return "Browser wallet"
}

const safeWalletIcon = (icon) => typeof icon === "string"
  && (/^https:\/\//i.test(icon) || /^data:image\/(?:png|gif|jpe?g|webp);/i.test(icon))
  ? icon
  : ""

const addWallet = (list, seen, provider, info) => {
  if (!provider?.request || seen.has(provider)) return
  seen.add(provider)
  list.push({ info: { uuid: info.uuid, name: info.name || providerName(provider), icon: safeWalletIcon(info.icon) }, provider })
}

async function discoverWallets() {
  const found = []
  const seen = new Set()
  const announced = new Map()

  const onAnnounce = (e) => {
    const { info, provider } = e.detail ?? {}
    if (info?.uuid && provider?.request) announced.set(info.uuid, { info, provider })
  }
  window.addEventListener("eip6963:announceProvider", onAnnounce)
  window.dispatchEvent(new Event("eip6963:requestProvider"))
  await new Promise((r) => setTimeout(r, 300))
  window.removeEventListener("eip6963:announceProvider", onAnnounce)

  for (const w of announced.values()) addWallet(found, seen, w.provider, w.info)

  const eth = window.ethereum
  if (eth?.providers?.length) {
    for (const p of eth.providers) addWallet(found, seen, p, { uuid: `injected-${found.length}`, name: providerName(p) })
  } else if (eth?.request) {
    addWallet(found, seen, eth, { uuid: "injected-ethereum", name: providerName(eth) })
  }
  if (window.phantom?.ethereum?.request) {
    addWallet(found, seen, window.phantom.ethereum, { uuid: "phantom-ethereum", name: "Phantom" })
  }
  if (window.coinbaseWalletExtension?.request) {
    addWallet(found, seen, window.coinbaseWalletExtension, { uuid: "coinbase-extension", name: "Coinbase Wallet" })
  }

  return found
}

const getProvider = () => {
  if (!activeProvider?.request) throw new Error("No wallet connected")
  return activeProvider
}

const pub = (rpc) => createPublicClient({ chain: mainnet, transport: http(rpc, { timeout: 10_000, retryCount: 0 }) })
const walletPub = () => createPublicClient({ chain: mainnet, transport: custom(getProvider()) })
const wallet = (account) => createWalletClient({ chain: mainnet, transport: custom(getProvider()), account })

const errMsg = (e) => {
  if (e?.code === 4001) return "Cancelled in wallet"
  if (e?.shortMessage) return e.shortMessage
  if (e instanceof Error) return e.message
  return "Something went wrong"
}

const withTimeout = (promise, ms, msg) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms)),
])

async function withRpc(fn) {
  let last
  for (const rpc of RPCS) try { return await fn(rpc) } catch (e) { last = e }
  throw last ?? new Error("RPC failed")
}

const verifiedContracts = new Set()
async function verifyZettelContract(address) {
  if (!isAddr(address)) throw new Error("Invalid feed address")
  const key = address.toLowerCase()
  if (verifiedContracts.has(key)) return address
  let sawCode = false
  let last
  for (const rpc of RPCS) {
    try {
      const code = await pub(rpc).getBytecode({ address })
      if (code) sawCode = true
      if (code?.toLowerCase() === SECURE_RUNTIME.toLowerCase()) {
        verifiedContracts.add(key)
        return address
      }
    } catch (e) { last = e }
  }
  if (sawCode) throw new Error("This feed uses an older or unknown contract. For safety, it is read-only.")
  throw last ?? new Error("Could not verify the feed contract")
}

async function waitReceipt(hash) {
  return withRpc((rpc) => pub(rpc).waitForTransactionReceipt({ hash, timeout: 120_000 }))
}

async function deploySharedFeed(account) {
  if (canonicalFeedConfigured()) throw new Error("The canonical feed is already configured")
  const hash = await wallet(account).deployContract({ abi: ABI, bytecode: SECURE_BYTECODE })
  const receipt = await waitReceipt(hash)
  if (!receipt.contractAddress) throw new Error("Feed deployment did not return a contract address")
  return { address: receipt.contractAddress, block: receipt.blockNumber.toString() }
}

async function ensureContract() {
  const config = feedConfig()
  if (!config?.address) {
    throw new Error("The shared feed is not configured. Deploy it once, then set ZETTEL_FEED in app.tsx.")
  }
  return verifyZettelContract(config.address)
}

async function loadFeed(address, block) {
  const pull = async (from) => {
    const fromBn = BigInt(from)
    const read = async (client) => {
      const [postLogs, likeLogs] = await Promise.all([
        client.getLogs({ address, event: POST_EV, fromBlock: fromBn, toBlock: "latest" }),
        client.getLogs({ address, event: LIKE_EV, fromBlock: fromBn, toBlock: "latest" }),
      ])
      const posts = postLogs.map((log) => postFromArgs(log.args, address))
      const likes = new Map()
      const likedBy = new Map()
      for (const log of likeLogs) {
        const id = idString(log.args.postId)
        const key = likeKey(address, id)
        const set = likedBy.get(key) ?? new Set()
        set.add(String(log.args.liker).toLowerCase())
        likedBy.set(key, set)
      }
      for (const [key, set] of likedBy) likes.set(key, set.size)
      return { posts, likes, likedBy }
    }
    const attempts = []
    if (activeProvider?.request) {
      try { attempts.push(await read(walletPub())) } catch (_) {}
    }
    for (const rpc of RPCS) {
      try { attempts.push(await read(pub(rpc))) } catch (_) {}
    }
    if (!attempts.length) throw new Error("RPC failed")
    const posts = mergePosts([], attempts.flatMap((a) => a.posts))
    const likes = new Map()
    const likedBy = new Map()
    for (const a of attempts) {
      for (const [key, n] of a.likes) likes.set(key, Math.max(likes.get(key) ?? 0, n))
      for (const [key, set] of a.likedBy) {
        const merged = likedBy.get(key) ?? new Set()
        for (const liker of set) merged.add(liker)
        likedBy.set(key, merged)
        likes.set(key, Math.max(likes.get(key) ?? 0, merged.size))
      }
    }
    return { posts, likes, likedBy, available: true }
  }
  let result = await pull(block)
  if (!result.posts.length && block !== "0") {
    try { result = await pull("0") } catch (_) {}
  }
  return result
}

const mergeFeedResults = (acc, r) => {
  acc.posts = mergePosts(acc.posts, r.posts)
  for (const [key, n] of r.likes) acc.likes.set(key, Math.max(acc.likes.get(key) ?? 0, n))
  for (const [key, set] of r.likedBy) {
    const merged = acc.likedBy.get(key) ?? new Set()
    for (const liker of set) merged.add(liker)
    acc.likedBy.set(key, merged)
    acc.likes.set(key, Math.max(acc.likes.get(key) ?? 0, merged.size))
  }
  return acc
}

async function loadChain() {
  const feeds = feedsToLoad()
  if (!feeds.length) return { posts: [], likes: new Map(), likedBy: new Map(), available: true }
  const results = await Promise.all(feeds.map((f) => loadFeed(f.address, f.block).catch(() => null)))
  const available = results.some(Boolean)
  if (!available) throw new Error("RPC failed")
  const acc = { posts: [], likes: new Map(), likedBy: new Map(), available: true }
  for (const result of results) if (result) mergeFeedResults(acc, result)
  return acc
}

async function connectWallet(provider) {
  if (!provider?.request) throw new Error("Install a browser wallet with Ethereum support")
  activeProvider = provider
  const accounts = await withTimeout(
    provider.request({ method: "eth_requestAccounts" }),
    120_000,
    "Unlock your wallet and approve the connection",
  )
  if (!accounts?.length) throw new Error("No account selected")
  const chainId = String(await provider.request({ method: "eth_chainId" })).toLowerCase()
  if (chainId !== "0x1") {
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x1" }] })
    } catch (e) {
      if (e?.code === 4001) throw new Error("Cancelled in wallet")
      if (e?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{ chainId: "0x1", chainName: "Ethereum Mainnet", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: RPCS }],
          })
        } catch (e2) {
          if (e2?.code === 4001) throw new Error("Cancelled in wallet")
          throw new Error("Add Ethereum mainnet in your wallet")
        }
      } else {
        throw new Error("Switch to Ethereum mainnet in your wallet")
      }
    }
  }
  const verifiedChainId = String(await provider.request({ method: "eth_chainId" })).toLowerCase()
  if (verifiedChainId !== "0x1") throw new Error("Switch to Ethereum mainnet in your wallet")
  return accounts[0]
}

async function createPost(w, text, parent = null) {
  const parentId = parent ? parent.id : "0"
  const address = parent?.notebook
    ? await verifyZettelContract(parent.notebook)
    : await ensureContract()
  const hash = await wallet(w).writeContract({
    address,
    abi: ABI,
    functionName: "createPost",
    args: [text, BigInt(parentId)],
  })
  const receipt = await waitReceipt(hash)
  return postsFromReceipt(receipt)
}

async function likePost(w, post) {
  const address = await verifyZettelContract(post.notebook)
  const alreadyLiked = await withRpc((rpc) => pub(rpc).readContract({
    address,
    abi: ABI,
    functionName: "liked",
    args: [BigInt(post.id), w],
  }))
  if (alreadyLiked) throw new Error("You already liked this post")
  const hash = await wallet(w).writeContract({ address, abi: ABI, functionName: "likePost", args: [BigInt(post.id)] })
  await waitReceipt(hash)
}

function Brand({ large, onClick }) {
  const Tag = onClick ? "button" : "div"
  return React.createElement(Tag, {
    type: onClick ? "button" : undefined,
    className: `brand${large ? " brand-lg" : " brand-sm"}${onClick ? " brand-btn" : ""}`,
    onClick,
  },
    React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }),
    React.createElement("span", { className: "brand-name" }, "Zettel"),
  )
}

function Btn({ children, onClick, disabled, variant = "ghost", className = "", ...props }) {
  return React.createElement("button", {
    type: "button", onClick, disabled, ...props,
    className: `btn btn-${variant} ${className}`.trim(),
  }, children)
}

function Editor({ draft, setDraft, onSubmit, busy, label, placeholder, compact, disabled = false }) {
  return React.createElement("div", { className: `editor${compact ? " editor-compact" : ""}` },
    React.createElement("textarea", {
      className: "textarea", value: draft, maxLength: MAX, rows: compact ? 3 : 4,
      placeholder: placeholder || "Write something permanent...",
      onChange: (e) => setDraft(sanitize(e.target.value)),
    }),
    React.createElement("div", { className: "editor-bar" },
      React.createElement("span", { className: "char-count" }, `${utf8Length(draft)} / ${MAX} bytes`),
      React.createElement(Btn, {
        variant: "primary",
        className: compact ? "btn-compact" : "",
        onClick: onSubmit,
        disabled: disabled || busy || !draft.trim(),
      }, busy ? "Confirm in wallet..." : label),
    ),
  )
}

function Nav({ screen, searching, onSelect }) {
  const ids = ["feed", "compose", "profile"]
  const labels = { feed: "Feed", compose: "Write", profile: "Profile" }
  const idx = ids.indexOf(screen)
  const on = searching || idx < 0 ? -1 : idx
  const slide = on >= 0
    ? { transform: `translateX(${on * 100}%)` }
    : undefined
  return React.createElement("nav", { className: "nav" },
    React.createElement("span", {
      className: `nav-indicator${on < 0 ? " nav-indicator-off" : ""}`,
      style: slide,
      "aria-hidden": "true",
    }),
    ids.map((id) => React.createElement("button", {
      key: id,
      type: "button",
      className: `btn nav-btn${screen === id && !searching ? " active" : ""}`,
      onClick: () => onSelect(id),
    }, labels[id])),
  )
}

function SearchBar({ value, onChange }) {
  return React.createElement("div", { className: "search-wrap" },
    React.createElement("span", { className: "search-icon", "aria-hidden": "true" },
      React.createElement("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 },
        React.createElement("circle", { cx: 11, cy: 11, r: 7 }),
        React.createElement("path", { d: "M20 20l-3-3" }),
      ),
    ),
    React.createElement("input", {
      type: "search",
      className: "search-input",
      placeholder: "Search…",
      value,
      onChange: (e) => onChange(e.target.value),
      "aria-label": "Search",
    }),
    value && React.createElement("button", {
      type: "button",
      className: "search-clear",
      onClick: () => onChange(""),
      "aria-label": "Clear search",
    }, "×"),
  )
}

function UserResult({ addr, count, onOpen }) {
  return React.createElement("button", { type: "button", className: "user-result", onClick: onOpen },
    React.createElement("span", { className: "avatar avatar-sm", style: avatarStyle(addr) }, avatarLetters(addr)),
    React.createElement("span", { className: "author" }, short(addr)),
    React.createElement("span", { className: "user-meta" }, `${count} ${count === 1 ? "post" : "posts"}`),
  )
}

function ActionIcon({ kind, active = false }) {
  if (kind === "like") {
    return React.createElement("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: active ? "currentColor" : "none", stroke: "currentColor", strokeWidth: 1.8 },
      React.createElement("path", { d: "M12 21s-7-4.4-9.5-8.2C.5 9.5 2.2 6 6 6c2 0 3.3 1.2 4 2.2C10.7 7.2 12 6 14 6c3.8 0 5.5 3.5 3.5 6.8C19 16.6 12 21 12 21z" }),
    )
  }
  return React.createElement("svg", { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
    React.createElement("path", { d: "M21 11.5a8.4 8.4 0 01-1.3 4.5 8.5 8.5 0 01-7.2 3.8 8.4 8.4 0 01-4.5-1.3L3 21l2.5-4.9A8.4 8.4 0 014.2 11.5 8.5 8.5 0 0112 3a8.5 8.5 0 019 8.5z" }),
  )
}

function PostCard({ post, likes, replies, onOpen, onOpenUser, onLike, onReply, small, hero, liked = false, likeBusy = false }) {
  const cls = `card${onOpen ? " card-click" : ""}${small ? " card-sm" : ""}${hero ? " card-hero" : ""}`
  const openProps = onOpen ? {
    onClick: onOpen,
    role: "button",
    tabIndex: 0,
    onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen() } },
    "aria-label": `Open post by ${short(post.author)}`,
  } : {}
  const author = onOpenUser
    ? React.createElement("button", {
      type: "button",
      className: `author author-link${small ? " author-sm" : ""}`,
      onClick: (e) => { e.stopPropagation(); onOpenUser(post.author) },
      onKeyDown: (e) => e.stopPropagation(),
      "aria-label": `View posts by ${short(post.author)}`,
    }, short(post.author))
    : React.createElement("span", { className: `author${small ? " author-sm" : ""}` }, short(post.author))
  return React.createElement("article", { className: cls, ...openProps },
    React.createElement("div", {
      className: `avatar${small ? " avatar-sm" : ""}`,
      style: avatarStyle(post.author),
      "aria-hidden": "true",
    }, avatarLetters(post.author)),
    React.createElement("div", { className: "card-body" },
      React.createElement("div", { className: "card-meta" },
        author,
        React.createElement("time", { className: "time" }, fmtTime(post.timestamp)),
      ),
      React.createElement("p", { className: "content" }, post.content),
      React.createElement("div", { className: "card-actions", onClick: (e) => e.stopPropagation() },
        React.createElement(Btn, {
          variant: "like",
          className: liked ? "liked" : "",
          onClick: onLike,
          disabled: liked || likeBusy,
          "aria-pressed": liked,
          "aria-label": liked ? "Liked" : "Like",
          title: liked ? "You already liked this post" : likeBusy ? "Saving like..." : "Like this post",
        },
          React.createElement(ActionIcon, { kind: "like", active: liked }),
          React.createElement("span", { className: "action-count" }, likes > 0 ? likes : liked ? "Liked" : "Like"),
        ),
        onReply && React.createElement(Btn, { variant: "action", onClick: onReply },
          React.createElement(ActionIcon, { kind: "reply" }),
          React.createElement("span", { className: "action-count" }, replies > 0 ? replies : "Reply"),
        ),
      ),
    ),
  )
}

function CommentTree({ root, posts, likes, depth, onLike, onReply, onOpen, onOpenUser, isLiked, isLikeBusy, seen = new Set([postKey(root)]) }) {
  const kids = childrenOf(posts, root, seen)
  if (!kids.length) return null
  return React.createElement("div", { className: depth === 0 ? "thread" : null },
    kids.map((c) => React.createElement("div", {
      key: postKey(c),
      className: `thread-item depth-${Math.min(depth + 1, 5)}`,
    },
      React.createElement(PostCard, {
        post: c,
        likes: likes.get(likeKey(c.notebook, c.id)) ?? 0,
        liked: isLiked(c),
        likeBusy: isLikeBusy(c),
        replies: countDescendants(posts, c),
        small: true,
        onOpen: () => onOpen(c),
        onOpenUser: () => onOpenUser(c.author),
        onLike: () => onLike(c),
        onReply: () => onReply(c),
      }),
      React.createElement(CommentTree, {
        root: c, posts, likes, depth: depth + 1, onLike, onReply, onOpen, onOpenUser, isLiked, isLikeBusy,
        seen: new Set([...seen, postKey(c)]),
      }),
    )),
  )
}

function App() {
  const [walletAddr, setWalletAddr] = useState(null)
  const [wallets, setWallets] = useState(null)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState(new Map())
  const [likedBy, setLikedBy] = useState(new Map())
  const [likePending, setLikePending] = useState(new Set())
  const likeBusyRef = useRef(new Set())
  const [screen, setScreen] = useState("feed")
  const [postId, setPostId] = useState(null)
  const [draft, setDraft] = useState("")
  const [query, setQuery] = useState("")
  const [viewAddr, setViewAddr] = useState(null)
  const [err, setErr] = useState(null)
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [feedLoading, setFeedLoading] = useState(true)
  const [replyTo, setReplyTo] = useState(null)
  const [, rerenderFeed] = useState(0)

  const refresh = useCallback(async (expectKeys = []) => {
    for (let i = 0; i < 6; i++) {
      try {
        const d = await loadChain()
        const found = !expectKeys.length || expectKeys.every((k) => d.posts.some((p) => postKey(p) === k))
        setPosts((prev) => {
          return expectKeys.length ? applyChainPosts(prev, d.posts) : d.posts
        })
        setLikes((prev) => expectKeys.length ? new Map([...prev, ...d.likes]) : d.likes)
        setLikedBy((prev) => {
          if (!expectKeys.length) return d.likedBy
          const next = new Map(prev)
          for (const [key, set] of d.likedBy) next.set(key, new Set([...(next.get(key) ?? []), ...set]))
          return next
        })
        setErr(null)
        setFeedLoading(false)
        if (found) return
      } catch {
        if (i === 5) {
          setErr("Could not read chain — posts are still on chain, try refreshing")
          setFeedLoading(false)
        }
      }
      if (i < 5) await new Promise((r) => setTimeout(r, 2000))
    }
  }, [])

  useEffect(() => {
    void refresh()
    const t = setInterval(() => void refresh(), POLL_MS)
    return () => clearInterval(t)
  }, [refresh])

  useEffect(() => {
    void discoverWallets().then(setWallets)
  }, [])

  useEffect(() => {
    const provider = activeProvider
    if (!walletAddr || !provider?.on) return undefined
    const resetSession = (message = null) => {
      activeProvider = null
      likeBusyRef.current.clear()
      setWalletAddr(null)
      setLikedBy(new Map())
      setLikePending(new Set())
      setErr(message)
    }
    const onAccountsChanged = (accounts) => {
      const next = accounts?.[0]
      if (!next) resetSession("Wallet disconnected")
      else if (!addrEq(next, walletAddr)) resetSession("Wallet account changed. Reconnect to continue safely.")
    }
    const onChainChanged = (chainId) => {
      if (String(chainId).toLowerCase() !== "0x1") resetSession("Switch back to Ethereum mainnet to continue")
    }
    provider.on("accountsChanged", onAccountsChanged)
    provider.on("chainChanged", onChainChanged)
    return () => {
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", onAccountsChanged)
        provider.removeListener("chainChanged", onChainChanged)
      } else if (provider.off) {
        provider.off("accountsChanged", onAccountsChanged)
        provider.off("chainChanged", onChainChanged)
      }
    }
  }, [walletAddr])

  const submit = useCallback(async (parent = null) => {
    if (!walletAddr) return setErr("Connect a wallet to publish or reply")
    const text = clean(draft)
    if (!text) return setErr("Post cannot be empty")
    if (parent && !posts.some((p) => p.id === parent.id && addrEq(p.notebook, parent.notebook))) {
      return setErr("Parent not found")
    }
    setBusy(true)
    try {
      const created = await createPost(walletAddr, text, parent)
      setPosts((prev) => mergePosts(prev, created))
      setDraft("")
      setReplyTo(null)
      if (!parent) setScreen("feed")
      await refresh(created.map(postKey))
    } catch (e) { setErr(errMsg(e)) }
    finally { setBusy(false) }
  }, [walletAddr, draft, posts, refresh])

  const connect = useCallback(async (provider) => {
    setBusy(true)
    setErr(null)
    try {
      const addr = await connectWallet(provider)
      setWalletAddr(addr)
      setSyncing(true)
      try { await refresh() } finally { setSyncing(false) }
    } catch (e) {
      activeProvider = null
      setErr(errMsg(e))
    } finally { setBusy(false) }
  }, [refresh])

  const setupFeed = useCallback(async () => {
    if (canonicalFeedConfigured() || sessionFeed) return setErr("The feed is already configured")
    if (!walletAddr) return setErr("Connect the maintainer wallet to deploy the canonical feed")
    setBusy(true)
    setErr(null)
    setNotice(null)
    try {
      sessionFeed = await deploySharedFeed(walletAddr)
      rerenderFeed((n) => n + 1)
      await refresh()
      setNotice(`Feed deployed at ${sessionFeed.address}. Add this address and block ${sessionFeed.block} to ZETTEL_FEED and ZETTEL_FROM_BLOCK, then republish.`)
    } catch (e) { setErr(errMsg(e)) }
    finally { setBusy(false) }
  }, [walletAddr, refresh])

  const feed = useMemo(() => buildSocialFeed(posts, likes), [posts, likes])
  const post = useMemo(() => posts.find((p) => postKey(p) === postId), [posts, postId])
  const threadCount = useMemo(() => post ? countDescendants(posts, post) : 0, [posts, post])
  const mine = useMemo(() => walletAddr
    ? posts.filter((p) => addrEq(p.author, walletAddr)).sort(byNew)
    : [], [posts, walletAddr])
  const search = useMemo(() => searchAll(posts, query), [posts, query])
  const userPosts = useMemo(() => viewAddr
    ? posts.filter((p) => addrEq(p.author, viewAddr)).sort(byNew)
    : [], [posts, viewAddr])
  const searching = query.trim().length > 0
  const activeFeed = feedConfig()

  const isLiked = useCallback((p) => !!walletAddr && !!likedBy.get(likeKey(p.notebook, p.id))?.has(walletAddr.toLowerCase()), [walletAddr, likedBy])
  const isLikeBusy = useCallback((p) => likePending.has(likeKey(p.notebook, p.id)), [likePending])
  const doLike = useCallback(async (p) => {
    if (!walletAddr) return setErr("Connect a wallet to like posts")
    if (busy) return setErr("Finish the current wallet transaction first")
    const key = likeKey(p.notebook, p.id)
    if (isLiked(p)) return setErr("You already liked this post")
    if (likeBusyRef.current.has(key)) return
    likeBusyRef.current.add(key)
    setLikePending((prev) => new Set(prev).add(key))
    try {
      await likePost(walletAddr, p)
      setLikedBy((prev) => {
        const next = new Map(prev)
        next.set(key, new Set([...(next.get(key) ?? []), walletAddr.toLowerCase()]))
        return next
      })
      await refresh()
    } catch (e) { setErr(errMsg(e)) }
    finally {
      likeBusyRef.current.delete(key)
      setLikePending((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }
  }, [walletAddr, busy, isLiked, refresh])
  const findRoot = (node) => {
    let cur = node
    const seen = new Set()
    while (cur && !isRootPost(cur) && !seen.has(postKey(cur))) {
      seen.add(postKey(cur))
      const parent = posts.find((x) => x.id === cur.parentId && addrEq(x.notebook, cur.notebook))
      if (!parent) break
      cur = parent
    }
    return cur
  }
  const openPost = (p) => { setPostId(postKey(p)); setScreen("post"); setQuery(""); setReplyTo(null); setDraft("") }
  const startReply = (target) => {
    const root = findRoot(target)
    setPostId(postKey(root))
    setScreen("post")
    setQuery("")
    setReplyTo(postKey(target) === postKey(root) ? null : target)
  }
  const openUser = (addr) => { setViewAddr(addr); setScreen("user"); setQuery("") }
  const goScreen = (id) => { setQuery(""); setViewAddr(null); setReplyTo(null); setDraft(""); setScreen(id) }

  const resync = useCallback(async () => {
    if (!walletAddr) return
    setSyncing(true)
    setErr(null)
    try {
      await refresh()
    } catch (e) { setErr(errMsg(e)) }
    finally { setSyncing(false) }
  }, [walletAddr, refresh])

  const postResults = (list, clickable = true) => list.map((p) => React.createElement(PostCard, {
    key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0,
    replies: p.replyCount ?? countDescendants(posts, p),
    liked: isLiked(p), likeBusy: isLikeBusy(p),
    onOpen: clickable ? () => openPost(p) : undefined,
    onOpenUser: () => openUser(p.author),
    onLike: () => doLike(p),
    onReply: () => startReply(p),
  }))

  const replyParent = replyTo ?? post

  return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "topbar" },
      React.createElement("div", { className: "topbar-inner" },
        React.createElement("div", { className: "topbar-left" },
          React.createElement(Brand, { large: false, onClick: () => goScreen("feed") }),
          React.createElement(Nav, { screen, searching, onSelect: goScreen }),
        ),
        React.createElement("div", { className: "topbar-right" },
          React.createElement(SearchBar, { value: query, onChange: setQuery }),
          React.createElement("div", { className: "topbar-account" },
            walletAddr
              ? React.createElement(React.Fragment, null,
                React.createElement("span", { className: "wallet-addr" }, short(walletAddr)),
                React.createElement(Btn, {
                  variant: "ghost",
                  className: "btn-xs",
                  onClick: () => {
                    activeProvider = null
                    likeBusyRef.current.clear()
                    setWalletAddr(null)
                    setLikedBy(new Map())
                    setLikePending(new Set())
                    setScreen("feed")
                    setQuery("")
                    setReplyTo(null)
                  },
                }, "Leave"),
              )
              : wallets?.length > 1
              ? wallets.map((w) => React.createElement(Btn, {
                key: w.info.uuid,
                variant: "ghost",
                className: "btn-xs",
                onClick: () => void connect(w.provider),
                disabled: busy,
              }, w.info.name))
              : React.createElement(Btn, {
                variant: "ghost",
                className: "btn-xs",
                onClick: () => wallets?.length === 1
                  ? void connect(wallets[0].provider)
                  : setErr(wallets === null ? "Looking for wallets..." : "Install an Ethereum wallet to publish"),
                disabled: busy || wallets === null || wallets?.length === 0,
              }, wallets?.length === 1 ? "Connect" : wallets === null ? "Finding wallet..." : "No wallet"),
          ),
        ),
      ),
    ),
    React.createElement("main", { className: "main" },
      React.createElement("div", { className: "main-inner" },
        err && React.createElement("p", { className: "error" }, err),
        notice && React.createElement("p", { className: "sync-hint" }, notice),

        searching && React.createElement("section", null,
          !search.users.length && !search.posts.length
            && React.createElement("p", { className: "empty" }, `No results for "${query.trim()}"`),
          search.users.length > 0 && React.createElement("div", { className: "search-section" },
            React.createElement("p", { className: "search-label" }, `Users · ${search.users.length}`),
            search.users.map((u) => React.createElement(UserResult, {
              key: u.addr, addr: u.addr, count: u.count, onOpen: () => openUser(u.addr),
            })),
          ),
          search.posts.length > 0 && React.createElement("div", { className: "search-section" },
            React.createElement("p", { className: "search-label" }, `Posts · ${search.posts.length}`),
            postResults(search.posts),
          ),
        ),

        !searching && screen === "feed" && (feedLoading && !feed.length
          ? React.createElement("p", { className: "empty" }, "Loading feed…")
          : feed.length
          ? React.createElement("div", { className: "feed-list" },
            syncing && React.createElement("p", { className: "sync-hint" }, "Refreshing feed…"),
            postResults(feed),
          )
          : React.createElement("p", { className: "empty" }, !activeFeed
            ? "The shared feed is not configured yet. Set ZETTEL_FEED and ZETTEL_FROM_BLOCK in app.tsx."
            : syncing
            ? "Loading feed…"
            : "No posts yet. Everyone reads the same on-chain feed — publish from Write.")),

        !searching && screen === "post" && post && React.createElement("section", { className: "post-view" },
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Feed"),
          React.createElement(PostCard, {
            post, hero: true,
            likes: likes.get(likeKey(post.notebook, post.id)) ?? 0,
            liked: isLiked(post), likeBusy: isLikeBusy(post),
            replies: threadCount,
            onOpenUser: () => openUser(post.author),
            onLike: () => doLike(post),
            onReply: () => setReplyTo(null),
          }),
          threadCount > 0 && React.createElement("p", { className: "replies-label" },
            `${threadCount} ${threadCount === 1 ? "reply" : "replies"}`),
          React.createElement(CommentTree, {
            root: post, posts, likes, depth: 0,
            onLike: doLike,
            onReply: startReply,
            onOpen: openPost,
            onOpenUser: openUser,
            isLiked,
            isLikeBusy,
          }),
          React.createElement("div", { className: "reply-composer" },
            replyTo && React.createElement("div", { className: "reply-target" },
              React.createElement("span", null, "Replying to ", React.createElement("strong", null, short(replyTo.author))),
              React.createElement(Btn, { variant: "ghost", className: "btn-xs", onClick: () => setReplyTo(null) }, "Cancel"),
            ),
            React.createElement(Editor, {
              draft, setDraft,
              onSubmit: () => void submit(replyParent),
              busy,
              label: "Reply",
              compact: true,
              placeholder: replyTo
                ? `Reply to ${short(replyTo.author)}…`
                : "Write a reply…",
            }),
          ),
        ),

        !searching && screen === "compose" && React.createElement(React.Fragment, null,
          !activeFeed && React.createElement("p", { className: "section-sub" },
            "Publishing is disabled until the maintainer configures the canonical feed contract."),
          sessionFeed && !canonicalFeedConfigured() && React.createElement("p", { className: "section-sub" },
            `This session feed is temporary. Commit ${sessionFeed.address} and block ${sessionFeed.block} to app.tsx before sharing the frontend.`),
          setupMode() && !activeFeed && React.createElement(Btn, {
            variant: "primary",
            onClick: () => void setupFeed(),
            disabled: busy || !walletAddr,
          }, busy ? "Confirm in wallet…" : walletAddr ? "Deploy canonical feed" : "Connect maintainer wallet first"),
          React.createElement(Editor, {
            draft, setDraft, onSubmit: () => void submit(null), busy, label: "Publish",
            disabled: !activeFeed,
          }),
        ),

        !searching && screen === "profile" && React.createElement("section", null,
          React.createElement("h2", { className: "section-title" }, walletAddr ? short(walletAddr) : "Connect a wallet to view your profile"),
          React.createElement("p", { className: "section-sub" }, `${mine.length} ${mine.length === 1 ? "post" : "posts"} on chain`),
          React.createElement(Btn, {
            variant: "ghost",
            className: "btn-sm",
            onClick: () => void resync(),
            disabled: syncing,
          }, syncing ? "Refreshing feed…" : "Refresh my posts"),
          contractAddr() && React.createElement("p", { className: "section-sub" },
            `Shared feed ${short(contractAddr())} — permanent on Ethereum, any frontend can load it.`),
          !syncing && !mine.length && feedsToLoad().length > 0 && React.createElement("p", { className: "section-sub" },
            `Checked ${feedsToLoad().length} on-chain notebook${feedsToLoad().length === 1 ? "" : "s"} — no posts from this wallet yet.`),
          mine.length
            ? React.createElement("div", { className: "feed-list" },
              mine.map((p) => React.createElement(PostCard, {
                key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0,
                liked: isLiked(p), likeBusy: isLikeBusy(p),
                replies: countDescendants(posts, p), small: true,
                onOpen: () => openPost(p),
                onOpenUser: () => openUser(p.author),
                onLike: () => doLike(p),
                onReply: () => startReply(p),
              })),
            )
            : React.createElement("p", { className: "empty" }, "You haven't posted yet."),
        ),

        !searching && screen === "user" && viewAddr && React.createElement("section", null,
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Feed"),
          React.createElement("h2", { className: "section-title" }, short(viewAddr)),
          React.createElement("p", { className: "section-sub" }, `${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"} on chain`),
          userPosts.length
            ? React.createElement("div", { className: "feed-list" },
              userPosts.map((p) => React.createElement(PostCard, {
                key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0,
                liked: isLiked(p), likeBusy: isLikeBusy(p),
                replies: countDescendants(posts, p), small: true,
                onOpen: () => openPost(p),
                onOpenUser: () => openUser(p.author),
                onLike: () => doLike(p),
                onReply: () => startReply(p),
              })),
            )
            : React.createElement("p", { className: "empty" }, "No posts from this address."),
        ),
      ),
    ),
  )
}

createRoot(document.getElementById("root")).render(React.createElement(App))
</script>
</body>
</html>
html*/
