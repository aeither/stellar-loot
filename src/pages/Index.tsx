
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

const Index = () => {
  const [xlmBalance] = useState(1250.45);
  const [notifications] = useState(3);
  const [newRewards] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 pb-20">
        <GameHeader xlmBalance={xlmBalance} notifications={notifications} />
        
        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Welcome Section */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Welcome Back, Player!
            </h1>
            <p className="text-purple-200">Ready for your next challenge?</p>
          </div>

          {/* Quick Actions */}
          <QuickActions newRewards={newRewards} />

          {/* Daily Challenge Card */}
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 border-0 shadow-xl">
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
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
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
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-xs text-gray-300">Total Score</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <Gift className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-xs text-gray-300">Cards Owned</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-0">
              <CardContent className="p-4 text-center">
                <Zap className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-xs text-gray-300">Win Streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
