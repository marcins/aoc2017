const fs = require("fs");
const RE_CODE = /(\w+) (\w+) (-?\d+) if (.*)/i;

const program = fs
  .readFileSync(process.argv[2], "utf8")
  .split("\n")
  .map(line => line.trim());

const parsed = program.map(line => {
  //   console.log(line);
  const match = line.match(RE_CODE);
  //   console.log(match);
  return {
    reg: match[1],
    op: match[2],
    value: +match[3],
    condition: match[4]
  };
});

let maxSeen = 0;
const state = {};
parsed.forEach(line => {
  if (!state.hasOwnProperty(line.reg)) {
    state[line.reg] = 0;
  }
  const testReg = line.condition.split(" ")[0];
  if (!state.hasOwnProperty(testReg)) {
    state[testReg] = 0;
  }
  if (eval(`(state.${line.condition})`)) {
    switch (line.op) {
      case "inc": {
        state[line.reg] += line.value;
        break;
      }
      case "dec": {
        state[line.reg] -= line.value;
        break;
      }
    }
    if (state[line.reg] > maxSeen) {
      maxSeen = state[line.reg];
    }
  }
});

let max = 0;
let maxReg;

Object.keys(state).forEach(key => {
  if (state[key] > max) {
    max = state[key];
    maxReg = key;
  }
});

console.log(state, max, maxReg, maxSeen);
