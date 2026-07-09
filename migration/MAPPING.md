# Genesis NFT Migration Map — Ethereum → Lux C-Chain (token by token)

> **Generated file.** Do not hand-edit. Regenerate with
> `python3 data/gen_migration_map.py` (source of truth:
> `ethereum/HOLDER-SNAPSHOT.md` + `data/cchain-current.json`). Machine-
> readable form: [`data/migration-map.json`](../data/migration-map.json).

- Ethereum Media (LUXNFT): `0x31e0F919C67ceDd2Bc3E294340Dc900735810311` — snapshot block 25443474
- Lux C-Chain GenesisNFTs (chain 96369): `0x004287C47efc912FEc391979154454a8017A76C6`
- Treasury / DAO wallet: `0x9011E888251AB053B7bD1cdB598Db4f9DEd94714`

Every check below is enforced by the generator (build fails otherwise):

- ETH token *N* re-mints 1:1 to **C-Chain token _N−1_** (C-Chain ids start at 0),
  `originTokenId` preserved, minted to the **same holder** — owner equality verified for all 50.
- A **Coin**'s C-Chain tier name matches its Ethereum bond exactly
  (GENESIS COIN=1B, VALIDATOR COIN=100M, MINI COIN=10M, NANO COIN=1M).
- The 100 Genesis-Validator **serial numbers are exactly #1–#100** — no gaps, no duplicates.

## Part 1 — Original holders (ETH #1–50 → C-Chain #0–49, 1:1)

| ETH # | C-Chain # | Class | Tier | Bond (LUX) | C-Chain name | Holder (owner verified ✓) |
|---:|---:|---|---|---:|---|---|
| 1 | 0 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #1 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 2 | 1 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #2 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 3 | 2 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #3 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 4 | 3 | coin | NANO | 1,000,000 | NANO COIN #4 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 5 | 4 | coin | MINI | 10,000,000 | MINI COIN #5 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 6 | 5 | coin | VALIDATOR | 100,000,000 | VALIDATOR COIN #6 | `0x8d56c7cf8b17a11580822c7fff90b05b6a3e1b5e` |
| 7 | 6 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #7 | `0x31387d95334f7c45391410e1c43dadacfc889f4a` |
| 8 | 7 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #8 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 9 | 8 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #9 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 10 | 9 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #10 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 11 | 10 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #11 | `0xe00a0921ce8bc7525383383b247f568fd01e53fa` |
| 12 | 11 | coin | GENESIS | 1,000,000,000 | GENESIS COIN #12 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 13 | 12 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #13 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 14 | 13 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #14 | `0x9df3f0e20e4e1f1eed635ba6f7dc2612dd4e1fbf` |
| 15 | 14 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #15 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 16 | 15 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #16 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 17 | 16 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #17 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 18 | 17 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #18 | `0xcbe29430026b8dc840cabc25745dd1106253d333` |
| 19 | 18 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #19 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 20 | 19 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #20 | `0xb7c5819f928a02ff3946b369d997e1d52712bf41` |
| 21 | 20 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #21 | `0x7438d25f78da4b184466a04a40d45dcdf9d44158` |
| 22 | 21 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #22 | `0x70c91206b85d9d42fc0a5c0c79705931ab7d5881` |
| 23 | 22 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #23 | `0x3ef096e10358363fd6cf2cf6052079d5467a12f3` |
| 24 | 23 | coin | MINI | 10,000,000 | MINI COIN #24 | `0x3ef096e10358363fd6cf2cf6052079d5467a12f3` |
| 25 | 24 | coin | MINI | 10,000,000 | MINI COIN #25 | `0x515e3c5d738e62d8b800f5f87abff284d77cbb4e` |
| 26 | 25 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #26 | `0x111e89e354f48c324a8d2ca9873c028798aaa290` |
| 27 | 26 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #27 | `0x497ec62bdc58d003faf38f3c132302692fe687fd` |
| 28 | 27 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #28 | `0x5945d401dd63bfbb3c67824d72b8fca1e3f8f6e4` |
| 29 | 28 | coin | VALIDATOR | 100,000,000 | VALIDATOR COIN #29 | `0x5945d401dd63bfbb3c67824d72b8fca1e3f8f6e4` |
| 30 | 29 | coin | MINI | 10,000,000 | MINI COIN #30 | `0x3ef096e10358363fd6cf2cf6052079d5467a12f3` |
| 31 | 30 | coin | MINI | 10,000,000 | MINI COIN #31 | `0xaa64006a3a14e16d58933c1fad7ff4f1468c5efd` |
| 32 | 31 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #32 | `0xd8f3c05fb24cb1ab19a11b7b032c9a5a914640bc` |
| 33 | 32 | coin | VALIDATOR | 100,000,000 | VALIDATOR COIN #33 | `0x908a311766ffb525ec05c75b884ee00a620d94d2` |
| 34 | 33 | coin | VALIDATOR | 100,000,000 | VALIDATOR COIN #34 | `0x908a311766ffb525ec05c75b884ee00a620d94d2` |
| 35 | 34 | coin | GENESIS | 1,000,000,000 | GENESIS COIN #35 | `0x094109ab78767713305d2e5cd05d832cd1faefb5` |
| 36 | 35 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #36 | `0x094109ab78767713305d2e5cd05d832cd1faefb5` |
| 37 | 36 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #37 | `0x366887642858e2b0c4faf7226a1462aae53e41a2` |
| 38 | 37 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #38 | `0x469796eef1154ef2d0a2d2d8815771d7264a5ff6` |
| 39 | 38 | coin | MINI | 10,000,000 | MINI COIN #39 | `0x1e3a17775d0d0cfefb09f869617f1d22e0fd9f6c` |
| 40 | 39 | coin | VALIDATOR | 100,000,000 | VALIDATOR COIN #40 | `0x515e3c5d738e62d8b800f5f87abff284d77cbb4e` |
| 41 | 40 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #41 | `0x8750d110d594405b788d98e1376e9841555252c2` |
| 42 | 41 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #42 | `0x5b6a8eb3added38e01543eb09437cfcbe7b0ddae` |
| 43 | 42 | coin | MINI | 10,000,000 | MINI COIN #43 | `0x0315b3892dea66a5ddbd6e6b7ad6492490ad10bf` |
| 44 | 43 | coin | NANO | 1,000,000 | NANO COIN #44 | `0x0315b3892dea66a5ddbd6e6b7ad6492490ad10bf` |
| 45 | 44 | coin | NANO | 1,000,000 | NANO COIN #45 | `0x0315b3892dea66a5ddbd6e6b7ad6492490ad10bf` |
| 46 | 45 | coin | MINI | 10,000,000 | MINI COIN #46 | `0x24fdff1c4f9222ec941e7f8da54f0922f5108433` |
| 47 | 46 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #47 | `0x77f495ddbe4892bbd6400404c508448e216c7586` |
| 48 | 47 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #48 | `0xb4699dc301ca712e3d852e69ebe3f7dfbb0ad4b6` |
| 49 | 48 | validator | GENESIS | 1,000,000,000 | GENESIS VALIDATOR #49 | `0x2f6a1ce06263f499d600893435e00ea351b765f0` |
| 50 | 49 | validator | GENESIS | 1,000,000,000 | _(art/metadata restored)_ | `0x3bcaed65fd2a3296ae448ec28f3067071378c3fd` |

Original-holder subtotal: **32 Genesis Validators + 18 Coins = 50 tokens**, across 28 distinct wallets. Bonded reserve carried over 1:1 = **34,583,000,000 LUX**.

## Part 2 — Treasury completion (C-Chain #50–117 → authorized Validators #1–100)

The Ethereum drop authorized **100** Genesis Validators but only 32 were sold. On
2026-07-09 the **68** unminted validators were minted to the DAO treasury, filling
every remaining serial so the collection holds exactly #1–#100. The serials the
treasury filled **≤ #50 are precisely the Ethereum tokenIds that had been spent on
Coins** (verified) — the rest complete #51–#100.

| C-Chain # | Validator serial | Class | Bond (LUX) | Owner (treasury) |
|---:|---:|---|---:|---|
| 50 | #33 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 51 | #34 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 52 | #35 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 53 | #4 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 54 | #5 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 55 | #6 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 56 | #39 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 57 | #40 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 58 | #12 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 59 | #24 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 60 | #43 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 61 | #44 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 62 | #45 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 63 | #46 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 64 | #25 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 65 | #29 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 66 | #30 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 67 | #31 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 68 | #51 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 69 | #52 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 70 | #53 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 71 | #54 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 72 | #55 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 73 | #56 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 74 | #57 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 75 | #58 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 76 | #59 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 77 | #60 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 78 | #61 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 79 | #62 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 80 | #63 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 81 | #64 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 82 | #65 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 83 | #66 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 84 | #67 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 85 | #68 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 86 | #69 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 87 | #70 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 88 | #71 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 89 | #72 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 90 | #73 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 91 | #74 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 92 | #75 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 93 | #76 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 94 | #77 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 95 | #78 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 96 | #79 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 97 | #80 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 98 | #81 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 99 | #82 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 100 | #83 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 101 | #84 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 102 | #85 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 103 | #86 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 104 | #87 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 105 | #88 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 106 | #89 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 107 | #90 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 108 | #91 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 109 | #92 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 110 | #93 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 111 | #94 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 112 | #95 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 113 | #96 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 114 | #97 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 115 | #98 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 116 | #99 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |
| 117 | #100 | validator | 1,000,000,000 | `0x9011e888251ab053b7bd1cdb598db4f9ded94714` |

Treasury subtotal: **68 Genesis Validators** (serials #4, #5, #6, #12, #24, #25 … #100), all held by the DAO treasury.

## Totals after migration

| | Validators | Coins | Total |
|---|---:|---:|---:|
| Original holders (people) | 32 | 18 | 50 |
| Treasury completion | 68 | 0 | 68 |
| **On-chain today** | **100** | **18** | **118** |
| Authorized (ETH Drop) | 100 | 11,111 | 11,211 + 1,000 ATM/Card |

Recorded `totalLuxLocked` on GenesisNFTs = **102,583,000,000 LUX** (100 validators × 1B = 100,000,000,000 + 18 coins = 2,583,000,000).

