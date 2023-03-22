const fs = require('fs');
const xlsx = require('xlsx');

const sheetName = ""
function generateExcelFromCsv(csvFilePath, excelFilePath, sheetName) {
  // Read the data from the CSV file
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Parse the CSV data into an array of arrays
  const parsedData = csvData.split('\n').map(row => row.split(','));

  // Create a new Excel workbook and sheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(parsedData);

  sheetName = parsedData[1][0].toString()   
  // Add the sheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Save the workbook to a file
  xlsx.writeFile(workbook, excelFilePath);
}

// Call the function with your CSV file path, Excel file path, and sheet name
generateExcelFromCsv('file.csv', 'file.xlsx', sheetName);