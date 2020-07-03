// const prompt = require('prompt-sync')({ sigint: true })
const { dataReader } = require("./src/utils");
// const filePath = prompt("Path to input file: ")

const filePath = "sample-input.txt";

class ProcessSoccerData {
  process(data) {
    console.log(data);
  }
}

const mainProcess = new ProcessSoccerData();

const options = {
  filePath,
  mainProcess,
};

dataReader(options);
