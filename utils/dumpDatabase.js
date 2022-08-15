const path = require("path");
const { dbPath } = require("../config");
const { compressFile } = require("./compressFile");
const { getDatabaseFilePath } = require("./getDatabaseFilePath");

const linksFilePath = getDatabaseFilePath();

function dumpDatabase() {
  setInterval(() => {
    compressFile(linksFilePath, path.resolve(dbPath, "dumps"), "db-dump.json");

    console.log('Database dump was created.');
  }, 10000);
}

module.exports = { dumpDatabase };
