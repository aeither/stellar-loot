
import { Home, Users, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNav = () => {
  const navItems = [
    { icon: Home, active: true },
    { icon: Users },
    { icon: Trophy },
    { icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-gray-700 z-50">
      <div className="flex items-center justify-around py-4">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`h-12 w-12 ${
              item.active 
                ? 'text-yellow-400' 
                : 'text-gray-400 hover:text-white'
            } rounded-xl`}
          >
            <item.icon className="w-6 h-6" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
