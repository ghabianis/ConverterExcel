const fs = require('fs');
const { stringify } = require('querystring');

fs.readFile('test.json', "utf8", (error, data) => {
    jsond =  JSON.parse(data)
    console.log(jsond['WorkspaceResponse'][0]);
});