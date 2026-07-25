// The ONE Genesis NFT metadata renderer.
//
// Every Genesis token's tokenURI is `data:application/json;base64,<json>` whose
// `image` is a fully on-chain SVG — no external host, so the C-Chain collection
// has none of the dead-media exposure the Ethereum set has.
//
// All 118 tokens are ONE 500x500 SVG template with four substitutions: an accent
// colour, a title, a subtitle, and the serial. The three deployed Solidity
// scripts materialised that template 127 times as ~450 KB of literal base64 —
// which is how a serial could silently collide (see MintTreasuryValidators's
// naive #33..#100 run). Deriving the metadata from `data/genesis-registry.json`
// removes that whole failure class: the serial exists in exactly one place.
//
// `scripts/verify-genesis-metadata.mjs` proves this renderer reproduces all 127
// deployed payloads byte-for-byte.

// Per-class card spec. `accent` strokes the frame and the mark; `glow` tints the
// radial wash behind it — they are an independent designer-chosen pair, not one
// derived from the other. This table plus the registry's `tier` field are the
// only class knowledge in the repo.
export const CLASSES = {
  'GENESIS VALIDATOR': { tier: 'GenesisValidator(1B)', type: 'VALIDATOR', accent: '#f5b642', glow: '#7c5cff', subtitle: 'Founding Node' },
  'GENESIS COIN': { tier: 'Coin(1B)', type: 'COIN', accent: '#7c5cff', glow: '#22d3ee', subtitle: '1,000,000,000 LUX' },
  'VALIDATOR COIN': { tier: 'Coin(100M)', type: 'COIN', accent: '#22d3ee', glow: '#7c5cff', subtitle: '100,000,000 LUX' },
  'MINI COIN': { tier: 'Coin(10M)', type: 'COIN', accent: '#34d399', glow: '#22d3ee', subtitle: '10,000,000 LUX' },
  'NANO COIN': { tier: 'Coin(1M)', type: 'COIN', accent: '#f472b6', glow: '#7c5cff', subtitle: '1,000,000 LUX' },
}

export const DESCRIPTION = {
  ethereum:
    'Genesis Lux Network NFT — migrated 1:1 from the original Ethereum lux.town collection ' +
    '(0x31e0F919C67ceDd2Bc3E294340Dc900735810311). Fully on-chain art; self-contained forever.',
  treasury:
    'Genesis Lux Network validator NFT — part of the 100-validator founding set. ' +
    'Held by the Lux DAO treasury pending reconciliation. Fully on-chain art.',
}

// The card footer states provenance: a migrated token is stamped with its
// Genesis serial, a treasury-minted validator with its slot out of the 100.
export const FOOTER = {
  ethereum: (serial) => `GENESIS #${serial}`,
  treasury: (serial) => `VALIDATOR #${serial} / 100`,
}

const EXTERNAL_URL = 'https://lux.build'
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64')

export function svg({ accent, glow, title, subtitle, footer }) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">' +
    '<defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#0a0e1a"/><stop offset="1" stop-color="#141c33"/></linearGradient>' +
    '<radialGradient id="g" cx="0.5" cy="0.38" r="0.6">' +
    `<stop offset="0" stop-color="${glow}" stop-opacity="0.28"/>` +
    `<stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient></defs>` +
    '<rect width="500" height="500" fill="url(#b)"/><rect width="500" height="500" fill="url(#g)"/>' +
    `<rect x="14" y="14" width="472" height="472" rx="26" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>` +
    '<g transform="translate(250 176)">' +
    `<path d="M0 -72 L62 0 L0 72 L-62 0 Z" fill="none" stroke="${accent}" stroke-width="4"/>` +
    `<path d="M0 -44 L38 0 L0 44 L-38 0 Z" fill="${accent}" fill-opacity="0.14"/>` +
    `<path d="M0 -20 L18 0 L0 20 L-18 0 Z" fill="${accent}"/></g>` +
    '<text x="250" y="316" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="34" ' +
    `font-weight="700" fill="#ffffff" letter-spacing="2">${title}</text>` +
    '<text x="250" y="352" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="18" ' +
    `fill="${accent}" letter-spacing="1">${subtitle}</text>` +
    '<text x="250" y="430" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="15" ' +
    'fill="#8a94ad" letter-spacing="3">LUX NETWORK</text>' +
    '<text x="250" y="458" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13" ' +
    `fill="#5c6580">${footer}</text></svg>`
  )
}

// Compact separators + \uXXXX escaping for every non-ASCII code point — the
// serialization the deployed payloads use. Reproducing it exactly is what makes
// the byte-for-byte equivalence proof possible.
const encode = (o) =>
  JSON.stringify(o).replace(/[-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))

// One registry row -> its complete tokenURI. Class comes from `row.tier`, never
// from parsing `row.name` — the display name varies by origin, the class does not.
export function tokenURI(row) {
  const cls = CLASSES[row.tier]
  if (!cls) throw new Error(`unknown tier ${JSON.stringify(row.tier)} for ${row.name}`)
  const image = 'data:image/svg+xml;base64,' + b64(svg({
    accent: cls.accent, glow: cls.glow, title: row.tier, subtitle: cls.subtitle,
    footer: FOOTER[row.origin](row.serial),
  }))
  const attributes = [
    { trait_type: 'Class', value: row.tier },
    { trait_type: 'Tier', value: cls.tier },
    { trait_type: 'Type', value: cls.type },
    ...(row.origin === 'ethereum'
      ? [{ trait_type: 'Origin Chain', value: 'Ethereum' }, { trait_type: 'Origin Token ID', value: row.ethTokenId }]
      : [{ trait_type: 'Validator No', value: row.serial }, { trait_type: 'Origin', value: 'Treasury-minted' }]),
  ]
  return 'data:application/json;base64,' + b64(encode({
    name: row.name, description: DESCRIPTION[row.origin], image, external_url: EXTERNAL_URL, attributes,
  }))
}
