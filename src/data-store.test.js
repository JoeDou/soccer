const DataStore = require("./data-store");
const { comparator } = require("./utils");

describe("DataStore Class", () => {
  let dataStore;
  let mockStanding;
  let mockOutput;
  beforeEach(() => {
    dataStore = new DataStore();
    mockStanding = {
      a: 3,
      bb: 2,
      ba: 2,
      c: 1,
    };
    mockOutput = [
      ["a", 3],
      ["ba", 2],
      ["bb", 2],
    ];
  });

  describe("constructor", () => {
    test("should initialize DataStore", () => {
      expect(dataStore.matchDay).toBe(1);
      expect(dataStore.standing).toEqual({});
      expect(dataStore.comparator).toEqual(comparator);
    });
  });

  describe("addGameResult", () => {
    beforeEach(() => {
      const result = {
        name: "test",
        points: 1,
      };
      dataStore.addGameResult(result);
    });

    test("should add new key and update points for a new team", () => {
      expect(dataStore.standing).toEqual({ test: 1 });
    });

    test("should find new key and update points for the existing team", () => {
      const result2 = {
        name: "test",
        points: 2,
      };
      dataStore.addGameResult(result2);
      expect(dataStore.standing).toEqual({ test: 3 });
    });
  });

  describe("incrementMatchDay", () => {
    test("should update matchDay count", () => {
      const current = dataStore.matchDay;
      dataStore.incrementMatchDay();
      expect(dataStore.matchDay).toEqual(current + 1);
    });
  });

  describe("getTopTeams", () => {
    test("should return top 3 teams", () => {
      dataStore.standing = mockStanding;
      expect(dataStore.getTopTeams()).toEqual(mockOutput);
    });
  });

  describe("getCurrentResult", () => {
    test("should return the current top 3 teams and match day value", () => {
      dataStore.standing = mockStanding;
      const output = {
        matchDay: 1,
        teams: mockOutput,
      };
      expect(dataStore.getCurrentResult()).toEqual(output);
    });
  });
});
