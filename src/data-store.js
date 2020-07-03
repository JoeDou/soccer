const { comparator } = require("./utils");
const { NumTopTeams, InitialDay } = require("./constants");

class DataStore {
  constructor() {
    this.matchDay = InitialDay;
    this.standing = {};
    this.comparator = comparator;
  }

  // update the team and it's respective score from a match to standing
  addGameResult(result) {
    this.standing[result.name] = this.standing[result.name] || 0;
    this.standing[result.name] += result.points;
  }

  // increment match day counter
  incrementMatchDay() {
    this.matchDay++;
  }

  // figure out what the top teams are using comparator
  getTopTeams() {
    let arr = Object.entries(this.standing);
    arr.sort(this.comparator);
    return arr.slice(0, NumTopTeams);
  }

  // output current result of match day and top teams
  getCurrentResult() {
    return {
      matchDay: this.matchDay,
      teams: this.getTopTeams(),
    };
  }
}

module.exports = DataStore;
