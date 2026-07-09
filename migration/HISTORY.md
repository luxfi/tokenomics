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
2. **9 numbering collisions renumbered to exact #1–#100.** During the completion,
   an initial serial assignment collided with **9** serials already held by
   original holders; those were renumbered so the final set is a clean bijection
   onto #1–#100. *(The count "9" is from the operator log; the final clean state
   — serials == {1..100}, no dupes — is independently verified by
   [`gen_migration_map.py`](../data/gen_migration_map.py).)*
3. **On-chain SVG art / metadata restored** for the migrated tokens (including
   C-Chain token id 49 / Ethereum #50, which had a `null` name in the export
   snapshot).

**Result today:** 118 tokens on-chain — 100 Genesis Validators (32 original +
68 treasury) + 18 Coins (original holders). **12,093 authorized-but-unminted
remain** (11,093 Coins + 1,000 ATM/Card), pending an owner-gated mint (and a
contract tier extension — see [cchain/GENESIS-NFTS.md](../cchain/GENESIS-NFTS.md#gaps)).

---

## Process / consensus versions

Context only — this repo documents tokenomics, not node operations; kept short so
it is not overstated.

- The 2026-07 C-Chain migration and re-mint happened during the mainnet
  finality-stall **recovery series**.
- Mainnet node image at the time of writing: **`ghcr.io/luxfi/node:v1.34.28`**
  (recovery series). *(As-of-this-writing; node ops are tracked elsewhere, not in
  this repo.)*

---

## Invariants preserved across the migration

| Invariant | Guarantee |
|---|---|
| Holder identity | C-Chain owner == Ethereum holder, all 50 (verified) |
| Origin linkage | `originTokenId` = Ethereum tokenId on every migrated token |
| Bond fidelity | Each Coin's C-Chain tier bond == its Ethereum bond (verified) |
| Total supply | Bonds are a *move* from the fixed 2T — no LUX minted; C-Chain stays 2T |
| Validator completeness | Genesis Validators = exactly #1–#100 after completion |
