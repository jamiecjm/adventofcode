const solveProblem = (inputs) => {
  const pointsFor = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  let scoreBoard = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let stack = [];
    let corrupted = false;
    for (let j = 0; j < input.length; j++) {
      const char = input[j];
      if (char === '[') {
        stack.push(']');
      } else if (char === '(') {
        stack.push(')');
      } else if (char === '{') {
        stack.push('}');
      } else if (char === '<') {
        stack.push('>');
      } else {
        if (stack.length === 0 || stack.pop() !== char) {
          corrupted = true;
          break;
        }
      }
    }
    if (!corrupted) {
      let points = 0;
      while (stack.length > 0) {
        const char = stack.pop();
        points = (points * 5) + pointsFor[char];
      }
      scoreBoard.push(points);
    }
  }

  scoreBoard = scoreBoard.sort((a,b) => a-b);
  const middleScore = scoreBoard[Math.floor(scoreBoard.length/2)];

  console.log('scoreBoard', scoreBoard);
  console.log('middleScore', middleScore);
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
