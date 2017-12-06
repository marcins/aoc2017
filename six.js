const input = `2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14`;

const blocks = input.split('\t').map(b => parseInt(b));

function biggest(blocks) {
    let maxValue = 0;
    let maxIndex = -1;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] > maxValue) {
            maxValue = blocks[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}
let cycles = 0;
let seenOnce = false;
const seen = {};
while (true) {
    let idx = biggest(blocks);
    const count = blocks[idx];
    blocks[idx] = 0;
    for (let i = 0; i < count; i++) {
        ++idx;
        if (idx === blocks.length) {
            idx = 0;
        }
        blocks[idx]++;
    }
    cycles++;
    const state = blocks.join('-');
    if (seen.hasOwnProperty(state)) {
        console.log(cycles - seen[state]);
        break;
    }
    seen[state] = cycles;
}

console.log(cycles);
