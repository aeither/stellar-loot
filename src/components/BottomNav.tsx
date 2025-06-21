
import { Home, Users, Trophy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: "/" },
    { icon: Users, path: "/cards" },
    { icon: Settings, path: "/shop" },
    { icon: Trophy, path: "/rewards" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-700 z-50">
      <div className="flex items-center justify-around py-4">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => navigate(item.path)}
            className={`p-3 rounded-full ${
              location.pathname === item.path
                ? 'text-yellow-400 bg-yellow-400/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6" />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
