import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BudgetCategoryProps {
  name: string;
  spent: number;
  total: number;
  icon: React.ReactNode;
}

const BudgetCategory = ({ name, spent, total, icon }: BudgetCategoryProps) => {
  const percentage = (spent / total) * 100;
  const remaining = total - spent;

  return (
    <div className="p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-sm font-medium">
          ${spent.toLocaleString()} <span className="text-muted-foreground">/ ${total.toLocaleString()}</span>
        </span>
      </div>

      <div className="space-y-1.5">
        <Progress 
          value={percentage} 
          className={cn(
            "h-2",
            percentage > 90 ? "bg-danger-500" : "bg-primary"
          )}
        />
        <div className="flex justify-between text-xs">
          <span className={cn(
            "font-medium",
            percentage > 90 ? "text-danger-500" : "",
          )}>
            {percentage.toFixed(0)}% used
          </span>
          <span className="text-muted-foreground">${remaining.toLocaleString()} remaining</span>
        </div>
      </div>
    </div>
  );
};

// Sample categories
import { ShoppingBag, Car, Home, Utensils } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Shopping',
    spent: 350,
    total: 500,
    icon: <ShoppingBag className="h-4 w-4" />
  },
  {
    id: '2',
    name: 'Food & Drinks',
    spent: 280,
    total: 300,
    icon: <Utensils className="h-4 w-4" />
  },
  {
    id: '3',
    name: 'Transportation',
    spent: 120,
    total: 200,
    icon: <Car className="h-4 w-4" />
  },
  {
    id: '4',
    name: 'Rent',
    spent: 1200,
    total: 1200,
    icon: <Home className="h-4 w-4" />
  },
];

const BudgetProgress = () => {
  return (
    <div className="glass rounded-xl overflow-hidden animate-slide-up animation-delay-1">
      <div className="p-5 border-b border-border">
        <h2 className="font-semibold">Budget Progress</h2>
      </div>

      <div className="divide-y divide-border">
        {categories.map((category) => (
          <BudgetCategory key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
};

export default BudgetProgress;
