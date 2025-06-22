import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";
import ChestOpening from "@/components/ChestOpening";
import { Package, RefreshCw } from "lucide-react";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { useToast } from "@/hooks/use-toast";
import { TransactionBuilder, Networks, Operation, Asset, Transaction } from "@stellar/stellar-sdk";
import Server from "@stellar/stellar-sdk";
import sorobanClient from "../lib/contracts/soroban_nft";

const Shop = () => {
  const [showChestOpening, setShowChestOpening] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { walletConnected, publicKey, isInitializing, signTransaction, signMessage, xlmBalance, isLoadingBalance, refreshBalance } = useStellarWallet();
  const { toast } = useToast();

  const handleBuyPack = async () => {
    if (!walletConnected || !publicKey) {
      toast({
        title: "❌ Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough balance
    const currentBalance = parseFloat(xlmBalance);
    if (currentBalance < 10) {
      toast({
        title: "❌ Insufficient Balance",
        description: "You need at least 10 XLM to buy a card pack.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingPayment(true);

    try {
      console.log("Processing payment for card pack...");

      // Create payment transaction
      const server = new Server("https://horizon-testnet.stellar.org");
      const account = await server.loadAccount(publicKey);
      const paymentAmount = 10; // 10 XLM for the card pack

      const transaction = new TransactionBuilder(account, {
        fee: "10000000",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.payment({
            destination: "GB7JBARO6QML6YLPTBKHA3JBG7WOEFTDN4EW2L42CSQJJIOXIFMGHTID", // funds receiving wallet address
            asset: Asset.native(),
            amount: paymentAmount.toString()
          })
        )
        .setTimeout(300)
        .build().toXDR();

      // Show loading toast
      toast({
        title: "Processing Payment...",
        description: "Please approve the transaction in your wallet.",
      });

      // Sign the transaction
      const signedXDR = await signTransaction(transaction);
      
      // Submit the transaction
      const sendResponse = await server.submitTransaction(new Transaction(signedXDR.signedTxXdr, Networks.TESTNET));

      if (sendResponse.successful) {
        console.log("Payment successful:", sendResponse);
        
        // Show success toast
        toast({
          title: "✅ Payment Successful!",
          description: "You can now open your chest to get your rewards!",
        });

        // Refresh balance
        setTimeout(() => {
          refreshBalance();
        }, 2000);

        // Show the chest opening component
        setShowChestOpening(true);
      } else {
        console.error("Payment failed:", sendResponse);
        toast({
          title: "❌ Payment Failed",
          description: "Transaction was not successful. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "❌ Payment Error",
        description: "An error occurred while processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCloseChest = () => {
    setShowChestOpening(false);
  };

  const handleMint = async (): Promise<boolean> => {
    try {
      console.log("Minting NFT...");

      // Mint the transaction
      sorobanClient.options.publicKey = publicKey;
      const response = await sorobanClient.mint({ to: publicKey });

      console.log("Minting transaction response:", response);
      console.log("Mint response:", response.toXDR());

      // JWT token (replace with your actual token)
      const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjZDA5N2VkMWE1M2E5NmMyY2ExN2FlMjEyODRkNTUzMDMzNzRiYmEwZWFlN2M1ZTc5ZDc1NmJjYmQ2ZjFiNDJhIiwiZXhwIjoxNzU3ODM0OTc2LCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3NTA1NzczNzZ9.GpWqEyln70Ct34W8SC6hBP1lInypdX1x3mCKhuvbs6I";

      const body = new FormData();
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
        console.log("Transaction submitted successfully:", result);
        
        // Refresh the balance after successful mint
        setTimeout(() => {
          refreshBalance();
        }, 2000); // Wait 2 seconds for transaction to be processed
        
        return true;
      } else {
        console.error("Failed to submit transaction:", postResponse.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={parseFloat(xlmBalance) || 0} notifications={0} />
        
        <div className="px-6 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Card Shop</h1>
            <h2 className="text-xl font-semibold text-gray-300">Card Pack</h2>
          </div>

          {/* Single Pack Card */}
          <div className="max-w-sm mx-auto">
            <Card className="bg-gradient-to-br from-purple-800/60 via-purple-700/50 to-indigo-800/60 backdrop-blur-sm border-2 border-purple-400/30 shadow-2xl">
              <CardContent className="p-8 text-center">
                {/* Pack Icon */}
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
                  <Package className="w-12 h-12 text-white" />
                </div>
                
                {/* Pack Info */}
                <h3 className="text-2xl font-bold text-white mb-2">Basic Pack</h3>
                <p className="text-gray-200 mb-6">Get 3 random cards</p>
                
                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-white">10 XLM</p>
                </div>
                
                {/* Buy Button */}
                <Button 
                  onClick={handleBuyPack}
                  // disabled={isProcessingPayment || !walletConnected || parseFloat(xlmBalance) < 10}
                  className="w-full bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60 transition-all duration-200 text-lg font-bold py-4 rounded-full backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? "Processing..." : "BUY NOW"}
                </Button>
                
                {/* Balance warning */}
                {walletConnected && parseFloat(xlmBalance) < 10 && (
                  <p className="text-red-400 text-sm mt-2">
                    Insufficient balance. You need at least 10 XLM.
                  </p>
                )}
                
                {!walletConnected && (
                  <p className="text-yellow-400 text-sm mt-2">
                    Please connect your wallet to buy packs.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <Card className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">How it works</h3>
              <div className="space-y-2 text-white">
                <p>• Pay 10 XLM to purchase a card pack</p>
                <p>• Each pack contains 3 random cards</p>
                <p>• Cards can be duplicates</p>
                <p>• Collect card sets to earn XLM rewards</p>
                <p>• Check the Card Sets tab for available sets</p>
              </div>
            </CardContent>
          </Card>

          {/* Balance Info */}
          <Card className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-300">
                  Your balance: <span className="text-yellow-300 font-bold">
                    {isLoadingBalance ? "Loading..." : `${parseFloat(xlmBalance).toFixed(2)} XLM`}
                  </span>
                </p>
                <Button
                  onClick={refreshBalance}
                  disabled={isLoadingBalance}
                  variant="ghost"
                  size="sm"
                  className="text-yellow-300 hover:text-white hover:bg-white/10 p-2 rounded-full"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingBalance ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
      
      {showChestOpening && <ChestOpening onClose={handleCloseChest} onMint={handleMint} />}
    </div>
  );
};

export default Shop;
