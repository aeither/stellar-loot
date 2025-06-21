
import { Home, Users, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "HOME", active: true },
    { icon: Users, label: "CARDS" },
    { icon: Settings, label: "SHOP" },
    { icon: Trophy, label: "REWARDS" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-700 z-50">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
              item.active 
                ? 'text-yellow-400' 
                : 'text-gray-400 hover:text-white'
            } rounded-xl`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
