const { Expr } = require("./interpreter");

it("evaluates a number", () => {
  expect(new Expr("42").eval()).toEqual(42);
});

it("adds two numbers", () => {
  expect(new Expr("(add 12 30)").eval()).toEqual(42);
});

it("adds nested expressions", () => {
  expect(new Expr("(add 12 (add 1 29))").eval()).toEqual(42);
  expect(new Expr("(add (add 1 29) 12)").eval()).toEqual(42);
  expect(new Expr("(add (add 1 29) (add 3 9))").eval()).toEqual(42);
});
