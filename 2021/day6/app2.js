function processData(input) {
  //Enter your code here
  n = 256;
  const lines = input.split('\n');
  const initialState = lines[0].split(',').map((string) => Number(string));
  count = {}

  for (let i = 0; i < 9; i++) {
    count[i] = initialState.filter((days) => days === i).length;
  }

  for (let day = 1; day <= n; day++) {
    console.log('day', day);
    let newCount = {}
    for (let i = 0; i < 9; i++) {
      const next = i - 1 === -1 ? 6 : i - 1;
      if (newCount[next] === undefined) {
        newCount[next] = 0
      }
      newCount[next] += count[i];
      if (i === 0) {
        newCount[8] = count[i];
      }
    }
    count = newCount;
  }

  const sum = Object.values(count).reduce((aggregator, number) => aggregator + number, 0);
  console.log('sum', sum);
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
