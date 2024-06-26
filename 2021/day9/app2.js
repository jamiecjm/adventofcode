const measureBasin = (inputs, visited, row, col) => {
  if (visited[`${row}-${col}`] || inputs[row][col] === '9') {
    return 0;
  }

  visited[`${row}-${col}`] = true;

  let size = 1;

  if (row !== 0) {
    size += measureBasin(inputs, visited, row-1, col);
  }

  if (row !== inputs.length - 1) {
    size += measureBasin(inputs, visited, row+1, col);
  }

  if (col !== 0) {
    size += measureBasin(inputs, visited, row, col-1);
  }

  if (col !== inputs[0].length - 1) {
    size += measureBasin(inputs, visited, row, col+1);
  }

  return size;
}

const solveProblem = (inputs) => {
  let sumOfLowestPoint = [];

  let row = 0;
  while (row < inputs.length) {
    let col = 0;
    while (col < inputs[0].length) {
      const number = inputs[row][col];
      let top = true;
      let bottom = true;
      let left = true;
      let right = true;

      if (row !== 0) {
        top = number < inputs[row-1][col];
      }

      if (row !== inputs.length - 1) {
        bottom = number < inputs[row+1][col];
      }

      if (col !== 0) {
        left = number < inputs[row][col-1];
      }

      if (col !== inputs[row].length - 1) {
        right = number < inputs[row][col+1];
      }

      if (top && bottom && left && right) {
        let visited = {};
        sumOfLowestPoint.push(measureBasin(inputs, visited, row, col));
      }
      col++;;
    }
    row++;
  };

  sumOfLowestPoint = sumOfLowestPoint.sort((a,b) => b - a);
  const multiply = sumOfLowestPoint.slice(0,3).reduce((multiply, number) => multiply * number, 1);
  console.log('sumOfLowestPoint', sumOfLowestPoint);
  console.log('multiply', multiply);
  return multiply;
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
