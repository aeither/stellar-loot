
import { ShoppingBag, Eye, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuickActionsProps {
  newRewards: number;
  onOpenChest: () => void;
}

const QuickActions = ({ newRewards, onOpenChest }: QuickActionsProps) => {
  const actions = [
    {
      icon: ShoppingBag,
      label: "Buy Pack",
      color: "from-purple-600 via-purple-700 to-purple-800",
      borderColor: "border-purple-400",
      textColor: "text-white",
      emoji: "🛍️",
      onClick: () => console.log("Buy Pack clicked")
    },
    {
      icon: Eye,
      label: "Collection",
      color: "from-blue-600 via-blue-700 to-blue-800",
      borderColor: "border-blue-400",
      textColor: "text-white",
      emoji: "🃏",
      onClick: () => console.log("Collection clicked")
    },
    {
      icon: Gift,
      label: "Rewards",
      color: "from-emerald-600 via-emerald-700 to-emerald-800",
      borderColor: "border-emerald-400",
      textColor: "text-white",
      emoji: "🎁",
      badge: newRewards,
      onClick: onOpenChest
    },
    {
      icon: Plus,
      label: "More",
      color: "from-orange-600 via-orange-700 to-orange-800",
      borderColor: "border-orange-400",
      textColor: "text-white",
      emoji: "⚡",
      onClick: () => console.log("More clicked")
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          className={`relative h-24 bg-gradient-to-br ${action.color} hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xl border-2 ${action.borderColor} flex-col space-y-1 overflow-hidden group`}
        >
          {/* 3D effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 group-hover:from-white/30"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-1">
            <div className="text-xl">{action.emoji}</div>
            <action.icon className={`w-5 h-5 ${action.textColor} drop-shadow-lg`} />
            <span className={`text-xs font-bold ${action.textColor} drop-shadow-md`}>
              {action.label}
            </span>
          </div>
          
          {action.badge && (
            <Badge className="absolute -top-2 -right-2 w-7 h-7 p-0 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-xs animate-pulse shadow-xl border-2 border-white">
              {action.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
