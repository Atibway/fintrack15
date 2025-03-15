"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from "recharts";
import { BudgetSummary } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CountUp } from "@/components/count-up";

interface BudgetChartProps {
  budgetSummary: BudgetSummary;
}

const BudgetChart = ({ budgetSummary }: BudgetChartProps) => {
  const [animated, setAnimated] = useState(false);
  
  // Add animation effect after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Prepare data for pie chart
  const { totalBudget, totalSpent, remaining } = budgetSummary;
  
  // Only show remaining if it's greater than 0
  const chartData = [
    { name: "Spent", value: totalSpent, color: "#3b82f6" },
    ...(remaining > 0 ? [{ name: "Remaining", value: remaining, color: "#e5e7eb" }] : [])
  ];
  
  // If over budget, use a different presentation
  const isOverBudget = remaining < 0;
  
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="h-56 w-full max-w-xs mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={
                isOverBudget 
                  ? [{ name: "Over Budget", value: 1, color: "#ef4444" }]
                  : chartData
              }
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={animated ? 450 : 90}
              innerRadius={70}
              outerRadius={90}
              cornerRadius={6}
              paddingAngle={2}
              dataKey="value"
            >
              {isOverBudget ? (
                <Cell key="over-budget" fill="#ef4444" />
              ) : (
                chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    strokeWidth={0}
                  />
                ))
              )}
              <Label
                value={isOverBudget ? "Over Budget" : "Budget"}
                position="center"
                className="text-sm font-medium fill-muted-foreground"
                fontSize={12}
              />
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ 
                background: "rgba(255, 255, 255, 0.9)", 
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-2 w-full max-w-xs">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Budget</span>
          <CountUp preserveValue start={0} end={totalBudget} decimals={2} decimalPlaces={2} formattingFn={formatCurrency} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm font-medium">Spent</span>
          </div>
          <CountUp preserveValue start={0} end={totalSpent} decimals={2} decimalPlaces={2} formattingFn={formatCurrency} />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-gray-200'} mr-2`}></div>
            <span className="text-sm font-medium">{isOverBudget ? 'Over Budget' : 'Remaining'}</span>
          </div>
          <CountUp preserveValue start={0} end={remaining} decimals={2} decimalPlaces={2} formattingFn={formatCurrency} />
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;
