const solveProblem = (inputs) => {
  let i = 0;
  let energy = [];

  for (let row = 0; row < inputs.length; row++) {
    energy[row] = [];
    for (let col = 0; col < inputs[row].length; col++) {
      energy[row][col] = Number(inputs[row][col]);
    }
  }

  let flashes = 0;
  while (flashes !== 100) {
    flashes = step(energy);
    i++;
  }
  for (let row = 0; row < energy.length; row++) {
    console.log(energy[row].join(''));
  }

  console.log('i', i);
}

const step = (inputs) => {
  let flashed = {};
  let flashes = 0;
  for (let row = 0; row < inputs.length; row++) {
    for (let col = 0; col < inputs[row].length; col++) {
      flashes += increaseEnergy(row, col, flashed, inputs);
    }
  }

  return flashes;
}

const increaseEnergy = (x, y, flashed, inputs) => {
  let flashes = 0;

  if (inputs[x] !== undefined && inputs[x][y] !== undefined){
    if (!flashed[`${x}-${y}`]) {
      inputs[x][y] += 1;
    }

    if (inputs[x][y] === 10) {
      flashes += 1;
      inputs[x][y] = 0;
      flashed[`${x}-${y}`] = true;

      flashes += increaseEnergy(x-1, y-1, flashed, inputs);
      flashes += increaseEnergy(x-1, y, flashed, inputs);
      flashes += increaseEnergy(x-1, y+1, flashed, inputs);
      flashes += increaseEnergy(x+1, y-1, flashed, inputs);
      flashes += increaseEnergy(x+1, y, flashed, inputs);
      flashes += increaseEnergy(x+1, y+1, flashed, inputs);
      flashes += increaseEnergy(x, y-1, flashed, inputs);
      flashes += increaseEnergy(x, y+1, flashed, inputs);
    }
  }

  return flashes;
}

function readInput() {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  let _inputs = []
  rl.on('line', function (line) {
    _inputs.push(line);
  })

  .on('close', () => {
    // Finished processing input, now solve question
    solveProblem(_inputs)
    process.exit()
  })
}

readInput()
