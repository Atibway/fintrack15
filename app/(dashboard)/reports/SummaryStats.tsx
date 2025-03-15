import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from './reportUtils';
import { formatCurrency } from '@/lib/utils';

interface SummaryStatsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const SummaryStats: React.FC<SummaryStatsProps> = ({ 
  transactions,
  isLoading = false
}) => {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const netAmount = income - expenses;
  
  const stats = [
    {
      title: "Total Income",
      value: formatCurrency(income),
      icon: ArrowUpIcon,
      iconClassName: "text-green-500",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(expenses),
      icon: ArrowDownIcon,
      iconClassName: "text-red-500",
    },
    {
      title: "Net Amount",
      value: formatCurrency(netAmount),
      icon: DollarSign,
      iconClassName: netAmount >= 0 ? "text-green-500" : "text-red-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="subtle-shadow border mb-4 border-zinc-200 dark:border-zinc-800 p-4 rounded-lg">
            <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse mb-2"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="subtle-shadow border mb-4 border-zinc-200 dark:border-zinc-800"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.iconClassName}`} />
          </CardHeader>
          <CardContent>
            <div className="whitespace-nowrap">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStats;
