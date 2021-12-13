function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  let count = 0
  for (let i = 1; i < lines.length; i++) {
    if (Number(lines[i]) > Number(lines[i-1])) {
      count++;
    }
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
