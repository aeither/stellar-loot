import BottomNav from "@/components/BottomNav";
import GameHeader from "@/components/GameHeader";
import QuickActions from "@/components/QuickActions";
import { Card, CardContent } from "@/components/ui/card";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import sorobanClient from "../lib/contracts/soroban_nft";

const Index = () => {
  const [xlmBalance] = useState(1250.75);
  const { walletConnected, publicKey, isInitializing, signTransaction, signMessage } = useStellarWallet();
  const { toast } = useToast();

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
                  <p>Buy card packs for 10 XLM each</p>
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
