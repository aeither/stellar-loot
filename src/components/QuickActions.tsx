
import { ShoppingBag, Eye, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickActionsProps {
  onOpenChest: () => void;
}

const QuickActions = ({ onOpenChest }: QuickActionsProps) => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: ShoppingBag,
      label: "BUY PACK",
      color: "from-purple-600 to-blue-600",
      onClick: () => navigate("/shop")
    },
    {
      icon: Eye,
      label: "COLLECTION",
      color: "from-emerald-600 to-teal-600",
      onClick: () => navigate("/cards")
    },
    {
      icon: Gift,
      label: "REWARDS", 
      color: "from-orange-600 to-red-600",
      onClick: () => navigate("/rewards")
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.slice(0, 2).map((action, index) => {
        const IconComponent = action.icon;
        return (
          <Button
            key={index}
            onClick={action.onClick}
            className={`h-24 bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 flex-col space-y-3 rounded-2xl border-0`}
          >
            <IconComponent className="w-8 h-8 text-white" />
            <span className="text-sm font-bold text-white">
              {action.label}
            </span>
          </Button>
        );
      })}
      
      <div className="col-span-2">
        <Button
          onClick={actions[2].onClick}
          className={`w-full h-24 bg-gradient-to-br ${actions[2].color} hover:scale-105 transition-all duration-200 flex-col space-y-3 rounded-2xl border-0`}
        >
          <Gift className="w-8 h-8 text-white" />
          <span className="text-sm font-bold text-white">
            {actions[2].label}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
