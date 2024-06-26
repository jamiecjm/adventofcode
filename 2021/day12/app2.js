const solveProblem = (inputs) => {
  let connections = {};

  for (let i = 0; i < inputs.length; i++) {
    const [cave1, cave2] = inputs[i].split('-');

    connections[cave1] = connections[cave1] || [];
    connections[cave2] = connections[cave2] || [];

    if (cave2 !== 'start' && cave1 !== 'end') {
      connections[cave1].push(cave2);
    }
    if (cave1 !== 'start' && cave2 !== 'end') {
      connections[cave2].push(cave1);
    }
  }

  let paths = [];

  dfs('start', '', false, connections, paths);

  console.log('paths', paths);
  console.log('count', paths.length);
}

const dfs = (cave, currentPath, visitedSmallCavesTwice, connections, paths) => {
  currentPath += cave === 'start' ? cave :  `,${cave}`;
  if (cave === 'end') {
    paths.push(currentPath);
  }

  const neighbours = connections[cave];
  for (let i = 0; i < neighbours.length; i ++) {

    const nextCave = neighbours[i];
    if (nextCave === 'end') {
      dfs(nextCave, currentPath, visitedSmallCavesTwice, connections, paths);
    } else if (nextCave.toLowerCase() === nextCave) {
      // small cave
      if (!currentPath.includes(nextCave)) {
        dfs(nextCave, currentPath, visitedSmallCavesTwice, connections, paths);
      } else if (!visitedSmallCavesTwice) {
        dfs(nextCave, currentPath, true, connections, paths);
      }
    } else if (nextCave.toUpperCase() === nextCave) {
      // big cave
      dfs(nextCave, currentPath, visitedSmallCavesTwice, connections, paths);
    }
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
