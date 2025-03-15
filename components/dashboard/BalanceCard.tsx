
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  title: string;
  amount: number;
  previousAmount: number;
  currency?: string;
  type?: 'default' | 'income' | 'expense';
}

const BalanceCard = ({ 
  title, 
  amount, 
  previousAmount, 
  currency = '$', 
  type = 'default'
}: BalanceCardProps) => {
  const percentChange = ((amount - previousAmount) / previousAmount) * 100;
  const isPositive = percentChange >= 0;
  
  return (
    <div className="glass rounded-xl p-5 h-full animate-scale">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-semibold">{currency}{amount.toLocaleString()}</span>
          </div>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          type === 'income' ? "bg-success/10 text-success-600" : 
          type === 'expense' ? "bg-danger/10 text-danger-600" : 
          "bg-primary/10 text-primary"
        )}>
          {type === 'income' ? (
            <ArrowUpRight className="h-5 w-5" />
          ) : type === 'expense' ? (
            <ArrowDownRight className="h-5 w-5" />
          ) : (
            <DollarSign className="h-5 w-5" />
          )}
        </div>
      </div>
      
      <div className="mt-3 flex items-center space-x-2">
        <div 
          className={cn(
            "text-xs font-medium flex items-center",
            isPositive ? "text-success-600" : "text-danger-600"
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-0.5" />
          )}
          {Math.abs(percentChange).toFixed(1)}%
        </div>
        <div className="text-xs text-muted-foreground">vs. last month</div>
      </div>
    </div>
  );
};

export default BalanceCard;
