
import { useState } from "react";
import { X, Sparkles, Star, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChestOpeningProps {
  onClose: () => void;
}

const ChestOpening = ({ onClose }: ChestOpeningProps) => {
  const [chestState, setChestState] = useState<'closed' | 'opening' | 'opened' | 'rewards'>('closed');

  const rewards = [
    { type: 'card', name: 'Lightning Bolt', rarity: 'Epic', color: 'from-purple-500 to-blue-500', icon: Sparkles },
    { type: 'card', name: 'Fire Dragon', rarity: 'Legendary', color: 'from-red-500 to-orange-500', icon: Star },
    { type: 'xlm', amount: 150, icon: Gem },
    { type: 'card', name: 'Ice Crystal', rarity: 'Rare', color: 'from-blue-400 to-cyan-500', icon: Sparkles }
  ];

  const handleChestClick = () => {
    if (chestState === 'closed') {
      setChestState('opening');
      setTimeout(() => setChestState('opened'), 1000);
      setTimeout(() => setChestState('rewards'), 2000);
    } else if (chestState === 'opened') {
      setChestState('rewards');
    }
  };

  const handleContinue = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Chest Animation */}
        {chestState !== 'rewards' && (
          <div className="text-center">
            <div
              onClick={handleChestClick}
              className={`relative mx-auto w-48 h-48 cursor-pointer transition-all duration-1000 ${
                chestState === 'opening' ? 'animate-bounce' : 'hover:scale-105'
              }`}
            >
              {/* Chest */}
              <div className={`w-full h-full bg-gradient-to-br from-amber-600 to-yellow-700 rounded-2xl border-4 border-yellow-500 shadow-2xl transition-all duration-1000 ${
                chestState === 'opened' ? 'transform rotate-12' : ''
              }`}>
                {/* Chest lid */}
                <div className={`absolute top-0 left-0 w-full h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-t-2xl border-b-2 border-yellow-600 transition-all duration-1000 ${
                  chestState === 'opened' ? 'transform -rotate-45 -translate-y-8' : ''
                }`}>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                
                {/* Chest body */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-amber-600 to-yellow-700 rounded-b-2xl">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-yellow-500 rounded-lg"></div>
                </div>

                {/* Sparkles when opening */}
                {chestState === 'opening' && (
                  <>
                    <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-yellow-300 animate-spin" />
                    <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-pink-300 animate-spin delay-300" />
                    <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-blue-300 animate-spin delay-700" />
                    <Sparkles className="absolute -bottom-4 -right-4 w-8 h-8 text-purple-300 animate-spin delay-500" />
                  </>
                )}

                {/* Glowing effect when opened */}
                {chestState === 'opened' && (
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-2xl animate-pulse"></div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              {chestState === 'closed' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Reward Chest</h2>
                  <p className="text-gray-300">Tap to open!</p>
                </div>
              )}
              {chestState === 'opening' && (
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2 animate-pulse">Opening...</h2>
                  <p className="text-gray-300">✨ Magic is happening! ✨</p>
                </div>
              )}
              {chestState === 'opened' && (
                <div>
                  <h2 className="text-2xl font-bold text-green-300 mb-2">Chest Opened!</h2>
                  <p className="text-gray-300">Tap anywhere to see your rewards</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rewards Display */}
        {chestState === 'rewards' && (
          <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-2 border-yellow-400/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">🎉 Rewards Obtained! 🎉</h2>
                <p className="text-gray-300">Here's what you got:</p>
              </div>

              <div className="space-y-3 mb-6">
                {rewards.map((reward, index) => (
                  <Card 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border-0 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      {reward.type === 'card' ? (
                        <>
                          <div className={`w-12 h-12 bg-gradient-to-br ${reward.color} rounded-lg flex items-center justify-center`}>
                            <reward.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white">{reward.name}</p>
                            <Badge className={`text-xs ${
                              reward.rarity === 'Legendary' ? 'bg-orange-500' :
                              reward.rarity === 'Epic' ? 'bg-purple-500' : 'bg-blue-500'
                            }`}>
                              {reward.rarity}
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <reward.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white">+{reward.amount} XLM</p>
                            <p className="text-xs text-gray-300">Stellar Lumens</p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 shadow-lg"
              >
                Continue to Collection
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChestOpening;
