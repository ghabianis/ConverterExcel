const ExcelJS = require('exceljs');
const fs = require('fs');

async function createExcelFile(csvFilePath, excelFilePath) {
// Read the data from the CSV file
  const csvData = fs.readFileSync(csvFilePath, 'utf-8');

  // Parse the CSV data into an array of arrays
  const parsedData = csvData.split('\n').map(row => row.split(','));
  const workbook = new ExcelJS.Workbook();

  for(i = 1 ;i<parsedData.length;i++){
    console.log(parsedData[i][0])

    // Add a sheet to the workbook
    const sheet1 = workbook.addWorksheet(parsedData[i][0].toString());
    
  // Add data to the sheets
  sheet1.getCell('A1').value = "data";
  }



  // Save the workbook to a file
  await workbook.xlsx.writeFile('file3333.xlsx');
}

createExcelFile("file.csv", "test.xlsx")
  .then(() => {
    console.log('Excel file created successfully.');
  })
  .catch((error) => {
    console.error(error);
  });
