const fs = require("fs");
const input = fs.readFileSync("nine.txt", "utf8");

let inGarbage = false;
let ignoreNext = false;
let garbageCount = 0;
const clean = [];
for (let i = 0; i < input.length; i++) {
  const c = input[i];
  if (c === "<") {
    if (inGarbage) {
      garbageCount++;
    }
    inGarbage = true;
  } else if (c === ">") {
    inGarbage = false;
  } else if (c === "!") {
    i++;
  } else if (!inGarbage) {
    clean.push(c);
  } else {
    console.log(c);
    garbageCount++;
  }
}

console.log(garbageCount);
return;

const cleanInput = clean.join("");
let depth = 0;
let score = 0;
for (let i = 0; i < cleanInput.length; i++) {
  const c = cleanInput[i];
  if (c === "{") {
    depth++;
  } else if (c === "}") {
    score += depth;
    depth--;
  }
}

console.log(score, garbageCount);
