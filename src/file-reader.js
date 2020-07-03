const fs = require("fs");
const readline = require("readline");

// the node file reader, will read the file and process
// the file line by line.  Calls the process function to
// process each line and complete when the file is complete
async function fileReader({ filePath, mainProcess }) {
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    if (rl) {
      for await (const line of rl) {
        mainProcess.process(line);
      }
      mainProcess.complete();
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  fileReader,
};
