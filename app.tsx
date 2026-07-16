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
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(html)
  }).listen(5173, () => console.log("http://localhost:5173"))
}

/*html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
    body {
      font-family: "Inter", system-ui, -apple-system, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: #0a0a0a;
      background: #fff;
      min-height: 100vh;
    }
    button, textarea { font: inherit; }
    button { cursor: pointer; border: none; background: none; }
    button:disabled { cursor: not-allowed; }

    .shell { max-width: 480px; margin: 0 auto; padding: 40px 24px 64px; }
    .landing {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px 24px;
      background: #fff;
    }
    .landing-inner {
      width: 100%;
      max-width: 360px;
      text-align: center;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .brand-lg { margin-bottom: 16px; }
    .brand-mark {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      flex-shrink: 0;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230a0a0a'/%3E%3Crect x='4' y='3' width='24' height='26' rx='3' fill='%23fff'/%3E%3Cpath d='M8 10h16M8 15h11M8 20h14' stroke='%230a0a0a' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='25' r='4.5' fill='%230a0a0a'/%3E%3C/svg%3E") center/cover no-repeat;
    }
    .brand-name {
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.045em;
      color: #0a0a0a;
      line-height: 1;
    }
    .brand-sm .brand-mark { width: 22px; height: 22px; border-radius: 6px; }
    .brand-sm .brand-name { font-size: 17px; letter-spacing: -0.035em; }
    .tagline {
      color: #737373;
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 36px;
      line-height: 1.55;
      letter-spacing: -0.01em;
    }
    .error {
      color: #dc2626;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 20px;
      letter-spacing: -0.01em;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    }
    .btn:active:not(:disabled) { transform: scale(0.98); }
    .btn-primary {
      background: #0a0a0a;
      color: #fff;
      width: 100%;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    }
    .btn-primary:hover:not(:disabled) { background: #171717; }
    .btn-primary:disabled { background: #f4f4f5; color: #a1a1aa; box-shadow: none; }
    .btn-ghost { color: #525252; padding: 8px 14px; border-radius: 10px; font-weight: 500; }
    .btn-ghost:hover:not(:disabled) { background: #f5f5f5; color: #0a0a0a; }
    .btn-ghost.active { background: #0a0a0a; color: #fff; }
    .btn-like {
      color: #737373;
      font-size: 13px;
      font-weight: 500;
      padding: 7px 12px;
      border-radius: 999px;
      background: #fafafa;
      border: 1px solid #f0f0f0;
    }
    .btn-like:hover:not(:disabled) { background: #f5f5f5; color: #0a0a0a; border-color: #e5e5e5; }
    .btn-sm { font-size: 13px; padding: 7px 12px; }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 28px;
    }
    .wallet-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #737373; }
    .wallet-addr {
      font-variant-numeric: tabular-nums;
      font-weight: 500;
      letter-spacing: -0.01em;
      padding: 6px 10px;
      background: #fafafa;
      border-radius: 8px;
    }

    .nav {
      display: flex;
      gap: 2px;
      margin-bottom: 24px;
      padding: 4px;
      background: #f5f5f5;
      border-radius: 14px;
    }
    .nav .btn { flex: 1; border-radius: 10px; }
    .card {
      background: #fff;
      border: 1px solid #f0f0f0;
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 12px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .card-click { cursor: pointer; }
    .card-click:hover { border-color: #e5e5e5; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }
    .card-sm { padding: 16px; border-radius: 14px; }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .author { font-size: 13px; font-weight: 600; color: #0a0a0a; letter-spacing: -0.02em; }
    .author-sm { font-size: 12px; }
    .time { font-size: 12px; color: #a3a3a3; font-weight: 400; }
    .content {
      font-size: 15px;
      color: #262626;
      line-height: 1.65;
      margin-bottom: 14px;
      white-space: pre-wrap;
      word-break: break-word;
      letter-spacing: -0.011em;
    }
    .card-actions { display: flex; gap: 8px; }

    .editor { margin-top: 20px; }
    .textarea {
      width: 100%;
      padding: 16px;
      border: 1px solid #f0f0f0;
      border-radius: 14px;
      background: #fafafa;
      color: #0a0a0a;
      resize: vertical;
      min-height: 120px;
      line-height: 1.6;
      letter-spacing: -0.011em;
      transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    }
    .textarea::placeholder { color: #a3a3a3; }
    .textarea:focus {
      outline: none;
      background: #fff;
      border-color: #d4d4d4;
      box-shadow: 0 0 0 4px rgba(0,0,0,0.03);
    }
    .char-count { font-size: 12px; color: #a3a3a3; margin: 10px 2px 14px; text-align: right; font-weight: 400; }
    .section-title { font-size: 15px; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.02em; color: #0a0a0a; }
    .section-sub { font-size: 13px; color: #737373; margin-bottom: 20px; }
    .empty { text-align: center; padding: 56px 24px; color: #a3a3a3; font-size: 14px; letter-spacing: -0.01em; }
    .back { margin-bottom: 20px; }
    .replies-label {
      font-size: 11px;
      font-weight: 600;
      color: #a3a3a3;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 28px 0 12px;
    }
  </style>
</head>
<body>
<div id="root"></div>
<script type="module">
import React, { useCallback, useEffect, useMemo, useState } from "https://esm.sh/react@19"
import { createRoot } from "https://esm.sh/react-dom@19/client"
import { createPublicClient, createWalletClient, custom, http, parseAbiItem } from "https://esm.sh/viem@2"
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

const short = (a) => `${a.slice(0, 6)}...${a.slice(-4)}`
const clean = (s) => s.trim().replace(/\u0000/g, "").slice(0, MAX)
const byNew = (a, b) => b.timestamp - a.timestamp
const byOld = (a, b) => a.timestamp - b.timestamp
const fmtTime = (ts) => new Date(ts * 1000).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })

const contractAddr = () => localStorage.getItem(STORE_CONTRACT)
const fromBlock = () => BigInt(localStorage.getItem(STORE_BLOCK) ?? "0")
const pub = (rpc) => createPublicClient({ chain: mainnet, transport: http(rpc) })
const walletPub = () => createPublicClient({ chain: mainnet, transport: custom(window.ethereum) })
const wallet = (account) => {
  if (!window.ethereum) throw new Error("No wallet")
  return createWalletClient({ chain: mainnet, transport: custom(window.ethereum), account })
}

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
  return receipt.contractAddress
}

async function loadChain() {
  const address = contractAddr()
  if (!address) return { posts: [], likes: new Map() }
  const block = fromBlock()
  const postEv = parseAbiItem("event PostCreated(uint256 indexed id, address indexed author, string content, uint256 parentId, uint256 timestamp)")
  const likeEv = parseAbiItem("event PostLiked(uint256 indexed postId, address indexed liker)")
  return withRpc(async (rpc) => {
    const client = pub(rpc)
    const [postLogs, likeLogs] = await Promise.all([
      client.getLogs({ address, event: postEv, fromBlock: block }),
      client.getLogs({ address, event: likeEv, fromBlock: block }),
    ])
    const posts = postLogs.map((log) => ({
      id: Number(log.args.id),
      author: log.args.author,
      content: log.args.content,
      parentId: Number(log.args.parentId),
      timestamp: Number(log.args.timestamp),
    }))
    const likes = new Map()
    for (const log of likeLogs) {
      const id = Number(log.args.postId)
      likes.set(id, (likes.get(id) ?? 0) + 1)
    }
    return { posts, likes }
  })
}

async function connectWallet() {
  const eth = window.ethereum
  if (!eth?.request) throw new Error("Install MetaMask or another wallet")
  await withTimeout(
    eth.request({ method: "eth_chainId" }),
    8_000,
    "Wallet not responding — restart MetaMask, then try again",
  )
  const accounts = await withTimeout(
    eth.request({ method: "eth_requestAccounts" }),
    60_000,
    "Wallet not responding — open MetaMask, approve the connection, or restart it",
  )
  if (!accounts?.length) throw new Error("No account selected")
  const address = accounts[0]
  try {
    await withTimeout(
      eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x1" }] }),
      30_000,
      "Wallet not responding — restart MetaMask, then try again",
    )
  } catch (e) {
    if (e?.code === 4001) throw new Error("Cancelled in wallet")
    if (e instanceof Error && e.message.includes("not responding")) throw e
  }
  return address
}

async function createPost(w, text, parent = 0) {
  const address = await ensureContract(w)
  await wallet(w).writeContract({ address, abi: ABI, functionName: "createPost", args: [text, BigInt(parent)] })
}

async function likePost(w, id) {
  const address = await ensureContract(w)
  await wallet(w).writeContract({ address, abi: ABI, functionName: "likePost", args: [BigInt(id)] })
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
      onChange: (e) => setDraft(clean(e.target.value)),
    }),
    React.createElement("div", { className: "char-count" }, `${draft.length} / ${MAX}`),
    React.createElement(Btn, { variant: "primary", onClick: onSubmit, disabled: busy || !draft.trim() },
      busy ? "Confirm in wallet..." : label),
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
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState(new Map())
  const [screen, setScreen] = useState("feed")
  const [postId, setPostId] = useState(null)
  const [draft, setDraft] = useState("")
  const [err, setErr] = useState(null)
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const d = await loadChain()
      setPosts(d.posts)
      setLikes(d.likes)
      setErr(null)
    } catch { setErr("Could not read chain") }
  }, [])

  useEffect(() => {
    void refresh()
    const t = setInterval(() => void refresh(), POLL_MS)
    return () => clearInterval(t)
  }, [refresh])

  useEffect(() => {
    const eth = window.ethereum
    if (!eth?.request) return
    withTimeout(eth.request({ method: "eth_accounts" }), 8_000, "")
      .then((accs) => { if (accs?.[0]) setWalletAddr(accs[0]) })
      .catch(() => {})
  }, [])

  const submit = useCallback(async (parentId = 0) => {
    if (!walletAddr) return
    const text = clean(draft)
    if (!text) return setErr("Post cannot be empty")
    if (parentId && !posts.some((p) => p.id === parentId)) return setErr("Parent not found")
    setBusy(true)
    try {
      await createPost(walletAddr, text, parentId)
      setDraft("")
      if (!parentId) setScreen("feed")
      await refresh()
    } catch (e) { setErr(errMsg(e)) }
    finally { setBusy(false) }
  }, [walletAddr, draft, posts, refresh])

  const connect = useCallback(async () => {
    setBusy(true)
    setErr(null)
    try {
      const addr = await connectWallet()
      setWalletAddr(addr)
      void refresh()
    } catch (e) {
      setErr(errMsg(e))
    } finally { setBusy(false) }
  }, [refresh])

  const feed = useMemo(() => posts.filter((p) => !p.parentId).sort(byNew), [posts])
  const post = useMemo(() => posts.find((p) => p.id === postId), [posts, postId])
  const replies = useMemo(() => posts.filter((p) => p.parentId === postId).sort(byOld), [posts, postId])
  const mine = useMemo(() => walletAddr ? posts.filter((p) => p.author === walletAddr).sort(byNew) : [], [posts, walletAddr])

  if (!walletAddr) {
    return React.createElement("div", { className: "landing" },
      React.createElement("div", { className: "landing-inner" },
        React.createElement(Brand, { large: true }),
        React.createElement("p", { className: "tagline" }, "Atomic notes on chain. Linked permanently."),
        err && React.createElement("p", { className: "error" }, err),
        React.createElement(Btn, { variant: "primary", onClick: () => void connect(), disabled: busy },
          busy ? "Confirm in wallet…" : "Connect wallet"),
      ),
    )
  }

  const nav = (id, label) => React.createElement(Btn, {
    key: id, variant: "ghost",
    className: screen === id ? "active" : "",
    onClick: () => setScreen(id),
  }, label)

  return React.createElement("div", { className: "shell" },
    React.createElement("header", { className: "header" },
      React.createElement(Brand, { large: false }),
      React.createElement("div", { className: "wallet-row" },
        React.createElement("span", { className: "wallet-addr" }, short(walletAddr)),
        React.createElement(Btn, { variant: "ghost", className: "btn-sm", onClick: () => { setWalletAddr(null); setScreen("feed") } }, "Leave"),
      ),
    ),
    React.createElement("nav", { className: "nav" }, nav("feed", "Feed"), nav("compose", "Write"), nav("profile", "Profile")),
    err && React.createElement("p", { className: "error", style: { marginBottom: 16 } }, err),

    screen === "feed" && (feed.length
      ? feed.map((p) => React.createElement(PostCard, {
          key: p.id, post: p, likes: likes.get(p.id) ?? 0,
          onOpen: () => { setPostId(p.id); setScreen("post") },
          onLike: () => void likePost(walletAddr, p.id).then(refresh).catch(() => setErr("Transaction failed")),
        }))
      : React.createElement("p", { className: "empty" }, "No posts yet. Be the first to write something.")),
    screen === "post" && post && React.createElement("section", null,
      React.createElement(Btn, { variant: "ghost", className: "back btn-sm", onClick: () => setScreen("feed") }, "← Back"),
      React.createElement(PostCard, {
        post, likes: likes.get(post.id) ?? 0,
        onLike: () => void likePost(walletAddr, post.id).then(refresh).catch(() => setErr("Transaction failed")),
      }),
      replies.length > 0 && React.createElement("p", { className: "replies-label" }, `${replies.length} ${replies.length === 1 ? "reply" : "replies"}`),
      replies.map((r) => React.createElement(PostCard, { key: r.id, post: r, likes: likes.get(r.id) ?? 0, small: true })),
      React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(post.id), busy, label: "Reply" }),
    ),
    screen === "compose" && React.createElement(React.Fragment, null,
      !contractAddr() && React.createElement("p", { className: "section-sub", style: { marginBottom: 12 } },
        "First post deploys your on-chain notebook (one-time gas fee)."),
      React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(0), busy, label: "Publish" }),
    ),
    screen === "profile" && React.createElement("section", null,
      React.createElement("h2", { className: "section-title" }, short(walletAddr)),
      React.createElement("p", { className: "section-sub" }, `${mine.length} ${mine.length === 1 ? "post" : "posts"} on chain`),
      mine.length
        ? mine.map((p) => React.createElement(PostCard, { key: p.id, post: p, likes: likes.get(p.id) ?? 0, small: true }))
        : React.createElement("p", { className: "empty" }, "You haven't posted yet."),
    ),
  )
}

createRoot(document.getElementById("root")).render(React.createElement(App))
</script>
</body>
</html>
html*/
