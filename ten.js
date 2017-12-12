const fs = require("fs");
// const input = fs.readFileSync(process.argv[2], "utf8").split("\n");

let pos = 0;
let skip = 0;
let list = [];
for (let i = 0; i < 256; i++) {
  list.push(i);
}
let input = `97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190`;
input = input
  .split("")
  .map(c => c.charCodeAt(0))
  .concat([17, 31, 73, 47, 23]);

for (let round = 0; round < 64; round++) {
  input.forEach(inp => {
    const sublist = [];
    const start = pos,
      end = pos + inp;
    for (let i = start; i < end; i++) {
      sublist.push(list[i % list.length]);
    }
    sublist.reverse();
    for (let i = start, ptr = 0; i < end; i++, ptr++) {
      list[i % list.length] = sublist[ptr];
    }
    // console.log("inc by", inp + skip);
    pos = (pos + inp + skip) % list.length;
    skip++;

    // console.log(list, pos, skip);
  });
}

const dense = [];
for (let b = 0; b < 256; b += 16) {
  const seg = list.slice(b, b + 16);
  dense.push(seg.reduce((acc, v) => acc ^ v, 0));
}

console.log(dense.map(v => v.toString(16)).join(""));

console.log(dense);
