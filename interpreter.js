const { parse } = require("./parser");
const { evaluate } = require("./evalutator");

function interpret(exp) {
  return evaluate(parse(exp))[0];
}

module.exports = {
  interpret,
};
