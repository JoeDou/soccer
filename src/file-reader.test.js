const { fileReader } = require("./file-reader");
const fs = require("fs");
const readline = require("readline");

jest.mock("fs");
jest.mock("readline");

describe("Utils functions", () => {
  describe("dataReader function", () => {
    test("should call createReadStream and createInterface", () => {
      fileReader({ filePath: "test" });
      fs.createReadStream.mockReturnValue(true);
      expect(fs.createReadStream).toHaveBeenCalledWith("test");
      expect(readline.createInterface).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
