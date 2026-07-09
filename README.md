# Lux Tokenomics

**The single source of truth for LUX tokenomics and the complete Genesis NFT
history** — original Ethereum mint → C-Chain migration → today. Every contract,
every allocation, the full token-by-token mapping, backed by on-chain data.

> Numbers here are either (a) owner-provided canonical tokenomics, or (b) derived
> from live on-chain snapshots in [`data/`](data/) and verified by
> [`data/gen_migration_map.py`](data/gen_migration_map.py). Anything not yet
> confirmed is marked **⚠️ TO CONFIRM** — see [RECONCILIATION.md](RECONCILIATION.md).

---

## 1. LUX at a glance

| | |
|---|---|
| **Total supply** | **2,000,000,000,000 LUX (2 trillion)** |
| **Supply policy** | **Fixed — no more LUX can ever be minted** |
| **Deflation** | **Half (50%) of every transaction fee is burned** |
| **Genesis price** | **$0.0001 / LUX** |
| **FDV** | **$220,000,000** (owner-stated) — ⚠️ `$0.0001 × 2T = $200M`; see note below |
| **Primary chain** | Lux C-Chain, EVM chainId **96369** |
| **DAO / treasury wallet** | [`0x9011E888251AB053B7bD1cdB598Db4f9DEd94714`](https://explore.lux.network/address/0x9011E888251AB053B7bD1cdB598Db4f9DEd94714) |

> **⚠️ FDV / price reconciliation.** Genesis price $0.0001 × 2,000,000,000,000 LUX
> = **$200,000,000**, not $220M. The owner states FDV **$220M** (which implies a
> price of ~$0.00011, a 10% delta). Recorded verbatim; to be resolved with the
> owner. See [SUPPLY.md](SUPPLY.md#price--fdv).

---

## 2. Distribution (2,000,000,000,000 LUX)

The **percentage view** — how the 2T is split by program:

| Bucket | % | LUX | Lock | Notes |
|---|---:|---:|---|---|
| Lux DAO | 50% | 1,000,000,000,000 | Locked | Controlled by the DAO |
| Public Sale | 20% | 400,000,000,000 | Not-Locked | 369 daily auctions |
| Lux Team | 5% | 100,000,000,000 | Locked | 366-day cliff, then 10% / month |
| Lux Developers | 5% | 100,000,000,000 | Locked | 366-day cliff, then 10% / month |
| Network Treasury | 5% | 100,000,000,000 | Locked | Market-making liquidity |
| Network Rewards | 5% | 100,000,000,000 | Locked | Customer acquisition |
| Network Partners | 5% | 100,000,000,000 | Locked | Partner incentives |
| ~~Private Sale~~ | ~~5%~~ | ~~100,000,000,000~~ | — | **VOID — never happened** (see below) |
| **Total** | **100%** | **2,000,000,000,000** | | |

The **allocation view** — the same 2T regrouped the way it is actually held /
issued (the voided Private Sale 100B folds into the NFT collection bucket):

| Allocation | LUX | Composition |
|---|---:|---|
| Lux DAO | 1,000,000,000,000 | 50% |
| **Lux NFTs** | **500,000,000,000** | Public Sale 400B **+ voided Private Sale 100B** |
| Lux Team | 100,000,000,000 | |
| Lux Developers | 100,000,000,000 | |
| Network Treasury | 100,000,000,000 | |
| Network Rewards | 100,000,000,000 | |
| Network Partners | 100,000,000,000 | |
| **Total** | **2,000,000,000,000** | |

> **Private Sale (5% / 100B) is VOID.** No private sale ever happened; the 100B
> was never sold. It is documented as **retained by the DAO / unallocated,
> pending an owner reallocation decision**. In the allocation view it is folded
> into the 500B **Lux NFTs** bucket (400B Public Sale + 100B void). Full detail:
> [SUPPLY.md](SUPPLY.md#the-void-private-sale).

Full breakdown, vesting mechanics, burn, and price/FDV: **[SUPPLY.md](SUPPLY.md)**.

---

## 3. The Genesis NFT collection (the 500B "Lux NFTs" bucket)

The Lux NFTs bucket funds the collectible/validator collection and the
card + cash-reward programs. Two views:

**Product view** — Coins (collectibles) and Validators (a hierarchy):

| Family | Tiers | Notes |
|---|---|---|
| **Coins** | 10B×1, 1B×10, 100M×100, 10M×1,000, 1M×10,000 | 11,111 tokens, 50B LUX. Matches the ETH Drop "Wallet" tiers exactly. |
| **Validators** | Genesis 1B, Validator 100M, Mini 10M, Nano 1M, Mobile | Only the **100 Genesis Validators** are in the ETH genesis collection; the rest are designed but not yet issued. |
| **Pass (LUX)** | ⚠️ 100,000 count (bond TO CONFIRM) | Membership pass |
| **ATM / Card** | 1,000 authorized | The membership "Card" (~$20,000 → 200M LUX each, ⚠️ owner-stated) |

**500B allocation view** — how the sheet slices the bucket (this sums to 500B):

| Slice | LUX |
|---|---:|
| Coins | 50,000,000,000 |
| Validators + Pass | 11,111,000,000 |
| Credit Card (1,000 × 200M) | 200,000,000,000 |
| Cash Rewards | 238,889,000,000 |
| **Total** | **500,000,000,000** |

Full per-tier tables, card names/pricing, and the authorized-vs-minted counts:
**[NFT-COLLECTION.md](NFT-COLLECTION.md)**.

---

## 4. The migration in one line

**50 Ethereum Genesis NFTs (28 holders) were re-minted 1:1 to the same holders on
Lux C-Chain, then the 68 unminted Genesis Validators were completed to the DAO
treasury — the collection now holds exactly 100 Genesis Validators (#1–#100) +
18 Coins = 118 tokens on-chain.**

```
 Ethereum mainnet (2020→)                 Lux C-Chain 96369 (2026-07)
 ┌───────────────────────────┐           ┌────────────────────────────────┐
 │ Media  0x31e0F919…10311    │  re-mint  │ GenesisNFTs 0x004287…76C6      │
 │ (LUXNFT, Zora-fork)        │   1:1     │ (LRC721 "Lux Genesis")         │
 │                            │  ───────► │                                │
 │ 50 minted / 12,211 auth.   │  same     │ 118 minted                     │
 │ 32 Genesis Validators      │  holders  │  ├ 50 to original holders      │
 │ 18 Coins                   │           │  └ 68 Genesis Validators → DAO │
 │ 28 distinct holders        │           │     (completes authorized 100) │
 └───────────────────────────┘           └────────────────────────────────┘
```

- **Timeline & versions:** [migration/HISTORY.md](migration/HISTORY.md)
- **Token-by-token map (all 118):** [migration/MAPPING.md](migration/MAPPING.md)
  (generated from verified data → [`data/migration-map.json`](data/migration-map.json))

---

## 5. Contracts

| Chain | Contract | Address | Role |
|---|---|---|---|
| Ethereum | Media (LUXNFT) | `0x31e0F919C67ceDd2Bc3E294340Dc900735810311` | The NFT (Zora-fork) |
| Ethereum | Drop ("Gen 0") | `0x941E3B4fC883B1746E52814EB8574b85E6Fa4E66` | Authorized token types |
| Ethereum | App | `0x44A210571E135C6a536564e9B14dc4DA63f3D398` | Minter / orchestrator |
| Lux C-Chain 96369 | GenesisNFTs | `0x004287C47efc912FEc391979154454a8017A76C6` | LRC721 re-mint target |
| Lux C-Chain 96369 | DAO / treasury | `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714` | Owner, royalty, ~1.99T LUX |

- Ethereum source: [github.com/luxdefi/town](https://github.com/luxdefi/town) —
  `contracts/src/{Media,Drop,App}.sol`, `contracts/deploy/14_drop.ts`. Detail:
  [ethereum/ORIGINAL-CONTRACTS.md](ethereum/ORIGINAL-CONTRACTS.md).
- C-Chain source: `~/work/lux/standard/contracts/nft/GenesisNFTs.sol`. Detail:
  [cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md).

---

## 6. Where we are vs where we're going

[RECONCILIATION.md](RECONCILIATION.md) is the honest gap report: the DAO wallet
holds ~1.99T (target 1.00T), coins are 18/11,111 minted, validators are 100/100 ✓,
the Private Sale is void, and the C-Chain contract still needs a tier extension
(no 10B coin tier, no Card bond). Read it before quoting "current" numbers.

---

## Repository map

```
README.md              This file — overview + canonical tables + repo map.
LLM.md                 AI/context file: what lives where, how to regenerate data.
SUPPLY.md              The 2T distribution in depth: buckets, vesting, void, burn, price/FDV.
NFT-COLLECTION.md      Coins / Validators / Card / Pass — full authorized tables + pricing.
RECONCILIATION.md      Current on-chain state vs canonical target; the exact gaps.
ethereum/
  ORIGINAL-CONTRACTS.md  Media / Drop / App, the Zora-fork model, authorized vs minted.
  HOLDER-SNAPSHOT.md     Authoritative ETH holder snapshot (all 50 tokens, block 25443474).
cchain/
  GENESIS-NFTS.md        The C-Chain contract, current 118 state, tier gaps.
migration/
  HISTORY.md             ETH → today timeline + process/consensus versions.
  MAPPING.md             Token-by-token ETH→C-Chain→holder table (generated).
data/
  eth-authorized-supply.json   Live ETH Drop authorized vs minted per type.
  cchain-current.json          Live C-Chain per-token owner + name (118 tokens).
  migration-map.json           Generated: the verified ETH→C-Chain→holder map.
  gen_migration_map.py         Verifier + generator for the two files above.
```

## Regenerating the data

```bash
python3 data/gen_migration_map.py   # verifies every cross-check, (re)writes
                                     # data/migration-map.json + migration/MAPPING.md
```
The script **fails loudly** if any invariant breaks (owner mismatch, tier/bond
disagreement, validator serials not exactly #1–#100). See
[LLM.md](LLM.md) for how each fact is sourced.
