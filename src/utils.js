function parser(str) {
  const parsedData = str.match(/[a-zA-Z ]+|[0-9]+/g);

  return {
    teamName1: parsedData[0].trim(),
    score1: parseInt(parsedData[1]),
    teamName2: parsedData[2].trim(),
    score2: parseInt(parsedData[3]),
  };
}

function logger(data) {
  console.log(`Matchday ${data.matchDay}`);
  data.teams.forEach((team) => {
    console.log(`${team[0]}, ${team[1]} pts`);
  });
  console.log("");
}

function comparator(a, b) {
  if (a[1] === b[1]) {
    return a[0].localeCompare(b[0]);
  }
  return b[1] - a[1];
}

module.exports = {
  comparator,
  logger,
  parser,
};
