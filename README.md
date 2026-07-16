# Zettel

On-chain zettelkasten. Atomic notes, permanently linked.

![Zettel landing screen](screenshot.png)

## What it is

Zettel is a single-file web app for writing short notes that live on Ethereum. Posts, replies, and likes are stored on chain. No platform can delete them.

Everything lives in one file: `app.tsx`.

## Run locally

```bash
npx tsx app.tsx
```

Open [http://localhost:5173](http://localhost:5173), connect your wallet, and start writing.

You need MetaMask (or another wallet) on **Ethereum mainnet**. The first post deploys your personal notebook contract. That step requires a one-time gas fee.

## Features

- Connect wallet and browse a shared feed
- Publish notes up to 500 characters
- Reply to posts and like notes
- View your on-chain profile

## Stack

- React 19 and viem, loaded from CDN inside `app.tsx`
- Embedded Solidity bytecode for a minimal note contract
- Built-in dev server (Node reads and serves the HTML block from the same file)

## License

MIT
