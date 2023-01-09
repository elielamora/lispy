function interpret(exp) {
  return evaluate(parse(exp))[0];
}

module.exports = {
  interpret,
};
