
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CollectionPreview = () => {
  const cards = [
    { id: 1, name: "Lightning Bolt", rarity: "Rare", color: "from-yellow-400 via-orange-500 to-red-500", emoji: "⚡" },
    { id: 2, name: "Ice Crystal", rarity: "Epic", color: "from-blue-400 via-cyan-500 to-teal-500", emoji: "❄️" },
    { id: 3, name: "Fire Dragon", rarity: "Legendary", color: "from-red-500 via-pink-600 to-purple-600", emoji: "🐉" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">🃏 Your Collection</h3>
        <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            className="min-w-[130px] bg-gradient-to-br from-white/10 via-white/5 to-black/20 backdrop-blur-sm border-2 border-white/20 hover:scale-110 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 group-hover:from-white/20"></div>
            <CardContent className="p-3 relative z-10">
              <div className={`w-full h-24 bg-gradient-to-br ${card.color} rounded-lg mb-2 flex items-center justify-center shadow-xl border-2 border-white/30 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30"></div>
                <div className="text-3xl drop-shadow-lg relative z-10">{card.emoji}</div>
              </div>
              <p className="text-sm font-bold text-white truncate drop-shadow-md">{card.name}</p>
              <p className="text-xs text-yellow-300 font-semibold">{card.rarity}</p>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Card */}
        <Card className="min-w-[130px] bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-purple-600/20 backdrop-blur-sm border-2 border-dashed border-purple-400 hover:border-purple-300 hover:scale-110 transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 group-hover:from-white/10"></div>
          <CardContent className="p-3 flex flex-col items-center justify-center h-full relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/40 to-indigo-500/40 rounded-full flex items-center justify-center mb-2 shadow-lg border border-purple-400/50">
              <ArrowRight className="w-5 h-5 text-purple-300" />
            </div>
            <p className="text-xs text-purple-300 text-center font-semibold">Get More Cards</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionPreview;
