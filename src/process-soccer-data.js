const { parser, logger } = require("./utils");
const DataStore = require("./data-store");
const { OutcomePoints } = require("./constants");

// Main processing class
class ProcessSoccerData {
  constructor() {
    this.dataStore = new DataStore();
    this.parser = parser;
    this.logger = logger;
    this.set = new Set();
  }

  // process each line of data
  process(data) {
    const processedData = this.translateData(data);
    this.matchDayCheck(processedData[0].name);
    this.processGameResult(processedData);
  }

  // parese and serialize data
  translateData(data) {
    const paresed = this.parser(data);
    return this.calcGameResults(paresed);
  }

  // process serialized data from the game: add to store
  // and update set
  processGameResult(data) {
    data.forEach((team) => {
      this.set.add(team.name);
      this.dataStore.addGameResult(team);
    });
  }

  // check to see if the team from game is in the set
  // if so, it's a new match day and output data
  matchDayCheck(teamName) {
    if (this.set.has(teamName)) {
      this.outputData();
    }
  }

  // when process is complete, log the current results
  complete() {
    this.logger(this.dataStore.getCurrentResult());
  }

  // output data will log data, call to update match day counter
  // and clear set
  outputData() {
    this.logger(this.dataStore.getCurrentResult());
    this.dataStore.incrementMatchDay();
    this.set.clear();
  }

  // serialize and translate parsed data into team and points earned
  calcGameResults(parsedData) {
    let points1 = OutcomePoints.LOSS;
    let points2 = OutcomePoints.LOSS;
    if (parsedData.score1 > parsedData.score2) {
      points1 = OutcomePoints.WIN;
    } else if (parsedData.score2 > parsedData.score1) {
      points2 = OutcomePoints.WIN;
    } else {
      points1 = OutcomePoints.TIE;
      points2 = OutcomePoints.TIE;
    }
    return [
      {
        name: parsedData.teamName1,
        points: points1,
      },
      {
        name: parsedData.teamName2,
        points: points2,
      },
    ];
  }
}

module.exports = ProcessSoccerData;
