import StellarSdk from "@stellar/stellar-sdk";

// Generate a new keypair
export function generateKeypair() {
  const pair = StellarSdk.Keypair.random();
  return {
    publicKey: pair.publicKey(),
    secretKey: pair.secret(),
  };
}

// Fund the new account on testnet using Friendbot
export async function fundTestnetAccount(publicKey: string) {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
  );
  return response.json();
}

// Get account balance
export async function getAccountBalance(publicKey: string, network: 'testnet' | 'public' = 'testnet') {
  const server = network === 'testnet' 
    ? new StellarSdk.Server('https://horizon-testnet.stellar.org')
    : new StellarSdk.Server('https://horizon.stellar.org');
  
  try {
    const account = await server.loadAccount(publicKey);
    return account.balances;
  } catch (error) {
    console.error('Error loading account:', error);
    return null;
  }
}

// Send payment
export async function sendPayment(
  secretKey: string,
  destinationPublicKey: string,
  amount: string,
  asset: string = 'XLM',
  network: 'testnet' | 'public' = 'testnet'
) {
  const server = network === 'testnet' 
    ? new StellarSdk.Server('https://horizon-testnet.stellar.org')
    : new StellarSdk.Server('https://horizon.stellar.org');
  
  const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
  
  try {
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
    
    let paymentAsset;
    if (asset === 'XLM') {
      paymentAsset = StellarSdk.Asset.native();
    } else {
      // For custom assets, you would need to specify the issuer
      throw new Error('Custom assets not implemented yet');
    }
    
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: network === 'testnet' 
        ? StellarSdk.Networks.TESTNET 
        : StellarSdk.Networks.PUBLIC,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: paymentAsset,
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();
    
    transaction.sign(sourceKeypair);
    
    const result = await server.submitTransaction(transaction);
    return result;
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
} 