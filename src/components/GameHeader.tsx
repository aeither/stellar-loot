
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GameHeaderProps {
  xlmBalance: number;
  notifications: number;
}

const GameHeader = ({ xlmBalance, notifications }: GameHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-black/40 via-purple-900/40 to-black/40 backdrop-blur-lg border-b border-purple-500/30 shadow-2xl">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-black text-lg shadow-2xl border-3 border-yellow-300 transform hover:scale-110 transition-transform duration-200">
          🎰
        </div>
        <div>
          <h2 className="font-bold text-white text-lg drop-shadow-lg">Stellar Loot</h2>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-yellow-400/50 shadow-xl transform hover:scale-105 transition-transform duration-200">
          <p className="text-yellow-300 font-bold text-sm drop-shadow-lg">
            💰 {xlmBalance.toFixed(2)} XLM
          </p>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative text-white hover:bg-white/20 p-3 rounded-full bg-gradient-to-br from-purple-600/50 to-indigo-600/50 border border-purple-400/30 shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <Bell className="w-6 h-6 drop-shadow-lg" />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-xs flex items-center justify-center min-w-6 animate-pulse shadow-xl border-2 border-white">
              {notifications}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
