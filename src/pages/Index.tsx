
import { useState } from "react";
import { Bell, Gift, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GameHeader from "@/components/GameHeader";
import QuickActions from "@/components/QuickActions";
import CollectionPreview from "@/components/CollectionPreview";
import RewardCards from "@/components/RewardCards";
import BottomNav from "@/components/BottomNav";
import ChestOpening from "@/components/ChestOpening";

const Index = () => {
  const [xlmBalance] = useState(1250.45);
  const [notifications] = useState(3);
  const [newRewards] = useState(2);
  const [showChestOpening, setShowChestOpening] = useState(false);

  const handleOpenChest = () => {
    setShowChestOpening(true);
  };

  const handleCloseChest = () => {
    setShowChestOpening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/40 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-400/25 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-60 left-1/2 w-20 h-20 bg-green-400/35 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-400/30 rounded-full blur-xl animate-pulse delay-1500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-pink-300/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-300/60 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none"></div>

      <div className="relative z-10 pb-20">
        <GameHeader xlmBalance={xlmBalance} notifications={notifications} />
        
        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Welcome Section */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
              Welcome Back, Player!
            </h1>
            <p className="text-purple-100">Ready for your next challenge?</p>
          </div>

          {/* Quick Actions */}
          <QuickActions newRewards={newRewards} onOpenChest={handleOpenChest} />

          {/* Daily Challenge Card */}
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 border-0 shadow-2xl">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-yellow-300 mr-2" />
                <h3 className="text-xl font-bold text-white">Daily Challenge</h3>
              </div>
              <p className="text-emerald-100 mb-4">Answer 10 questions correctly</p>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-300">7/10</p>
                  <p className="text-xs text-emerald-200">Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-300">+500</p>
                  <p className="text-xs text-emerald-200">XLM Reward</p>
                </div>
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg">
                Continue Challenge
              </Button>
            </CardContent>
          </Card>

          {/* Collection Preview */}
          <CollectionPreview />

          {/* Reward Cards */}
          <RewardCards />

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white/15 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-xs text-gray-200">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-white/15 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-xs text-gray-200">Cards Owned</p>
              </CardContent>
            </Card>
            <Card className="bg-white/15 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-xs text-gray-200">Win Streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
      
      {/* Chest Opening Modal */}
      {showChestOpening && <ChestOpening onClose={handleCloseChest} />}
    </div>
  );
};

export default Index;
