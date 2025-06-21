
import { Clock, Star, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RewardCards = () => {
  const rewards = [
    {
      title: "Daily Login Bonus",
      description: "Claim your daily jackpot",
      reward: "+100 XLM",
      timeLeft: "23h 45m",
      available: true,
      icon: Gift,
      gradient: "from-emerald-500 via-green-600 to-emerald-700",
      borderColor: "border-emerald-400",
      emoji: "🎰"
    },
    {
      title: "Weekly Challenge",
      description: "Complete 7 daily challenges",
      reward: "+500 XLM",
      progress: "5/7",
      icon: Star,
      gradient: "from-purple-500 via-pink-600 to-purple-700",
      borderColor: "border-purple-400",
      emoji: "🏆"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white drop-shadow-lg">💎 Available Rewards</h3>
      
      <div className="space-y-3">
        {rewards.map((reward, index) => (
          <Card 
            key={index} 
            className="bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 group-hover:from-white/20"></div>
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${reward.gradient} rounded-full flex items-center justify-center shadow-xl border-2 ${reward.borderColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30"></div>
                    <div className="text-xl relative z-10">{reward.emoji}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg drop-shadow-md">{reward.title}</h4>
                    <p className="text-sm text-gray-300 drop-shadow-sm">{reward.description}</p>
                    {reward.timeLeft && (
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-yellow-400 font-semibold">⏰ {reward.timeLeft}</span>
                      </div>
                    )}
                    {reward.progress && (
                      <div className="mt-1">
                        <span className="text-xs text-blue-400 font-semibold">📊 Progress: {reward.progress}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-300 border-2 border-yellow-400/50 mb-2 shadow-lg font-bold">
                    💰 {reward.reward}
                  </Badge>
                  <Button 
                    size="sm" 
                    className={`w-full ${reward.available 
                      ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-600 hover:via-orange-600 hover:to-yellow-700 text-black border-2 border-yellow-400 shadow-xl transform hover:scale-105' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-gray-300 border border-gray-500'
                    } transition-all duration-200 font-bold`}
                    disabled={!reward.available}
                  >
                    {reward.available ? '🎯 Claim' : '🔒 Locked'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardCards;
