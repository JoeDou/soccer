const ProcessSoccerData = require("./process-soccer-data");
const { parser, logger } = require("./utils");
const DataStore = require("./data-store");

describe("ProcessSoccerData Class", () => {
  let process;
  beforeEach(() => {
    process = new ProcessSoccerData();
  });

  describe("constructor", () => {
    test("should initialize class", () => {
      expect(process.dataStore).toBeInstanceOf(DataStore);
      expect(process.set).toBeInstanceOf(Set);
      expect(process.parser).toEqual(parser);
      expect(process.logger).toEqual(logger);
    });
  });

  describe("process", () => {
    test("should call the all the data proccessing functions", () => {
      const translateDataMock = jest
        .fn()
        .mockReturnValueOnce([{ name: "test" }]);
      const matchDayCheckMock = jest.fn();
      const processGameResultMock = jest.fn();
      process.translateData = translateDataMock;
      process.matchDayCheck = matchDayCheckMock;
      process.processGameResult = processGameResultMock;
      process.process("");
      expect(translateDataMock).toHaveBeenCalledTimes(1);
      expect(matchDayCheckMock).toHaveBeenCalledWith("test");
      expect(processGameResultMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("translateData", () => {
    test("should translate data by calling the parser and calGameResults", () => {
      const parserMock = jest.fn();
      const calcGameResultsMock = jest.fn();
      process.parser = parserMock;
      process.calcGameResults = calcGameResultsMock;
      process.translateData("");
      expect(parserMock).toHaveBeenCalledTimes(1);
      expect(calcGameResultsMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("processGameResult", () => {
    test("should add team name to set and add game result to datastore", () => {
      const addGameResultMock = jest.fn();

      process.dataStore.addGameResult = addGameResultMock;

      const data = [{ name: "test", points: 1 }];
      process.processGameResult(data);
      expect(process.set.has("test")).toBeTruthy();
      expect(addGameResultMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("matchDayCheck", () => {
    test("should not call outputData if team is not in set", () => {
      const outputDataMock = jest.fn();
      process.outputData = outputDataMock;
      process.matchDayCheck("test");
      expect(outputDataMock).toHaveBeenCalledTimes(0);
    });

    test("should call outputData if team is in set", () => {
      const outputDataMock = jest.fn();
      process.outputData = outputDataMock;
      process.set.add("test");
      process.matchDayCheck("test");
      expect(outputDataMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("complete", () => {
    test("should get data from datastore and call logger function", () => {
      const loggerMock = jest.fn();
      const getCurrentResultMock = jest.fn();
      process.logger = loggerMock;
      process.dataStore.getCurrentResult = getCurrentResultMock;
      process.complete();
      expect(loggerMock).toHaveBeenCalledTimes(1);
      expect(getCurrentResultMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("outputData", () => {
    test("should get data from datastore, call logger function, and call incrementMatchDay", () => {
      const loggerMock = jest.fn();
      const getCurrentResultMock = jest.fn();
      const incrementMatchDayMock = jest.fn();
      process.logger = loggerMock;
      process.dataStore.getCurrentResult = getCurrentResultMock;
      process.dataStore.incrementMatchDay = incrementMatchDayMock;
      process.outputData();
      expect(loggerMock).toHaveBeenCalledTimes(1);
      expect(getCurrentResultMock).toHaveBeenCalledTimes(1);
      expect(incrementMatchDayMock).toHaveBeenCalledTimes(1);
    });
    test("should clear set", () => {
      const loggerMock = jest.fn();
      process.logger = loggerMock;
      process.set.add("test");
      process.outputData();
      expect(process.set.has("test")).toBeFalsy();
    });
  });
  describe("calcGameResults", () => {
    test("should set team1 with 3 points and team2 with 0 when team1 has higher score", () => {
      const input = {
        teamName1: "team1",
        score1: 2,
        teamName2: "team2",
        score2: 1,
      };
      const output = [
        {
          name: "team1",
          points: 3,
        },
        {
          name: "team2",
          points: 0,
        },
      ];
      expect(process.calcGameResults(input)).toEqual(output);
    });
    test("should set team2 with 3 points and team1 with 0 when team2 has higher score", () => {
      const input = {
        teamName1: "team1",
        score1: 1,
        teamName2: "team2",
        score2: 2,
      };
      const output = [
        {
          name: "team1",
          points: 0,
        },
        {
          name: "team2",
          points: 3,
        },
      ];
      expect(process.calcGameResults(input)).toEqual(output);
    });
    test("should set team1 with 1 points and team2 with 1 when there is a tie", () => {
      const input = {
        teamName1: "team1",
        score1: 0,
        teamName2: "team2",
        score2: 0,
      };
      const output = [
        {
          name: "team1",
          points: 1,
        },
        {
          name: "team2",
          points: 1,
        },
      ];
      expect(process.calcGameResults(input)).toEqual(output);
    });
  });
});
