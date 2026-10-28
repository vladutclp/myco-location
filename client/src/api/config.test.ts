import { PARSE_API_BASE_URL_ERROR_MESSAGE, parseApiBaseUrl } from "./config";

const throwTests = [
  { input: undefined },
  { input: null },
  { input: "" },
  { input: 120 },
  { input: "bla bla bla" },
  { input: "ftp://x" },
];

const parsedTests = [
  { input: "http://localhost:8080/api", expected: "http://localhost:8080/api" },
  {
    input: "https://localhost:8080/api",
    expected: "https://localhost:8080/api",
  },
  {
    input: "https://localhost:8080/api/",
    expected: "https://localhost:8080/api",
  },
  {
    input: "https://localhost:8080/api//////",
    expected: "https://localhost:8080/api",
  },
  { input: "https://localhost:8080", expected: "https://localhost:8080" },
];

describe("parseApiBaseUrl", () => {
  it.for(throwTests)('should throw for "$input"', ({ input }) => {
    expect(() => parseApiBaseUrl(input)).toThrow(
      new Error(PARSE_API_BASE_URL_ERROR_MESSAGE),
    );
  });

  it.for(parsedTests)(
    "parseApiBaseUrl($input) -> $expected",
    ({ input, expected }) => {
      expect(parseApiBaseUrl(input)).toBe(expected);
    },
  );
});
