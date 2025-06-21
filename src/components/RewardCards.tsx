
import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RewardCards = () => {
  const completeSets = [
    {
      title: "Set 1 Complete",
      description: "NFT #1 + NFT #3",
      reward: "2 XLM",
      available: true,
      nfts: ["Dragon", "Phoenix"]
    },
    {
      title: "Set 2 Complete", 
      description: "NFT #2 + NFT #4",
      reward: "3 XLM",
      available: false,
      nfts: ["Wizard", "Knight"]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Complete Sets</h3>
      
      <div className="space-y-3">
        {completeSets.map((set, index) => (
          <Card 
            key={index} 
            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{set.title}</h4>
                    <p className="text-sm text-gray-300">{set.description}</p>
                    <p className="text-xs text-gray-400">{set.nfts.join(" + ")}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-300 mb-2">{set.reward}</p>
                  <Button 
                    size="sm" 
                    className={`${set.available 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : 'bg-gray-600 text-gray-300'
                    } font-bold`}
                    disabled={!set.available}
                  >
                    {set.available ? 'Claim' : 'Locked'}
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
