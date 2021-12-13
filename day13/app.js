const solveProblem = (inputs) => {
  let foldDirections = [];
  let coordinatesY = {};
  let coordinatesX = {};
  let maxY = 0;
  let maxX = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === '') {
      continue;
    }

    if (inputs[i].includes('fold')) {
      const foldDirection = inputs[i].match(/.=\d+/);
      if (foldDirection) {
        foldDirections.push(foldDirection[0].split('='));
      }
      continue;
    }

    const [x,y] = inputs[i].split(',');
    coordinatesY[y] = coordinatesY[y] || {};
    coordinatesY[y][x] = true;
    coordinatesX[x] = coordinatesX[x] || {};
    coordinatesX[x][y] = true;
    maxY = Number(y) > maxY ? Number(y) : maxY;
    maxX = Number(x) > maxX ? Number(x) : maxX;
  }

  for (let j = 0; j < foldDirections.length; j++) {
    const number = Number(foldDirections[j][1]);
    if (foldDirections[j][0] === 'y') {
      for (let k = number + 1; k <= maxY; k++) {
        if (!coordinatesY[k]) {
          continue;
        }
        const newY = k - ((k - number) * 2);
        Object.keys(coordinatesY[k]).forEach((a) => {
          coordinatesY[newY] = coordinatesY[newY] || {};
          coordinatesY[newY][a] = true;
          if (coordinatesX[a] !== null) {
            coordinatesX[a][k] = false;
            coordinatesX[a][newY] = true;
          }
        });
        coordinatesY[k] = null;
      }
      maxY = number - 1;
    } else {
      for (let k = number + 1; k <= maxX; k++) {
        if (!coordinatesX[k]) {
          continue;
        }
        const newX = k - ((k - number) * 2);
        Object.keys(coordinatesX[k]).forEach((a) => {
          coordinatesX[newX] = coordinatesX[newX] || {};
          coordinatesX[newX][a] = true;
          if (coordinatesY[a] !== null) {
            coordinatesY[a][k] = false;
            coordinatesY[a][newX] = true;
          }
        });
        coordinatesX[k] = null;
      }
      maxX = number - 1;
    }
  }

  for (let i = 0; i <= maxY; i++){
    for (let j = 0; j <= maxX; j++){
      if (coordinatesY[i] && coordinatesY[i][j]) {
        process.stdout.write('##')
      } else {
        process.stdout.write('  ')
      }
    }
    process.stdout.write('\n')
  }
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
