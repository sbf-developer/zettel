/**
 * Zettel — one file. Run: npx tsx app.tsx
 */
if (typeof document === "undefined") {
  const { readFileSync } = await import("node:fs")
  const { createServer } = await import("node:http")
  const { fileURLToPath } = await import("node:url")
  const src = readFileSync(fileURLToPath(import.meta.url), "utf8")
  const html = src.match(/\/\*html([\s\S]*?)html\*\//)?.[1]?.trim() ?? ""
  createServer((_req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
    })
    res.end(html)
  }).listen(5173, () => console.log("http://localhost:5173"))
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

    .app { min-height: 100dvh; }

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
    .btn-ghost { color: #737373; padding: 8px 12px; font-weight: 500; }
    .btn-ghost:hover:not(:disabled) { color: #171717; }
    .btn-ghost.active { color: #0a0a0a; font-weight: 600; }
    .btn-like {
      color: #a3a3a3;
      font-size: 13px;
      font-weight: 500;
      padding: 4px 0;
      min-height: auto;
    }
    .btn-like:hover:not(:disabled) { color: #525252; }
    .btn-sm { font-size: 13px; padding: 6px 10px; min-height: 32px; }

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
      padding: 5px;
      border-radius: 12px;
      background:
        repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 4px),
        repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 5px),
        linear-gradient(160deg, #cfcbc5 0%, #f5f4f1 22%, #bab6b0 45%, #eceae6 68%, #c5c1bb 100%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.95),
        inset 0 -2px 4px rgba(0,0,0,0.06),
        0 0 0 1px #9a9690,
        0 0 0 2px rgba(255,255,255,0.65),
        0 2px 10px rgba(0,0,0,0.08);
      overflow: hidden;
      isolation: isolate;
    }
    .nav::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35);
    }
    .nav-indicator {
      position: absolute;
      top: 5px;
      left: 5px;
      width: calc((100% - 10px) / 3);
      height: calc(100% - 10px);
      border-radius: 9px;
      background:
        linear-gradient(165deg, #5a5a5a 0%, #121212 38%, #2f2f2f 62%, #1a1a1a 100%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.22),
        inset 0 -2px 0 rgba(0,0,0,0.35),
        0 0 0 1px rgba(0,0,0,0.45),
        0 0 0 2px rgba(255,255,255,0.12),
        0 2px 6px rgba(0,0,0,0.28);
      transition: transform 0.34s cubic-bezier(0.34, 1.15, 0.64, 1), opacity 0.2s ease;
      will-change: transform;
      pointer-events: none;
      z-index: 0;
    }
    .nav-indicator-off { opacity: 0; }
    .nav-btn {
      position: relative;
      z-index: 1;
      flex: none;
      min-height: 42px;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 9px;
      background: transparent;
      color: #5c5c5c;
      transition: color 0.22s ease;
    }
    .nav-btn:hover:not(:disabled) { color: #171717; }
    .nav-btn.active { color: #fff; font-weight: 600; text-shadow: 0 1px 1px rgba(0,0,0,0.35); }

    .main {
      flex: 1;
      min-width: 0;
      padding: 0 16px 48px;
      padding-bottom: max(48px, env(safe-area-inset-bottom));
    }
    .main-inner { max-width: 640px; }

    .search-wrap {
      position: relative;
      margin-bottom: 28px;
      padding: 12px 14px;
      border-radius: 12px;
      background:
        repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 4px),
        repeating-linear-gradient(-45deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 5px),
        linear-gradient(160deg, #cfcbc5 0%, #f5f4f1 22%, #bab6b0 45%, #eceae6 68%, #c5c1bb 100%);
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.95),
        inset 0 -2px 4px rgba(0,0,0,0.06),
        0 0 0 1px #9a9690,
        0 0 0 2px rgba(255,255,255,0.65),
        0 2px 10px rgba(0,0,0,0.08);
    }
    .search-wrap::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35);
    }
    .search-input {
      width: 100%;
      padding: 2px 28px 2px 2px;
      border: none;
      background: transparent;
      color: #171717;
      font-size: 15px;
      letter-spacing: -0.01em;
    }
    .search-input::placeholder { color: #a3a3a3; }
    .search-input:focus { outline: none; }
    .search-clear {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      color: #a3a3a3;
      font-size: 16px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-clear:hover { color: #525252; }

    .card {
      padding: 20px 0;
      border-bottom: 1px solid #f5f5f5;
      transition: opacity 0.15s ease;
    }
    .card:last-child { border-bottom: none; }
    .card-click { cursor: pointer; }
    .card-click:hover { opacity: 0.75; }
    .card-sm { padding: 16px 0; }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .author { font-size: 13px; font-weight: 600; color: #171717; letter-spacing: -0.02em; }
    .author-sm { font-size: 12px; font-weight: 500; }
    .time { font-size: 12px; color: #a3a3a3; }
    .content {
      font-size: 15px;
      color: #404040;
      line-height: 1.65;
      margin-bottom: 10px;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: anywhere;
      letter-spacing: -0.011em;
    }
    .card-actions { display: flex; gap: 8px; }

    .editor { margin-top: 8px; }
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
    }
    .back { margin-bottom: 24px; color: #737373; }
    .replies-label {
      font-size: 12px;
      font-weight: 500;
      color: #a3a3a3;
      letter-spacing: 0.02em;
      margin: 32px 0 8px;
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
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 14px 0;
      border-bottom: 1px solid #f5f5f5;
      text-align: left;
      transition: opacity 0.15s ease;
    }
    .user-result:hover { opacity: 0.7; }
    .user-meta { font-size: 13px; color: #a3a3a3; flex-shrink: 0; }

    @media (min-width: 768px) {
      .landing-inner { max-width: 400px; }
      .main { padding: 0 32px 64px; }
      .sidebar { padding: 28px 32px 24px; }
      .textarea { min-height: 180px; font-size: 16px; }
      .content { font-size: 16px; }
    }

    @media (min-width: 1024px) {
      body { background: #fafafa; }
      .app {
        display: grid;
        grid-template-columns: 260px 1fr;
        max-width: 1280px;
        margin: 0 auto;
        background: #fff;
        border-left: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
      }
      .sidebar {
        display: flex;
        flex-direction: column;
        padding: 40px 28px 32px;
        border-right: 1px solid #f0f0f0;
        position: sticky;
        top: 0;
        height: 100dvh;
        background: #fff;
      }
      .sidebar-top { margin-bottom: 48px; }
      .mobile-wallet { display: none; }
      .sidebar-foot {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        margin-top: auto;
        padding-top: 24px;
        border-top: 1px solid #f0f0f0;
      }
      .nav {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 44px);
      }
      .nav-indicator {
        width: calc(100% - 10px);
        height: 44px;
        top: 5px;
        left: 5px;
      }
      .nav-btn {
        justify-content: flex-start;
        width: 100%;
        padding: 10px 14px;
        font-size: 15px;
        min-height: 44px;
      }
      .main {
        padding: 48px 56px 64px;
        display: flex;
        justify-content: center;
      }
      .main-inner { width: 100%; max-width: 680px; }
      .search-wrap { margin-bottom: 36px; }
      .card { padding: 24px 0; }
      .landing { background: #fafafa; }
      .landing-inner {
        max-width: 420px;
        background: #fff;
        padding: 56px 48px;
        border-radius: 16px;
        border: 1px solid #f0f0f0;
      }
    }

    @media (min-width: 1440px) {
      .app { max-width: 1440px; }
      .main { padding: 56px 80px 72px; }
      .main-inner { max-width: 720px; }
    }

    @media (max-width: 359px) {
      .mobile-wallet { flex-wrap: wrap; justify-content: flex-end; }
      .nav-btn { font-size: 13px; padding: 8px 8px; }
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
import React, { useCallback, useEffect, useMemo, useState } from "https://esm.sh/react@19"
import { createRoot } from "https://esm.sh/react-dom@19/client"
import { createPublicClient, createWalletClient, custom, http, parseAbiItem, decodeEventLog } from "https://esm.sh/viem@2"
import { mainnet } from "https://esm.sh/viem@2/chains"

const MAX = 500
const RPCS = ["https://ethereum.publicnode.com", "https://rpc.ankr.com/eth"]
const POLL_MS = 30_000
const STORE_CONTRACT = "zettel-contract"
const STORE_BLOCK = "zettel-from-block"
const BYTECODE = "0x608060405260015f553480156012575f5ffd5b506103e1806100205f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c80631252cb481461004357806361b8ce8c1461005f578063725009d31461007d575b5f5ffd5b61005d600480360381019061005891906101ef565b610099565b005b610067610107565b604051610074919061025b565b60405180910390f35b61009760048036038101906100929190610274565b61010c565b005b3373ffffffffffffffffffffffffffffffffffffffff165f5f8154809291906100c1906102cc565b919050557f9fcb19e60f699236a745fa8a0fc59ec21c36952f3230d3f494e5d3530cdbdb73858585426040516100fa949392919061036d565b60405180910390a3505050565b5f5481565b3373ffffffffffffffffffffffffffffffffffffffff16817fcf765d6f163c9b0d832e2a94f4c8e9bffd32a2c3ca5fdbb8cc67b5fe1441f41360405160405180910390a350565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f84011261017c5761017b61015b565b5b8235905067ffffffffffffffff8111156101995761019861015f565b5b6020830191508360018202830111156101b5576101b4610163565b5b9250929050565b5f819050919050565b6101ce816101bc565b81146101d8575f5ffd5b50565b5f813590506101e9816101c5565b92915050565b5f5f5f6040848603121561020657610205610153565b5b5f84013567ffffffffffffffff81111561022357610222610157565b5b61022f86828701610167565b93509350506020610242868287016101db565b9150509250925092565b610255816101bc565b82525050565b5f60208201905061026e5f83018461024c565b92915050565b5f6020828403121561028957610288610153565b5b5f610296848285016101db565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6102d6826101bc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036103085761030761029f565b5b600182019050919050565b5f82825260208201905092915050565b828183375f83830152505050565b5f601f19601f8301169050919050565b5f61034c8385610313565b9350610359838584610323565b61036283610331565b840190509392505050565b5f6060820190508181035f830152610386818688610341565b9050610395602083018561024c565b6103a2604083018461024c565b9594505050505056fea26469706673582212202847d4670012fd8b599a095be94807d434458001a5212164a29cf6b99b4a8e7b64736f6c634300081e0033"

const ABI = [
  parseAbiItem("event PostCreated(uint256 indexed id, address indexed author, string content, uint256 parentId, uint256 timestamp)"),
  parseAbiItem("event PostLiked(uint256 indexed postId, address indexed liker)"),
  parseAbiItem("function createPost(string content, uint256 parentId)"),
  parseAbiItem("function likePost(uint256 postId)"),
]
const POST_EV = ABI[0]
const LIKE_EV = ABI[1]

const addrEq = (a, b) => a?.toLowerCase() === b?.toLowerCase()
const postFromArgs = (args) => ({
  id: Number(args.id),
  author: args.author,
  content: args.content,
  parentId: Number(args.parentId),
  timestamp: Number(args.timestamp),
})
const postsFromReceipt = (receipt) => {
  const out = []
  for (const log of receipt.logs) {
    try {
      const ev = decodeEventLog({ abi: [POST_EV], data: log.data, topics: log.topics })
      if (ev.eventName === "PostCreated") out.push(postFromArgs(ev.args))
    } catch (_) {}
  }
  return out
}
const mergePosts = (prev, add) => {
  const next = [...prev]
  for (const p of add) if (!next.some((x) => x.id === p.id)) next.push(p)
  return next
}

const syncContractFromUrl = () => {
  const q = new URLSearchParams(location.search)
  const c = q.get("contract")
  if (c && /^0x[a-fA-F0-9]{40}$/.test(c)) {
    localStorage.setItem(STORE_CONTRACT, c)
    const from = q.get("from")
    if (from && /^\d+$/.test(from)) localStorage.setItem(STORE_BLOCK, from)
    else if (!localStorage.getItem(STORE_BLOCK)) localStorage.setItem(STORE_BLOCK, "0")
  }
}
const pinContractUrl = (address, block) => {
  const q = new URLSearchParams(location.search)
  q.set("contract", address)
  q.set("from", block.toString())
  history.replaceState({}, "", `${location.pathname}?${q}`)
}

const short = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`
const sanitize = (s) => s.replace(/\u0000/g, "").slice(0, MAX)
const clean = (s) => sanitize(s).trim()
const byNew = (a, b) => b.timestamp - a.timestamp
const byOld = (a, b) => a.timestamp - b.timestamp
const fmtTime = (ts) => new Date(ts * 1000).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })

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
  const users = [...new Set(posts.map((p) => p.author))]
    .filter((addr) => matchesAddr(addr, needle))
    .map((addr) => ({ addr, count: posts.filter((p) => p.author === addr).length }))
    .sort((a, b) => b.count - a.count)
  const matched = posts.filter((p) => p.content.toLowerCase().includes(needle)).sort(byNew)
  return { users, posts: matched }
}

const contractAddr = () => localStorage.getItem(STORE_CONTRACT)
const fromBlock = () => BigInt(localStorage.getItem(STORE_BLOCK) ?? "0")
let activeProvider = null

const providerName = (p) => {
  if (p.isPhantom) return "Phantom"
  if (p.isCoinbaseWallet) return "Coinbase Wallet"
  if (p.isMetaMask) return "MetaMask"
  return "Browser wallet"
}

const addWallet = (list, seen, provider, info) => {
  if (!provider?.request || seen.has(provider)) return
  seen.add(provider)
  list.push({ info: { uuid: info.uuid, name: info.name || providerName(provider), icon: info.icon || "" }, provider })
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

const pub = (rpc) => createPublicClient({ chain: mainnet, transport: http(rpc) })
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

async function waitReceipt(hash) {
  return walletPub().waitForTransactionReceipt({ hash, timeout: 120_000 })
}

async function ensureContract(account) {
  const saved = contractAddr()
  if (saved) return saved
  const tx = await wallet(account).deployContract({ abi: ABI, bytecode: BYTECODE })
  const receipt = await waitReceipt(tx)
  if (!receipt.contractAddress) throw new Error("Deploy failed")
  localStorage.setItem(STORE_CONTRACT, receipt.contractAddress)
  localStorage.setItem(STORE_BLOCK, receipt.blockNumber.toString())
  pinContractUrl(receipt.contractAddress, receipt.blockNumber)
  return receipt.contractAddress
}

async function loadChain() {
  const address = contractAddr()
  if (!address) return { posts: [], likes: new Map() }
  const block = fromBlock()
  const read = async (client) => {
    const [postLogs, likeLogs] = await Promise.all([
      client.getLogs({ address, event: POST_EV, fromBlock: block }),
      client.getLogs({ address, event: LIKE_EV, fromBlock: block }),
    ])
    const posts = postLogs.map((log) => postFromArgs(log.args))
    const likes = new Map()
    for (const log of likeLogs) {
      const id = Number(log.args.postId)
      likes.set(id, (likes.get(id) ?? 0) + 1)
    }
    return { posts, likes }
  }
  try {
    return await withRpc((rpc) => read(pub(rpc)))
  } catch {
    if (activeProvider) return read(walletPub())
    throw new Error("RPC failed")
  }
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
  const chainId = await provider.request({ method: "eth_chainId" })
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
  return accounts[0]
}

async function createPost(w, text, parent = 0) {
  const address = await ensureContract(w)
  const hash = await wallet(w).writeContract({ address, abi: ABI, functionName: "createPost", args: [text, BigInt(parent)] })
  const receipt = await waitReceipt(hash)
  return postsFromReceipt(receipt)
}

async function likePost(w, id) {
  const address = await ensureContract(w)
  const hash = await wallet(w).writeContract({ address, abi: ABI, functionName: "likePost", args: [BigInt(id)] })
  await waitReceipt(hash)
}

function Brand({ large }) {
  return React.createElement("div", { className: `brand${large ? " brand-lg" : " brand-sm"}` },
    React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }),
    React.createElement("span", { className: "brand-name" }, "Zettel"),
  )
}

function Btn({ children, onClick, disabled, variant = "ghost", className = "" }) {
  return React.createElement("button", {
    onClick, disabled,
    className: `btn btn-${variant} ${className}`.trim(),
  }, children)
}

function Editor({ draft, setDraft, onSubmit, busy, label }) {
  return React.createElement("div", { className: "editor" },
    React.createElement("textarea", {
      className: "textarea", value: draft, maxLength: MAX, rows: 4,
      placeholder: "Write something permanent...",
      onChange: (e) => setDraft(sanitize(e.target.value)),
    }),
    React.createElement("div", { className: "char-count" }, `${draft.length} / ${MAX}`),
    React.createElement(Btn, { variant: "primary", onClick: onSubmit, disabled: busy || !draft.trim() },
      busy ? "Confirm in wallet..." : label),
  )
}

function Nav({ screen, searching, onSelect }) {
  const ids = ["feed", "compose", "profile"]
  const labels = { feed: "Feed", compose: "Write", profile: "Profile" }
  const idx = ids.indexOf(screen)
  const on = searching || idx < 0 ? -1 : idx
  const [vertical, setVertical] = useState(() => typeof matchMedia !== "undefined" && matchMedia("(min-width: 1024px)").matches)
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)")
    const upd = () => setVertical(mq.matches)
    upd()
    mq.addEventListener("change", upd)
    return () => mq.removeEventListener("change", upd)
  }, [])
  const slide = on >= 0
    ? { transform: vertical ? `translateY(${on * 100}%)` : `translateX(${on * 100}%)` }
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
    React.createElement("input", {
      type: "search",
      className: "search-input",
      placeholder: "Search posts and users…",
      value,
      onChange: (e) => onChange(e.target.value),
      "aria-label": "Search posts and users",
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
    React.createElement("span", { className: "author" }, short(addr)),
    React.createElement("span", { className: "user-meta" }, `${count} ${count === 1 ? "post" : "posts"}`),
  )
}

function PostCard({ post, likes, onOpen, onLike, small }) {
  const cls = `card${onOpen ? " card-click" : ""}${small ? " card-sm" : ""}`
  return React.createElement("article", { className: cls, onClick: onOpen },
    React.createElement("div", { className: "card-meta" },
      React.createElement("span", { className: `author${small ? " author-sm" : ""}` }, short(post.author)),
      React.createElement("time", { className: "time" }, fmtTime(post.timestamp)),
    ),
    React.createElement("p", { className: "content" }, post.content),
    React.createElement("div", { className: "card-actions", onClick: (e) => e.stopPropagation() },
      React.createElement(Btn, { variant: "like", onClick: onLike }, `${likes > 0 ? likes : ""}${likes > 0 ? " likes" : "Like"}`),
    ),
  )
}

function App() {
  const [walletAddr, setWalletAddr] = useState(null)
  const [wallets, setWallets] = useState(null)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState(new Map())
  const [screen, setScreen] = useState("feed")
  const [postId, setPostId] = useState(null)
  const [draft, setDraft] = useState("")
  const [query, setQuery] = useState("")
  const [viewAddr, setViewAddr] = useState(null)
  const [err, setErr] = useState(null)
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(async (expectIds = []) => {
    for (let i = 0; i < 6; i++) {
      try {
        const d = await loadChain()
        setPosts(d.posts)
        setLikes(d.likes)
        setErr(null)
        if (!expectIds.length || expectIds.every((id) => d.posts.some((p) => p.id === id))) return
      } catch {
        if (i === 5) setErr("Could not read chain")
      }
      if (i < 5) await new Promise((r) => setTimeout(r, 2000))
    }
  }, [])

  useEffect(() => {
    syncContractFromUrl()
    const c = contractAddr()
    const from = localStorage.getItem(STORE_BLOCK)
    if (c && !new URLSearchParams(location.search).get("contract")) pinContractUrl(c, from ?? "0")
    void refresh()
    const t = setInterval(() => void refresh(), POLL_MS)
    return () => clearInterval(t)
  }, [refresh])

  useEffect(() => {
    void discoverWallets().then(setWallets)
  }, [])

  const submit = useCallback(async (parentId = 0) => {
    if (!walletAddr) return
    const text = clean(draft)
    if (!text) return setErr("Post cannot be empty")
    if (parentId && !posts.some((p) => p.id === parentId)) return setErr("Parent not found")
    setBusy(true)
    try {
      const created = await createPost(walletAddr, text, parentId)
      setPosts((prev) => mergePosts(prev, created))
      setDraft("")
      if (!parentId) setScreen("feed")
      await refresh(created.map((p) => p.id))
    } catch (e) { setErr(errMsg(e)) }
    finally { setBusy(false) }
  }, [walletAddr, draft, posts, refresh])

  const connect = useCallback(async (provider) => {
    setBusy(true)
    setErr(null)
    try {
      const addr = await connectWallet(provider)
      setWalletAddr(addr)
      void refresh()
    } catch (e) {
      activeProvider = null
      setErr(errMsg(e))
    } finally { setBusy(false) }
  }, [refresh])

  const feed = useMemo(() => posts.filter((p) => !p.parentId).sort(byNew), [posts])
  const post = useMemo(() => posts.find((p) => p.id === postId), [posts, postId])
  const replies = useMemo(() => posts.filter((p) => p.parentId === postId).sort(byOld), [posts, postId])
  const mine = useMemo(() => walletAddr ? posts.filter((p) => addrEq(p.author, walletAddr)).sort(byNew) : [], [posts, walletAddr])
  const search = useMemo(() => searchAll(posts, query), [posts, query])
  const userPosts = useMemo(() => viewAddr ? posts.filter((p) => addrEq(p.author, viewAddr)).sort(byNew) : [], [posts, viewAddr])
  const searching = query.trim().length > 0

  const openPost = (id) => { setPostId(id); setScreen("post"); setQuery("") }
  const openUser = (addr) => { setViewAddr(addr); setScreen("user"); setQuery("") }
  const goScreen = (id) => { setQuery(""); setViewAddr(null); setScreen(id) }

  if (!walletAddr) {
    return React.createElement("div", { className: "landing" },
      React.createElement("div", { className: "landing-inner" },
        React.createElement(Brand, { large: true }),
        React.createElement("p", { className: "tagline" }, "Atomic notes on chain. Linked permanently."),
        err && React.createElement("p", { className: "error" }, err),
        err && React.createElement("div", { className: "wallet-help" },
          React.createElement("ol", null,
            React.createElement("li", null, "Unlock your wallet first, then choose it below."),
            React.createElement("li", null, "Approve the connection when your wallet asks."),
            React.createElement("li", null, "If a side panel hangs, open the wallet from its extension icon."),
          ),
        ),
        wallets === null && React.createElement(Btn, { variant: "primary", disabled: true }, "Looking for wallets…"),
        wallets?.length === 0 && React.createElement(Btn, { variant: "primary", disabled: true }, "No wallet found"),
        wallets?.length === 1 && React.createElement(Btn, {
          variant: "primary",
          onClick: () => void connect(wallets[0].provider),
          disabled: busy,
        }, busy ? "Confirm in wallet…" : "Connect wallet"),
        wallets && wallets.length > 1 && React.createElement("div", { className: "wallet-list" },
          wallets.map((w) => React.createElement("button", {
            key: w.info.uuid,
            type: "button",
            className: "wallet-btn",
            disabled: busy,
            onClick: () => void connect(w.provider),
          },
            w.info.icon && React.createElement("img", { src: w.info.icon, alt: "" }),
            React.createElement("span", null, busy ? "Confirm in wallet…" : w.info.name),
          )),
        ),
      ),
    )
  }

  const postResults = (list, clickable = true) => list.map((p) => React.createElement(PostCard, {
    key: p.id, post: p, likes: likes.get(p.id) ?? 0,
    onOpen: clickable ? () => openPost(p.id) : undefined,
    onLike: () => void likePost(walletAddr, p.id).then(refresh).catch(() => setErr("Transaction failed")),
  }))

  return React.createElement("div", { className: "app" },
    React.createElement("aside", { className: "sidebar" },
      React.createElement("div", { className: "sidebar-top" },
        React.createElement(Brand, { large: false }),
        React.createElement("div", { className: "mobile-wallet" },
          React.createElement("span", { className: "wallet-addr" }, short(walletAddr)),
          React.createElement(Btn, { variant: "ghost", className: "btn-sm", onClick: () => { activeProvider = null; setWalletAddr(null); setScreen("feed"); setQuery("") } }, "Leave"),
        ),
      ),
      React.createElement(Nav, { screen, searching, onSelect: goScreen }),
      React.createElement("div", { className: "sidebar-foot" },
        React.createElement("span", { className: "wallet-addr" }, short(walletAddr)),
        React.createElement(Btn, { variant: "ghost", className: "btn-sm", onClick: () => { activeProvider = null; setWalletAddr(null); setScreen("feed"); setQuery("") } }, "Leave"),
      ),
    ),
    React.createElement("main", { className: "main" },
      React.createElement("div", { className: "main-inner" },
        React.createElement(SearchBar, { value: query, onChange: setQuery }),
        err && React.createElement("p", { className: "error" }, err),

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

        !searching && screen === "feed" && (feed.length
          ? postResults(feed)
          : React.createElement("p", { className: "empty" }, "No posts yet. Be the first to write something.")),
        !searching && screen === "post" && post && React.createElement("section", null,
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Back"),
          React.createElement(PostCard, {
            post, likes: likes.get(post.id) ?? 0,
            onLike: () => void likePost(walletAddr, post.id).then(refresh).catch(() => setErr("Transaction failed")),
          }),
          replies.length > 0 && React.createElement("p", { className: "replies-label" }, `${replies.length} ${replies.length === 1 ? "reply" : "replies"}`),
          replies.map((r) => React.createElement(PostCard, { key: r.id, post: r, likes: likes.get(r.id) ?? 0, small: true })),
          React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(post.id), busy, label: "Reply" }),
        ),
        !searching && screen === "compose" && React.createElement(React.Fragment, null,
          !contractAddr() && React.createElement("p", { className: "section-sub" },
            "First post deploys your on-chain notebook (one-time gas fee)."),
          React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(0), busy, label: "Publish" }),
        ),
        !searching && screen === "profile" && React.createElement("section", null,
          React.createElement("h2", { className: "section-title" }, short(walletAddr)),
          React.createElement("p", { className: "section-sub" }, `${mine.length} ${mine.length === 1 ? "post" : "posts"} on chain`),
          mine.length
            ? mine.map((p) => React.createElement(PostCard, {
                key: p.id, post: p, likes: likes.get(p.id) ?? 0, small: true,
                onOpen: () => openPost(p.id),
                onLike: () => void likePost(walletAddr, p.id).then(refresh).catch(() => setErr("Transaction failed")),
              }))
            : React.createElement("p", { className: "empty" }, "You haven't posted yet."),
        ),
        !searching && screen === "user" && viewAddr && React.createElement("section", null,
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Back"),
          React.createElement("h2", { className: "section-title" }, short(viewAddr)),
          React.createElement("p", { className: "section-sub" }, `${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"} on chain`),
          userPosts.length
            ? userPosts.map((p) => React.createElement(PostCard, {
                key: p.id, post: p, likes: likes.get(p.id) ?? 0, small: true,
                onOpen: () => openPost(p.id),
                onLike: () => void likePost(walletAddr, p.id).then(refresh).catch(() => setErr("Transaction failed")),
              }))
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
