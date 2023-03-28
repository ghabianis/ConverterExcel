const XLSX = require('xlsx');
const Blob =  require('buffer');

// Define the ERD diagram data
const erdData = {
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
      },
      {
        name: "User",
        attributes: [
          { name: "id", type: "text" },
          { name: "createdAt", type: "DateTime" },
          { name: "updatedAt", type: "DateTime" },
          { name: "deletedAt", type: "DateTime" },
          { name: "firstName", type: "text" },
          { name: "lastName", type: "text" },
          { name: "email", type: "text" },
          { name: "password", type: "text" },
          { name: "roles", type: "text" },
        ],
      },
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
      },
      {
        name: "payment",
        entities: ["customer"],
        attributes: [
          { name: "id", type: "integer" },
          { name: "amount", type: "float" },
          { name: "payment_method", type: "string" },
        ],
      },
      // Add more relationships as needed
    ],
  };
  
  // Define a function to convert the ERD diagram data to an Excel file
  function convertERDToExcel(erdData) {
    console.log(typeof erdData)
    // Create a new workbook using SheetJS
    const workbook = XLSX.utils.book_new();
  
    // Create a new worksheet for each entity in the ERD diagram
    for (const entity of erdData.entities) {
      // Convert the entity's attributes to an array of arrays
      const data = entity.attributes.map((attr) => [attr.name, attr.type]);
  
      console.log(entity.name)
      // Create a new worksheet for the entity
      const worksheet = XLSX.utils.aoa_to_sheet(data);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        entity.name
      );
    }
  
    // Convert the workbook to a binary string
    const binaryString = XLSX.write(workbook, { type: "binary" });
  
    // // Convert the binary string to a Blob object
    // const blob = new Blob([s2ab(binaryString)], {
    //   type: "application/octet-stream",
    // });
  
    // Download the Excel file
    // saveAs(s2ab(binaryString), "ERD.xlsx");
    XLSX.writeFile(workbook, 'testing.xlsx');

  }
  
  // Define a utility function to convert a string to an ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  convertERDToExcel(erdData)