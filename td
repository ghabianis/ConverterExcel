// const XLSX = require('xlsx');

// function convertErdToExcel(erdData, outputFilePath) {
//   const workbook = new XLSX.Workbook();

//   // Iterate over the entities and create a sheet for each entity
//   erdData.entities.forEach((entity) => {
//     const sheet = workbook.addWorksheet(entity.name);

//     // Add column headers to the sheet
//     entity.attributes.forEach((attribute, index) => {
//       sheet.cell(1, index + 1).value = attribute.name;
//     });

//     // Add data rows to the sheet
//     entity.data.forEach((data, rowIndex) => {
//       entity.attributes.forEach((attribute, columnIndex) => {
//         sheet.cell(rowIndex + 2, columnIndex + 1).value = data[attribute.name];
//       });
//     });
//   });

//   // Save the workbook to a file
//   XLSX.writeFile(workbook, outputFilePath);

//   console.log(`ERD file "${erdFilePath}" converted to Excel file "${outputFilePath}".`);
// }

// // Example usage:
// convertErdToExcel("file.erd", 'path/to/your/excel/file.xlsx');

// erd entity example
erdData = {
  entities: [
    {
      name: "Client",
      attributes: [
        { name: "id", type: "text" },
        { name: "createdAt", type: "DateTime" },
        { name: "deletedAt", type: "DateTime" },
        { name: "updatedAt", type: "DateTime" },
        { name: "isBanned", type: "Boolean" },
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "email", type: "text" },
        { name: "password", type: "text" },
        { name: "workspaceId", type: "text" }
      ],
    }
    // Add more entities as needed
  ],
  relationships: [
    {
      name: "order",
      entities: ["customer", "product"],
      attributes: [
        { name: "id", type: "integer" },
        { name: "date", type: "date" },
        { name: "total_cost", type: "float" },
      ],
    }
    // Add more relationships as needed
  ],
};