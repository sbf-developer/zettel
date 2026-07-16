import { useCallback, useEffect, useMemo, useState } from "react"

// --- config ---
const MAX = 500 
const RPCS = ["https://ethereum.publicnode.com", "https://rpc.ankr.com/eth"]
const POLL_MS = 30_000

// --- types ---
type Address = `0x${string}`
type Screen = "feed" | "post" | "compose" | "profile" |
type Post = {
    id: number
    author: Address
    content: string
    parentId: number
    timestamp: number
}

// --- helpers ---
const short = (a: Address): string => `${a.slice(0, 6)}...${a.slice(-4)}`
const clean = (s: string) => s.trim().replace(/\u0000/g, "").slice(0, MAX)
const byNew = (a: Post, b: Post) => b.timestamp - a.timestamp
const byOld = (a: Post, b: Post) => a.timestamp - b.timestamp
const card: React.CSSProperties = { border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }

async function loadchain() {
    const [posts, likes] = await Promise.all([
        withRpc(async () => [] as Post[]),         // 1. get posts from chain
        withRpc(async () => new Map<number, number>()),
    ]) 
    return { posts, likes } // 3. return posts and likes 
}

async function connectWallet(): Promise<Address> {
    // window.ethereum request accounts
    return "0x0000000000000000000000000000000000000000"
}

async function createPost(_w: Address, _text: string, _parent = 0) { /* write contract */}
