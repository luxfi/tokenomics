# Ethereum — The Original lux.town Contracts

The Genesis NFT collection originated on **Ethereum mainnet** as the **lux.town**
drop, built on a **Zora-fork Media/Market pattern** wrapped by a **Drop / App**
issuance layer. This is where every migrated token was first minted.

Source repository: **[github.com/luxdefi/town](https://github.com/luxdefi/town)**
(local: `~/work/luxresearch/town`) — `contracts/src/{Media,Drop,App}.sol`,
deploy script `contracts/deploy/14_drop.ts`.

---

## 1. Contracts

| Contract | Address | Symbol / title | Role |
|---|---|---|---|
| **Media** | `0x31e0F919C67ceDd2Bc3E294340Dc900735810311` | LUXNFT | The ERC-721 NFT itself (Zora-fork) |
| **Drop** | `0x941E3B4fC883B1746E52814EB8574b85E6Fa4E66` | "Gen 0" | Authorized token types + supply caps |
| **App** | `0x44A210571E135C6a536564e9B14dc4DA63f3D398` | — | Orchestrator / minter (UUPS upgradeable) |

Chain: Ethereum mainnet (chainId 1). Holder snapshot block:
**25443474** — see [HOLDER-SNAPSHOT.md](HOLDER-SNAPSHOT.md).

---

## 2. The Zora-fork Media/Drop/App model

The collection is a three-layer design:

```
 App (0x44A2…)  ──addDrop──►  Drop "Gen 0" (0x941E…)  ──mints──►  Media LUXNFT (0x31e0…)
 orchestrator                 token-type registry                the ERC-721 tokens
 UUPS upgradeable             + supply caps                      Zora-fork, per-token market
```

- **Media** (`src/Media.sol`) — *"A media value system, with perpetual equity to
  creators."* Forked from **ourzora/core** @ `450cd154…` (the Zora v1 Media +
  Market pattern). It is an `ERC721Burnable` where each token carries content /
  metadata URIs and hashes, and an attached per-token market (bids/asks, bid
  shares). Symbol **LUXNFT**.
- **Drop** (`src/Drop.sol`) — holds a `mapping(string => TokenType)` keyed by a
  human name (e.g. `"Validator"`, `"Wallet 10B Lux"`, `"ATM"`), each with a
  `minted` counter and a supply cap. The deployed drop is titled **"Gen 0"**.
  `totalMinted(name)` returns per-type minted counts — the source of
  [`data/eth-authorized-supply.json`](../data/eth-authorized-supply.json).
- **App** (`src/App.sol`) — an `OwnableUpgradeable` + `UUPSUpgradeable`
  orchestrator that registers drops (`addDrop`) and drives minting. (Its
  interfaces carry `ILux` / "ZK" heritage from the shared Zora-derived codebase.)

Deploy (`deploy/14_drop.ts`) creates the Drop with title `['Gen 0']`, wires it
into the App (`app.addDrop`), and configures it (`drop.configure(app)`).

### Token typing

Each Media token's **type** is derived from its `tokenURI`:

| `tokenURI` pattern | Meaning | Bond |
|---|---|---|
| `validator.mov` | Genesis Validator | 1,000,000,000 LUX |
| `wallet.mov?lux=N` | Coin | N LUX |

This is how the holder snapshot classifies each of the 50 tokens (validator vs
coin, and the coin's denomination) directly from on-chain `tokenURI` data.

---

## 3. Authorized vs minted

From [`data/eth-authorized-supply.json`](../data/eth-authorized-supply.json)
(live Drop "Gen 0" query):

| Token type | Authorized | Minted | Unminted |
|---|---:|---:|---:|
| Validator | 100 | 32 | 68 |
| Wallet 10B Lux | 1 | 0 | 1 |
| Wallet 1B Lux | 10 | 2 | 8 |
| Wallet 100M Lux | 100 | 5 | 95 |
| Wallet 10M Lux | 1,000 | 8 | 992 |
| Wallet 1M Lux | 10,000 | 3 | 9,997 |
| ATM | 1,000 | 0 | 1,000 |
| **Total** | **12,211** | **50** | **12,161** |

**50 tokens minted** on Ethereum, held by **28 distinct wallets**, all external
EOAs (all "sold"). Composition: **32 Genesis Validators + 18 Coins**.

Coin denomination breakdown of the 18 minted (verified against C-Chain):

| Coin denom | Minted |
|---|---:|
| 1B | 2 |
| 100M | 5 |
| 10M | 8 |
| 1M | 3 |

The full per-token table (id, type, bond, holder) is in
[HOLDER-SNAPSHOT.md](HOLDER-SNAPSHOT.md).

---

## 4. Bonded reserve

Each minted token bonds LUX (the redemption/backing reserve carried into the
C-Chain re-mint 1:1):

| Tier | Count | Bond each | Subtotal |
|---|---:|---:|---:|
| Genesis Validator | 32 | 1,000,000,000 | 32,000,000,000 |
| Coin 1B | 2 | 1,000,000,000 | 2,000,000,000 |
| Coin 100M | 5 | 100,000,000 | 500,000,000 |
| Coin 10M | 8 | 10,000,000 | 80,000,000 |
| Coin 1M | 3 | 1,000,000 | 3,000,000 |
| **Total** | **50** | | **34,583,000,000** |

**Redemption reserve for the minted set = 34,583,000,000 LUX (34.583B).**
This is a *move* from the fixed 2T supply, not a mint — C-Chain stays 2T.

---

## 5. Migration linkage

The C-Chain contract records the Ethereum origin explicitly:

- `GenesisNFTs.ETH_GENESIS_CONTRACT = 0x31e0F919…10311` (the Media address above).
- Each C-Chain token stores `originTokenId` = its Ethereum tokenId.
- Ethereum token *N* → C-Chain token *N−1*, same holder (C-Chain ids start at 0).

See [cchain/GENESIS-NFTS.md](../cchain/GENESIS-NFTS.md) and
[migration/MAPPING.md](../migration/MAPPING.md).
