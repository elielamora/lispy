const { Expr } = require("./interpreter");

it("evaluates a number", () => {
  expect(new Expr("42").eval()).toEqual(42);
});
