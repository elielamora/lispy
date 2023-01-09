const { interpret } = require("./interpreter");

it("evaluates a number", () => {
  expect(interpret("42")).toEqual(42);
});

it("adds two numbers", () => {
  expect(interpret("(add 12 30)")).toEqual(42);
});

it("adds nested expressions", () => {
  expect(interpret("(add 12 (add 1 29))")).toEqual(42);
  expect(interpret("(add (add 1 29) 12)")).toEqual(42);
  expect(interpret("(add (add 1 29) (add 3 9))")).toEqual(42);
});

it("multiplies expressions", () => {
  expect(interpret("(mult 21 2)")).toEqual(42);
  expect(interpret("(mult 3 (mult 7 2))")).toEqual(42);
  expect(interpret("(mult (mult 2 7) 3)")).toEqual(42);
  expect(interpret("(mult (mult 1 7) (mult 2 3))")).toEqual(42);
});

it("can declare variables", () => {
  expect(interpret("(let x 42 x)")).toEqual(42);
});

it("can set variables to result of expression", () => {
  expect(interpret("(let hello (add 42 0) hello)")).toEqual(42);
});

it("evaluates nested let statements and shadows", () => {
  expect(interpret("(let x 41 (let x 42 x))")).toEqual(42);
});

it("assignes multiple variables in a single let expression", () => {
  expect(interpret("(let x 41 y 42 y)")).toEqual(42);
});

it("performs complex expression evaluation supporting new lines", () => {
  expect(
    interpret(`
    (let x 3 y 4
      (add 2
        (mult 5
          (let x y
            (add x x)
          )
        )
      )
    )
  `)
  ).toEqual(42);
});

it("define functions", () => {
  expect(
    interpret(`
    (def square (x)
      (mult x x)
    )
    (square 42)
  `)
  ).toEqual(1764);
});
