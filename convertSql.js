const fs = require('fs');
const convertErdToCsv = (erdData, outputFilePath) => {
    // Extract entity and attribute data from ERD data object
    const entities = erdData.entities;
    const attributes = erdData.attributes;
  
    // Create CSV header row with column names
    const headerRow = ['Entity', 'Attribute', 'Type', 'Primary Key'].join(',');
  
    // Create CSV data rows with entity and attribute data
    const dataRows = entities.map(entity => {
      return attributes
        .filter(attr => attr.entity === entity.name)
        .map(attr => [entity.name, attr.name, attr.type, attr.primaryKey].join(','));
    }).flat();
  
    // Combine header and data rows into CSV string
    const csv = `${headerRow}\n${dataRows.join('\n')}`;
  
    // Write CSV output to file
    fs.writeFileSync(outputFilePath, csv);
  
    console.log(`ERD data converted to CSV file "${outputFilePath}".`);
  };
  
  // Example usage:
  const erdData = {
    entities: [
      { name: 'users' },
    ],
    attributes: [
      { entity: 'users', name: 'id', type: 'int', primaryKey: true },
      { entity: 'users', name: 'name', type: 'varchar(255)', primaryKey: false },
      { entity: 'users', name: 'id', type: 'int', primaryKey: true },
      { entity: 'users', name: 'customerId', type: 'int', primaryKey: false },
      { entity: 'users', name: 'total', type: 'decimal', primaryKey: false }
    ]
  };
  const outputFilePath = 'file.csv';
  convertErdToCsv(erdData, outputFilePath);