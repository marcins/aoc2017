const fs = require('fs');
const input = fs.readFileSync('seven.txt', 'utf-8').split('\n');
const RE_ROW = /(\w+) \((\d+)\)( -> ([\w\,\ ]+))?/;
const data = input.map(row => {
    const match = row.match(RE_ROW);
    return {
        name: match[1],
        weight: +match[2],
        children: match[4] ? match[4].split(',').map(_ => _.trim()) : []
    };
});

let root;
data.forEach(node => {
    if (node.children.length > 0) {
        if (!data.some(n => n.children.includes(node.name))) {
            root = node;
        }
    }
});

const deref = ref => data.find(node => node.name === ref);

function weight(node) {
    return node.children.reduce((w, ref) => {
        return w + weight(deref(ref));
    }, node.weight);
}

let ptr = root;
while (ptr) {
    const children = ptr.children.map(ref => deref(ref));
    const weights = children.map(c => weight(c));
    console.log('P:', ptr.name, weights);
    let counts = {};
    for (let i = 0; i < weights.length; i++) {
        if (!counts.hasOwnProperty(weights[i])) {
            counts[weights[i]] = 0;
        }
        counts[weights[i]]++;
    }
    const badValue = Object.keys(counts).find(w => counts[w] === 1);
    const badChild = children[weights.indexOf(+badValue)];
    console.log(badValue, badChild);
    if (badChild) {
        ptr = badChild;
    } else {
        ptr = null;
    }
}
