
import { Home, CreditCard, Trophy, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: CreditCard, path: "/cards", label: "Cards" },
    { icon: ShoppingBag, path: "/shop", label: "Shop" },
    { icon: Trophy, path: "/rewards", label: "Rewards" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 3D Shadow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent blur-lg transform translate-y-2"></div>
      
      {/* Main Navigation */}
      <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 backdrop-blur-xl border-t-2 border-gradient-to-r border-yellow-400/30 shadow-2xl">
        {/* Top Glow Effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
        
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={`
                  relative flex flex-col items-center justify-center p-3 rounded-2xl min-w-[70px] h-16
                  transition-all duration-300 transform hover:scale-110
                  ${isActive 
                    ? 'bg-gradient-to-t from-yellow-500/30 via-yellow-400/20 to-yellow-300/10 text-yellow-300 shadow-lg shadow-yellow-400/25 border border-yellow-400/30' 
                    : 'text-gray-300 hover:text-yellow-200 hover:bg-gradient-to-t hover:from-purple-600/40 hover:to-indigo-600/20'
                  }
                `}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-yellow-400/10 to-transparent rounded-2xl blur-sm"></div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                  </>
                )}
                
                <IconComponent className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive ? 'drop-shadow-lg' : ''}`} />
                <span className={`text-xs font-semibold transition-all duration-300 ${isActive ? 'drop-shadow-lg' : ''}`}>
                  {item.label}
                </span>
                
                {/* 3D Button Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none"></div>
              </Button>
            );
          })}
        </div>
        
        {/* Bottom Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default BottomNav;
