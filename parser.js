function parse(exp) {
  const [r] = parseRec(exp, 0);
  return r;
}

function current(s, i) {
  return s.charAt(i);
}

function len(s) {
  return (s || "").length;
}

function remaining(s, i) {
  return i < len(s);
}

function parseRec(s, i) {
  const args = [];
  while (remaining(s, i)) {
    const c = current(s, i);
    const begin = i;
    if (isDigit(c)) {
      const [num, n] = parseNumber(s, i);
      i = n;
      args.push(num);
    } else if (c == "(") {
      i++;
      const [exp, n] = parseRec(s, i);
      i = n;
      args.push(exp);
    } else if (c == ")") {
      i++;
      break;
    } else if (isWhitespace(c)) {
      i++;
    } else if (isSymbol(c)) {
      const [sym, n] = parseSymbol(s, i);
      i = n;
      args.push(sym);
    } else {
      throw new Error(`cannot parse ${s} at ${i}`);
    }
    const end = i;
    if (begin == end) {
      throw new Error(
        `scan position did not advance stuck at ${begin} = '${end}'`
      );
    }
  }
  return [args, i];
}

function parseNumber(s, start) {
  let i = start;
  let c = current(s, i);
  while (remaining(s, i) && isDigit(c)) {
    i++;
    c = current(s, i);
  }
  const numStr = s.substring(start, i);
  const num = parseInt(numStr, 10);
  return [num, i];
}

function parseSymbol(s, start) {
  let i = start;
  let c = current(s, i);
  while (remaining(s, i) && isSymbol(c)) {
    i++;
    c = current(s, i);
  }
  return [s.substring(start, i), i];
}

function isSymbol(c) {
  return !isWhitespace(c) && c != ")" && c != "(" && !isDigit(c);
}

function isDigit(c) {
  const val = c.charCodeAt(0);
  return "0".charCodeAt(0) <= val && val <= "9".charCodeAt(0);
}

function isWhitespace(c) {
  return c === " " || c === "\n" || c === "\t";
}

module.exports = {
  parse,
};
