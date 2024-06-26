function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  const numbers = lines[0].split(',');
  let boards = [];
  let boardStats = {};

  let index;
  let board;
  for (let i = 1; i < lines.length - 1; i++) {
    if (lines[i] === '') {
      board = new Array(25);
      boardStats[boards.length] = {
        sum: 0,
        rowStats: [0, 0, 0, 0, 0],
        colStats: [0, 0, 0, 0, 0],
      }
      index = 0;
    } else {
      lines[i].match(/\d+/g).forEach((number) => {
        board[index] = number;
        boardStats[boards.length].sum += Number(number);
        if (index === 24) {
          boards.push(board);
        }
        index++;
      });
    }
  }

  let bingo = false;
  let score = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      const stats = boardStats[j];
      for (let k = 0; k < board.length; k++) {
        if (board[k] === numbers[i]) {
          const lastNum = Number(numbers[i]);
          const row = k%5;
          const column = Math.floor(k/5);
          stats.rowStats[row]++;
          stats.colStats[column]++;
          stats.sum -= lastNum;
          if (stats.rowStats[row] === 5 || stats.colStats[column] === 5) {
            bingo = true;
            score = stats.sum * lastNum
            break;
          }
        }
      }
      if (bingo) {
        break;
      }
    }
    if (bingo) {
      break;
    }
  }

  console.log(score);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
 processData(_input);
});
