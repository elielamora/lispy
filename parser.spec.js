const { parse } = require("./parser");

it("parses an addition expression", () => {
  expect(parse("(add 31 13)")).toEqual([["add", 31, 13]]);
});

it("parses a function definition expression", () => {
  expect(
    parse(`
    (def square (x)
      (mult x x)
    )
    (square 4)
  `)
  ).toEqual([
    ["def", "square", ["x"], ["mult", "x", "x"]],
    ["square", 4],
  ]);
});
