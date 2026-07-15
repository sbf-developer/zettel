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
