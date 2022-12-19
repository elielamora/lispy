const { evaluate } = require("./evalutator");

it("evaluates a function definition", () => {
  const [val, env] = evaluate([
    ["def", "square", ["x"], ["mult", "x", "x"]],
    ["square", 4],
  ]);
  expect(val).toEqual(16);
  expect(env.valueOf("square")).not.toBeNull();
});
