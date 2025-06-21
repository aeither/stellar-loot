
import { Home, Users, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true, emoji: "🏠" },
    { icon: Users, label: "Friends", emoji: "👥" },
    { icon: Trophy, label: "Leaderboard", emoji: "🏆" },
    { icon: Settings, label: "Settings", emoji: "⚙️" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-purple-900/60 to-transparent backdrop-blur-xl border-t-2 border-purple-500/30 z-50 shadow-2xl">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`flex-col space-y-1 h-16 w-16 relative transform transition-all duration-200 ${
              item.active 
                ? 'text-yellow-400 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/50 scale-110 shadow-xl' 
                : 'text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105 border border-transparent'
            } rounded-2xl`}
          >
            {/* 3D effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-2xl"></div>
            
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <div className="text-lg">{item.emoji}</div>
              <item.icon className="w-4 h-4" />
              <span className="text-xs font-semibold">{item.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
