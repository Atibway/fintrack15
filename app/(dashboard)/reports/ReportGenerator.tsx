import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { FileText, FileSpreadsheet, FileDown, Calendar, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./DateRangePicker";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { generateReport } from "./reportUtils";

const reportTypes = [
  {
    id: "weekly",
    name: "Weekly Report",
    description: "Summary of transactions for the selected week",
    icon: Calendar,
  },
  // {
  //   id: "transactions",
  //   name: "Transaction List",
  //   description: "Detailed list of transactions for the selected period",
  //   icon: FileText,
  // },
  // {
  //   id: "categories",
  //   name: "Category Summary",
  //   description: "Spending breakdown by category",
  //   icon: FileSpreadsheet,
  // },
];

const formats = [
  { id: "pdf", name: "PDF", icon: FileText },
  { id: "excel", name: "Excel", icon: FileSpreadsheet },
  { id: "word", name: "Word", icon: FileText },
];

interface ReportGeneratorProps {
  setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
    userId: string
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
    userId,
  isDisabled,
  dateRange,
  setLoading,
  onDateRangeChange,
}) => {
  const [selectedReportType, setSelectedReportType] = useState("weekly");
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "excel" | "word">("pdf");

  const handleGenerateReport = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      console.warn("Date range is incomplete. Cannot generate the report.");
      return;
    }

    try {
      setLoading(true);
const startDate= dateRange.from;
 const endDate = dateRange.to;
 const reportFormat = selectedFormat;
      await generateReport(userId, startDate, endDate, reportFormat).then(() => {
        setLoading(false);
      })
    } catch (error) {
      console.error("Error generating report:", error);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full subtle-shadow border border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl">Generate Financial Report</CardTitle>
        <CardDescription>
          Create customized reports of your financial data
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Report Type Selector */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Report Type</h3>
          <Tabs
            defaultValue={selectedReportType}
            value={selectedReportType}
            onValueChange={setSelectedReportType}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              {reportTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="flex items-center gap-1"
                >
                  <type.icon className="h-3.5 w-3.5 hidden sm:block" />
                  <span>{type.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Date Range</h3>
          <DateRangePicker
            isDisabled={isDisabled}
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
          <div className="text-xs text-muted-foreground mt-1.5">
            {dateRange?.from && dateRange?.to ? (
              <span>
                Reporting period:{" "}
                {format(dateRange.from, "MMMM d, yyyy")} to{" "}
                {format(dateRange.to, "MMMM d, yyyy")}
              </span>
            ) : (
              <span>Select a date range for your report</span>
            )}
          </div>
        </div>

        {/* Format Selector */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Format</h3>
          <div className="flex flex-wrap gap-3">
            {formats.map((format) => (
              <Button
              disabled={isDisabled}
                key={format.id}
                type="button"
                variant={selectedFormat === format.id ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2 transition-all",
                  selectedFormat === format.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setSelectedFormat(format.id as "pdf" | "excel" | "word")}
              >
                <format.icon className="h-4 w-4" />
                <span>{format.name}</span>
                {selectedFormat === format.id && (
                  <Check className="h-3.5 w-3.5 ml-1 animate-fade-in" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleGenerateReport}
          disabled={!dateRange?.from || !dateRange?.to || isDisabled}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReportGenerator;
