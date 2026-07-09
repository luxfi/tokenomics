# Reconciliation — On-Chain Today vs Canonical Target

The honest gap report: what the chain holds **now** versus the **canonical 2T
tokenomics**, and the exact deltas required to converge. Read this before quoting
any "current" number — the canonical tables in [SUPPLY.md](SUPPLY.md) are the
*target*, not the present on-chain state.

Every ⚠️ here is an open item for the owner to resolve.

---

## 1. Supply-level reconciliation

Total supply is correct and fixed: **2,000,000,000,000 LUX** (2T), reached after
the Dec-2025 fork burned 100B (2.1T → 2T). The open gap is **distribution**, not
supply.

| Bucket (target) | Target LUX | Held where today | Gap |
|---|---:|---|---:|
| Lux DAO | 1,000,000,000,000 | DAO wallet `0x9011` | — (holds far more, see below) |
| Lux NFTs | 500,000,000,000 | notional; LUX still in DAO wallet | move ~500B |
| Team / Devs / Treasury / Rewards / Partners | 500,000,000,000 | notional; LUX still in DAO wallet | move ~500B |

**The DAO treasury wallet
[`0x9011E888251AB053B7bD1cdB598Db4f9DEd94714`](https://explore.lux.network/address/0x9011E888251AB053B7bD1cdB598Db4f9DEd94714)
holds ~1,990,000,000,000 LUX (≈1.99T) today** — essentially the whole supply. The
canonical **Lux DAO** bucket is **1.00T**, so **~990B must be redistributed** out
of the treasury into the other buckets (Public Sale, vesting, program wallets, NFT
bonds).

```
 DAO wallet 0x9011 today:  ~1.99T  ████████████████████░  (of 2T)
 Canonical "Lux DAO":       1.00T  ██████████░░░░░░░░░░░
 To redistribute:          ~0.99T  ░░░░░░░░░░██████████   → the other buckets
```

- **`1.99T − 1.00T ≈ 990B` to move.** (Owner cited **~995B**; the two agree to
  within the precision of the live balance.)
- **⚠️ TO CONFIRM — exact treasury balance.** The redistribution figure depends on
  the precise live balance of `0x9011` (and how much LUX is already circulating
  outside it — on today's figures, only ~10B). Snapshot the exact balance to fix
  the number.

> **Why the NFT bonds don't show as "moved."** The GenesisNFTs contract records
> `totalLuxLocked` when it mints, but **locks no LUX physically** — the backing
> LUX stays in the DAO wallet. So the 500B NFT allocation is currently *notional*.
> Physically funding it (escrowing bonds, standing up the sale/vesting/program
> contracts) is the convergence work below.

---

## 2. NFT collection minting status

| Family | Minted | Authorized / target | Status |
|---|---:|---:|---|
| **Genesis Validators** | **100** | 100 | ✅ **complete** (#1–#100) |
| Coins | 18 | 11,111 | 🔸 0.16% minted (11,093 to go) |
| ATM / Card | 0 | 1,000 | 🔸 none minted |
| Pass (LUX) | 0 | ⚠️ ~100,000 | 🔸 not in contract |
| Validator hierarchy (Validator/Mini/Nano/Mobile) | 0 | designed | 🔸 not authorized on ETH; design-only |

- **Validators: 100 / 100 ✅** — the only fully-complete family.
- **Coins: 18 / 11,111** — the 18 original mints migrated; the remaining **11,093**
  are authorized-but-unminted, pending an owner-gated mint.
- **ATM/Card: 0 / 1,000** — none minted on either chain.
- **12,093 authorized-but-unminted total** (11,093 Coins + 1,000 ATM/Card).

### Bonds recorded vs if fully minted

| | Recorded now (118 tokens) | If all authorized minted |
|---|---:|---:|
| Genesis Validators | 100,000,000,000 (100 × 1B) | 100,000,000,000 |
| Coins | 2,583,000,000 (18 tokens) | 50,000,000,000 (11,111) |
| ATM / Card | 0 | 200,000,000,000 (1,000 × 200M ⚠️) |
| **totalLuxLocked** | **102,583,000,000** | **350,000,000,000** |

> The "if fully minted" 350B is the product-view bond sum for the three on-chain
> families. Its relationship to the **500B allocation** (which also budgets Cash
> Rewards 238.889B and the Pass, and only 11.111B to "Validators + Pass") is the
> **central unreconciled item** — see [§4](#4-open-reconciliation-items) and
> [NFT-COLLECTION.md](NFT-COLLECTION.md#6-open-reconciliations).

---

## 3. Private Sale — void {#private-sale-void}

- Canonical bucket 8, **5% / 100,000,000,000 LUX**: **never happened.** No
  private-sale tokens were sold; there are no private investors.
- **On-chain effect: none** — nothing was ever distributed for it, so there is no
  allocation to unwind. The 100B is simply part of the ~1.99T still in the DAO
  wallet.
- **⚠️ Owner decision pending:** whether the 100B (a) stays with the DAO, (b)
  enlarges the public NFT allocation (the allocation view folds it into the 500B
  Lux NFTs bucket), or (c) is redirected. Until decided, treat as DAO-retained.

---

## 4. Open reconciliation items {#open-items}

Everything the owner needs to resolve, in one place:

| # | Item | Where | Resolution needed |
|--:|---|---|---|
| 1 | **FDV $220M vs $0.0001×2T = $200M** (10% delta) | [SUPPLY.md](SUPPLY.md#price--fdv) | Confirm canonical price (~$0.00011?) or FDV basis |
| 2 | **Exact DAO balance** → exact redistribution (~990B vs owner's ~995B) | §1 | Snapshot `0x9011` balance |
| 3 | **Private Sale 100B** disposition | §3 | Owner decision: DAO-retain / to-NFTs / redirect |
| 4 | **Validators+Pass = 11.111B** internal split | [NFT-COLLECTION.md](NFT-COLLECTION.md#6-open-reconciliations) | Split between 100 Genesis Validators and 100,000 Pass |
| 5 | **Genesis-Validator bonds 100B vs sheet's 11.111B** for Validators+Pass | §2, NFT §6 | Confirm intended relationship (on-chain bond vs cash allocation) |
| 6 | **Pass (LUX) bond** per unit | NFT §1c | Provide bond |
| 7 | **ATM/Card $20k → 200M LUX** peg | NFT §1d | Confirm peg (reconciles to 200B "Credit Card" slice) |
| 8 | **Mobile Validator count** + mixed one-time/per-year pricing | NFT §1b | Provide count; confirm pricing basis |
| 9 | **Burn-rate "1.1"** sheet value (50%-of-fees is confirmed) | [SUPPLY.md](SUPPLY.md#burn--the-deflation-engine) | Provide full sheet value |

---

## 5. Contract gaps {#contract-gaps}

`GenesisNFTs.sol` cannot yet represent the full collection (additive fixes; the
existing 118 tokens are undisturbed since minting locks nothing physical):

- **No 10B Coin tier** — the authorized Wallet-10B coin has no representable tier.
- **No Card bond** — `NFTType.CARD` exists but `_getLuxForTier` has no Card amount.
- **No sub-Genesis validator hierarchy / no Pass type.**

Detail and rationale: [cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md#gaps).

---

## 6. The path to converge

To move from **today** to the **canonical target**:

1. **Public Sale (400B):** stand up the 369-daily-auction sale contract; move 400B
   from the DAO wallet into it.
2. **Team + Developers (100B + 100B):** deploy 366-day-cliff / 10%-per-month
   vesting; move 200B in.
3. **Network Treasury + Rewards + Partners (100B each):** fund the three program
   wallets; move 300B in.
4. **Private Sale (100B):** apply the owner's [§3](#private-sale-void) decision.
5. **NFT collection:** extend `GenesisNFTs` ([§5](#contract-gaps)); mint the
   remaining 12,093 authorized tokens under owner gate; escrow bonds if bonds are
   to be physically backed.
6. **DAO endpoint:** after 1–5, the DAO wallet should hold **1.00T** (the canonical
   Lux DAO bucket) — down from ~1.99T today.

Net treasury outflow to converge ≈ **990B** (⚠️ exact per item 2 above).

---

*Current-state figures derive from
[`data/cchain-current.json`](data/cchain-current.json),
[`data/eth-authorized-supply.json`](data/eth-authorized-supply.json), and
[`data/migration-map.json`](data/migration-map.json) (generated + verified). The
~1.99T treasury balance is from the mainnet-recovery record and should be
re-snapshotted for an exact figure.*
