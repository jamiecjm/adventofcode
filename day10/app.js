const solveProblem = (inputs) => {
  const pointsFor = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  let points = 0;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let stack = [];
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
          // corrupted
          points += pointsFor[char];
          break;
        }
      }
    }
  }

  console.log('points', points);
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
