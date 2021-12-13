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
        sumOfLowestPoint.push(number);
      }
      col++;;
    }
    row++;
  };

  const sum = sumOfLowestPoint.reduce((sum, number) => sum + Number(number) + 1, 0);
  console.log('sum', sum);
  return sum;
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
