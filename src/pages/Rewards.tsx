
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";
import RewardCards from "@/components/RewardCards";
import { Trophy, Gift, Star } from "lucide-react";

const Rewards = () => {
  const [xlmBalance] = useState(1250.75);
  
  const dailyRewards = [
    {
      day: 1,
      reward: "0.05 XLM",
      claimed: true,
      icon: Gift
    },
    {
      day: 2,
      reward: "1 Basic Pack",
      claimed: true,
      icon: Gift
    },
    {
      day: 3,
      reward: "0.1 XLM",
      claimed: false,
      icon: Gift
    },
    {
      day: 4,
      reward: "1 Premium Pack",
      claimed: false,
      icon: Star
    },
    {
      day: 5,
      reward: "0.2 XLM",
      claimed: false,
      icon: Trophy
    }
  ];

  const achievements = [
    {
      title: "First Collection",
      description: "Collect your first card",
      reward: "0.05 XLM",
      completed: true
    },
    {
      title: "Pack Hunter",
      description: "Open 10 card packs",
      reward: "0.1 XLM",
      completed: false,
      progress: "3/10"
    },
    {
      title: "Set Master",
      description: "Complete your first set",
      reward: "0.5 XLM",
      completed: false,
      progress: "0/1"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
        <div className="px-6 py-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-yellow-300 mb-2">REWARDS</h1>
            <p className="text-gray-300">Claim your daily rewards and achievements</p>
          </div>

          {/* Daily Rewards */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Gift className="w-6 h-6 mr-2 text-yellow-300" />
              Daily Rewards
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {dailyRewards.map((reward, index) => {
                const IconComponent = reward.icon;
                return (
                  <Card 
                    key={index}
                    className={`${reward.claimed 
                      ? 'bg-green-600/20 border-green-400/30' 
                      : reward.day === 3 
                      ? 'bg-yellow-600/20 border-yellow-400/30' 
                      : 'bg-white/10 border-white/20'
                    } backdrop-blur-sm border-2 transition-all duration-300`}
                  >
                    <CardContent className="p-3 text-center">
                      <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                        reward.claimed ? 'text-green-400' : 
                        reward.day === 3 ? 'text-yellow-400' : 'text-gray-400'
                      }`} />
                      <p className="text-xs font-bold text-white">Day {reward.day}</p>
                      <p className="text-xs text-gray-300">{reward.reward}</p>
                      {reward.day === 3 && (
                        <Button size="sm" className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black text-xs py-1 px-2">
                          Claim
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-300" />
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <Card 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          achievement.completed 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-br from-gray-600 to-gray-700'
                        }`}>
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{achievement.title}</h4>
                          <p className="text-sm text-gray-300">{achievement.description}</p>
                          {achievement.progress && (
                            <p className="text-xs text-yellow-300">{achievement.progress}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-yellow-300 mb-2">{achievement.reward}</p>
                        <Button 
                          size="sm" 
                          className={`${achievement.completed 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gray-600 text-gray-300'
                          } font-bold`}
                          disabled={!achievement.completed}
                        >
                          {achievement.completed ? 'Claim' : 'Locked'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Set Completion Rewards */}
          <RewardCards />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rewards;
