const fs = require("fs");
const readline = require("readline");

async function dataReader({ filePath, mainProcess }) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    mainProcess.process(line);
  }
  console.log("done");
}

module.exports = {
  dataReader: dataReader,
};
