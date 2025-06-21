
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";
import { ShoppingBag, Zap } from "lucide-react";

const Shop = () => {
  const [xlmBalance] = useState(1250.75);
  
  const packs = [
    {
      id: 1,
      name: "Basic Pack",
      price: "0.1 XLM",
      cards: 3,
      rarity: "Common",
      color: "from-blue-600 to-purple-600",
      description: "3 random cards"
    },
    {
      id: 2,
      name: "Premium Pack",
      price: "0.3 XLM",
      cards: 5,
      rarity: "Rare",
      color: "from-purple-600 to-pink-600",
      description: "5 cards with guaranteed rare"
    },
    {
      id: 3,
      name: "Ultra Pack",
      price: "0.5 XLM",
      cards: 8,
      rarity: "Epic",
      color: "from-orange-600 to-red-600",
      description: "8 cards with guaranteed epic"
    }
  ];

  const handleBuyPack = (pack: typeof packs[0]) => {
    console.log(`Buying ${pack.name} for ${pack.price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
        <div className="px-6 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-300 mb-2">CARD SHOP</h1>
            <p className="text-gray-300">Purchase card packs to expand your collection</p>
          </div>

          {/* Pack Cards */}
          <div className="space-y-6">
            {packs.map((pack) => (
              <Card 
                key={pack.id}
                className="bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-sm border-2 border-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${pack.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <ShoppingBag className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{pack.name}</h3>
                        <p className="text-gray-300">{pack.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-yellow-300">{pack.cards} Cards</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-purple-300">{pack.rarity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-300 mb-3">{pack.price}</p>
                      <Button 
                        onClick={() => handleBuyPack(pack)}
                        className={`bg-gradient-to-r ${pack.color} hover:scale-110 transition-all duration-200 text-white font-bold px-6 py-3 rounded-xl shadow-lg`}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Balance Info */}
          <Card className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardContent className="p-4 text-center">
              <p className="text-gray-300">
                Your balance: <span className="text-yellow-300 font-bold">{xlmBalance} XLM</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Shop;
