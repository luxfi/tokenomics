# LLM.md — Context for AI Assistants

**This repo is the single source of truth for LUX tokenomics and the complete
Genesis NFT history** (original Ethereum mint → C-Chain migration → today). It is
documentation + verified on-chain data. No application code, no secrets.

Docs are **Markdown** (this is not a papers/proofs/audits tree, so not LaTeX).

> **⚠️ READ FIRST — 2026-07-10 genesis reset.** Mainnet 96369 was reset to a fresh
> genesis on 2026-07-10 to recover from a C-Chain `warpConfig` VM-init bug (not
> consensus). **All on-chain NFT state (the 118 tokens on `0x004287C4…`) was
> wiped**; the treasury **2T is preserved** (genesis allocation). Therefore: the
> **2T supply + distribution** ([SUPPLY.md](SUPPLY.md)) and the **ETH→C-Chain
> migration record** ([migration/](migration/)) are the **spec** and remain
> canonical; but every **"current on-chain"** figure (118 tokens, 100/100
> validators, ~1.99T balance) now describes the **pre-reset** chain and is the
> **re-mint / convergence target**, not live state. Re-mint + the ~990B
> redistribution are **deferred to after the v1.36 consensus rip-out** (one
> app-layer redeploy). Event of record: [migration/HISTORY.md](migration/HISTORY.md)
> (2026-07-10). Root cause: `~/work/lux/consensus/docs/postmortems/tendermint-accretion.md`.

---

## What lives where

| Fact you need | File |
|---|---|
| The 2T supply, buckets, vesting, burn, price/FDV, void private sale | [SUPPLY.md](SUPPLY.md) |
| NFT tiers (Coins/Validators/Card/Pass), bonds, pricing, authorized tables | [NFT-COLLECTION.md](NFT-COLLECTION.md) |
| Ethereum contracts (Media/Drop/App), Zora-fork model, authorized vs minted | [ethereum/ORIGINAL-CONTRACTS.md](ethereum/ORIGINAL-CONTRACTS.md) |
| Authoritative ETH holder snapshot (50 tokens, block 25443474) | [ethereum/HOLDER-SNAPSHOT.md](ethereum/HOLDER-SNAPSHOT.md) |
| C-Chain contract, current 118 state, tier naming trap, gaps | [cchain/GENESIS-NFTS.md](cchain/GENESIS-NFTS.md) |
| ETH→today timeline + process/consensus versions | [migration/HISTORY.md](migration/HISTORY.md) |
| Token-by-token ETH→C-Chain→holder map (generated) | [migration/MAPPING.md](migration/MAPPING.md) |
| Current on-chain vs canonical target; every gap + ⚠️ | [RECONCILIATION.md](RECONCILIATION.md) |
| Overview + canonical tables + repo map | [README.md](README.md) |
| Canonical #1–#100 registry (118 rows, generated) | [data/genesis-registry.json](data/genesis-registry.json) |
| Live Ethereum inventory (50 tokens, generated) | [data/eth-genesis-inventory.json](data/eth-genesis-inventory.json) |
| The ONE metadata renderer + its equivalence proof | [scripts/](scripts/) |

---

## The canonical numbers (encode these exactly)

- **Total supply: 2,000,000,000,000 LUX (2T). Fixed — no more can ever be minted.**
- **Deflationary: 50% of every transaction fee is burned.**
- **Genesis price $0.0001/LUX.** FDV owner-stated **$220M** (⚠️ `$0.0001×2T = $200M`).
- Distribution: DAO 1T (50%) · Public Sale 400B (20%) · Team/Devs/Treasury/
  Rewards/Partners 100B each (5% each) · **Private Sale 100B (5%) = VOID**.
- Allocation view: DAO 1T · **Lux NFTs 500B** (Public 400B + void Private 100B) ·
  Team/Devs/Treasury/Rewards/Partners 100B each.
- NFT 500B slice (sums to 500B): Coins 50B · Validators+Pass 11.111B · Credit
  Card 200B · Cash Rewards 238.889B.

---

## Key addresses

| What | Address |
|---|---|
| Ethereum Media (LUXNFT, Zora-fork) | `0x31e0F919C67ceDd2Bc3E294340Dc900735810311` |
| Ethereum Drop ("Gen 0") | `0x941E3B4fC883B1746E52814EB8574b85E6Fa4E66` |
| Ethereum App | `0x44A210571E135C6a536564e9B14dc4DA63f3D398` |
| C-Chain GenesisNFTs (96369) | `0x004287C47efc912FEc391979154454a8017A76C6` |
| DAO / treasury (owner, royalty, ~1.99T LUX) | `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714` |

Contract sources (not vendored here):
- Ethereum: `github.com/luxdefi/town` → `contracts/src/{Media,Drop,App}.sol`,
  `contracts/deploy/14_drop.ts` (local mirror `~/work/luxresearch/town`).
- C-Chain: `~/work/lux/standard/contracts/nft/GenesisNFTs.sol`.

---

## Data files & regeneration

| File | What | How it was made |
|---|---|---|
| [`data/eth-authorized-supply.json`](data/eth-authorized-supply.json) | ETH Drop authorized/minted per type | live query of Drop `0x941E…` |
| [`data/cchain-current.json`](data/cchain-current.json) | 118 C-Chain tokens (owner + name) | live query of GenesisNFTs `0x004287…` |
| [`data/migration-map.json`](data/migration-map.json) | verified ETH→C-Chain→holder map | **generated** (see below) |
| [`migration/MAPPING.md`](migration/MAPPING.md) | human-readable map | **generated** (same script) |

Regenerate the two generated artifacts (and re-run every cross-check):

```bash
python3 data/gen_migration_map.py
```

The script reads `ethereum/HOLDER-SNAPSHOT.md` + `data/cchain-current.json` and
**fails loudly** unless all of these hold:

- ETH token *N* ↔ C-Chain token *N−1*, **same holder** (owner equality, all 50).
- Each **Coin**'s C-Chain tier name matches its Ethereum bond
  (GENESIS=1B, VALIDATOR=100M, MINI=10M, NANO=1M).
- The 100 Genesis-Validator **serials are exactly #1–#100** (no gaps, no dupes)
  — ⚠️ **`name` field only**; see the metadata scripts below for the trait/art check.
- Treasury serials ≤50 equal the ETH **coin** tokenIds; treasury count = 68.
- ETH reserve = 34,583,000,000; C-Chain coin bond = 2,583,000,000.

> The `summary` block **inside** `data/cchain-current.json` is **wrong** (reports
> 104 validators / 14 coins). It counts by substring, and `"VALIDATOR COIN"`
> contains "validator". **Correct split = 100 validators / 18 coins** — classify
> by full class: `GENESIS VALIDATOR`/`Lux Genesis Validator` → validator; anything
> ending `COIN` → coin. The generator does this correctly; trust it, not the
> embedded summary.

If the on-chain state changes, refresh `data/*-current.json` / `*-supply.json`
from live queries first, then re-run the generator.

---

## The Genesis metadata pipeline (`scripts/`)

Four small Node scripts. **None of them can send a transaction** — the Ethereum
prober is `eth_call`/`eth_getCode` only, and the re-mint output is a plan file.

```bash
node scripts/probe-eth-genesis.mjs          # ETH mainnet -> data/eth-genesis-inventory.json
node scripts/probe-eth-genesis.mjs --check  # assert chain still matches the inventory
node scripts/gen-genesis-registry.mjs       # -> data/genesis-registry.json  (the canonical #1-#100)
node scripts/verify-genesis-metadata.mjs    # byte-for-byte proof + the #33 defect pin
node scripts/gen-remint-plan.mjs            # -> data/genesis-remint-plan.json (UN-EXECUTED)
```

- **`data/genesis-registry.json` is the source of truth for the collection** —
  118 rows (100 validators #1–#100 + 18 coins), each with serial, `tier`, bond,
  origin, C-Chain id and owner. `name` is the display string and varies by origin;
  **`tier` is the class** — never classify by parsing a name (that is the
  `"VALIDATOR COIN"`-contains-"validator" trap).
- **`scripts/genesis-metadata.mjs` is the ONE renderer.** All 118 tokens are one
  500×500 SVG template with four substitutions (accent, glow, title/subtitle,
  footer). `verify-genesis-metadata.mjs` proves it reproduces **118/118** deployed
  payloads byte-for-byte and pins the nine defective ones.
- Why this exists: the three broadcast scripts in `~/work/lux/standard/script/`
  materialised that template **127 times** as ~450 KB of literal base64. A serial
  then lived in 127 places, which is precisely how nine of them ended up
  disagreeing with their own artwork. The registry holds each serial once.

### Ethereum-side state — verified 2026-07-25

`0x31e0F919…` is **clean**: 50 tokens, ids **1–50 contiguous, no duplicates, no
malformed or truncated tokenURIs**, all 50 with a non-zero content hash. The only
defect is that every tokenURI points at **`lux.town`, which has no nameservers**.

**That cannot be fixed on Ethereum.** The deployed Zora-fork Media contract has
no `setTokenURI`, no `setBaseURI` and no owner override — the sole mutator is
`updateTokenURI(uint256,string)` gated `onlyApprovedOrOwner`, so only each of the
28 individual holders (or an operator they approve) can rewrite their own tokens.
`owner()` = `0x2781bdc83a612f0fe382476556c0cc12fe602294` cannot.

The repair is therefore **client-side and already live**: the on-chain URI stays
the source of truth for *which* asset a token is, and only the host + extension
are rewritten to `https://cdn.lux.network/nfts/` (`NFT_MEDIA_BASE` in
`lux/cloud/apps/web/src/lib/brand.ts`, applied by `nftMedia()` in `lib/chain.ts`).
Rewriting the Ethereum URIs would also destroy the only on-chain type signal —
`?type=__validator__` / `?lux=N` is what classifies every token. **Do not do it.**

---

## Conventions

- **⚠️ TO CONFIRM** marks any number not yet owner-confirmed. Never silently
  guess — add a ⚠️ and list it in [RECONCILIATION.md §4](RECONCILIATION.md#open-items).
- Canonical target numbers (SUPPLY.md) ≠ current on-chain state (RECONCILIATION.md).
  Keep the two straight.
- LUX is written in full grouped form (e.g. `1,000,000,000,000 LUX`).
- Do **not** create summary/notes files; extend the doc that owns the topic and
  update this LLM.md.
