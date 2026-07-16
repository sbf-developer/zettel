# Zettel

On-chain zettelkasten. Atomic notes, permanently linked.

![Zettel landing screen](screenshot.png)

![Zettel feed screen](screenshot-feed.png)

## What it is

Zettel is a single-file web app for writing short notes that live on Ethereum. Posts, replies, and likes are stored on chain. No platform can delete them.

Everything lives in one file: `app.tsx`.

## Run locally

```bash
npx tsx app.tsx
```

Open [http://localhost:5173](http://localhost:5173), connect your wallet, and start writing.

You need MetaMask (or another wallet) on **Ethereum mainnet**. The first post deploys the shared Zettel feed contract. That step requires a one-time gas fee.

Before launch, deploy once, then put the resulting address and deployment block into `ZETTEL_FEED` and `ZETTEL_FROM_BLOCK` in `app.tsx` and publish that version. Those constants are what let a fresh frontend instance rediscover the same feed after local storage, the domain, or the original frontend disappears.

## Features

- Connect wallet and browse a shared feed
- Publish notes up to 500 UTF-8 bytes
- Reply to posts and like notes once per wallet per post
- View your on-chain profile

The embedded contract is immutable. Deploy a new feed after updating from the original build: older feeds did not enforce one-like-per-wallet and are intentionally treated as read-only by the current frontend.

## Stack

- React 19.2.7 and viem 2.55.2, pinned and loaded from CDN inside `app.tsx`
- Embedded Solidity bytecode for a minimal note contract
- Built-in dev server (Node reads and serves the HTML block from the same file)

## License

MIT
