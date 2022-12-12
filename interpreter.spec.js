const { Expr } = require("./interpreter");

it("evaluates a number", () => {
  expect(new Expr("42").eval()).toEqual(42);
});

it("adds two numbers", () => {
  expect(new Expr("(add 12 30)").eval()).toEqual(42);
});
