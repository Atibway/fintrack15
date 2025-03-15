
import { CreditCard, Coffee, ShoppingCart, Zap, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Sample transaction data
const transactions = [
  {
    id: '1',
    name: 'Starbucks Coffee',
    date: 'Today, 10:30 AM',
    amount: -4.50,
    category: 'Food & Drink',
    icon: <Coffee className="h-4 w-4" />
  },
  {
    id: '2',
    name: 'Amazon Purchase',
    date: 'Yesterday, 2:45 PM',
    amount: -32.99,
    category: 'Shopping',
    icon: <ShoppingCart className="h-4 w-4" />
  },
  {
    id: '3',
    name: 'Electric Bill',
    date: 'Jun 15, 9:00 AM',
    amount: -85.65,
    category: 'Utilities',
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: '4',
    name: 'Salary Deposit',
    date: 'Jun 1, 8:30 AM',
    amount: 3250.00,
    category: 'Income',
    icon: <CreditCard className="h-4 w-4" />
  },
];

const RecentTransactions = () => {
  return (
    <div className="glass rounded-xl overflow-hidden animate-slide-up animation-delay-2">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Recent Transactions</h2>
        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
      </div>
      
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-${transaction.amount > 0 ? 'success' : 'primary'}/10 text-${transaction.amount > 0 ? 'success-600' : 'primary'}`}>
                {transaction.icon}
              </div>
              <div>
                <div className="font-medium text-sm">{transaction.name}</div>
                <div className="text-xs text-muted-foreground">{transaction.date}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`font-medium ${transaction.amount > 0 ? 'text-success-600' : ''}`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
