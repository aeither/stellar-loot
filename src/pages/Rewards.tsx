import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";
import { Trophy } from "lucide-react";

const Rewards = () => {
  const [xlmBalance] = useState(1250.75);
  
  const cardSets = [
    {
      title: "Fresh Vegetables Set",
      reward: "5 XLM",
      status: "ready", // ready, incomplete, claimed
      requiredCards: [
        { name: "Tomato", image: "/images/tomato.jpeg", collected: true },
        { name: "Eggplant", image: "/images/eggplant.jpeg", collected: true }
      ]
    },
    {
      title: "Garden Salad Set", 
      reward: "4 XLM",
      status: "incomplete",
      requiredCards: [
        { name: "Tomato", image: "/images/tomato.jpeg", collected: true },
        { name: "Cucumber", image: "/images/cucumber.jpeg", collected: false }
      ]
    },
    {
      title: "Purple Harvest Set",
      reward: "3 XLM", 
      status: "claimed",
      requiredCards: [
        { name: "Eggplant", image: "/images/eggplant.jpeg", collected: true },
        { name: "Cucumber", image: "/images/cucumber.jpeg", collected: true }
      ]
    },
    {
      title: "Red & Green Set",
      reward: "2 XLM",
      status: "incomplete", 
      requiredCards: [
        { name: "Tomato", image: "/images/tomato.jpeg", collected: true },
        { name: "Cucumber", image: "/images/cucumber.jpeg", collected: false }
      ]
    }
  ];

  const readyToClaimCount = cardSets.filter(set => set.status === 'ready').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
        <div className="px-6 py-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <h1 className="text-3xl font-bold text-yellow-300">CARD SETS</h1>
              {readyToClaimCount > 0 && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">{readyToClaimCount} READY</span>
                </div>
              )}
            </div>
          </div>

          {/* Ready to Claim Section */}
          {cardSets.filter(set => set.status === 'ready').length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-yellow-300 mb-4 text-center">READY TO CLAIM</h2>
              <div className="space-y-4">
                {cardSets.filter(set => set.status === 'ready').map((set, index) => (
                  <Card key={index} className="bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-sm border-2 border-yellow-400/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{set.title}</h3>
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full">
                          <span className="font-bold">{set.reward}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">Required Cards:</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {set.requiredCards.map((card, cardIndex) => (
                          <div key={cardIndex} className={`aspect-square rounded-lg flex items-center justify-center overflow-hidden ${card.collected ? 'bg-gradient-to-br from-blue-500 to-teal-500' : 'bg-gray-600/50 border-2 border-dashed border-gray-500'}`}>
                            {card.collected ? (
                              <img 
                                src={card.image} 
                                alt={card.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-semibold text-center text-sm">{card.name}</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 text-lg">
                        CLAIM
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Incomplete Sets Section */}
          <div>
            <h2 className="text-xl font-bold text-yellow-300 mb-4 text-center">COLLECT MORE CARDS</h2>
            <div className="space-y-4">
              {cardSets.filter(set => set.status === 'incomplete').map((set, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{set.title}</h3>
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full">
                        <span className="font-bold">{set.reward}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">Required Cards:</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {set.requiredCards.map((card, cardIndex) => (
                        <div key={cardIndex} className={`aspect-square rounded-lg flex items-center justify-center overflow-hidden ${card.collected ? 'bg-gradient-to-br from-blue-500 to-teal-500' : 'bg-gray-600/50 border-2 border-dashed border-gray-500'}`}>
                          {card.collected ? (
                            <img 
                              src={card.image} 
                              alt={card.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-semibold text-center text-sm">{card.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gray-600 text-gray-300 font-bold py-3 text-lg" disabled>
                      INCOMPLETE
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Sets Section */}
          {cardSets.filter(set => set.status === 'claimed').length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-yellow-300 mb-4 text-center">COMPLETED</h2>
              <div className="space-y-4">
                {cardSets.filter(set => set.status === 'claimed').map((set, index) => (
                  <Card key={index} className="bg-green-600/20 backdrop-blur-sm border border-green-400/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{set.title}</h3>
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full">
                          <span className="font-bold">{set.reward}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">Required Cards:</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {set.requiredCards.map((card, cardIndex) => (
                          <div key={cardIndex} className={`aspect-square rounded-lg flex items-center justify-center overflow-hidden ${card.collected ? 'bg-gradient-to-br from-blue-500 to-teal-500' : 'bg-gray-600/50 border-2 border-dashed border-gray-500'}`}>
                            {card.collected ? (
                              <img 
                                src={card.image} 
                                alt={card.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-semibold text-center text-sm">{card.name}</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full bg-gray-700 text-gray-400 font-bold py-3 text-lg" disabled>
                        CLAIMED
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rewards;
