// src/app/actions/generateReport.ts
import { getTransactionsForDateRange } from "./getTransactions";
import { generatePDF, generateExcel, generateWord } from "./reportGenerators";

export async function generateReport(userId: string, start: Date, end: Date, reportFormat: "pdf" | "excel" | "word") {
  const transactions = await getTransactionsForDateRange(userId, start, end);

  if (reportFormat === "pdf") {
    return generatePDF(transactions);
  } else if (reportFormat === "excel") {
    return generateExcel(transactions);
  } else if (reportFormat === "word") {
    return generateWord(transactions);
  } else {
    throw new Error("Invalid report format");
  }
}
