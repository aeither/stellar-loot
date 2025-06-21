
import { ShoppingBag, Eye, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuickActionsProps {
  newRewards: number;
}

const QuickActions = ({ newRewards }: QuickActionsProps) => {
  const actions = [
    {
      icon: ShoppingBag,
      label: "Buy Pack",
      color: "from-purple-600 to-pink-600",
      textColor: "text-white"
    },
    {
      icon: Eye,
      label: "Collection",
      color: "from-blue-600 to-cyan-600",
      textColor: "text-white"
    },
    {
      icon: Gift,
      label: "Rewards",
      color: "from-emerald-600 to-green-600",
      textColor: "text-white",
      badge: newRewards
    },
    {
      icon: Plus,
      label: "More",
      color: "from-gray-600 to-gray-700",
      textColor: "text-white"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          className={`relative h-20 bg-gradient-to-br ${action.color} hover:scale-105 transition-transform duration-200 shadow-lg border-0 flex-col space-y-1`}
        >
          <action.icon className={`w-6 h-6 ${action.textColor}`} />
          <span className={`text-xs font-medium ${action.textColor}`}>
            {action.label}
          </span>
          {action.badge && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-500 text-xs animate-pulse">
              {action.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
