class Expr {
  constructor(exp) {
    this.s = exp;
    this.index = 0;
    this.args = this.parse();
  }

  get current() {
    return this.charAt(this.index);
  }

  get length() {
    return this.s.length;
  }

  get remaining() {
    return this.index < this.length;
  }

  parse() {
    const args = [];
    while (this.remaining) {
      const c = this.current;
      const begin = this.index;
      if (isDigit(c)) {
        args.push(this.parseDigit());
      } else if (c == "(") {
        this.index++;
        args.push(this.parse());
      } else if (c == ")") {
        this.index++;
        break;
      } else if (c == " ") {
        this.index++;
      } else {
        args.push(this.parseSymbol());
      }
      const end = this.index;
      if (begin == end) {
        throw new Error(
          `scan position did not advance stuck at ${begin} = '${this.current}'`
        );
      }
    }
    return args;
  }

  parseSymbol() {
    const start = this.index;
    while (
      this.remaining &&
      this.current != " " &&
      this.current != ")" &&
      this.current != "("
    ) {
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
      throw new Error("invalid lispy expression");
    }
    return evaluate(this.args[0]);
  }
}

function evaluate(exp, env) {
  if (typeof exp === "number") {
    return exp;
  } else if (typeof exp === "object" && exp.length) {
    console.log(exp);
    const fun = exp[0];
    if (fun === "add") {
      return evaluate(exp[1], env) + evaluate(exp[2], env);
    } else if (fun === "mult") {
      return evaluate(exp[1], env) * evaluate(exp[2], env);
    } else if (fun === "let") {
      const sym = exp[1];
      const val = evaluate(exp[2], env);
      return evaluate(exp[3], new Env(sym, val, env));
    }
  } else if (typeof exp === 'string') {
    return env.valueOf(exp);
  }
  throw new Error(`invalid expression (${exp})`);
}

class Env {
  constructor(sym, val, next) {
    this.sym = sym;
    this.val = val;
    this.next = next;
  }

  valueOf(sym) {
    let env = this;
    while(env) {
      if (env.sym === sym) {
        return this.val;
      }
      env = env.next;
    }
    throw new Error(`symbol ${sym} was not found in env`);
  }
}

function isDigit(c) {
  const val = c.charCodeAt(0);
  return "0".charCodeAt(0) <= val && val <= "9".charCodeAt(0);
}

module.exports = {
  Expr,
};
