
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import GameHeader from "@/components/GameHeader";
import QuickActions from "@/components/QuickActions";
import BottomNav from "@/components/BottomNav";
import sorobanClient from "../lib/contracts/soroban_nft";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { TransactionBuilder, Networks, Operation, Keypair, Horizon, xdr, nativeToScVal, BASE_FEE, Asset, Transaction } from "stellar-sdk";

const Index = () => {
  const [xlmBalance] = useState(1250.75);
  const { walletConnected, publicKey, isInitializing, signTransaction, signMessage } = useStellarWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />

        {/* Main Content */}
        <div className="px-6 space-y-8">
          {/* Welcome Section */}
          <div className="text-center py-4">
            <h1 className="text-2xl font-normal text-white mb-1">
              Welcome Back!
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Card Collector
            </h2>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-yellow-300 mb-4 text-center">QUICK ACTIONS</h3>
            <QuickActions onOpenChest={() => { }} />
          </div>

          <div className="text-center mt-4">
            <button
              className="px-4 py-2 bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400"
              onClick={async () => {
                try {
                  console.log("Button clicked!");

                  const server = new Horizon.Server("https://horizon-testnet.stellar.org");
                  const distributer = await server.loadAccount(publicKey);
                  const transferAmount = 100;

                  const transaction = new TransactionBuilder(distributer, {
                    fee: "10000000",
                    networkPassphrase: Networks.TESTNET,
                  })
                    .addOperation(
                      Operation.payment({
                        destination: "GB7JBARO6QML6YLPTBKHA3JBG7WOEFTDN4EW2L42CSQJJIOXIFMGHTID", // funds receiving wallet address
                        asset: Asset.native(),
                        amount: transferAmount.toString()
                      })
                    )
                    .setTimeout(300)
                    .build().toXDR();

                const signedXDR = await signTransaction(transaction);
                const sendResponse2 = await server.submitTransaction(new Transaction(signedXDR.signedTxXdr, Networks.TESTNET));

                  console.log("Transaction sent successfully:", sendResponse2);
                  ///tercera prueba

                  /*
                  const server = new Horizon.Server("https://horizon-testnet.stellar.org");
                  const activePubKey = publicKey;
                  const receiver = await server.loadAccount(activePubKey);

                  const transaction = new TransactionBuilder(receiver, {
                    fee: BASE_FEE,
                    networkPassphrase: Networks.TESTNET,
                  })
                    .addOperation(
                      Operation.invokeContractFunction({
                        function: "mint",
                        contract: "CBSJ47IYRYLOILMTSOXQVOPP56LLLPU47DY6AOTFUIE7IP4UEMXVOGME",
                        args: [
                          nativeToScVal(activePubKey, { type: 'address' })
                        ],
                      })
                    ).setTimeout(30).build();

                  const signedXDR = await signTransaction(transaction.toXDR());

                  const signedTransaction = await TransactionBuilder.fromXDR(
                    signedXDR.signedTxXdr,
                    Networks.TESTNET
                  );
                  console.log("Signed transaction:", signedTransaction);
                  
                  console.log("Signed transaction XDR:", signedTransaction.toXDR());


                  //const tx = TransactionBuilder.fromXDR(signedXDR, "Test SDF Network ; September 2015");
                  const sendResponse = await server.submitTransaction(signedTransaction);
                  console.log('Send response:', sendResponse);
                  */
                  /* tampoco va
                  //const StellarSdk = require("stellar-sdk");
                  const server = new Horizon.Server("https://horizon-testnet.stellar.org");

                  const account = await server.loadAccount(publicKey); // Load the account details
                  console.log("Account loaded:", account);
                  const transaction = new TransactionBuilder(account, {
                    fee: BASE_FEE,
                    networkPassphrase: Networks.TESTNET,
                  })
                    .addOperation(
                      Operation.invokeContractFunction({
                        function: "mint",
                        contract: "CBSJ47IYRYLOILMTSOXQVOPP56LLLPU47DY6AOTFUIE7IP4UEMXVOGME",
                        args: [
                          nativeToScVal(publicKey, { type: 'address' })
                        ],
                      })
                    )
                    .setTimeout(0)
                    .build();
                  console.log("Transaction built:", transaction.toXDR());

                  // Sign the transaction
                  const signedTransaction = await signTransaction(transaction.toXDR());
                  console.log("Transaction signed:", signedTransaction);

                  const jwtToken = "tgwBWa4plZe7IKqhsVBZlg_hP8zw8hsiykJqlaG09og";

                  // Submit the transaction
                  const signedXDR = signedTransaction.signedTxXdr;
                  const postResponse = await fetch("https://testnet.launchtube.xyz", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({ xdr: signedXDR }),
                  });

                  if (postResponse.ok) {
                    const result = await postResponse.json();
                    console.log("Transaction submitted successfully:", result);
                  } else {
                    console.error("Failed to submit transaction:", postResponse.statusText);
                  }
                  
                  */

                  // VIEJO NO SIRVE
                  // Mint the transaction
                  sorobanClient.options.publicKey = publicKey;
                  const response = await sorobanClient.mint({ to: publicKey });

                  console.log("Minting transaction response:", response.result);

                  // Set the public key for signing

                  //console.log("Minting transaction response:", response);
                  //console.log("Mint response:", response.toXDR());
                  // Sign the transaction
                  // const signedResponse = await signTransaction(response.toXDR());
                  //signedResponse.signerAddress = publicKey; 
                  //console.log("Transaction signed:", signedResponse);

                  // JWT token (replace with your actual token)
                  const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZDA5N2VkMWE1M2E5NmMyY2ExN2FlMjEyODRkNTUzMDMzNzRiYmEwZWFlN2M1ZTc5ZDc1NmJjYmQ2ZjFiNDJhIiwiZXhwIjoxNzU3ODM0OTc2LCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3NTA1NzczNzZ9.GpWqEyln70Ct34W8SC6hBP1lInypdX1x3mCKhuvbs6I";

                  const body = new FormData();
                  //body.append("xdr", signedResponse.signedTxXdr);
                  body.append("xdr", response.toXDR());

                  // Post the signed transaction to the specified URL
                  const postResponse = await fetch("https://testnet.launchtube.xyz", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${jwtToken}`, // Add JWT bearer token
                    },
                    body,
                  });

                  if (postResponse.ok) {
                    const result = await postResponse.json();
                    console.log("Transaction submitted successfully:", result.status);
                  } else {
                    console.error("Failed to submit transaction:", postResponse.statusText);
                  }
                  //*/
                } catch (error) {
                  console.error("Error occurred:", error);
                }

              }}
            >
              Open Chest
            </button>

            <button
              className="px-4 py-2 bg-yellow-300 text-black font-bold rounded hover:bg-yellow-400"
              onClick={async () => {
                try {
                  console.log("Read Button clicked!");

                  const image = await sorobanClient.tokens_of({ owner: publicKey });
                  console.log("Token image:", image);

                  const res = await image.result;
                  console.log("Image response:", res);

                } catch (error) {
                  console.error("Error occurred:", error);
                }

              }}
            >
              Read call
            </button>
          </div>


          {/* How to Play Instructions */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">HOW TO PLAY</h3>
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-yellow-300 mb-3">Collect & Earn</h4>
              </div>
              <div className="space-y-3 text-white">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p>Buy card packs for 0.1 XLM each</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p>Collect cards to complete sets</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p>Claim XLM rewards for completed sets</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p>Cards can be duplicates - collect them all!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
