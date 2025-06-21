
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Casino-style animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating coins */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl animate-bounce opacity-80 border-4 border-yellow-300"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl animate-bounce delay-1000 opacity-70 border-2 border-yellow-300"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl animate-bounce delay-2000 opacity-60 border-4 border-yellow-300"></div>
        <div className="absolute top-60 left-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce delay-500 opacity-75 border-2 border-yellow-300"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl animate-bounce delay-1500 opacity-80 border-3 border-yellow-300"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-90 shadow-lg"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-pink-300 rounded-full animate-pulse delay-700 opacity-80 shadow-lg"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300 opacity-85 shadow-md"></div>
        
        {/* Casino light beams */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/30 via-transparent to-transparent blur-sm"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-purple-400/30 via-transparent to-transparent blur-sm"></div>
      </div>

      {/* Depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-purple-900/20 pointer-events-none"></div>

      <div className="relative z-10 pb-20">
        <GameHeader xlmBalance={xlmBalance} notifications={notifications} />
        
        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Welcome Section with 3D effect */}
          <div className="text-center py-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
            <div className="relative">
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                  style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 165, 0, 0.3)' }}>
                🎰 Welcome Back, Player! 🎰
              </h1>
              <p className="text-purple-200 text-lg drop-shadow-lg">Ready for your next big win?</p>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions newRewards={newRewards} onOpenChest={handleOpenChest} />

          {/* Daily Challenge Card with 3D casino style */}
          <Card className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 border-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"></div>
            <CardContent className="p-6 text-center relative z-10">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-xl border-2 border-yellow-300">
                  <Zap className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">Daily Jackpot Challenge</h3>
              </div>
              <p className="text-emerald-100 mb-4 text-lg">Answer 10 questions for the jackpot!</p>
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="text-center bg-black/20 rounded-xl p-3 border border-emerald-400/30">
                  <p className="text-3xl font-bold text-yellow-300 drop-shadow-lg">7/10</p>
                  <p className="text-sm text-emerald-200">Progress</p>
                </div>
                <div className="text-center bg-black/20 rounded-xl p-3 border border-emerald-400/30">
                  <p className="text-3xl font-bold text-yellow-300 drop-shadow-lg">+500</p>
                  <p className="text-sm text-emerald-200">XLM Jackpot</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 text-black font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 border-2 border-yellow-400 text-lg py-3">
                🎯 Continue Challenge
              </Button>
            </CardContent>
          </Card>

          {/* Collection Preview */}
          <CollectionPreview />

          {/* Reward Cards */}
          <RewardCards />

          {/* Stats Section with 3D casino style */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-purple-600/80 to-indigo-700/80 backdrop-blur-sm border-2 border-purple-400/30 shadow-2xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
              <CardContent className="p-4 text-center relative z-10">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-yellow-300">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white drop-shadow-lg">1,247</p>
                <p className="text-xs text-gray-200">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-600/80 to-rose-700/80 backdrop-blur-sm border-2 border-pink-400/30 shadow-2xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
              <CardContent className="p-4 text-center relative z-10">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-yellow-300">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white drop-shadow-lg">23</p>
                <p className="text-xs text-gray-200">Cards Owned</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-600/80 to-cyan-700/80 backdrop-blur-sm border-2 border-blue-400/30 shadow-2xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"></div>
              <CardContent className="p-4 text-center relative z-10">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-yellow-300">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white drop-shadow-lg">12</p>
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
