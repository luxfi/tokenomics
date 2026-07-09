# LLM.md — Context for AI Assistants

**This repo is the single source of truth for LUX tokenomics and the complete
Genesis NFT history** (original Ethereum mint → C-Chain migration → today). It is
documentation + verified on-chain data. No application code, no secrets.

Docs are **Markdown** (this is not a papers/proofs/audits tree, so not LaTeX).

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
- The 100 Genesis-Validator **serials are exactly #1–#100** (no gaps, no dupes).
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

## Conventions

- **⚠️ TO CONFIRM** marks any number not yet owner-confirmed. Never silently
  guess — add a ⚠️ and list it in [RECONCILIATION.md §4](RECONCILIATION.md#open-items).
- Canonical target numbers (SUPPLY.md) ≠ current on-chain state (RECONCILIATION.md).
  Keep the two straight.
- LUX is written in full grouped form (e.g. `1,000,000,000,000 LUX`).
- Do **not** create summary/notes files; extend the doc that owns the topic and
  update this LLM.md.
