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
  <meta name="theme-color" content="#f5f5f4" />
  <title>Zettel</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23f5f5f4'/%3E%3Crect x='7' y='6' width='18' height='22' rx='3' fill='%23fff' stroke='%23e7e5e4'/%3E%3Cpath d='M11 12h10M11 16h8M11 20h9' stroke='%23d6d3d1' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='23' cy='23' r='3' fill='%23111'/%3E%3C/svg%3E" />
  <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23f5f5f4'/%3E%3Crect x='7' y='6' width='18' height='22' rx='3' fill='%23fff' stroke='%23e7e5e4'/%3E%3Cpath d='M11 12h10M11 16h8M11 20h9' stroke='%23d6d3d1' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='23' cy='23' r='3' fill='%23111'/%3E%3C/svg%3E" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-font-smoothing: antialiased; }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: #111;
      background: #f5f5f4;
      min-height: 100vh;
    }
    button, textarea { font: inherit; }
    button { cursor: pointer; border: none; background: none; }
    button:disabled { cursor: not-allowed; opacity: 0.45; }

    .shell { max-width: 520px; margin: 0 auto; padding: 32px 20px 48px; }
    .landing {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .landing-card {
      width: 100%;
      max-width: 400px;
      text-align: center;
      padding: 48px 32px;
      background: #fff;
      border-radius: 16px;
      border: 1px solid #e7e5e4;
    }
    .logo { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 8px; }
    .tagline { color: #78716c; font-size: 14px; margin-bottom: 28px; line-height: 1.6; }
    .error { color: #dc2626; font-size: 13px; margin-bottom: 16px; }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .btn-primary { background: #111; color: #fff; width: 100%; }
    .btn-primary:hover:not(:disabled) { background: #292524; }
    .btn-ghost { color: #57534e; padding: 8px 12px; border-radius: 8px; }
    .btn-ghost:hover:not(:disabled) { background: #f5f5f4; color: #111; }
    .btn-ghost.active { background: #111; color: #fff; }
    .btn-like {
      color: #78716c;
      font-size: 13px;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid #e7e5e4;
    }
    .btn-like:hover:not(:disabled) { background: #fafaf9; color: #111; border-color: #d6d3d1; }
    .btn-sm { font-size: 13px; padding: 8px 14px; }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e7e5e4;
    }
    .header-title { font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
    .wallet-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #78716c; }
    .wallet-addr { font-variant-numeric: tabular-nums; }

    .nav { display: flex; gap: 4px; margin-bottom: 20px; }
    .card {
      background: #fff;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 10px;
      transition: border-color 0.15s;
    }
    .card-click { cursor: pointer; }
    .card-click:hover { border-color: #d6d3d1; }
    .card-sm { padding: 14px; }
    .card-meta {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .author { font-size: 14px; font-weight: 600; color: #111; }
    .author-sm { font-size: 13px; }
    .time { font-size: 12px; color: #a8a29e; }
    .content { font-size: 15px; color: #292524; line-height: 1.55; margin-bottom: 12px; white-space: pre-wrap; word-break: break-word; }
    .card-actions { display: flex; gap: 8px; }

    .editor { margin-top: 16px; }
    .textarea {
      width: 100%;
      padding: 14px;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      background: #fff;
      color: #111;
      resize: vertical;
      min-height: 100px;
      line-height: 1.5;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .textarea:focus { outline: none; border-color: #a8a29e; box-shadow: 0 0 0 3px rgba(0,0,0,0.04); }
    .char-count { font-size: 12px; color: #a8a29e; margin: 8px 0 12px; text-align: right; }
    .section-title { font-size: 18px; font-weight: 600; margin-bottom: 4px; letter-spacing: -0.02em; }
    .section-sub { font-size: 13px; color: #78716c; margin-bottom: 16px; }
    .empty { text-align: center; padding: 48px 20px; color: #a8a29e; font-size: 14px; }
    .back { margin-bottom: 16px; }
    .replies-label { font-size: 12px; font-weight: 600; color: #a8a29e; text-transform: uppercase; letter-spacing: 0.04em; margin: 20px 0 10px; }
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
const wallet = (account) => {
  if (!window.ethereum) throw new Error("No wallet")
  return createWalletClient({ chain: mainnet, transport: custom(window.ethereum), account })
}

async function withRpc(fn) {
  for (const rpc of RPCS) try { return await fn(rpc) } catch {}
  throw new Error("RPC failed")
}

async function ensureContract(account) {
  const saved = contractAddr()
  if (saved) return saved
  const tx = await wallet(account).deployContract({ abi: ABI, bytecode: BYTECODE })
  const receipt = await withRpc((rpc) => pub(rpc).waitForTransactionReceipt({ hash: tx }))
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
  if (!window.ethereum) throw new Error("Install MetaMask")
  const [address] = await createWalletClient({ chain: mainnet, transport: custom(window.ethereum) }).requestAddresses()
  try { await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x1" }] }) } catch {}
  return address
}

async function createPost(w, text, parent = 0) {
  const address = contractAddr()
  if (!address) throw new Error("No contract")
  await wallet(w).writeContract({ address, abi: ABI, functionName: "createPost", args: [text, BigInt(parent)] })
}

async function likePost(w, id) {
  const address = contractAddr()
  if (!address) throw new Error("No contract")
  await wallet(w).writeContract({ address, abi: ABI, functionName: "likePost", args: [BigInt(id)] })
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
    } catch { setErr("Transaction failed") }
    finally { setBusy(false) }
  }, [walletAddr, draft, posts, refresh])

  const connect = useCallback(async () => {
    setBusy(true)
    setErr(null)
    try {
      const addr = await connectWallet()
      await ensureContract(addr)
      setWalletAddr(addr)
      await refresh()
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Connect failed")
    } finally { setBusy(false) }
  }, [refresh])

  const feed = useMemo(() => posts.filter((p) => !p.parentId).sort(byNew), [posts])
  const post = useMemo(() => posts.find((p) => p.id === postId), [posts, postId])
  const replies = useMemo(() => posts.filter((p) => p.parentId === postId).sort(byOld), [posts, postId])
  const mine = useMemo(() => walletAddr ? posts.filter((p) => p.author === walletAddr).sort(byNew) : [], [posts, walletAddr])

  if (!walletAddr) {
    return React.createElement("div", { className: "landing" },
      React.createElement("div", { className: "landing-card" },
        React.createElement("h1", { className: "logo" }, "Zettel"),
        React.createElement("p", { className: "tagline" }, "Atomic notes on chain. Linked permanently."),
        err && React.createElement("p", { className: "error" }, err),
        React.createElement(Btn, { variant: "primary", onClick: () => void connect(), disabled: busy },
          busy ? "Connecting..." : "Connect Wallet"),
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
      React.createElement("span", { className: "header-title" }, "Zettel"),
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
    screen === "compose" && React.createElement(Editor, { draft, setDraft, onSubmit: () => void submit(0), busy, label: "Publish" }),
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
