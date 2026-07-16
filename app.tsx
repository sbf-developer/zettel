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
      gap: 12px;
      padding: 9px 16px;
      max-width: 980px;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      min-width: 0;
    }
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
    .topbar .nav { flex: 0 0 auto; width: 204px; max-width: 204px; }
    .topbar .search-wrap {
      flex: 1 1 120px;
      min-width: 0;
      max-width: 240px;
      width: auto;
      margin-bottom: 0;
    }
    .topbar-account {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      margin-left: auto;
    }
    .topbar-account .wallet-addr {
      font-size: 11px;
      font-weight: 500;
      color: #737373;
      padding: 4px 8px;
      border-radius: 6px;
      background: #fafafa;
      border: 1px solid #f0f0f0;
      max-width: 92px;
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
    .btn-like {
      color: #a3a3a3;
      font-size: 13px;
      font-weight: 500;
      padding: 4px 0;
      min-height: auto;
    }
    .btn-like:hover:not(:disabled) { color: #525252; }
    .btn-sm { font-size: 13px; padding: 6px 10px; min-height: 32px; }
    .btn-xs { font-size: 12px; padding: 4px 8px; min-height: 28px; color: #a3a3a3; }
    .btn-xs:hover:not(:disabled) { color: #525252; }

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
      padding: 32px 16px 48px;
      padding-bottom: max(48px, env(safe-area-inset-bottom));
    }
    .main-inner { max-width: 680px; margin: 0 auto; }

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
    .card-actions { display: flex; align-items: center; gap: 12px; }
    .reply-count { font-size: 12px; color: #a3a3a3; }
    .sync-hint { font-size: 12px; color: #a3a3a3; margin: 0 0 12px; }

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
      .topbar-inner { padding: 9px 24px; gap: 14px; max-width: 1000px; }
      .topbar .search-wrap { max-width: 320px; }
      .main { padding: 32px 32px 64px; }
      .textarea { min-height: 180px; font-size: 16px; }
      .content { font-size: 16px; }
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
        padding: 32px 48px 64px;
        display: flex;
        justify-content: center;
      }
      .main-inner { width: 100%; max-width: 680px; }
      .card { padding: 24px 0; }
    }

    @media (max-width: 520px) {
      .topbar-inner { gap: 8px; padding: 8px 12px; }
      .topbar .nav { width: 156px; max-width: 156px; }
      .topbar .search-wrap { max-width: 120px; flex-basis: 80px; }
      .topbar-account .wallet-addr { display: none; }
      .nav-btn { font-size: 11px; padding: 4px 4px; }
    }

    @media (max-width: 359px) {
      .nav-btn { font-size: 10px; }
      .topbar .search-wrap { max-width: 72px; }
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
const RPCS = [
  "https://ethereum.publicnode.com",
  "https://cloudflare-eth.com",
  "https://1rpc.io/eth",
  "https://eth.drpc.org",
]
const POLL_MS = 30_000
// Canonical Zettel feed — baked into source so any frontend instance loads the same chain data.
// After first deploy, paste address + block here and commit.
const ZETTEL_FEED = ""
const ZETTEL_FROM_BLOCK = "0"
const STORE_SHARED = "zettel-shared-feed"
const STORE_SHARED_BLOCK = "zettel-shared-from-block"
const STORE_CONTRACT = "zettel-contract"
const STORE_BLOCK = "zettel-from-block"
const STORE_DISCOVERED = "zettel-discovered-feeds"
const walletContractKey = (w) => `zettel-contract-${w.toLowerCase()}`
const walletBlockKey = (w) => `zettel-from-block-${w.toLowerCase()}`
const isAddr = (a) => typeof a === "string" && /^0x[a-fA-F0-9]{40}$/.test(a) && !/^0x0{40}$/i.test(a)
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
const postKey = (p) => `${(p.notebook ?? "").toLowerCase()}:${p.id}`
const likeKey = (notebook, id) => `${(notebook ?? "").toLowerCase()}:${id}`
const postFromArgs = (args, notebook) => ({
  id: Number(args.id),
  author: args.author,
  content: args.content,
  parentId: Number(args.parentId),
  timestamp: Number(args.timestamp),
  notebook: notebook ?? null,
})
const postsFromReceipt = (receipt) => {
  const out = []
  for (const log of receipt.logs) {
    try {
      const ev = decodeEventLog({ abi: [POST_EV], data: log.data, topics: log.topics })
      if (ev.eventName === "PostCreated") out.push(postFromArgs(ev.args, receipt.contractAddress ?? receipt.to))
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

const migrateToSharedFeed = () => {
  if (isAddr(ZETTEL_FEED) || isAddr(localStorage.getItem(STORE_SHARED))) return
  for (const { address, block } of collectStoredFeeds()) {
    if (isAddr(address)) {
      localStorage.setItem(STORE_SHARED, address)
      localStorage.setItem(STORE_SHARED_BLOCK, block)
      return
    }
  }
}

const loadDiscoveredFeeds = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_DISCOVERED) ?? "[]")
    return Array.isArray(raw) ? raw.filter((f) => isAddr(f?.address)) : []
  } catch { return [] }
}

const saveDiscoveredFeed = (address, block, wallet) => {
  const blockStr = String(block)
  const list = loadDiscoveredFeeds()
  const i = list.findIndex((f) => addrEq(f.address, address))
  if (i >= 0) {
    if (BigInt(blockStr) < BigInt(list[i].block)) list[i].block = blockStr
  } else {
    list.push({ address, block: blockStr })
  }
  localStorage.setItem(STORE_DISCOVERED, JSON.stringify(list))
  if (!isAddr(localStorage.getItem(STORE_SHARED))) {
    localStorage.setItem(STORE_SHARED, address)
    localStorage.setItem(STORE_SHARED_BLOCK, blockStr)
  }
  if (wallet) {
    localStorage.setItem(walletContractKey(wallet), address)
    localStorage.setItem(walletBlockKey(wallet), blockStr)
  }
}

const collectStoredFeeds = () => {
  const seen = new Set()
  const out = []
  const add = (address, block) => {
    const a = address?.toLowerCase?.()
    if (!isAddr(address) || seen.has(a)) return
    seen.add(a)
    out.push({ address, block: block && /^\d+$/.test(block) ? block : "0" })
  }
  for (const f of loadDiscoveredFeeds()) add(f.address, f.block)
  add(localStorage.getItem(STORE_SHARED), localStorage.getItem(STORE_SHARED_BLOCK))
  add(localStorage.getItem(STORE_CONTRACT), localStorage.getItem(STORE_BLOCK))
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith("zettel-contract-0x")) continue
    const wallet = key.slice("zettel-contract-".length)
    add(localStorage.getItem(key), localStorage.getItem(walletBlockKey(wallet)))
  }
  return out
}

const sharedFeedAddress = () => {
  if (isAddr(ZETTEL_FEED)) return { address: ZETTEL_FEED, block: ZETTEL_FROM_BLOCK }
  const shared = localStorage.getItem(STORE_SHARED)
  const block = localStorage.getItem(STORE_SHARED_BLOCK)
  if (isAddr(shared)) return { address: shared, block: block && /^\d+$/.test(block) ? block : "0" }
  return null
}

const feedsToLoad = () => {
  const q = new URLSearchParams(location.search)
  const urlC = q.get("contract")
  const urlFrom = q.get("from")
  if (isAddr(urlC)) return [{ address: urlC, block: urlFrom && /^\d+$/.test(urlFrom) ? urlFrom : "0" }]
  const seen = new Set()
  const out = []
  const add = (address, block) => {
    const a = address?.toLowerCase?.()
    if (!isAddr(address) || seen.has(a)) return
    seen.add(a)
    out.push({ address, block: block && /^\d+$/.test(String(block)) ? String(block) : "0" })
  }
  const primary = sharedFeedAddress()
  if (primary) add(primary.address, primary.block)
  for (const f of collectStoredFeeds()) add(f.address, f.block)
  return out
}
migrateToSharedFeed()

const feedConfig = () => {
  const q = new URLSearchParams(location.search)
  const urlC = q.get("contract")
  const urlFrom = q.get("from")
  if (isAddr(urlC)) {
    return { address: urlC, block: urlFrom && /^\d+$/.test(urlFrom) ? urlFrom : "0", legacy: true }
  }
  if (isAddr(ZETTEL_FEED)) {
    return { address: ZETTEL_FEED, block: ZETTEL_FROM_BLOCK, legacy: false }
  }
  const shared = localStorage.getItem(STORE_SHARED)
  const sharedBlock = localStorage.getItem(STORE_SHARED_BLOCK)
  if (isAddr(shared)) {
    return { address: shared, block: sharedBlock && /^\d+$/.test(sharedBlock) ? sharedBlock : "0", legacy: false }
  }
  return null
}
const contractAddr = () => feedConfig()?.address ?? null
const fromBlock = () => BigInt(feedConfig()?.block ?? "0")
const isLegacyFeed = () => !!feedConfig()?.legacy

const bootstrapSharedFeed = (address, block) => {
  const blockStr = block.toString()
  localStorage.setItem(STORE_SHARED, address)
  localStorage.setItem(STORE_SHARED_BLOCK, blockStr)
  pinContractUrl(address, blockStr)
}

const legacyNotebook = (wallet) => {
  if (!wallet) return null
  const current = contractAddr()
  const keys = [walletContractKey(wallet), STORE_CONTRACT]
  for (const key of keys) {
    const address = localStorage.getItem(key)
    if (!isAddr(address)) continue
    if (current && addrEq(address, current)) continue
    const block = localStorage.getItem(key === STORE_CONTRACT ? STORE_BLOCK : walletBlockKey(wallet)) ?? "0"
    return { address, block }
  }
  return null
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

// Social timeline: all authors, top-level only, newest first, tie-break by likes & replies.
const buildSocialFeed = (posts, likes) => {
  const replyCounts = new Map()
  for (const p of posts) {
    if (!p.parentId) continue
    const pk = likeKey(p.notebook, p.parentId)
    replyCounts.set(pk, (replyCounts.get(pk) ?? 0) + 1)
  }
  return posts
    .filter((p) => !p.parentId && p.content?.trim())
    .sort((a, b) => {
      const dt = b.timestamp - a.timestamp
      if (dt !== 0) return dt
      const dl = (likes.get(likeKey(b.notebook, b.id)) ?? 0) - (likes.get(likeKey(a.notebook, a.id)) ?? 0)
      if (dl !== 0) return dl
      return (replyCounts.get(postKey(b)) ?? 0) - (replyCounts.get(postKey(a)) ?? 0)
    })
    .map((p) => ({ ...p, replyCount: replyCounts.get(postKey(p)) ?? 0 }))
}

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
  const existing = contractAddr()
  if (existing) return existing
  const tx = await wallet(account).deployContract({ abi: ABI, bytecode: BYTECODE })
  const receipt = await waitReceipt(tx)
  if (!receipt.contractAddress) throw new Error("Deploy failed")
  bootstrapSharedFeed(receipt.contractAddress, receipt.blockNumber)
  console.warn(
    "Zettel shared feed deployed:",
    receipt.contractAddress,
    "from block",
    receipt.blockNumber.toString(),
    "— add to ZETTEL_FEED in app.tsx",
  )
  return receipt.contractAddress
}

async function discoverNotebooksFromWallet(wallet) {
  return withTimeout(discoverNotebooksFromWalletInner(wallet), 12_000, "discovery timeout").catch(() => [])
}

async function discoverNotebooksFromWalletInner(wallet) {
  if (!wallet || !activeProvider?.request) return []
  const w = wallet.toLowerCase()
  const client = walletPub()
  const found = new Map()
  const note = (address, block) => {
    if (!isAddr(address)) return
    const a = address.toLowerCase()
    const b = BigInt(block)
    const prev = found.has(a) ? BigInt(found.get(a)) : null
    const use = !prev || b < prev ? b : prev
    found.set(a, use.toString())
    saveDiscoveredFeed(address, use.toString(), wallet)
  }
  const scanReceipt = async (hash) => {
    if (!hash) return
    try {
      const receipt = await client.getTransactionReceipt({ hash })
      if (!receipt || receipt.from?.toLowerCase() !== w) return
      if (receipt.contractAddress) note(receipt.contractAddress, receipt.blockNumber)
      for (const log of receipt.logs) {
        try {
          const ev = decodeEventLog({ abi: [POST_EV], data: log.data, topics: log.topics })
          if (ev.eventName === "PostCreated") note(log.address, receipt.blockNumber)
        } catch (_) {}
      }
    } catch (_) {}
  }
  const scanTxHashes = async (hashes) => {
    await Promise.all(hashes.slice(0, 30).map((hash) => scanReceipt(hash)))
  }
  const [blockscout, etherscan] = await Promise.allSettled([
    fetch(`https://eth.blockscout.com/api/v2/addresses/${wallet}/transactions?filter=from`).then((r) => r.json()),
    fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&page=1&offset=40&sort=desc`).then((r) => r.json()),
  ])
  if (blockscout.status === "fulfilled") {
    await scanTxHashes((blockscout.value.items ?? []).map((t) => t.hash))
  }
  if (etherscan.status === "fulfilled") {
    const data = etherscan.value
    if (data.status === "1" && Array.isArray(data.result)) {
      await scanTxHashes(data.result.map((t) => t.hash))
    }
  }
  return [...found.entries()].map(([address, block]) => ({ address, block }))
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
      for (const log of likeLogs) {
        const id = Number(log.args.postId)
        const key = likeKey(address, id)
        likes.set(key, (likes.get(key) ?? 0) + 1)
      }
      return { posts, likes }
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
    for (const a of attempts) {
      for (const [key, n] of a.likes) likes.set(key, Math.max(likes.get(key) ?? 0, n))
    }
    return { posts, likes }
  }
  let result = await pull(block).catch(() => ({ posts: [], likes: new Map() }))
  if (!result.posts.length && block !== "0") result = await pull("0").catch(() => result)
  return result
}

const mergeFeedResults = (acc, r) => {
  acc.posts = mergePosts(acc.posts, r.posts)
  for (const [key, n] of r.likes) acc.likes.set(key, Math.max(acc.likes.get(key) ?? 0, n))
  return acc
}

async function loadChain() {
  const feeds = feedsToLoad()
  if (!feeds.length) return { posts: [], likes: new Map() }
  const empty = { posts: [], likes: new Map() }
  const primary = sharedFeedAddress()
  let acc = { posts: [], likes: new Map() }
  if (primary) {
    const pf = feeds.find((f) => addrEq(f.address, primary.address))
    if (pf) acc = mergeFeedResults(acc, await loadFeed(pf.address, pf.block).catch(() => empty))
  }
  const rest = feeds.filter((f) => !primary || !addrEq(f.address, primary.address))
  if (rest.length) {
    const results = await Promise.all(rest.map((f) => loadFeed(f.address, f.block).catch(() => empty)))
    for (const r of results) acc = mergeFeedResults(acc, r)
  }
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

async function likePost(w, post) {
  const address = post.notebook ?? (await ensureContract(w))
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
    React.createElement("span", { className: "author" }, short(addr)),
    React.createElement("span", { className: "user-meta" }, `${count} ${count === 1 ? "post" : "posts"}`),
  )
}

function PostCard({ post, likes, replies, onOpen, onLike, small }) {
  const cls = `card${onOpen ? " card-click" : ""}${small ? " card-sm" : ""}`
  return React.createElement("article", { className: cls, onClick: onOpen },
    React.createElement("div", { className: "card-meta" },
      React.createElement("span", { className: `author${small ? " author-sm" : ""}` }, short(post.author)),
      React.createElement("time", { className: "time" }, fmtTime(post.timestamp)),
    ),
    React.createElement("p", { className: "content" }, post.content),
    React.createElement("div", { className: "card-actions", onClick: (e) => e.stopPropagation() },
      React.createElement(Btn, { variant: "like", onClick: onLike }, `${likes > 0 ? likes : ""}${likes > 0 ? " likes" : "Like"}`),
      replies > 0 && React.createElement("span", { className: "reply-count" }, `${replies} ${replies === 1 ? "reply" : "replies"}`),
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
  const [syncing, setSyncing] = useState(false)
  const [feedLoading, setFeedLoading] = useState(true)

  const refresh = useCallback(async (expectIds = []) => {
    for (let i = 0; i < 6; i++) {
      try {
        const d = await loadChain()
        let ok = false
        setPosts((prev) => {
          const next = applyChainPosts(prev, d.posts)
          ok = !expectIds.length || expectIds.every((id) => next.some((p) => p.id === id))
          return next
        })
        setLikes((prev) => {
          const next = new Map(prev)
          for (const [key, n] of d.likes) next.set(key, Math.max(next.get(key) ?? 0, n))
          return next
        })
        setErr(null)
        setFeedLoading(false)
        if (ok) return
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

  const submit = useCallback(async (parent = null) => {
    if (!walletAddr) return
    const text = clean(draft)
    if (!text) return setErr("Post cannot be empty")
    const parentId = parent ? parent.id : 0
    if (parentId && !posts.some((p) => p.id === parentId && addrEq(p.notebook, parent.notebook))) return setErr("Parent not found")
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
      await refresh()
      void (async () => {
        setSyncing(true)
        try {
          await discoverNotebooksFromWallet(addr)
          await refresh()
        } finally { setSyncing(false) }
      })()
    } catch (e) {
      activeProvider = null
      setErr(errMsg(e))
    } finally { setBusy(false) }
  }, [refresh])

  const feed = useMemo(() => buildSocialFeed(posts, likes), [posts, likes])
  const post = useMemo(() => posts.find((p) => postKey(p) === postId), [posts, postId])
  const replies = useMemo(() => {
    if (!post) return []
    return posts.filter((p) => p.parentId === post.id && addrEq(p.notebook, post.notebook)).sort(byOld)
  }, [posts, post])
  const mine = useMemo(() => walletAddr ? posts.filter((p) => addrEq(p.author, walletAddr)).sort(byNew) : [], [posts, walletAddr])
  const search = useMemo(() => searchAll(posts, query), [posts, query])
  const userPosts = useMemo(() => viewAddr ? posts.filter((p) => addrEq(p.author, viewAddr)).sort(byNew) : [], [posts, viewAddr])
  const searching = query.trim().length > 0

  const legacy = useMemo(() => legacyNotebook(walletAddr), [walletAddr])

  const openPost = (p) => { setPostId(postKey(p)); setScreen("post"); setQuery("") }
  const openUser = (addr) => { setViewAddr(addr); setScreen("user"); setQuery("") }
  const goScreen = (id) => { setQuery(""); setViewAddr(null); setScreen(id) }

  const resync = useCallback(async () => {
    if (!walletAddr) return
    setSyncing(true)
    setErr(null)
    try {
      await discoverNotebooksFromWallet(walletAddr)
      await refresh()
    } catch (e) { setErr(errMsg(e)) }
    finally { setSyncing(false) }
  }, [walletAddr, refresh])

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
        wallets === null && React.createElement("div", { className: "landing-actions" },
          React.createElement("button", { type: "button", className: "btn-connect", disabled: true }, "Looking for wallets…"),
        ),
        wallets?.length === 0 && React.createElement("div", { className: "landing-actions" },
          React.createElement("button", { type: "button", className: "btn-connect", disabled: true }, "No wallet found"),
        ),
        wallets?.length === 1 && React.createElement("div", { className: "landing-actions" },
          React.createElement("button", {
            type: "button",
            className: "btn-connect",
            onClick: () => void connect(wallets[0].provider),
            disabled: busy,
          }, busy ? "Confirm in wallet…" : "Connect wallet"),
        ),
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
    key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0,
    replies: p.replyCount ?? 0,
    onOpen: clickable ? () => openPost(p) : undefined,
    onLike: () => void likePost(walletAddr, p).then(refresh).catch(() => setErr("Transaction failed")),
  }))

  return React.createElement("div", { className: "app" },
    React.createElement("header", { className: "topbar" },
      React.createElement("div", { className: "topbar-inner" },
        React.createElement(Brand, { large: false, onClick: () => goScreen("feed") }),
        React.createElement(Nav, { screen, searching, onSelect: goScreen }),
        React.createElement(SearchBar, { value: query, onChange: setQuery }),
        React.createElement("div", { className: "topbar-account" },
          React.createElement("span", { className: "wallet-addr" }, short(walletAddr)),
          React.createElement(Btn, { variant: "ghost", className: "btn-xs", onClick: () => { activeProvider = null; setWalletAddr(null); setScreen("feed"); setQuery("") } }, "Leave"),
        ),
      ),
    ),
    React.createElement("main", { className: "main" },
      React.createElement("div", { className: "main-inner" },
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

        !searching && screen === "feed" && (feedLoading && !feed.length
          ? React.createElement("p", { className: "empty" }, "Loading feed…")
          : feed.length
          ? React.createElement(React.Fragment, null,
            syncing && React.createElement("p", { className: "sync-hint" }, "Checking for older notebooks…"),
            postResults(feed),
          )
          : React.createElement("p", { className: "empty" }, contractAddr() || feedsToLoad().length
            ? (isLegacyFeed()
              ? "Viewing a legacy notebook. Remove ?contract= from the URL for the shared Zettel feed."
              : syncing
              ? "Loading feed…"
              : "No posts yet. Everyone reads the same on-chain feed — publish from Write.")
            : "No posts yet. Connect wallet and publish — first post creates the shared feed for everyone.")),
        !searching && screen === "post" && post && React.createElement("section", null,
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Back"),
          React.createElement(PostCard, {
            post, likes: likes.get(likeKey(post.notebook, post.id)) ?? 0,
            onLike: () => void likePost(walletAddr, post).then(refresh).catch(() => setErr("Transaction failed")),
          }),
          replies.length > 0 && React.createElement("p", { className: "replies-label" }, `${replies.length} ${replies.length === 1 ? "reply" : "replies"}`),
          replies.map((r) => React.createElement(PostCard, {
            key: postKey(r), post: r, likes: likes.get(likeKey(r.notebook, r.id)) ?? 0, small: true,
          })),
          React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(post), busy, label: "Reply" }),
        ),
        !searching && screen === "compose" && React.createElement(React.Fragment, null,
          !contractAddr() && React.createElement("p", { className: "section-sub" },
            "First post deploys the shared Zettel feed for everyone (one-time gas fee)."),
          React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(null), busy, label: "Publish" }),
        ),
        !searching && screen === "profile" && React.createElement("section", null,
          React.createElement("h2", { className: "section-title" }, short(walletAddr)),
          React.createElement("p", { className: "section-sub" }, `${mine.length} ${mine.length === 1 ? "post" : "posts"} on chain`),
          React.createElement(Btn, {
            variant: "ghost",
            className: "btn-sm",
            onClick: () => void resync(),
            disabled: syncing,
          }, syncing ? "Searching chain…" : "Find my posts on chain"),
          contractAddr() && !isLegacyFeed() && React.createElement("p", { className: "section-sub" },
            `Shared feed ${short(contractAddr())} — permanent on Ethereum, any frontend can load it.`),
          legacy && React.createElement("p", { className: "section-sub" },
            React.createElement("a", {
              href: `${location.pathname}?contract=${legacy.address}&from=${legacy.block}`,
              style: { color: "#525252", textDecoration: "underline" },
            }, `Looking for an older post? Open your previous notebook (${short(legacy.address)})`)),
          !syncing && !mine.length && feedsToLoad().length > 0 && React.createElement("p", { className: "section-sub" },
            `Checked ${feedsToLoad().length} on-chain notebook${feedsToLoad().length === 1 ? "" : "s"} — no posts from this wallet yet.`),
          mine.length
            ? mine.map((p) => React.createElement(PostCard, {
                key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0, small: true,
                onOpen: () => openPost(p),
                onLike: () => void likePost(walletAddr, p).then(refresh).catch(() => setErr("Transaction failed")),
              }))
            : React.createElement("p", { className: "empty" }, "You haven't posted yet."),
        ),
        !searching && screen === "user" && viewAddr && React.createElement("section", null,
          React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => goScreen("feed") }, "← Back"),
          React.createElement("h2", { className: "section-title" }, short(viewAddr)),
          React.createElement("p", { className: "section-sub" }, `${userPosts.length} ${userPosts.length === 1 ? "post" : "posts"} on chain`),
          userPosts.length
            ? userPosts.map((p) => React.createElement(PostCard, {
                key: postKey(p), post: p, likes: likes.get(likeKey(p.notebook, p.id)) ?? 0, small: true,
                onOpen: () => openPost(p),
                onLike: () => void likePost(walletAddr, p).then(refresh).catch(() => setErr("Transaction failed")),
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
