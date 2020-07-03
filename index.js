const { fileReader } = require("./src/file-reader");
const ProcessSoccerData = require("./src/process-soccer-data");

// get filepath from argument or default to sample-input.txt
let filePath = process.argv[2] || "sample-input.txt";

// instantiate ProcessSoccerData class, this is created here in
// order to inject the process dependency into fileReader
const mainProcess = new ProcessSoccerData();

const options = {
  filePath,
  mainProcess,
};

fileReader(options);
