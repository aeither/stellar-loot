
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  xlmBalance: number;
  notifications: number;
}

const GameHeader = ({ xlmBalance, notifications }: GameHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-black text-lg">
          T
        </div>
        <div>
          <h2 className="font-bold text-white">TriviaRush</h2>
          <p className="text-xs text-gray-300">Level 15</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-400/30">
          <p className="text-yellow-300 font-bold text-sm">
            {xlmBalance.toFixed(2)} XLM
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-white hover:bg-white/10"
        >
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 hover:bg-red-500 text-xs">
              {notifications}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
