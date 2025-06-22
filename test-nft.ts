import { rpc, Address, xdr, Keypair, scValToNative } from '@stellar/stellar-sdk';
import * as fs from 'fs';

// Configuration
const server = new rpc.Server('https://soroban-testnet.stellar.org:443');
const networkPassphrase = 'Test SDF Network ; September 2015';

// You'll need to replace this with your actual admin secret key
const adminSecretKey = 'SA...'; // Replace with your actual secret key
const adminKeypair = Keypair.fromSecret(adminSecretKey);

async function testNFT() {
  try {
    console.log('🚀 Starting NFT test...');
    console.log('Admin public key:', adminKeypair.publicKey());
    
    // Check if admin account exists and has balance
    console.log('📊 Checking admin account...');
    try {
      const account = await server.getAccount(adminKeypair.publicKey());
      console.log('✅ Admin account exists');
      console.log('💰 Account balance:', account.balances);
    } catch (error) {
      console.error('❌ Admin account not found or not funded');
      console.error('Please fund your account on testnet first');
      return;
    }

    // Deploy contract
    console.log('📦 Deploying NFT contract...');
    const wasmPath = './contract/target/wasm32-unknown-unknown/release/soroban_nft.wasm';
    
    if (!fs.existsSync(wasmPath)) {
      console.error('❌ WASM file not found at:', wasmPath);
      console.log('Please build the contract first with: stellar contract build');
      return;
    }
    
    const wasmBuffer = fs.readFileSync(wasmPath);
    const deployTx = await server.deployContract({
      wasm: wasmBuffer,
      source: adminKeypair,
      networkPassphrase
    });
    
    const contractId = deployTx.contractId;
    console.log('✅ Contract deployed successfully!');
    console.log('📋 Contract ID:', contractId);

    // Wait for deployment to settle
    console.log('⏳ Waiting for deployment to settle...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Mint NFT
    console.log('🎨 Minting NFT...');
    const admin = Address.fromString(adminKeypair.publicKey());
    
    // Updated mint call
    const mintTx = await server.call({
      contractId,
      method: 'mint',
      args: [xdr.ScVal.scvAddress(admin.toXDR())],
      source: adminKeypair,
      networkPassphrase
    });
    
    console.log('✅ NFT minted successfully!');
    console.log('📋 Transaction hash:', mintTx.hash);

    // Wait for minting to settle
    console.log('⏳ Waiting for minting to settle...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Verify token count
    console.log('🔍 Verifying token count...');
    try {
      const tokenCount = await server.getContractData(
        contractId,
        xdr.ScVal.scvSymbol('TokenCount')
      );
      console.log('✅ Token count:', scValToNative(tokenCount));
    } catch (error) {
      console.log('⚠️ Could not verify token count:', error);
    }

    // Get NFT balance for admin
    console.log('💎 Checking NFT balance...');
    try {
      const balance = await server.call({
        contractId,
        method: 'balance',
        args: [xdr.ScVal.scvAddress(admin.toXDR())],
        source: adminKeypair,
        networkPassphrase
      });
      console.log('✅ NFT balance for admin:', scValToNative(balance.result));
    } catch (error) {
      console.log('⚠️ Could not check NFT balance:', error);
    }

    console.log('🎉 NFT test completed successfully!');
    
  } catch (error) {
    console.error('❌ NFT test failed:', error);
    
    // Error handling
    if (error.message?.includes('insufficient balance')) {
      console.log('💡 Tip: Make sure your account has enough XLM for transaction fees');
    } else if (error.message?.includes('not found')) {
      console.log('💡 Tip: Make sure your account is funded on testnet');
    } else if (error.message?.includes('WASM')) {
      console.log('💡 Tip: Make sure the contract is built: stellar contract build');
    }
  }
}

// Helper function to fund account on testnet
async function fundAccount(publicKey: string) {
  try {
    console.log('💰 Funding account on testnet...');
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${publicKey}`,
      { method: 'GET' }
    );
    
    if (response.ok) {
      console.log('✅ Account funded successfully!');
    } else {
      console.log('⚠️ Funding failed or account already funded');
    }
  } catch (error) {
    console.error('❌ Failed to fund account:', error);
  }
}

// Main execution
async function main() {
  console.log('🎯 NFT Minting Test Script');
  console.log('========================');
  
  if (adminSecretKey === 'SA...') {
    console.error('❌ Please update adminSecretKey with your actual secret key');
    console.log('💡 Generate new keypair: stellar keys generate');
    return;
  }
  
  await testNFT();
}

main().catch(console.error);
