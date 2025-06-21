
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CollectionPreview = () => {
  const cards = [
    { id: 1, name: "Lightning Bolt", rarity: "Rare", color: "from-yellow-400 to-orange-500" },
    { id: 2, name: "Ice Crystal", rarity: "Epic", color: "from-blue-400 to-cyan-500" },
    { id: 3, name: "Fire Dragon", rarity: "Legendary", color: "from-red-500 to-pink-600" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Your Collection</h3>
        <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            className="min-w-[120px] bg-white/10 backdrop-blur-sm border-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <CardContent className="p-3">
              <div className={`w-full h-20 bg-gradient-to-br ${card.color} rounded-lg mb-2 flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
              <p className="text-xs font-medium text-white truncate">{card.name}</p>
              <p className="text-xs text-gray-400">{card.rarity}</p>
            </CardContent>
          </Card>
        ))}
        
        {/* Add New Card */}
        <Card className="min-w-[120px] bg-white/5 backdrop-blur-sm border-2 border-dashed border-gray-500 hover:border-purple-400 transition-colors duration-200 cursor-pointer">
          <CardContent className="p-3 flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center mb-2">
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </div>
            <p className="text-xs text-gray-400 text-center">Get More Cards</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionPreview;
