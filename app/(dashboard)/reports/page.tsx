"use client";

import React, { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import PageTransition from "./PageTransition";
import ReportGenerator from "./ReportGenerator";
import TransactionPreview from "./TransactionPreview";
import SummaryStats from "./SummaryStats";
import { getTransactionsForDateRange } from "@/actions/getTransactions";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCurrentWeekRange, Transaction } from "./reportUtils";

const Reports = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useCurrentUser(); // Fetch the current user

  // Get the current week's date range
  const weekRange = getCurrentWeekRange();

  const [dateRange, setDateRange] = useState<DateRange>({
    from: weekRange.start,
    to: weekRange.end,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (dateRange.from && dateRange.to && user?.id) {
          const fetchedTransactions = await getTransactionsForDateRange(
            user.id as string,
            dateRange.from,
            dateRange.to
          );

          setTransactions(fetchedTransactions as Transaction[]);
        } else {
          console.warn(
            "Missing parameters: ",
            "User ID:",
            user?.id,
            "Date Range:",
            dateRange
          );
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange, user]);

  return (
    <PageTransition>
      <div className="space-y-8">
        <div
          className="animate-slide-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Financial Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate and export detailed financial reports
          </p>
        </div>

        {/* Report Generator with Props */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <ReportGenerator
          setLoading={setIsLoading}
          isDisabled={isLoading}
          userId={user?.id as string}
            dateRange={dateRange}
            onDateRangeChange={(range) => {
              console.log("Date range updated:", range); // Debugging log
              setDateRange(range || { from: undefined, to: undefined }); // Handle undefined ranges
            }}
          />

          <div >
            <SummaryStats transactions={transactions} isLoading={isLoading} />
          </div>
        </div>

        <div
          className="animate-slide-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <TransactionPreview
            transactions={transactions}
            isLoading={isLoading}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Reports;


          