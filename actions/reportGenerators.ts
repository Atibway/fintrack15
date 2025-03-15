import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell } from "docx";
import ExcelJS from "exceljs";
import { PDFDocument, rgb } from "pdf-lib";


import { format } from "date-fns";

export async function generatePDF(transactions: any[]) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);

  // Add a colored header
  page.drawText("Weekly Financial Report", {
    x: 50,
    y: 750,
    size: 18,
    color: rgb(0.2, 0.6, 0.86), // Blue color
  });

  // Table headers
  const headers = ["Date", "Payee", "Category", "Amount"];
  const startX = 50;
  const startY = 720;
  const rowHeight = 20;

  // Draw headers with blue background
  headers.forEach((header, index) => {
    page.drawRectangle({
      x: startX + index * 130,
      y: startY,
      width: 120,
      height: rowHeight,
      color: rgb(0.2, 0.6, 0.86),
    });
    page.drawText(header, {
      x: startX + 5 + index * 130,
      y: startY + 5,
      size: 10,
      color: rgb(1, 1, 1), // White text
    });
  });

  // Table body
  let yOffset = startY - rowHeight;
  transactions.forEach((transaction) => {
    const formattedDate = format(new Date(transaction.date), "MMMM dd, yyyy");
    const row = [
      formattedDate,
      transaction.payee,
      transaction.categoryName || "Uncategorized",
      transaction.amount.toString(),
    ];

    // Draw rows
    row.forEach((cell, index) => {
      page.drawText(cell, {
        x: startX + 5 + index * 130,
        y: yOffset + 5,
        size: 10,
        color: rgb(0, 0, 0), // Black text
      });
    });

    yOffset -= rowHeight;

    // Add a new page if the row exceeds the page height
    if (yOffset < 50) {
      yOffset = 720;
      page = pdfDoc.addPage([600, 800]);
    }
  });

  return await pdfDoc.save();
}




export async function generateExcel(transactions: any[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Transactions");

  // Add column headers with styles
  sheet.columns = [
    { header: "Date", key: "date", width: 15 },
    { header: "Payee", key: "payee", width: 25 },
    { header: "Category", key: "categoryName", width: 20 },
    { header: "Amount", key: "amount", width: 15 },
  ];

  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }; // White text
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0073E6" }, // Blue background
  };

  transactions.forEach((transaction) => {
    const formattedDate = format(new Date(transaction.date), "MMMM dd, yyyy");
    sheet.addRow({
      ...transaction,
      date: formattedDate,
    });
  });

  // Apply conditional formatting for amounts
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const amountCell = row.getCell(4); // Amount column
      if (typeof amountCell.value === 'number' && amountCell.value < 0) {
        amountCell.font = { color: { argb: "FFFF0000" } }; // Red for negative amounts
      } else {
        amountCell.font = { color: { argb: "FF00AA00" } }; // Green for positive amounts
      }
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}


export async function generateWord(transactions: any[]) {
  // Create a new Word document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "Weekly Financial Report",
                bold: true,
                size: 36, // Font size in half-points (36 = 18pt)
                color: "0073E6", // Blue color
              }),
            ],
            alignment: "center", // Center align the title
            spacing: { after: 300 }, // Add space after the title
          }),

          // Add a table for transactions
          new Table({
            rows: [
              // Header row
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Date", bold: true, color: "FFFFFF" })],
                      }),
                    ],
                    shading: { fill: "0073E6" }, // Blue background
                    width: { size: 20, type: "pct" }, // Adjust column width
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Payee", bold: true, color: "FFFFFF" })],
                      }),
                    ],
                    shading: { fill: "0073E6" }, // Blue background
                    width: { size: 30, type: "pct" }, // Adjust column width
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Category", bold: true, color: "FFFFFF" })],
                      }),
                    ],
                    shading: { fill: "0073E6" }, // Blue background
                    width: { size: 25, type: "pct" }, // Adjust column width
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: "Amount", bold: true, color: "FFFFFF" })],
                      }),
                    ],
                    shading: { fill: "0073E6" }, // Blue background
                    width: { size: 25, type: "pct" }, // Adjust column width
                  }),
                ],
              }),

              // Data rows
              ...transactions.map((transaction) => {
                const formattedDate = format(new Date(transaction.date), "MMMM dd, yyyy");
                return new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(formattedDate)],
                      width: { size: 20, type: "pct" }, // Adjust column width
                    }),
                    new TableCell({
                      children: [new Paragraph(transaction.payee)],
                      width: { size: 30, type: "pct" }, // Adjust column width
                    }),
                    new TableCell({
                      children: [new Paragraph(transaction.categoryName || "Uncategorized")],
                      width: { size: 25, type: "pct" }, // Adjust column width
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: transaction.amount.toString(),
                              bold: true,
                              color: transaction.amount < 0 ? "FF0000" : "00AA00", // Red for negative, green for positive
                            }),
                          ],
                        }),
                      ],
                      width: { size: 25, type: "pct" }, // Adjust column width
                    }),
                  ],
                });
              }),
            ],
            width: { size: 100, type: "pct" }, // Make the table span the full page width
          }),
        ],
      },
    ],
  });

  // Convert the document to a buffer
  const buffer = await Packer.toBuffer(doc);

  return buffer;
}



