import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transaction } from './reportUtils';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

interface TransactionPreviewProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionPreview: React.FC<TransactionPreviewProps> = ({ 
  transactions,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card className="w-full subtle-shadow border border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Transaction Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableHead>
                <TableHead><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableHead>
                <TableHead><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableHead>
                <TableHead><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableHead>
                <TableHead className="text-right"><div className="w-full h-4 dark:bg-gray-700  bg-gray-200 animate-pulse"></div></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index} className="animate-fade-in">
                  <TableCell className="font-medium"><div className="w-full h-4 dark:bg-gray-700  bg-gray-200 animate-pulse"></div></TableCell>
                  <TableCell><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableCell>
                  <TableCell><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableCell>
                  <TableCell><div className="w-full h-4 bg-gray-200 dark:bg-gray-700  animate-pulse"></div></TableCell>
                  <TableCell className="text-right"><div className="w-full h-4 dark:bg-gray-700  bg-gray-200 animate-pulse"></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
    
    );
  }

  return (
    <Card className="w-full subtle-shadow border border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Transaction Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Payee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No transactions found for the selected period.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="animate-fade-in">
                    <TableCell className="font-medium">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.payee}</TableCell>
                    <TableCell>{transaction.categoryName || "Uncategorized"}</TableCell>
                    <TableCell>{transaction.accountName}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionPreview;
