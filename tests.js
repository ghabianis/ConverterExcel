const xlsx = require('xlsx');

function displayExcelHeaders(filePath) {
  // Load the workbook from the file path
  const workbook = xlsx.readFile(filePath);

  // Get the first worksheet of the workbook
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];

  // Extract the column headers from the worksheet
  const headers = [];
  let i = 0;
  while (worksheet[String.fromCharCode(65 + i) + '1'] !== undefined) {
    headers.push(worksheet[String.fromCharCode(65 + i) + '1'].v);
    i++;
  }

  // Create a new worksheet with the headers in a column
  const headerWorksheet = xlsx.utils.aoa_to_sheet(headers.map(header => [header]));
  headerWorksheet['!cols'] = [{ width: 20 }];

  // Add the new worksheet to a new workbook
  const newWorkbook = xlsx.utils.book_new();
  const tableName = filePath.split('/').pop().split('.').shift();
  xlsx.utils.book_append_sheet(newWorkbook, headerWorksheet, tableName);

  // Save the new workbook to a file
  const outputFilePath = `${tableName}_headers.xlsx`;
  xlsx.writeFile(newWorkbook, outputFilePath);

  console.log(`Headers for file "${filePath}" displayed in column A of sheet "${tableName}" and saved to file "${outputFilePath}".`);
}

// Example usage:
displayExcelHeaders('file.xlsx');