function evaluate(exp) {
  let env = undefined;
  let val = undefined;
  if (!isIterable(exp)) {
    exp = [exp];
  }
  for (e of exp) {
    val = evaluateRec(e, env, (newEnv) => {
      env = newEnv;
    });
  }
  return [val, env];
}

function isIterable(x) {
  return typeof x[Symbol.iterator] === "function";
}

function evaluateRec(exp, env, updateEnv) {
  if (typeof exp === "number") {
    return exp;
  } else if (typeof exp === "object" && exp.length) {
    const fun = exp[0];
    if (fun === "add") {
      return (
        evaluateRec(exp[1], env, updateEnv) +
        evaluateRec(exp[2], env, updateEnv)
      );
    } else if (fun === "mult") {
      return (
        evaluateRec(exp[1], env, updateEnv) *
        evaluateRec(exp[2], env, updateEnv)
      );
    } else if (fun === "let") {
      if (exp.length < 4 || exp.length % 2 !== 0) {
        throw new Error(`invalid argument count (${exp.length})`);
      }
      let newEnv = env;
      for (let i = 1; i < exp.length - 1; i += 2) {
        const sym = exp[i];
        const val = evaluateRec(exp[i + 1], newEnv, updateEnv);
        newEnv = new Env(sym, val, newEnv);
        updateEnv(newEnv);
      }
      return evaluateRec(exp[exp.length - 1], newEnv, updateEnv);
    } else if (fun === "def") {
      if (exp.length < 4) {
        throw new Error(
          `invalid argument count for function definition (${exp.length})`
        );
      }
      const name = exp[1];
      const args = exp[2];
      const impl = exp[3];
      const func = new Func(name, args, impl);
      updateEnv(new Env(name, func, env));
      return func;
    } else if (env.hasFunctionNamed(fun)) {
      const func = env.valueOf(fun);
      const args = [];
      for (let i = 1; i < exp.length; i++) {
        args.push(evaluateRec(exp[i], env, updateEnv));
      }
      return func.invoke(args);
    }
  } else if (typeof exp === "string") {
    if (!env) {
      throw new Error("symbol is undefined");
    }
    return env.valueOf(exp);
  }
  throw new Error(`invalid expression (${JSON.stringify(exp)})`);
}

class Env {
  constructor(sym, val, next) {
    this.sym = sym;
    this.val = val;
    this.next = next;
  }

  valueOf(sym) {
    let env = this;
    while (env) {
      if (env.sym === sym) {
        return env.val;
      }
      env = env.next;
    }
    throw new Error(`symbol '${sym}' was not found in env ${this.toString()}`);
  }

  hasFunctionNamed(sym) {
    let env = this;
    while (env) {
      if (env.sym === sym && env.val instanceof Func) {
        return true;
      }
      env = env.next;
    }
    return false;
  }

  toString() {
    return JSON.stringify(this.symbolTable());
  }

  symbolTable() {
    const symbolTable = {};
    let env = this;
    while (env) {
      if (symbolTable[env.sym]) {
        continue;
      }
      symbolTable[env.sym] = env.val;
      env = env.next;
    }
    return symbolTable;
  }
}

class Func {
  constructor(name, args, impl) {
    this.name = name;
    this.args = args;
    this.impl = impl;
  }

  invoke(params) {
    let frame = undefined;
    for (const i in this.args) {
      frame = new Env(this.args[i], params[i], frame);
    }
    return evaluateRec(this.impl, frame, () => {});
  }
}

module.exports = {
  evaluate,
};
