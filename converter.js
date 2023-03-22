const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define the table schema
const tableSchema =[ {
  id: { type: 'number' },
  country_code: { type: 'number' },
  merchant_name: { type: 'string' },
  created_at: { type: 'string' },
  admin_id: { type: 'number' }
},
{
  id: { type: 'number' },
  full_name: { type: 'number' },
  merchant_name: { type: 'string' },
  created_at: { type: 'string' },
  country_code: { type: 'number' }
},
{
  id: { type: 'number' },
  code: { type: 'number' },
  name: { type: 'string' },
  continent_name: { type: 'string' },
}
]

// Define the data for the table
const tableData = [
    { type: 'number' },
    { type: 'number' },
    { type: 'string' },
    { type: 'string' },
    { type: 'number' }
];

// Create the CSV writer
const csvWriter = createCsvWriter({
  path: 'file.csv',
  header: Object.keys(tableSchema).map(key => ({ id: key, title: key }))
});

// Write the data to the CSV file
csvWriter.writeRecords(tableData)
  .then(() => console.log('CSV file generated successfully!'))
  .catch(error => console.error(error));

