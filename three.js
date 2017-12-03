const assert = require("assert");

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

function manhattan(n) {
  let maxx = 0,
    maxy = 0,
    miny = 0,
    minx = 0;

  if (n === 1) return 1;

  let x = 0,
    y = 0;

  let dir = RIGHT;
  const grid = {};

  grid[1] = { x, y, v: 1 };

  const calcv = (gx, gy) => {
    const vv = Object.keys(grid).find(index => {
      const item = grid[index];
      if (item.x === gx && item.y === gy) {
        return true;
      }
    });
    return vv ? grid[vv].v : 0;
  };

  for (let i = 2; i <= n; i++) {
    if (dir === RIGHT) {
      x++;
      if (x > maxx) {
        dir = UP;
        maxx = x;
      }
    } else if (dir === UP) {
      y--;
      if (y < miny) {
        dir = LEFT;
        miny = y;
      }
    } else if (dir === LEFT) {
      x--;
      if (x < minx) {
        dir = DOWN;
        minx = x;
      }
    } else if (dir === DOWN) {
      y++;
      if (y > maxy) {
        dir = RIGHT;
        maxy = y;
      }
    }

    let v =
      calcv(x + 1, y) +
      calcv(x + 1, y - 1) +
      calcv(x, y - 1) +
      calcv(x - 1, y - 1) +
      calcv(x - 1, y) +
      calcv(x - 1, y + 1) +
      calcv(x, y + 1) +
      calcv(x + 1, y + 1);

    if (v > n) {
      return v;
    }

    grid[i] = { x, y, v };
  }

  return grid[n].v;
}

console.log(manhattan(361527));
