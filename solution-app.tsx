import { useCallback, useEffect, useMemo, useState } from "react"

// ── config ──────────────────────────────────────────────────
const MAX = 500
const RPCS = ["https://ethereum.publicnode.com", "https://rpc.ankr.com/eth"]
const POLL_MS = 30_000

// ── types ───────────────────────────────────────────────────
type Address = `0x${string}`
type Screen = "feed" | "post" | "compose" | "profile"
type Post = {
  id: number
  author: Address
  content: string
  parentId: number
  timestamp: number
}

// ── helpers ─────────────────────────────────────────────────
const short = (a: Address) => `${a.slice(0, 6)}...${a.slice(-4)}`
const clean = (s: string) => s.trim().replace(/\u0000/g, "").slice(0, MAX)
const byNew = (a: Post, b: Post) => b.timestamp - a.timestamp
const byOld = (a: Post, b: Post) => a.timestamp - b.timestamp
const card: React.CSSProperties = { border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }

async function withRpc<T>(fn: (rpc: string) => Promise<T>): Promise<T> {
  for (const rpc of RPCS) try { return await fn(rpc) } catch { /* try next */ }
  throw new Error("RPC failed")
}

async function loadChain() {
  const [posts, likes] = await Promise.all([
    withRpc(async () => [] as Post[]),           // TODO: viem getLogs Post
    withRpc(async () => new Map<number, number>()), // TODO: viem getLogs Like
  ])
  return { posts, likes }
}

async function connectWallet(): Promise<Address> {
  // TODO: window.ethereum request accounts
  return "0x0000000000000000000000000000000000000000"
}

async function createPost(_w: Address, _text: string, _parent = 0) { /* TODO: writeContract */ }
async function likePost(_w: Address, _id: number) { /* TODO: writeContract */ }

// ── tiny UI pieces ──────────────────────────────────────────
function Btn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return <button onClick={onClick} disabled={disabled} style={{ padding: "8px 16px" }}>{children}</button>
}

function Editor({ draft, setDraft, onSubmit, busy, label }: {
  draft: string; setDraft: (v: string) => void; onSubmit: () => void; busy: boolean; label: string
}) {
  return (
    <>
      <textarea value={draft} onChange={(e) => setDraft(clean(e.target.value))} maxLength={MAX} rows={4} style={{ width: "100%" }} />
      <p>{draft.length}/{MAX}</p>
      <Btn onClick={onSubmit} disabled={busy}>{busy ? "Confirm in wallet..." : label}</Btn>
    </>
  )
}

function PostCard({ post, likes, onOpen, onLike, small }: {
  post: Post; likes: number; onOpen?: () => void; onLike?: () => void; small?: boolean
}) {
  return (
    <div style={card} onClick={onOpen}>
      <strong style={{ fontSize: small ? 14 : 16 }}>{short(post.author)}</strong>
      <span style={{ marginLeft: 8, color: "#888" }}>{new Date(post.timestamp * 1000).toLocaleString()}</span>
      <p>{post.content}</p>
      <div onClick={(e) => e.stopPropagation()}>
        <Btn onClick={onLike}>♥ {likes}</Btn>
      </div>
    </div>
  )
}

// ── app ─────────────────────────────────────────────────────
export default function App() {
  const [wallet, setWallet] = useState<Address | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [likes, setLikes] = useState<Map<number, number>>(new Map())
  const [screen, setScreen] = useState<Screen>("feed")
  const [postId, setPostId] = useState<number | null>(null)
  const [draft, setDraft] = useState("")
  const [err, setErr] = useState<string | null>(null)
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
    if (!wallet) return
    const text = clean(draft)
    if (!text) return setErr("Post cannot be empty")
    if (parentId && !posts.some((p) => p.id === parentId)) return setErr("Parent not found")
    setBusy(true)
    try {
      await createPost(wallet, text, parentId)
      setDraft("")
      if (!parentId) setScreen("feed")
      await refresh()
    } catch { setErr("Transaction failed") }
    finally { setBusy(false) }
  }, [wallet, draft, posts, refresh])

  const feed = useMemo(() => posts.filter((p) => !p.parentId).sort(byNew), [posts])
  const post = useMemo(() => posts.find((p) => p.id === postId), [posts, postId])
  const replies = useMemo(() => posts.filter((p) => p.parentId === postId).sort(byOld), [posts, postId])
  const mine = useMemo(() => wallet ? posts.filter((p) => p.author === wallet).sort(byNew) : [], [posts, wallet])

  if (!wallet) {
    return (
      <main style={{ maxWidth: 480, margin: "40px auto", textAlign: "center" }}>
        <h1>Free Speech Feed</h1>
        <p>On-chain messages. No platform can delete them.</p>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        <Btn onClick={async () => { try { setWallet(await connectWallet()) } catch { setErr("Connect failed") } }}>
          Connect Wallet
        </Btn>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <strong>Free Speech Feed</strong>
        <span>{short(wallet)} <Btn onClick={() => { setWallet(null); setScreen("feed") }}>Disconnect</Btn></span>
      </header>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Btn onClick={() => setScreen("feed")}>Feed</Btn>
        <Btn onClick={() => setScreen("compose")}>New Post</Btn>
        <Btn onClick={() => setScreen("profile")}>Profile</Btn>
      </nav>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {screen === "feed" && feed.map((p) => (
        <PostCard key={p.id} post={p} likes={likes.get(p.id) ?? 0}
          onOpen={() => { setPostId(p.id); setScreen("post") }}
          onLike={() => void likePost(wallet, p.id).then(refresh)} />
      ))}

      {screen === "post" && post && (
        <section>
          <Btn onClick={() => setScreen("feed")}>← Back</Btn>
          <PostCard post={post} likes={likes.get(post.id) ?? 0} onLike={() => void likePost(wallet, post.id).then(refresh)} />
          {replies.map((r) => <PostCard key={r.id} post={r} likes={likes.get(r.id) ?? 0} small />)}
          <Editor draft={draft} setDraft={setDraft} onSubmit={() => void submit(post.id)} busy={busy} label="Reply" />
        </section>
      )}

      {screen === "compose" && (
        <Editor draft={draft} setDraft={setDraft} onSubmit={() => void submit(0)} busy={busy} label="Publish" />
      )}

      {screen === "profile" && (
        <section>
          <h2>{short(wallet)}</h2>
          <p>{mine.length} posts</p>
          {mine.map((p) => <PostCard key={p.id} post={p} likes={likes.get(p.id) ?? 0} small />)}
        </section>
      )}
    </main>
  )
}