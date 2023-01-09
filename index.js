"use strict";

const process = require("process");
const readline = require("readline");
const { interpret } = require("./interpreter");

function repl() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", (line) => {
    if (line === "quit" || line === "exit") {
      rl.close();
      return;
    }
    console.log(evalExpr(line));
  });

  rl.once("close", () => {
    process.exit();
  });
}

function evalExpr(line) {
  try {
    return interpret(line);
  } catch (error) {
    return error.message || error.toString();
  }
}

module.exports = function main(args) {
  if (args.length && args[0].endsWith("node")) {
    args.shift();
  }
  if (args.length && args[0].endsWith("lispy")) {
    args.shift();
  }
  if (args.length === 0) {
    repl();
  } else if (args.length === 1) {
    console.log(evalExpr(args[0]));
  } else {
    console.log(
      `usage: lispy for repl or lispy <arg> for single expression evaluation`
    );
  }
};
