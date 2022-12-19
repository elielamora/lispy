const { parse } = require("./parser");
const { evaluate } = require("./evalutator");

class Expr {
  constructor(exp) {
    this.exp = parse(exp);
  }

  eval() {
    return evaluate(this.exp)[0];
  }
}

module.exports = {
  Expr,
};
