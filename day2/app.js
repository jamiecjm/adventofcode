function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < lines.length - 1; i++) {
    const [command, valueString] = lines[i].split(' ');
    const value = Number(valueString);
    if (command === 'forward') {
      horizontal += value;
    } else if (command === 'down') {
      depth += value;
    } else if (command === 'up') {
      depth -= value;
    }
  }

  console.log(horizontal * depth);
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
