# The Lux Genesis NFT Collection

The **500,000,000,000 LUX (500B)** "Lux NFTs" allocation funds two things: the
collectible/validator **NFT collection** (Coins + Validators + Pass + Card) and
the **card + cash-reward programs**. This document is the full tier reference.

Two independent views are presented and kept distinct on purpose:

- **[§1 Product view](#1-product-view--tiers-bonds-and-pricing)** — the tiers,
  their LUX bonds, card names, and prices (design/pricing).
- **[§5 Allocation view](#5-500b-allocation-view-the-sheet-reconciliation)** —
  how the 500B is actually sliced (this is the one that sums to 500B).

They do **not** trivially reconcile to each other; where they pull apart it is
flagged **⚠️ TO CONFIRM**.

---

## 1. Product view — tiers, bonds, and pricing

### 1a. Coins (collectibles)

Coins are pure collectibles, each backed by a permanently-bonded LUX amount. The
five tiers and counts match the Ethereum Drop "Wallet" types **exactly**:

| Coin tier | LUX bond each | Count | Subtotal LUX | ETH Drop type |
|---|---:|---:|---:|---|
| 10B | 10,000,000,000 | 1 | 10,000,000,000 | Wallet 10B Lux |
| 1B | 1,000,000,000 | 10 | 10,000,000,000 | Wallet 1B Lux |
| 100M | 100,000,000 | 100 | 10,000,000,000 | Wallet 100M Lux |
| 10M | 10,000,000 | 1,000 | 10,000,000,000 | Wallet 10M Lux |
| 1M | 1,000,000 | 10,000 | 10,000,000,000 | Wallet 1M Lux |
| **Total** | | **11,111** | **50,000,000,000** | |

- Token count: `1 + 10 + 100 + 1,000 + 10,000 = 11,111`. ✓
- LUX: each tier contributes exactly 10B, five tiers → **50B**. ✓
- This 50B is the "Coins" line in the 500B allocation ([§5](#5-500b-allocation-view-the-sheet-reconciliation)).

### 1b. Validators (a hierarchy)

Validators are staking NFTs. Each carries a LUX bond and a matching membership
**Card**. Pricing has a "list" price, a discounted "launch" price (a one-time or
per-year figure), and a scarcity ("Limited") ratio.

| Validator tier | LUX bond | Count | Card name | List | Launch (self / referred) | Basis | Limited |
|---|---:|---:|---|---:|---|---|---|
| **Genesis Validator** | 1,000,000,000 | 100 | **Sovereign** | $1M | $50k / $25k | one-time | 1 / 1,000 |
| **Validator** | 100,000,000 | 1,000 | **Founder** | $100K | $5k / $2.5k | one-time | 1 / 10,000 |
| **Mini Validator** | 10,000,000 | 10,000 | **Elite** | $10K | $1k / $500 | per year | 1 / 100,000 |
| **Nano Validator** | 1,000,000 | 100,000 | **Black** | $1K | $500 / $250 | per year | — |
| **Mobile Validator** | 1,000,000 | ⚠️ TBD | — | $1K | — | — | — |

> **⚠️ Only the 100 Genesis Validators exist in the ETH genesis collection.**
> The Ethereum Drop authorized **100 Genesis Validators and nothing below them**.
> The Validator / Mini / Nano / Mobile hierarchy is **tokenomics-designed but not
> issued** — it is not part of the migrated genesis collection and has no
> on-chain tokens yet. Counts/prices above are the design spec.
>
> **⚠️ TO CONFIRM:** the **Mobile Validator** count is unspecified; and the mixed
> pricing basis (Genesis/Validator "one-time" vs Mini/Nano "per year") should be
> confirmed as intended.

Note the naming collision to keep straight: **"Validator" is both** (a) a
validator *tier* (100M bond) **and** (b) the on-chain contract's name for a
*Coin* at the 100M tier ("VALIDATOR COIN"). See
[cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md#tier-naming).

### 1c. Pass (LUX)

| Item | Count | Bond |
|---|---:|---|
| Pass (LUX) | ⚠️ 100,000 | ⚠️ TO CONFIRM |

A membership pass. **⚠️ TO CONFIRM:** the LUX bond per Pass is not in the source
data. Count is owner-stated at 100,000.

### 1d. ATM / Card

| Item | Authorized | Minted (ETH) | Price each | LUX each | Subtotal |
|---|---:|---:|---:|---:|---:|
| ATM / Card | 1,000 | 0 | ~$20,000 | 200,000,000 | 200,000,000,000 |

The **ATM** type in the Ethereum Drop is the membership **"Card."** Owner-stated
pricing: ~**$20,000** each, which at the $0.0001 genesis price equals
**200,000,000 LUX** each → `1,000 × 200M = 200B LUX`.

> **⚠️ TO CONFIRM:** the **$20,000 / 200M-LUX** peg is owner-stated. It does,
> however, reconcile cleanly with the sheet's "Credit Card = 200B" slice
> ([§5](#5-500b-allocation-view-the-sheet-reconciliation)) — a supporting signal,
> but the peg itself and its relationship to the Card *tiers* above
> (Sovereign / Founder / Elite / Black) should be confirmed.

---

## 2. Authorized supply (Ethereum Drop "Gen 0")

Live snapshot of the Ethereum Drop contract
`0x941E3B4fC883B1746E52814EB8574b85E6Fa4E66`
([`data/eth-authorized-supply.json`](data/eth-authorized-supply.json)):

| Drop token type | Authorized | Minted | Unminted |
|---|---:|---:|---:|
| Validator (Genesis Validator, 1B bond) | 100 | 32 | 68 |
| Wallet 10B Lux | 1 | 0 | 1 |
| Wallet 1B Lux | 10 | 2 | 8 |
| Wallet 100M Lux | 100 | 5 | 95 |
| Wallet 10M Lux | 1,000 | 8 | 992 |
| Wallet 1M Lux | 10,000 | 3 | 9,997 |
| ATM (Card) | 1,000 | 0 | 1,000 |
| **Total** | **12,211** | **50** | **12,161** |

- **50 of 12,211 authorized were ever minted on Ethereum** (0.41%).
- The 68 unminted Validators were later completed on C-Chain to the DAO treasury
  (see [migration/MAPPING.md](migration/MAPPING.md)); after that,
  **12,093 authorized-but-unminted remain** (11,093 Coins + 1,000 ATM/Card).

### Authorized LUX bonds

| Family | Authorized count | LUX bond total |
|---|---:|---:|
| Genesis Validators (100 × 1B) | 100 | 100,000,000,000 |
| Coins (11,111, see §1a) | 11,111 | 50,000,000,000 |
| ATM / Card (1,000 × 200M) | 1,000 | 200,000,000,000 |
| **Subtotal** | **12,211** | **350,000,000,000** |

> This 350B is the sum of the *product-view* bonds for the genesis collection's
> three on-chain families. It is **not** the same as the 500B allocation — the
> 500B additionally funds Cash Rewards (238.889B) and the Pass, and its
> "Validators + Pass" line budgets far less than the 100B of Genesis-Validator
> bonds. The relationship between "authorized bonds" and the "sheet allocation"
> is the central open reconciliation — see [§6](#6-open-reconciliations).

---

## 3. Coins — denomination detail (what actually minted)

Of the 11,111 authorized coins, **18 minted** (all on Ethereum, then migrated
1:1 to C-Chain). Denomination histogram (identical on both chains — verified):

| Coin tier | LUX bond | Authorized | Minted | C-Chain name |
|---|---:|---:|---:|---|
| 10B | 10,000,000,000 | 1 | 0 | *(no contract tier yet — see gap)* |
| 1B (GENESIS) | 1,000,000,000 | 10 | 2 | GENESIS COIN |
| 100M (VALIDATOR) | 100,000,000 | 100 | 5 | VALIDATOR COIN |
| 10M (MINI) | 10,000,000 | 1,000 | 8 | MINI COIN |
| 1M (NANO) | 1,000,000 | 10,000 | 3 | NANO COIN |
| **Total** | | **11,111** | **18** | |

Minted-coin bond total: `2×1B + 5×100M + 8×10M + 3×1M` =
`2,000,000,000 + 500,000,000 + 80,000,000 + 3,000,000` = **2,583,000,000 LUX**.

---

## 4. Validators — status

| | Count | Bond each | Bond total |
|---|---:|---:|---:|
| Genesis Validators authorized | 100 | 1,000,000,000 | 100,000,000,000 |
| — minted to original holders (ETH → C-Chain) | 32 | | 32,000,000,000 |
| — completed to DAO treasury (2026-07-09) | 68 | | 68,000,000,000 |
| **On-chain today** | **100** | | **100,000,000,000** |

The Genesis Validator tier is **100/100 complete** on C-Chain. Bonds are
**permanent** (never unlockable); staking rewards flow to the current holder;
the NFT is transferable and future rewards follow the token. See
[cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md).

---

## 5. 500B allocation view (the sheet reconciliation)

The tokenomics sheet slices the 500B "Lux NFTs" bucket four ways. **This is the
view that sums to exactly 500B:**

| Slice | LUX | Note |
|---|---:|---|
| Coins | 50,000,000,000 | = §1a exactly (11,111 coins) |
| Validators + Pass | 11,111,000,000 | combined; internal split ⚠️ |
| Credit Card | 200,000,000,000 | = 1,000 × 200M (reconciles with §1d) |
| Cash Rewards | 238,889,000,000 | customer cash-back program |
| **Total** | **500,000,000,000** | ✓ |

Arithmetic: `50,000,000,000 + 11,111,000,000 + 200,000,000,000 + 238,889,000,000
= 500,000,000,000`. ✓

The owner's summarized reconciliation groups these as:

- **Coins + Validators + Pass = 61,111,000,000 LUX** (`50B + 11.111B`), and
- **Credit Card + Cash Rewards = 438,889,000,000 LUX** (`200B + 238.889B`),
- summing to **500,000,000,000 LUX**. ✓

> **The bulk of the 500B funds the card + cash-reward programs (438.889B), not
> the collectible bonds.** The genesis-collection collectible slice (Coins +
> Validators + Pass) is only 61.111B.

---

## 6. Open reconciliations

| # | Item | Status |
|--:|---|---|
| 1 | **Validators + Pass = 11.111B** — how it splits between the 100 Genesis Validators and 100,000 Pass | **⚠️ TO CONFIRM** (not determinable from data) |
| 2 | **Genesis-Validator bonds** = 100 × 1B = **100B** on-chain, yet the sheet budgets only 11.111B to "Validators + Pass" | **⚠️ UNRECONCILED** — the on-chain permanent bond vs the sheet's cash allocation are different quantities; owner to confirm intended relationship |
| 3 | **Pass bond** per unit | **⚠️ TO CONFIRM** |
| 4 | **ATM/Card = $20k → 200M LUX** peg | ⚠️ owner-stated; reconciles to the 200B "Credit Card" slice |
| 5 | **Mobile Validator** count; mixed one-time/per-year pricing basis | **⚠️ TO CONFIRM** |
| 6 | **10B Coin tier + Card bond** not representable in current contract | contract extension needed — see [cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md#gaps) |

See [RECONCILIATION.md](RECONCILIATION.md) for the full current-vs-target gap
report.
