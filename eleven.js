const fs = require('fs');
const input = fs.readFileSync('eleven.txt', 'utf8').split(',');

// https://www.redblobgames.com/grids/hexagons/#distances

function evenq_to_cube(hx, hy) {
    let x = hx;
    let z = hy - (hx + (hx & 1)) / 2;
    let y = -x - z;
    return { x, y, z };
}

function axial_to_cube(hx, hy) {
    let x = hx;
    let z = hy;
    let y = -x - z;
    return { x, y, z };
}

function cube_distance(a, b) {
    return Math.max(
        Math.abs(a.x - b.x),
        Math.abs(a.y - b.y),
        Math.abs(a.z - b.z)
    );
}

function hex_distance(x1, y1, x2, y2) {
    let ac = evenq_to_cube(x1, y1);
    let bc = evenq_to_cube(x2, y2);
    return cube_distance(ac, bc);
}

let x = 0,
    y = 0;
let max = 0;

input.forEach(dir => {
    switch (dir) {
        case 'ne':
            x++;
            y--;
            break;
        case 'se':
            x++;
            y++;
            break;
        case 'sw':
            x--;
            y++;
            break;
        case 'nw':
            x--;
            y--;
            break;
        case 'n':
            y--;
            break;
        case 's':
            y++;
            break;
    }
    const d = hex_distance(x, y, 0, 0);
    if (d > max) {
        max = d;
    }
});

console.log(max);
