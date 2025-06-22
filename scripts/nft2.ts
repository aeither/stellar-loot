import {
    Contract,
    rpc as StellarRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    xdr,
    Address
  } from "@stellar/stellar-sdk";
import { aliceKeypair, config } from './config.js';
  
  (async () => {
    // Set up the Soroban RPC server
    const server = new StellarRpc.Server(config.rpcUrl);
  
    // Contract details
    const contract = new Contract(config.contractId);
  
    // Fetch Alice's account from the network
    const sourceAccount = await server.getAccount(aliceKeypair.publicKey());
  
    // Convert recipient address to ScAddress
    const recipientAddress = new Address(config.recipient).toScAddress();
  
    // Build the transaction to call the "mint" function with the "to" argument
    let tx = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        contract.call("mint", xdr.ScVal.scvAddress(recipientAddress))
      )
      .setTimeout(30)
      .build();
  
    // Prepare the transaction (simulate, get footprint, etc.)
    tx = await server.prepareTransaction(tx);
  
    // Sign with Alice's keypair
    tx.sign(aliceKeypair);
  
    // Submit the transaction
    try {
      const sendResponse = await server.sendTransaction(tx);
      console.log("✅ Sent transaction:", sendResponse.hash);
  
      if (sendResponse.status === "PENDING") {
        let getResponse = await server.getTransaction(sendResponse.hash);
        while (getResponse.status === "NOT_FOUND") {
          console.log("⏳ Waiting for transaction confirmation...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          getResponse = await server.getTransaction(sendResponse.hash);
        }
        
        if (getResponse.status === "SUCCESS") {
          console.log("🎉 Mint successful!");
          console.log("📊 Transaction hash:", getResponse.txHash);
          console.log("🔗 View on explorer: https://stellar.expert/explorer/testnet/tx/" + getResponse.txHash);
        } else {
          console.error("❌ Transaction failed:", getResponse.resultXdr);
        }
      } else {
        console.error("❌ Submission failed:", sendResponse.errorResult);
      }
    } catch (err) {
      console.error("💥 Sending transaction failed", err);
    }
  })();
  