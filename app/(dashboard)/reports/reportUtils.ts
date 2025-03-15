import { generatePDF, generateExcel, generateWord } from "@/actions/reportGenerators";

import { getTransactionsForDateRange } from "@/actions/getTransactions";
import {  startOfWeek, endOfWeek } from 'date-fns';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  amount: number;
  payee: string;
  notes: string | null;
  date: Date;
  accountId: string;
  categoryId: string | null;
  accountName?: string;
  categoryName?: string;
}

export interface Account {
  id: string;
  name: string;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
}


// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100); // Convert cents to dollars
};



export async function generateReport(
userId: string, 
startDate: Date, 
endDate: Date, 
reportFormat: "pdf" | "excel" | "word"
): Promise<Blob | void> {
  try {
    
    toast.loading(`Starting report generation: Format=${reportFormat}, User=${userId}, Range=${startDate} to ${endDate}`);
    

    // Fetch the transactions for the given date range
    const transactions = await getTransactionsForDateRange(userId, startDate, endDate);
    console.log("Fetched Transactions:", transactions);

    // Ensure transactions exist
    if (transactions.length === 0) {
      throw new Error("No transactions found for the selected date range.");
    }

    // Generate the report based on the selected format
    let fileData: Uint8Array | ArrayBuffer;
    let mimeType: string;
    let fileExtension: string;

    if (reportFormat === "pdf") {
      fileData = await generatePDF(transactions);
      mimeType = "application/pdf";
      fileExtension = "pdf";
    } else if (reportFormat === "excel") {
      fileData = await generateExcel(transactions);
      mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      fileExtension = "xlsx";
    } else if (reportFormat === "word") {
      fileData = await generateWord(transactions);
      mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      fileExtension = "docx";
    } else {
      throw new Error("Invalid report format selected.");
    }

    toast.success(`Successfully generated ${reportFormat.toUpperCase()} report.`);

    // Create a Blob for download
    const blob = new Blob([fileData], { type: mimeType });
    const fileName = `financial-report-${reportFormat}-${startDate.toISOString().split("T")[0]}-to-${endDate
      .toISOString()
      .split("T")[0]}.${fileExtension}`;

    // Trigger a download in the browser
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.dismiss();
    toast.success(`Report downloaded: ${fileName}`);
  } catch (error) {
    toast.dismiss();
    toast.error(`Failed to generate Format=${reportFormat}, User=${userId}, Range=${startDate} to ${endDate}`, {
      description: 'Please try again later.',
    });
    throw error; // Re-throw the error for further handling
  }
}


// Function to get the current week's date range
export const getCurrentWeekRange = (): { start: Date; end: Date } => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(today, { weekStartsOn: 1 }); // Sunday
  
  return { start, end };
};
