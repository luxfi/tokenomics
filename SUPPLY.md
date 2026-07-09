# LUX Supply & Distribution

Canonical, owner-provided tokenomics for the LUX token. This document is the
authoritative statement of the 2T supply, its distribution, vesting, the voided
private sale, the burn mechanism, and price / FDV.

---

## 1. The headline numbers

| Property | Value |
|---|---|
| **Total supply** | **2,000,000,000,000 LUX** (2 trillion) |
| **Supply policy** | **Fixed and final** — no minting function beyond genesis; **no more LUX can ever be created** |
| **Decimals** | 18 (EVM native) |
| **Deflationary mechanism** | **50% of every transaction fee is burned** → supply is monotonically non-increasing |
| **Genesis price** | **$0.0001 / LUX** |
| **FDV (owner-stated)** | **$220,000,000** — ⚠️ see [Price & FDV](#price--fdv) |

Because supply is fixed and half of all fees are burned, LUX is **deflationary by
construction**: the only supply change possible after genesis is *downward*, via
the fee burn.

---

## 2. Distribution — percentage view

The 2,000,000,000,000 LUX is allocated across eight buckets (one of which — the
Private Sale — is void):

| # | Bucket | % | LUX | Lock status | Vesting / purpose |
|--:|---|---:|---:|---|---|
| 1 | Lux DAO | 50% | 1,000,000,000,000 | **Locked** | Controlled by the DAO |
| 2 | Public Sale | 20% | 400,000,000,000 | Not-Locked | Sold via 369 daily auctions |
| 3 | Lux Team | 5% | 100,000,000,000 | **Locked** | 366-day cliff, then 10% / month |
| 4 | Lux Developers | 5% | 100,000,000,000 | **Locked** | 366-day cliff, then 10% / month |
| 5 | Network Treasury | 5% | 100,000,000,000 | **Locked** | Market-making liquidity |
| 6 | Network Rewards | 5% | 100,000,000,000 | **Locked** | Customer acquisition |
| 7 | Network Partners | 5% | 100,000,000,000 | **Locked** | Partner incentives |
| 8 | ~~Private Sale~~ | ~~5%~~ | ~~100,000,000,000~~ | — | **VOID — never happened** |
| | **Total** | **100%** | **2,000,000,000,000** | | |

Arithmetic check: `1,000B + 400B + 6 × 100B = 1,000B + 400B + 600B = 2,000B`. ✓

---

## 3. Distribution — allocation view

The same 2T, regrouped as it is actually held and issued. The **voided Private
Sale (100B)** is folded into the NFT collection bucket, and the **Public Sale
(400B)** funds the NFT collection as well — together the **500B "Lux NFTs"**
allocation:

| Allocation | LUX | Derivation |
|---|---:|---|
| Lux DAO | 1,000,000,000,000 | 50% |
| **Lux NFTs** | **500,000,000,000** | Public Sale **400B** + void Private Sale **100B** |
| Lux Team | 100,000,000,000 | 5% |
| Lux Developers | 100,000,000,000 | 5% |
| Network Treasury | 100,000,000,000 | 5% |
| Network Rewards | 100,000,000,000 | 5% |
| Network Partners | 100,000,000,000 | 5% |
| **Total** | **2,000,000,000,000** | |

Arithmetic check: `1,000B + 500B + 5 × 100B = 1,000B + 500B + 500B = 2,000B`. ✓

The 500B **Lux NFTs** bucket is broken down tier-by-tier in
[NFT-COLLECTION.md](NFT-COLLECTION.md).

---

## 4. The void Private Sale

**A private sale was planned (5% / 100,000,000,000 LUX) but never happened.** No
private-sale tokens were ever sold to anyone.

Documented treatment:

- The 100B is **not distributed to any private investor** — there are none.
- It is **retained by the DAO / unallocated**, pending an explicit owner
  reallocation decision.
- In the **allocation view** it is folded into the 500B **Lux NFTs** bucket
  (so `400B Public Sale + 100B void = 500B`), which keeps the collection's
  design math whole without inventing a private-investor cap table.
- **⚠️ Owner decision pending:** whether the 100B ultimately (a) stays with the
  DAO, (b) enlarges the public NFT allocation, or (c) is redirected to another
  program. Until decided, treat it as DAO-retained. See
  [RECONCILIATION.md](RECONCILIATION.md#private-sale-void).

There is **no private-sale contract, no vesting schedule, and no allocation
recipient** to document, because the event did not occur.

---

## 5. Vesting & lock mechanics

| Bucket | Lock | Cliff | Post-cliff release |
|---|---|---|---|
| Lux DAO | Locked | — | Governed by the DAO |
| Public Sale | Not-Locked | — | Liquid on auction settlement |
| Lux Team | Locked | **366 days** | **10% per month** thereafter (→ fully vested ~month 10 after cliff) |
| Lux Developers | Locked | **366 days** | **10% per month** thereafter |
| Network Treasury | Locked | — | Released as market-making liquidity is deployed |
| Network Rewards | Locked | — | Released for customer-acquisition programs |
| Network Partners | Locked | — | Released per partner-incentive agreements |

> "Locked" buckets are carved out of the DAO holdings notionally; the physical
> on-chain move of these balances out of the treasury wallet is a **pending
> reconciliation step** — see [RECONCILIATION.md](RECONCILIATION.md). The 366-day
> cliff (a full year + 1 day) applies to Team and Developers.

---

## 6. Burn — the deflation engine

- **50% of every transaction fee is burned.** The other 50% flows to the network
  (validators / treasury per protocol policy).
- Because total supply is fixed at genesis and the burn only removes LUX, the
  **effective supply curve is flat-then-declining** — LUX can never inflate.
- **⚠️ TO CONFIRM — burn rate parameter.** The tokenomics sheet lists a burn-rate
  figure that is cut off at "**1.1**" (e.g. 1.1% or 1.1× of some base). The
  **50%-of-fees** burn is the confirmed mechanism; the additional "1.1" parameter
  needs the full sheet value to document precisely.

---

## 7. Staking & liquidity rewards

Owner-provided reward schedule (per annum), from the tokenomics sheet:

**Liquidity-provider (LP) rewards, p.a.:**

| Lock term | APR |
|---|---:|
| 1 month | 5% |
| 3 months | 20% |
| 6 months | 50% |
| 12 months | **111%** |

**Single-sided staking, p.a.:**

| Lock term | APR |
|---|---:|
| 1 month | 1% |
| 3 months | 4% |
| 6 months | 10% |
| 12 months | 25% |

Longer lock terms earn strictly higher APR in both programs. LP rewards are far
richer than single-sided staking (reflecting impermanent-loss compensation and
the priority on bootstrapping liquidity).

---

## Price & FDV

| | |
|---|---|
| Genesis price | **$0.0001 / LUX** |
| Total supply | 2,000,000,000,000 LUX |
| Implied FDV `price × supply` | `$0.0001 × 2,000,000,000,000` = **$200,000,000** |
| Owner-stated FDV | **$220,000,000** |

> **⚠️ TO CONFIRM — price ↔ FDV discrepancy.** The genesis price of $0.0001
> multiplied by the 2T supply yields **$200M**, but the owner states FDV
> **$220M** — a **10% delta** ($20M). Either (a) the effective genesis price is
> ~**$0.00011**, or (b) the $220M FDV is measured on a different basis (e.g. a
> premium round, or a different supply denominator). Both figures are recorded
> verbatim; the owner should confirm which is canonical.

At the genesis price, tier valuations follow directly (e.g. a Genesis Validator's
1,000,000,000 LUX bond ≈ $100,000 at $0.0001, or the "$1M list" figure at a
~$0.001 reference price used in some card-tier pricing — see
[NFT-COLLECTION.md](NFT-COLLECTION.md) for the per-tier price context and its own
⚠️ flags).

---

## Provenance

- The 2T supply, bucket percentages, vesting, burn, price and FDV are
  **owner-provided canonical tokenomics** (captured for this repo).
- Reward APRs are transcribed from the tokenomics sheet.
- On-chain figures (the ~1.99T currently in the DAO wallet, NFT bonds) are in
  [RECONCILIATION.md](RECONCILIATION.md) and [`data/`](data/).
