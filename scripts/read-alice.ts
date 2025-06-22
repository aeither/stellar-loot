import { readFileSync } from 'fs';
import { join } from 'path';
import toml from 'toml';
import bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@stellar/stellar-sdk';

// Path to Alice's TOML file
const aliceTomlPath = join(process.cwd(), 'contracts/nft/.stellar/identity/alice.toml');

try {
  // Read and parse the TOML file
  const aliceToml = readFileSync(aliceTomlPath, 'utf-8');
  const aliceConfig = toml.parse(aliceToml);
  
  // Extract the seed phrase (mnemonic)
  const mnemonic = aliceConfig.seed_phrase;
  
  if (!mnemonic) {
    throw new Error('No seed_phrase found in alice.toml');
  }
  
  console.log('🔍 Found mnemonic in alice.toml');
  console.log('📝 Mnemonic:', mnemonic);
  console.log('');
  
  // Convert mnemonic to seed
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // Derive Stellar's default BIP44 path: m/44'/148'/0'
  const derivationPath = "m/44'/148'/0'";
  const { key } = derivePath(derivationPath, seed.toString('hex'));
  
  // Create Stellar keypair from raw private key
  const keypair = Keypair.fromRawEd25519Seed(key);
  
  console.log('🔑 Generated Keypair:');
  console.log('Public Key:', keypair.publicKey());
  console.log('Secret Key:', keypair.secret());
  console.log('');
  
  // Create .env file with the secret key
  const envPath = join(process.cwd(), '.env');
  const envContent = `# Stellar Secret Key (generated from alice.toml)
STELLAR_SECRET_KEY=${keypair.secret()}
`;
  
  const fs = await import('fs');
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Created .env file with Alice\'s secret key');
  console.log('🔒 You can now run the NFT minting scripts:');
  console.log('   npx tsx scripts/nft2.ts');
  console.log('   npx tsx scripts/test-nft.ts');
  
} catch (error) {
  console.error('❌ Error reading alice.toml:', error);
  process.exit(1);
} 