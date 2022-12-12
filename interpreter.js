class Expr {
  constructor(exp) {
    this.s = exp;
    this.index = 0;
    this.args = this.parse();
  }

  get current() { return this.charAt(this.index); }

  get length() { return this.s.length; }

  get remaining() { return this.index < this.length; }

  parse() {
    const args = [];
    while (this.remaining) {
      const c = this.current;
      const begin = this.index;
      if (isDigit(c)) {
        console.log('is digit')
        args.push(this.parseDigit());
      } else if (c == "(") {
        this.index++;
        args.push(this.parse());
      } else if (c == ")") {
        break;
      } else if (c == " ") {
        this.index++;
      } else {
        args.push(this.parseSymbol());
      }
      const end = this.index;
      if (begin == end) {
        throw new Error(`scan position did not advance stuck at ${begin} = '${this.current}'`);
      }
    }
    return args;
  }

  parseSymbol() {
    console.log('parse symbol');
    const start = this.index;
    while (this.remaining && this.current != " " && this.current != ")" && this.current != "(") {
      this.index++;
    }
    return this.s.substring(start, this.index);
  }

  parseDigit() {
    const start = this.index;
    while (this.remaining && isDigit(this.current)) {
      this.index++;
    }
    return parseInt(this.s.substring(start, this.index), 10);
  }

  charAt(pos) {
    return this.s.charAt(pos);
  }

  eval() {
    if (this.args.length !== 1) {
      throw new Error('invalid lispy expression')
    }
    const exp = this.args[0];
    if (typeof(exp) === 'number') {
      return exp;
    } else if (typeof(exp) === 'object' && exp.length) {
      if (exp[0] === 'add') {
        return exp[1] + exp[2];
      }
    }
    throw new Error(`invalid expression (${exp.args.join(' ')})`);
  }
}

function isDigit(c) {
  const val = c.charCodeAt(0);
  return "0".charCodeAt(0) <= val && val <= "9".charCodeAt(0);
}

module.exports = {
  Expr,
};
