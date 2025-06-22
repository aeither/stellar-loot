import { Keypair } from '@stellar/stellar-sdk';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Try to load secret key from environment variable first
let secretKey = process.env.STELLAR_SECRET_KEY;

// If not in environment, try to load from a local .env file
if (!secretKey) {
  const envPath = join(process.cwd(), '.env');
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf8');
    const match = envContent.match(/STELLAR_SECRET_KEY=(.+)/);
    if (match) {
      secretKey = match[1].trim();
    }
  }
}

// If still no secret key, prompt user (for development only)
if (!secretKey) {
  console.log('⚠️  No secret key found in environment variables or .env file');
  console.log('Please set STELLAR_SECRET_KEY environment variable or create a .env file');
  console.log('Example: STELLAR_SECRET_KEY=SCJSPCKSNIPIKCPJECVUKQKO6C5ZFEQ3JJXZWZUEO4T3UARZIPLA23N7');
  process.exit(1);
}

// Validate the secret key format
if (!secretKey.startsWith('S')) {
  console.error('❌ Invalid secret key format. Must start with "S"');
  process.exit(1);
}

// Create and export the keypair
export const aliceKeypair = Keypair.fromSecret(secretKey);

// Export public key for reference (safe to log)
export const publicKey = aliceKeypair.publicKey();

// Configuration object
export const config = {
  contractId: 'CCG7MCOQKQACBW5VLQ7UQXTLG6P7JFOYGGE3IKQZNDAWGPVMAF4GADBD',
  recipient: 'GCCOBOTHO6DFOTQ6PELRDG3GG4TDDNQL7KMJSHZOMGIVPTWJJGZY4ERO',
  rpcUrl: 'https://soroban-testnet.stellar.org:443',
  networkPassphrase: 'Test SDF Network ; September 2015'
};

console.log('🔑 Using public key:', publicKey);
console.log('📋 Contract ID:', config.contractId);
console.log('🎯 Recipient:', config.recipient); 