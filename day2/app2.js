function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < lines.length - 1; i++) {
    const [command, valueString] = lines[i].split(' ');
    const value = Number(valueString);
    if (command === 'forward') {
      horizontal += value;
      depth += (value * aim);
    } else if (command === 'down') {
      aim += value;
    } else if (command === 'up') {
      aim -= value;
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
