
import { ShoppingBag, Eye, Gift, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  newRewards: number;
  onOpenChest: () => void;
}

const QuickActions = ({ newRewards, onOpenChest }: QuickActionsProps) => {
  const actions = [
    {
      icon: ShoppingBag,
      label: "Buy Pack",
      color: "from-purple-600 to-purple-800",
      onClick: () => console.log("Buy pack for 0.1 XLM")
    },
    {
      icon: Eye,
      label: "Collection",
      color: "from-blue-600 to-blue-800",
      onClick: () => console.log("View collection")
    },
    {
      icon: Gift,
      label: "Rewards",
      color: "from-emerald-600 to-emerald-800",
      onClick: onOpenChest
    },
    {
      icon: Plus,
      label: "More",
      color: "from-orange-600 to-orange-800",
      onClick: () => console.log("More options")
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          className={`h-20 bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 flex-col space-y-2`}
        >
          <action.icon className="w-6 h-6 text-white" />
          <span className="text-xs font-bold text-white">
            {action.label}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
