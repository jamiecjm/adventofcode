function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  let count = 0;
  let previousSum;
  for (let i = 2; i < lines.length; i++) {
    const sum = Number(lines[i]) + Number(lines[i-1]) + Number(lines[i-2]);

    if (previousSum !== undefined && sum > previousSum) {
      count++;
    }

    previousSum = sum;
  }

  console.log(count);
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
