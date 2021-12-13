function processData(input) {
  //Enter your code here
  n = 80;
  // n/9 = 2;
  const lines = input.split('\n');
  const initialState = lines[0].split(',').map((string) => Number(string));
  // const count = {}

  let count = 0;
  for (let i = 0; i < 9; i++) {
    const fishCount = initialState.filter((days) => days === i).length;
    count += (fishCount + countFish(n, i, fishCount));
  }

  console.log('count', count);
}

function countFish(daysLeft, timer, count) {
  if (count === 0) {
    return 0;
  }
  const remainingDays = daysLeft - timer;
  let fishCount = 0;
  if (remainingDays > 0) {
    // new fish
    fishCount += count;
    // new fish from new fish
    fishCount += countFish(remainingDays, 9, fishCount);
    // new fish from current fish
    fishCount += countFish(remainingDays, 7, count);
  }


  return fishCount;
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
