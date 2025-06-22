import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@stellar/stellar-sdk';
import { readFileSync } from 'fs';
import { join } from 'path';
import toml from 'toml';

// Read mnemonic from Alice's TOML file
const aliceTomlPath = join(process.cwd(), 'contracts/nft/.stellar/identity/alice.toml');
const aliceToml = readFileSync(aliceTomlPath, 'utf-8');
const aliceConfig = toml.parse(aliceToml);
const mnemonic = aliceConfig.seed_phrase;

console.log('🔍 Using mnemonic from alice.toml');
console.log('📝 Mnemonic:', mnemonic);
console.log('');

// 1. Convert mnemonic to seed
const seed = bip39.mnemonicToSeedSync(mnemonic);

// 2. Derive Stellar's default BIP44 path: m/44'/148'/0'
const derivationPath = "m/44'/148'/0'";
const { key } = derivePath(derivationPath, seed.toString('hex'));

// 3. Create Stellar keypair from raw private key
const keypair = Keypair.fromRawEd25519Seed(key);

console.log('🔑 Generated Keypair:');
console.log('Public Key:', keypair.publicKey());
console.log('Secret Key:', keypair.secret());
