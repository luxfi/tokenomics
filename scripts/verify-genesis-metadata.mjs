// Proof that scripts/genesis-metadata.mjs reproduces what was deployed — and a
// pin on the one place where what was deployed is WRONG.
//
// Regenerates every tokenURI from data/genesis-registry.json and compares it
// byte-for-byte against the literal base64 in the three broadcast Solidity
// scripts:
//
//   SetNftURIs.s.sol            50 migrated tokens   -> must match exactly
//   MintTreasuryValidators.s.sol 68 treasury mints    -> must match exactly
//   FixTreasuryNumbers.s.sol      9 serial renumbers  -> KNOWN DEFECTIVE, pinned
//
// The renumber defect: that script re-set only the `name` string. All nine
// payloads were templated off validator #33 and kept `Validator No: 33` and
// artwork reading "VALIDATOR #33 / 100". So the collection that the docs record
// as "exactly #1-#100, no duplicates" was clean only in the name field — by
// rendered art and by trait it had TEN tokens showing #33. This test pins that
// so the corrected renderer can never silently regress to it.
import { readFileSync } from 'node:fs'
import { tokenURI, FOOTER } from './genesis-metadata.mjs'

const STD = process.env.LUX_STANDARD ?? new URL('../../standard/', import.meta.url).pathname
const reg = JSON.parse(readFileSync(new URL('../data/genesis-registry.json', import.meta.url), 'utf8'))
const src = (f) => readFileSync(STD + 'script/' + f, 'utf8')

const migrated = [...src('SetNftURIs.s.sol').matchAll(/setTokenURI\(\d+,\s*"(data:application\/json;base64,[^"]+)"\)/g)].map((m) => m[1])
const treasury = [...src('MintTreasuryValidators.s.sol').matchAll(/tokenURI:\s*"(data:application\/json;base64,[^"]+)"/g)].map((m) => m[1])
const renumber = new Map(
  [...src('FixTreasuryNumbers.s.sol').matchAll(/setTokenURI\((\d+),\s*"(data:application\/json;base64,[^"]+)"\)/g)]
    .map((m) => [Number(m[1]), m[2]]),
)

const byCchainId = new Map(reg.tokens.map((r) => [r.cchainId, r]))
const meta = (u) => JSON.parse(Buffer.from(u.split(',')[1], 'base64').toString('utf8'))
const art = (j) => Buffer.from(j.image.split(',')[1], 'base64').toString('utf8')
const footerOf = (j) => art(j).match(/fill="#5c6580">([^<]*)</)[1]
const traitOf = (j, t) => j.attributes.find((a) => a.trait_type === t)?.value

const bad = []
let exact = 0
const mustMatch = (label, want, row) => {
  if (tokenURI(row) === want) { exact++; return }
  bad.push(`${label}: ${row.name} — regenerated payload differs from the deployed one`)
}

// 1. The 50 migrated tokens, C-Chain ids 0..49 <-> Ethereum tokenIds 1..50.
migrated.forEach((uri, i) => mustMatch('SetNftURIs', uri, byCchainId.get(i)))
// 2. The 68 treasury mints, rendered at the serial they were MINTED with
//    (nine of those were wrong and got renumbered in step 3).
treasury.forEach((uri, k) => {
  const row = byCchainId.get(50 + k)
  mustMatch('MintTreasuryValidators', uri, row.mintedAs
    ? { ...row, serial: row.mintedAs, name: `Lux Genesis Validator #${row.mintedAs}` }
    : row)
})

// 3. The 9 renumbers — pin the defect, and prove the renderer corrects it.
let pinned = 0
for (const [cchainId, uri] of renumber) {
  const row = byCchainId.get(cchainId)
  const was = meta(uri)
  const now = meta(tokenURI(row))
  const want = `renumber cchainId ${cchainId} -> #${row.serial}`
  // Deployed: name renumbered, trait + art left stale at #33.
  if (was.name !== row.name) bad.push(`${want}: deployed name ${was.name} != registry ${row.name}`)
  if (traitOf(was, 'Validator No') !== 33) bad.push(`${want}: expected the pinned stale trait 33, got ${traitOf(was, 'Validator No')}`)
  if (footerOf(was) !== 'VALIDATOR #33 / 100') bad.push(`${want}: expected the pinned stale art "VALIDATOR #33 / 100", got "${footerOf(was)}"`)
  // Corrected: name, trait and art all agree on the canonical serial.
  if (now.name !== row.name) bad.push(`${want}: corrected name is ${now.name}`)
  if (traitOf(now, 'Validator No') !== row.serial) bad.push(`${want}: corrected trait is ${traitOf(now, 'Validator No')}`)
  if (footerOf(now) !== FOOTER.treasury(row.serial)) bad.push(`${want}: corrected art is "${footerOf(now)}"`)
  pinned++
}

if (bad.length) { console.error(`FAIL\n  ` + bad.join('\n  ')); process.exit(1) }
console.log(`OK  ${exact}/${migrated.length + treasury.length} deployed tokenURI payloads reproduced BYTE-FOR-BYTE`)
console.log(`    (${migrated.length} migrated + ${treasury.length} treasury mints)`)
console.log(`OK  ${pinned}/9 renumbered tokens pinned as deployed-defective (name renumbered, trait + art stale at #33)`)
console.log(`    and the renderer emits the corrected serial in name, trait AND artwork for all 9`)
