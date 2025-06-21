
import { Clock, Star, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const RewardCards = () => {
  const rewards = [
    {
      title: "Daily Login Bonus",
      description: "Claim your daily reward",
      reward: "+100 XLM",
      timeLeft: "23h 45m",
      available: true,
      icon: Gift,
      gradient: "from-emerald-500 to-green-600"
    },
    {
      title: "Weekly Challenge",
      description: "Complete 7 daily challenges",
      reward: "+500 XLM",
      progress: "5/7",
      icon: Star,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Available Rewards</h3>
      
      <div className="space-y-3">
        {rewards.map((reward, index) => (
          <Card 
            key={index} 
            className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/15 transition-colors duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${reward.gradient} rounded-full flex items-center justify-center`}>
                    <reward.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{reward.title}</h4>
                    <p className="text-sm text-gray-300">{reward.description}</p>
                    {reward.timeLeft && (
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-yellow-400">{reward.timeLeft}</span>
                      </div>
                    )}
                    {reward.progress && (
                      <div className="mt-1">
                        <span className="text-xs text-blue-400">Progress: {reward.progress}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 mb-2">
                    {reward.reward}
                  </Badge>
                  <Button 
                    size="sm" 
                    className={`w-full ${reward.available ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black' : 'bg-gray-600 hover:bg-gray-700 text-gray-300'}`}
                    disabled={!reward.available}
                  >
                    {reward.available ? 'Claim' : 'Locked'}
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
