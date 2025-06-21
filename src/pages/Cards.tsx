
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import GameHeader from "@/components/GameHeader";
import BottomNav from "@/components/BottomNav";

const Cards = () => {
  const [xlmBalance] = useState(1250.75);
  
  const cards = [
    { 
      id: 1, 
      name: "Blue Whale", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 1
    },
    { 
      id: 2, 
      name: "Coral Reef", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 2
    },
    { 
      id: 3, 
      name: "Saturn", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 1
    },
    { 
      id: 4, 
      name: "Galaxy", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 1
    },
    { 
      id: 5, 
      name: "Forest", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 1
    },
    { 
      id: 6, 
      name: "Mountain", 
      image: "/lovable-uploads/359c75f6-7932-42bf-a1de-9a7f8af3345d.png",
      quantity: 1
    }
  ];

  const totalCards = cards.reduce((sum, card) => sum + card.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
      <div className="relative z-10 pb-24">
        <GameHeader xlmBalance={xlmBalance} notifications={0} />
        
        <div className="px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-yellow-300 drop-shadow-lg">MY COLLECTION</h1>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold shadow-lg border-2 border-yellow-300">
              {totalCards} Cards
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card) => (
              <Card 
                key={card.id}
                className="bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-900/90 backdrop-blur-sm border-2 border-slate-600/50 hover:border-yellow-400/60 hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl relative overflow-hidden"
              >
                <CardContent className="p-0 relative">
                  {/* Card Image */}
                  <div className="aspect-square bg-gradient-to-br from-purple-600 to-blue-600 rounded-t-lg relative overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Quantity Badge */}
                    {card.quantity > 1 && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-300">
                        x{card.quantity}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Name */}
                  <div className="p-4 bg-gradient-to-t from-slate-900/95 to-slate-800/90">
                    <h3 className="text-white font-bold text-center drop-shadow-lg text-lg">{card.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Cards;
