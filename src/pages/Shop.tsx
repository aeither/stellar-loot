import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";
import ChestOpening from "@/components/ChestOpening";
import { Package } from "lucide-react";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { useToast } from "@/hooks/use-toast";
import sorobanClient from "../lib/contracts/soroban_nft";

const Shop = () => {
  const [xlmBalance] = useState(1250.75);
  const [showChestOpening, setShowChestOpening] = useState(false);
  const { walletConnected, publicKey, isInitializing, signTransaction, signMessage } = useStellarWallet();
  const { toast } = useToast();

  const handleBuyPack = () => {
    setShowChestOpening(true);
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
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
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
                  <p className="text-4xl font-bold text-white">0.1 XLM</p>
                </div>
                
                {/* Buy Button */}
                <Button 
                  onClick={handleBuyPack}
                  className="w-full bg-white/20 border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60 transition-all duration-200 text-lg font-bold py-4 rounded-full backdrop-blur-sm"
                >
                  BUY NOW
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <Card className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">How it works</h3>
              <div className="space-y-2 text-white">
                <p>• Each pack contains 3 random cards</p>
                <p>• Cards can be duplicates</p>
                <p>• Collect card sets to earn XLM rewards</p>
                <p>• Check the Card Sets tab for available sets</p>
              </div>
            </CardContent>
          </Card>

          {/* Balance Info */}
          <Card className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-4 text-center">
              <p className="text-gray-300">
                Your balance: <span className="text-yellow-300 font-bold">{xlmBalance} XLM</span>
              </p>
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
