var XLSX = require("xlsx");
const fs = require("fs");
dataJson = {};
sampleData = [];
sheetNames = [];
data_sw = [];
let ws;
fs.readFile("schema.json", "utf8", (error, data) => {
    if (error) {
        console.log(error);
        return;
    } else {
        dataJson = JSON.parse(data);
        //Had to create a new workbook and then add the header
        const wb = XLSX.utils.book_new();

        Object.keys(dataJson.definitions).forEach(function (key, index1) {
            sampleData.push(dataJson.definitions[key].properties);
            sheetNames.push(key);
        });
        for (i = 0; i < sampleData.length; i++) {
            fields = sampleData[i];
            Object.keys(fields).forEach(function (key2, index2) {
                if (fields[key2].$ref != undefined) {
                    data_sw.push({
                        field: key2,
                        type: key2.charAt(0).toUpperCase() + key2.slice(1),
                    });
                } else if (fields[key2].originalType == 'String' || key2 == 'User') {
                    data_sw.push({
                        field: key2,
                        type: 'text',
                    });
                } else {
                    data_sw.push({
                        field: key2,
                        type: fields[key2].originalType,
                    });
                }
            });
            ws = XLSX.WorkSheet = XLSX.utils.json_to_sheet(data_sw);
            data_sw = [];
            XLSX.utils.book_append_sheet(wb, ws, sheetNames[i], { origin: "A2" });
        }
        ws['!ref'] = "A1:B1" // change the sheet range to A2:C3
        //generating excel file to ./wb.xlsx destination
        XLSX.writeFile(wb, "prisma-schema.xlsx");
        var OUTFILE = "prisma-schema.xlsx";
        console.log("Results written to " + OUTFILE);

    }

});
