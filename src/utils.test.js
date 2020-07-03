const { comparator, parser, logger } = require("./utils");

describe("Utils functions", () => {
  describe("parser", () => {
    test("should parse a line of score to include team and points", () => {
      const str = "San Jose Earthquakes 3, Santa Cruz Slugs 3";
      const output = parser(str);
      expect(output).toEqual({
        teamName1: "San Jose Earthquakes",
        score1: 3,
        teamName2: "Santa Cruz Slugs",
        score2: 3,
      });
    });
  });

  describe("logger", () => {
    test("should console log output the matchday results", () => {
      const data = {
        matchDay: 1,
        teams: [
          ["team1", 5],
          ["team2", 3],
          ["team3", 1],
        ],
      };
      console.log = jest.fn();
      logger(data);
      expect(console.log.mock.calls.length).toBe(5);
      expect(console.log.mock.calls[0][0]).toBe("Matchday 1");
      expect(console.log.mock.calls[1][0]).toBe("team1, 5 pts");
      expect(console.log.mock.calls[2][0]).toBe("team2, 3 pts");
      expect(console.log.mock.calls[3][0]).toBe("team3, 1 pts");
      expect(console.log.mock.calls[4][0]).toBe("");
    });
  });

  describe("comparator", () => {
    test("should return number less than 0 if a has more points", () => {
      const a = ["a", 5];
      const b = ["b", 2];
      expect(comparator(a, b)).toBeLessThan(0);
    });

    test("should return number greater than 0 if b has more points", () => {
      const a = ["a", 2];
      const b = ["b", 3];
      expect(comparator(a, b)).toBeGreaterThan(0);
    });

    test("should compare char and return less than 0 if a and b has the same points", () => {
      const a = ["a", 0];
      const b = ["b", 0];
      expect(comparator(a, b)).toBeLessThan(0);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
