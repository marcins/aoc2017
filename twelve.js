const fs = require('fs');

const RE_MAP = /(\d+) <-> (.*)/;

const input = fs
    .readFileSync('twelve.txt', 'utf8')
    .split('\n')
    .map(row => {
        const match = row.match(RE_MAP);
        const pgm = +match[1];
        const conn = match[2].split(',').map(v => +v.trim());
        return conn;
    });

const seen = new Set();
const groups = [];

function visit(s, vertex) {
    vertex.forEach(v => {
        if (!seen.has(v)) {
            seen.add(v);
            s.add(v);
            visit(s, input[v]);
        }
    });
}
for (let i = 0; i < input.length; i++) {
    if (!seen.has(i)) {
        const s = new Set();
        groups.push(s);
        s.add(i);
        seen.add(i);
        const vertex = input[i];
        visit(s, vertex);
    }
}

console.log(groups[0].size, groups.length);
