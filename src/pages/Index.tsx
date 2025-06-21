
import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GameHeader from "@/components/GameHeader";
import QuickActions from "@/components/QuickActions";
import CollectionPreview from "@/components/CollectionPreview";
import RewardCards from "@/components/RewardCards";
import BottomNav from "@/components/BottomNav";
import ChestOpening from "@/components/ChestOpening";

const Index = () => {
  const [xlmBalance] = useState(1250.45);
  const [newRewards] = useState(2);
  const [showChestOpening, setShowChestOpening] = useState(false);

  const handleOpenChest = () => {
    setShowChestOpening(true);
  };

  const handleCloseChest = () => {
    setShowChestOpening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-20">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Welcome Section */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-purple-200">Collect NFTs and earn XLM</p>
          </div>

          {/* Quick Actions */}
          <QuickActions newRewards={newRewards} onOpenChest={handleOpenChest} />

          {/* Pack Purchase Card */}
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white">NFT Pack</h3>
              </div>
              <p className="text-purple-100 mb-4">Get 3 random NFT cards</p>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-yellow-300">0.1 XLM</p>
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Buy Pack
              </Button>
            </CardContent>
          </Card>

          {/* Collection Preview */}
          <CollectionPreview />

          {/* Reward Cards */}
          <RewardCards />
        </div>
      </div>

      <BottomNav />
      
      {showChestOpening && <ChestOpening onClose={handleCloseChest} />}
    </div>
  );
};

export default Index;
