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

it("multiplies expressions", () => {
  expect(new Expr("(mult 21 2)").eval()).toEqual(42);
  expect(new Expr("(mult 3 (mult 7 2))").eval()).toEqual(42);
  expect(new Expr("(mult (mult 2 7) 3)").eval()).toEqual(42);
  expect(new Expr("(mult (mult 1 7) (mult 2 3))").eval()).toEqual(42);
});
