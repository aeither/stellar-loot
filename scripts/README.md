# Stellar Scripts

This directory contains scripts for interacting with Stellar and Soroban contracts.

## 🔐 Security Setup

**IMPORTANT**: Never commit your secret keys to version control!

### Quick Setup (Recommended)
```bash
# Read Alice's mnemonic from contracts/nft/.stellar/identity/alice.toml
npx tsx scripts/read-alice.ts
```
This will automatically read Alice's mnemonic from the TOML file and create a secure `.env` file.

### Alternative Setup Options

#### Option 1: Manual Environment Setup
```bash
npx tsx scripts/setup-env.ts
```
Interactive setup for your secret key.

#### Option 2: Environment Variable
```bash
export STELLAR_SECRET_KEY=SCJSPCKSNIPIKCPJECVUKQKO6C5ZFEQ3JJXZWZUEO4T3UARZIPLA23N7
```

#### Option 3: .env File
Create a `.env` file in the project root:
```bash
# Copy the example and replace with your actual secret key
cp .env.example .env
```

Then edit `.env` and add your secret key:
```
STELLAR_SECRET_KEY=SCJSPCKSNIPIKCPJECVUKQKO6C5ZFEQ3JJXZWZUEO4T3UARZIPLA23N7
```

## 📜 Available Scripts

### 1. Read Alice's Identity (Recommended)
```bash
npx tsx scripts/read-alice.ts
```
Reads Alice's mnemonic from `contracts/nft/.stellar/identity/alice.toml` and creates `.env` file.

### 2. Setup Environment
```bash
npx tsx scripts/setup-env.ts
```
Interactive setup for your secret key.

### 3. Generate Secret Key from Mnemonic
```bash
npx tsx scripts/phrase2secret.ts
```
Converts a mnemonic phrase to a Stellar keypair (now reads from alice.toml).

### 4. Mint NFT
```bash
npx tsx scripts/nft2.ts
```
Mints an NFT to the configured recipient address.

## 🔧 Configuration

All scripts use the shared configuration in `config.ts`:
- Contract ID: `CCG7MCOQKQACBW5VLQ7UQXTLG6P7JFOYGGE3IKQZNDAWGPVMAF4GADBD`
- Recipient: `GCCOBOTHO6DFOTQ6PELRDG3GG4TDDNQL7KMJSHZOMGIVPTWJJGZY4ERO`
- Network: Testnet
- RPC URL: `https://soroban-testnet.stellar.org:443`

## 🚀 Usage Example

1. Set up your environment using Alice's identity:
   ```bash
   npx tsx scripts/read-alice.ts
   ```

2. Run the minting script:
   ```bash
   npx tsx scripts/nft2.ts
   ```

3. Check the transaction on the explorer using the provided link.

## 🔍 Alice's Identity

The scripts can automatically read Alice's mnemonic from:
```
contracts/nft/.stellar/identity/alice.toml
```

This file contains:
```toml
seed_phrase = "fly decade banner tide country bundle club gorilla cage lab snake grunt size noble arm antenna grunt crumble resemble risk absent embark patrol when"
```

## ⚠️ Security Notes

- Never share your secret key
- Use testnet keys for development
- The `.env` file is automatically ignored by git
- Public keys are safe to share and are logged for reference
- Scripts will show your public key for verification but never log the secret key 