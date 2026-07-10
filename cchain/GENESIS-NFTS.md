# Lux C-Chain — GenesisNFTs

The migration target: the **GenesisNFTs** contract on **Lux C-Chain (EVM chainId
96369)**. It re-mints the Ethereum lux.town collection as an **LRC721** token with
permanently-locked LUX bonds and holder-follows staking rewards.

- Address: **`0x004287C47efc912FEc391979154454a8017A76C6`**
- Name / symbol: **"Lux Genesis" / GENESIS**
- Owner + royalty receiver: **`0x9011E888251AB053B7bD1cdB598Db4f9DEd94714`** (DAO)
- Source: `~/work/lux/standard/contracts/nft/GenesisNFTs.sol`

---

## 1. Contract model

`GenesisNFTs is LRC721, Ownable, ReentrancyGuard` — a Lux LRC721 (ERC-721
equivalent) preserving the Zora-style content/metadata URIs and marketplace
integration from the Ethereum Media contract, plus permanent LUX locking.

Key constants:

| Constant | Value |
|---|---|
| `LUX_LOCKED_PER_NFT` | `1_000_000_000 ether` (1B — the Genesis-Validator bond) |
| `DAO_TREASURY` | `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714` (sale proceeds, owner) |
| `ETH_GENESIS_CONTRACT` | `0x31e0F919C67ceDd2Bc3E294340Dc900735810311` (Ethereum Media) |
| `totalLuxLocked` | running sum of all bonded LUX (accounting) |

Each token's `TokenMeta` records `nftType`, `tier`, `name`, **`originTokenId`**
(the Ethereum tokenId), `luxLocked`, and timestamp.

> **Permanent locking.** Per the contract header: each Genesis NFT has LUX
> "permanently locked … can NEVER be unlocked." Staking rewards flow to the
> current holder; transferring the NFT transfers future rewards. **Minting does
> not move LUX** — it records `luxLocked` / `totalLuxLocked` as an accounting
> figure; the physical LUX remains in the DAO treasury wallet (see
> [RECONCILIATION.md](../RECONCILIATION.md)).

### Enums

```solidity
enum NFTType { VALIDATOR, CARD, COIN }      // what the token is
enum Tier    { GENESIS, VALIDATOR, MINI, NANO }  // its bond size
```

`_getLuxForTier(tier)` — the **only** bond source in the contract:

| Tier | Bond | Comment in source |
|---|---:|---|
| `GENESIS` | 1,000,000,000 LUX | `$1M - 1B LUX` |
| `VALIDATOR` | 100,000,000 LUX | `$100K - 100M LUX` |
| `MINI` | 10,000,000 LUX | `$10K - 10M LUX` |
| `NANO` | 1,000,000 LUX | `$1K - 1M LUX` |

---

## 2. Tier naming

The `Tier` enum is reused for **both** NFTType.COIN and NFTType.VALIDATOR, which
is why the on-chain token **names** cross the two vocabularies. Read a name as
`<TIER> <TYPE> #<serial>`:

| On-chain name | NFTType | Tier | Bond |
|---|---|---|---:|
| `GENESIS VALIDATOR #n` | VALIDATOR | GENESIS | 1,000,000,000 |
| `GENESIS COIN #n` | COIN | GENESIS | 1,000,000,000 |
| `VALIDATOR COIN #n` | COIN | VALIDATOR | 100,000,000 |
| `MINI COIN #n` | COIN | MINI | 10,000,000 |
| `NANO COIN #n` | COIN | NANO | 1,000,000 |

> **⚠️ Counting trap.** `"VALIDATOR COIN"` **contains the substring
> "validator" but is a Coin.** A naive substring match over-counts validators
> and under-counts coins — this is exactly why
> [`data/cchain-current.json`](../data/cchain-current.json)'s embedded `summary`
> is wrong (it reports 104 validators / 14 coins). **Classify by the full class**:
> a name of `GENESIS VALIDATOR` (or treasury `Lux Genesis Validator`) is a
> validator; **anything ending in `COIN` is a coin.** The corrected split is
> **100 validators + 18 coins** — enforced by
> [`data/gen_migration_map.py`](../data/gen_migration_map.py).

---

## 3. Current on-chain state (118 tokens)

> **⚠️ SUPERSEDED (2026-07-10 genesis reset).** This 118-token state was **wiped**
> when mainnet 96369 was reset to a fresh genesis on 2026-07-10 (recovery from a
> `warpConfig` VM-init bug). The contract `0x004287C4…` and its 118 tokens are
> **gone from chain**; this table is the **re-mint target**, not live state. The
> treasury 2T (genesis alloc) survived. Re-mint is **deferred to after v1.36**.
> See [migration/HISTORY.md](../migration/HISTORY.md) (2026-07-10 entry).

From [`data/cchain-current.json`](../data/cchain-current.json), corrected:

| | Validators | Coins | Total |
|---|---:|---:|---:|
| Held by original holders (people) | 32 | 18 | 50 |
| Held by DAO treasury `0x9011` | 68 | 0 | 68 |
| **Total minted** | **100** | **18** | **118** |

- **100 Genesis Validators** — serial-numbered exactly **#1–#100** (verified: no
  gaps, no duplicates). 32 held by the 28 original wallets; 68 held by the DAO
  treasury (the completion of the authorized 100).
- **18 Coins** — all held by original holders: 2× GENESIS(1B), 5× VALIDATOR(100M),
  8× MINI(10M), 3× NANO(1M).

### Recorded LUX locked

| Family | Count | Bond each | Bonded LUX |
|---|---:|---:|---:|
| Genesis Validators | 100 | 1,000,000,000 | 100,000,000,000 |
| Coins | 18 | (mixed) | 2,583,000,000 |
| **totalLuxLocked** | **118** | | **102,583,000,000** |

Coin bonds: `2×1B + 5×100M + 8×10M + 3×1M = 2,583,000,000 LUX`.

Token id 49 (Ethereum #50) had a `null` name in the export snapshot; its art /
metadata were restored on-chain during the 2026-07-09 pass (it is a Genesis
Validator by `originTokenId`). See [migration/HISTORY.md](../migration/HISTORY.md).

---

## 4. Gaps — the contract must be extended {#gaps}

The current `GenesisNFTs` tier model **cannot represent the full designed
collection**:

| Missing | Why it matters |
|---|---|
| **No 10B Coin tier** | The `Tier` enum tops out at GENESIS (1B). The authorized **Wallet 10B Lux** coin (1 authorized, 0 minted) has **no representable tier**. |
| **No Card bond** | `NFTType.CARD` exists, but `_getLuxForTier` has no Card amount — the ATM/Card (1,000 authorized, ~200M LUX each) can't be bonded. |
| **No sub-Genesis validator hierarchy** | The designed Validator (100M) / Mini (10M) / Nano (1M) / Mobile **validators** would collide with the COIN tier names; issuing them needs a distinct type/tier axis. |
| **No Pass type** | The Pass (LUX) has no NFTType. |

To mint the remaining **12,093 authorized-but-unminted** tokens (11,093 coins +
1,000 ATM/Card) and the designed validator hierarchy, the contract needs a tier
extension. Because minting only records `totalLuxLocked` (locks nothing
physically), the extension is additive and does not disturb the existing 118
tokens. Tracked in [RECONCILIATION.md](../RECONCILIATION.md#contract-gaps).

---

## 5. Provenance

- Contract logic: `~/work/lux/standard/contracts/nft/GenesisNFTs.sol`
  (`enum Tier`, `_getLuxForTier`, `LUX_LOCKED_PER_NFT`, `DAO_TREASURY`,
  `ETH_GENESIS_CONTRACT`, `originTokenId`).
- Live state: [`data/cchain-current.json`](../data/cchain-current.json).
- Corrected classification + serial verification:
  [`data/gen_migration_map.py`](../data/gen_migration_map.py).
