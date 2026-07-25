// Generate data/genesis-registry.json — the ONE canonical Genesis NFT registry.
//
// Inputs (all authoritative, none hand-typed):
//   * Ethereum mainnet Media 0x31e0F919… — the 50 origin tokens (live eth_call).
//   * standard/script/SetNftURIs.s.sol           — migrated names, C-Chain ids 0..49.
//   * standard/script/MintTreasuryValidators.s.sol — the 68 treasury mints.
//   * standard/script/FixTreasuryNumbers.s.sol   — the 9 serial renumbers.
//
// Output: one row per token of the designed collection, keyed by SERIAL. This
// file replaces ~450 KB of base64 smeared across three Solidity scripts as the
// source of truth for any re-mint.
import { readFileSync, writeFileSync } from 'node:fs'

const STD = process.env.LUX_STANDARD ?? new URL('../../standard/', import.meta.url).pathname
const inv = JSON.parse(readFileSync(new URL('../data/eth-genesis-inventory.json', import.meta.url), 'utf8'))

const b64json = (s) => JSON.parse(Buffer.from(s.split(',')[1], 'base64').toString('utf8'))
const src = (f) => readFileSync(STD + 'script/' + f, 'utf8')
const names = (f, re) => [...src(f).matchAll(re)].map((m) => b64json(m[1]).name)

// 1. Migrated 50 — C-Chain id i  <->  Ethereum tokenId i+1.
const migrated = names('SetNftURIs.s.sol', /setTokenURI\(\d+,\s*"(data:application\/json;base64,[^"]+)"\)/g)
// 2. Treasury 68 — minted in order, C-Chain ids 50..117.
const treasury = names('MintTreasuryValidators.s.sol', /tokenURI:\s*"(data:application\/json;base64,[^"]+)"/g)
// 3. The 9 renumbers — setTokenURI(cchainId, …) applied after the mint.
const renumber = new Map(
  [...src('FixTreasuryNumbers.s.sol').matchAll(/setTokenURI\((\d+),\s*"(data:application\/json;base64,[^"]+)"\)/g)]
    .map((m) => [Number(m[1]), b64json(m[2]).name]),
)

const serialOf = (n) => Number(n.match(/#(\d+)$/)[1])
// `name` is the DISPLAY name and differs by origin ("GENESIS VALIDATOR #7" when
// migrated, "Lux Genesis Validator #51" when treasury-minted). `tier` is the
// CLASS and is the same for both. Keeping them separate is what stops the
// "VALIDATOR COIN contains the substring validator" trap
// (see cchain/GENESIS-NFTS.md#tier-naming) from ever recurring.
const tierOf = (n) => {
  const t = n.replace(/\s*#\d+$/, '').toUpperCase()
  return t === 'LUX GENESIS VALIDATOR' ? 'GENESIS VALIDATOR' : t
}
const classOf = (t) => (t.endsWith('COIN') ? 'coin' : 'validator')
const BOND = {
  'GENESIS VALIDATOR': 1_000_000_000, 'GENESIS COIN': 1_000_000_000,
  'VALIDATOR COIN': 100_000_000, 'MINI COIN': 10_000_000, 'NANO COIN': 1_000_000,
}

const fail0 = []
const rows = []
migrated.forEach((name, i) => {
  const eth = inv.tokens.find((t) => Number(t.id) === i + 1)
  const tier = tierOf(name)
  rows.push({
    serial: serialOf(name), class: classOf(tier), tier, name, bond: BOND[tier],
    origin: 'ethereum', ethTokenId: i + 1, cchainId: i,
    owner: eth.owner, ethTokenURI: eth.uri,
  })
  // The Ethereum tokenURI is the only on-chain type signal; it must agree.
  if (eth.bond !== BOND[tier]) fail0.push(`#${i + 1}: eth bond ${eth.bond} != registry ${BOND[tier]}`)
})
treasury.forEach((minted, k) => {
  const cchainId = 50 + k
  const name = renumber.get(cchainId) ?? minted
  rows.push({
    serial: serialOf(name), class: 'validator', tier: 'GENESIS VALIDATOR', name, bond: 1_000_000_000,
    origin: 'treasury', ethTokenId: null, cchainId,
    owner: '0x9011E888251AB053B7bD1cdB598Db4f9DEd94714',
    mintedAs: minted !== name ? serialOf(minted) : undefined,
  })
})

// --- invariants: the registry is only canonical if all of these hold ---
const V = rows.filter((r) => r.class === 'validator').map((r) => r.serial).sort((a, b) => a - b)
const C = rows.filter((r) => r.class === 'coin').map((r) => r.serial).sort((a, b) => a - b)
const fail = [...fail0]
if (V.length !== 100) fail.push(`validators=${V.length} want 100`)
if (new Set(V).size !== V.length) fail.push('duplicate validator serial')
V.forEach((s, i) => { if (s !== i + 1) fail.push(`validator serial gap at ${i + 1}: got ${s}`) })
if (C.length !== 18) fail.push(`coins=${C.length} want 18`)
if (new Set(C).size !== C.length) fail.push('duplicate coin serial')
// Serials are namespaced BY CLASS: validator #4 and NANO COIN #4 both exist and
// are different tokens (the coin took Ethereum tokenId 4, the treasury minted
// validator slot 4). Uniqueness is required within a class, never across.
if (rows.length !== 118) fail.push(`rows=${rows.length} want 118`)
// Every coin serial must be an Ethereum tokenId that is NOT a validator origin.
const ethV = new Set(rows.filter((r) => r.origin === 'ethereum' && r.class === 'validator').map((r) => r.serial))
for (const s of C) if (ethV.has(s)) fail.push(`coin #${s} collides with an Ethereum-origin validator`)
// The 68 treasury serials must be exactly {1..100} minus the 32 Ethereum ones.
const treas = rows.filter((r) => r.origin === 'treasury').map((r) => r.serial).sort((a, b) => a - b)
const want = Array.from({ length: 100 }, (_, i) => i + 1).filter((s) => !ethV.has(s))
if (JSON.stringify(treas) !== JSON.stringify(want)) fail.push('treasury serials != {1..100} \\ Ethereum validator serials')
const bonded = rows.reduce((a, r) => a + r.bond, 0)
if (bonded !== 102_583_000_000) fail.push(`totalLuxLocked=${bonded} want 102583000000`)
if (fail.length) { console.error('REGISTRY INVARIANT FAILURE:\n  ' + fail.join('\n  ')); process.exit(1) }

const out = {
  $comment: 'Canonical Lux Genesis NFT registry. Generated by scripts/gen-genesis-registry.mjs — do not hand-edit.',
  ethereum: { chainId: 1, media: inv.contract, minted: 50 },
  cchain: { chainId: 96369, contract: '0x004287C47efc912FEc391979154454a8017A76C6', status: 'WIPED by the 2026-07-10 fresh genesis (eth_getCode = 0x)' },
  totals: { validators: V.length, coins: C.length, tokens: rows.length, totalLuxLocked: bonded },
  tokens: rows.sort((a, b) => a.class.localeCompare(b.class) || a.serial - b.serial),
}
writeFileSync(new URL('../data/genesis-registry.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log(`OK  validators #${V[0]}..#${V.at(-1)} (${V.length}, no gaps/dupes) + ${C.length} coins = ${rows.length} tokens`)
console.log(`OK  totalLuxLocked = ${bonded.toLocaleString('en-US')} LUX`)
console.log(`OK  ${rows.filter(r => r.mintedAs).length} treasury serials were renumbered: ` +
  rows.filter(r => r.mintedAs).map(r => `#${r.mintedAs}->#${r.serial}`).join(' '))
