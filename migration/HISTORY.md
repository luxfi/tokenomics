# Genesis NFT History — Ethereum → Today

The full timeline of the LUX Genesis NFT collection, from the original Ethereum
mint to the current C-Chain state. For the token-by-token map see
[MAPPING.md](MAPPING.md); for the machine-readable form see
[`data/migration-map.json`](../data/migration-map.json).

---

## Timeline

### Dec 2019 / early 2020 — Lux Network begins
Lux Network started. (Nothing in the Lux tree predates this; earlier dates in Lux
repos come only from upstream forks such as go-ethereum.)

### 2020+ — Original lux.town Genesis collection (Ethereum mainnet)
The Genesis NFT collection was minted on Ethereum as the **lux.town** drop, on a
**Zora-fork Media/Market** contract wrapped by a **Drop / App** issuance layer:

- **Media** (LUXNFT) `0x31e0F919C67ceDd2Bc3E294340Dc900735810311`
- **Drop** ("Gen 0") `0x941E3B4fC883B1746E52814EB8574b85E6Fa4E66`
- **App** `0x44A210571E135C6a536564e9B14dc4DA63f3D398`

**50 tokens** were minted across **28 distinct holders**: **32 Genesis Validators**
(each bonding **1,000,000,000 LUX** — permanently locked, rewards to the holder,
transferable) and **18 Coins** (1B / 100M / 10M / 1M denominations). The Drop
authorized **12,211** tokens total (100 Validators, 11,111 Coins, 1,000 ATM/Card),
so only 50 of 12,211 were ever minted on Ethereum. Details:
[ethereum/ORIGINAL-CONTRACTS.md](../ethereum/ORIGINAL-CONTRACTS.md).

### 2026-07-07 — C-Chain migration: 50 NFTs re-minted 1:1
The 50 Ethereum NFTs were re-minted **1:1 to the same holders** on the Lux
C-Chain (96369) **GenesisNFTs** contract
`0x004287C47efc912FEc391979154454a8017A76C6` (LRC721 "Lux Genesis").

- Ethereum token *N* → C-Chain token *N−1* (C-Chain ids start at 0),
  `originTokenId` preserved, minted to the identical holder address.
- **Verified:** for all 50, `ownerOf(cchain id)` equals the Ethereum holder of
  `id + 1`, and each Coin's C-Chain tier matches its Ethereum bond.
- The bonded reserve carried over unchanged: **34,583,000,000 LUX** for the
  migrated set (a move from the fixed 2T, not a mint).

This re-mint was performed as part of the same mainnet window in which the
C-Chain incident was recovered (see [Process / consensus versions](#process--consensus-versions)).

### 2026-07-09 — Treasury completion + art restore
Two on-chain actions completed the collection:

1. **68 unminted Genesis Validators minted to the DAO treasury**
   `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714`, completing the authorized **100**.
   The collection now holds **100 Genesis Validators serial-numbered exactly
   #1–#100** (verified: no gaps, no duplicates). The serials the treasury filled
   at **≤ #50 are precisely the Ethereum tokenIds that had been spent on Coins**
   — the "unminted validator" slots — and the treasury also completed **#51–#100**.
2. **9 numbering collisions renumbered — but only in the `name` field.**
   `MintTreasuryValidators.s.sol` minted the 68 treasury validators as a naive
   consecutive run **#33–#100**, instead of the 68-serial *complement*
   ({1..100} minus the 32 serials already held by original holders). Nine of
   those — **#36, #37, #38, #41, #42, #47, #48, #49, #50** — collided with
   Ethereum-origin validators. `FixTreasuryNumbers.s.sol` then renumbered them to
   the nine free serials **#4, #5, #6, #12, #24, #25, #29, #30, #31**.

   > **⚠️ That fix was incomplete — verified 2026-07-25.** All nine replacement
   > payloads were templated off validator **#33** and only the `name` string was
   > edited. Every one of them kept `"Validator No": 33` and on-chain artwork
   > reading **`VALIDATOR #33 / 100`**. Together with the genuine #33 (C-Chain id
   > 50), the pre-reset collection therefore had **ten tokens rendering as #33**.
   > The "no gaps, no duplicates" verification below was only ever run against
   > `name` — it never inspected the trait or the SVG, so it passed.
   > Pinned as a regression test in
   > [`scripts/verify-genesis-metadata.mjs`](../scripts/verify-genesis-metadata.mjs);
   > the corrected metadata is emitted by
   > [`scripts/genesis-metadata.mjs`](../scripts/genesis-metadata.mjs).
   > **Root cause:** the serial was materialised 127 times as literal base64
   > across three scripts instead of being derived once. The re-mint plan mints
   > each treasury validator **at its canonical serial directly**, so there is no
   > renumber step to get half-done.
3. **On-chain SVG art / metadata set** for the 50 migrated tokens
   (`SetNftURIs.s.sol`, 23:46Z run).

   > **⚠️ One URI is unconfirmed — C-Chain token id 49 / Ethereum #50.** That
   > broadcast recorded **51 transactions but only 50 receipts** (all 50
   > successful), and the transaction with no receipt is the **last** one,
   > `setTokenURI(49, …)`. Two earlier runs (2026-07-07 23:33Z, 2026-07-09
   > 20:29Z) produced **no transaction hashes at all** — simulations that never
   > broadcast. Whether id 49 landed can no longer be checked: the contract was
   > wiped the next day. Consistent with `data/cchain-current.json` (snapshot
   > 16:11Z, i.e. *before* the 23:46Z run) recording `"name": null` for id 49.
   >
   > **This single unconfirmed URI is the entire factual basis for the
   > "~43 interrupted token URIs" in the backlog — that figure has no support
   > anywhere in the chain or broadcast record.** Ethereum, re-probed
   > 2026-07-25, is clean: 50 tokens, ids 1–50, no gaps, no duplicates, no
   > malformed or truncated URIs. See
   > [`data/eth-genesis-inventory.json`](../data/eth-genesis-inventory.json)
   > (regenerate/verify: `node scripts/probe-eth-genesis.mjs --check`).

**Result of the 2026-07-09 pass:** 118 tokens on-chain — 100 Genesis Validators
(32 original + 68 treasury) + 18 Coins (original holders). **12,093
authorized-but-unminted remain** (11,093 Coins + 1,000 ATM/Card), pending an
owner-gated mint (and a contract tier extension — see
[cchain/GENESIS-NFTS.md](../cchain/GENESIS-NFTS.md#gaps)).

> **⚠️ SUPERSEDED — this 118-token state was WIPED by the 2026-07-10 genesis
> reset below.** It is preserved here as the **re-mint target** (the exact
> collection to reproduce at final launch), **not** the current on-chain state.

### 2026-07-10 — Mainnet 96369 reset to a fresh genesis (app-layer state wiped)

The mainnet C-Chain "consensus" saga was ultimately traced to a **C-Chain VM
configuration bug, not consensus**: a `warpConfig` precompile entry
(`precompileUpgrades[0]` with `disable:true`, conflicting with the genesis warp
*enable*) bricked C-Chain **VM-init on every fresh boot** (coreth static
validator: `invalid precompile upgrades: PrecompileUpgrade (warpConfig) at [0]:
disable should be [false]`). Recovery required a **fresh genesis**, which the
owner authorized ("reset is fine, no one using it").

**What the reset wiped (recoverable — all re-mintable):**

- The **118 Genesis NFTs** on contract
  `0x004287C47efc912FEc391979154454a8017A76C6` (100 Validators + 18 Coins) and
  **all post-genesis C-Chain state**. The 2026-07-07 re-mint and the 2026-07-09
  treasury completion described above are **gone from chain** — the sections
  above now read as **specification**, not live state.

**What the reset preserved (unchanged):**

- **Treasury `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714` = 2,000,000,000,000 LUX
  (2T).** This is a **genesis allocation** in `cChainGenesis`, so it survives any
  fresh genesis intact — the fixed 2T supply and the DAO holding are not affected
  by the reset.
- The **canonical 2T distribution** ([SUPPLY.md](../SUPPLY.md)) and the **ETH →
  C-Chain migration record** (this file + [MAPPING.md](MAPPING.md)) — both remain
  the **spec**. Nothing about the *design* changed; only the app-layer *state* was
  reset.

**Deferred to after the v1.36 consensus rip-out settles:**

The NFT re-mint, the full **12,093-token** authorized mint, and the **tokenomics
convergence** (redistribute ~990B out of the treasury into the Public
Sale / vesting / program / NFT buckets → DAO endpoint 1.00T; see
[RECONCILIATION.md](../RECONCILIATION.md)) are **all deferred**. Rationale: the
consensus layer is being rebuilt for **v1.36** (the Tendermint rip-out — see
`~/work/lux/consensus/docs/postmortems/tendermint-accretion.md`), and that work
**may require another fresh genesis**. Redeploying the entire app layer (NFTs +
distribution) **once**, after v1.36 is final, avoids doing it twice. Until then,
mainnet 96369 carries **genesis + the 2T treasury only**.

---

## Process / consensus versions

Context only — this repo documents tokenomics, not node operations; kept short so
it is not overstated.

- The 2026-07 C-Chain migration and re-mint happened during the mainnet
  finality-stall **recovery series** — and were **wiped by the 2026-07-10 fresh
  genesis** (see the reset entry above). They stand as the re-mint spec.
- The recovery's true root cause was a **C-Chain `warpConfig` VM-init bug, not
  consensus**; the fresh genesis on **`ghcr.io/luxfi/node:v1.34.29`** (consensus
  v1.35.38) proved 5/5 convergence + node-drop self-heal. Full detail is tracked
  in node ops, not here: `~/work/lux/consensus/docs/postmortems/tendermint-accretion.md`.
- Final app-layer redeploy (NFTs + distribution) is **deferred to after v1.36**
  so it happens **once**. *(Node ops are tracked elsewhere, not in this repo.)*

---

## Invariants preserved across the migration

| Invariant | Guarantee |
|---|---|
| Holder identity | C-Chain owner == Ethereum holder, all 50 (verified) |
| Origin linkage | `originTokenId` = Ethereum tokenId on every migrated token |
| Bond fidelity | Each Coin's C-Chain tier bond == its Ethereum bond (verified) |
| Total supply | Bonds are a *move* from the fixed 2T — no LUX minted; C-Chain stays 2T |
| Validator completeness | Genesis Validators = exactly #1–#100 after completion |
