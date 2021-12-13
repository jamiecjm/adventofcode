function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  const length = lines[0].length;
  let count = {};
  for (let n = 0; n < length; n++) {
    count[n] = [0, 0];
  }

  for (let i = 0; i < lines.length - 1; i++) {
    const value = lines[i];
    for (let n = 0; n < length; n++) {
      count[n][Number(value[n])]++;
    }
  }

  let gammaBin = '';
  let epsilonBin = '';
  let gamma = 0;
  let epsilon = 0;
  for (let n = 0; n < length; n++) {
    if (count[n][0] < count[n][1]) {
      gammaBin += '1';
      epsilonBin += '0';
      gamma += Math.pow(2, length - 1 - n) * 1;
    } else {
      gammaBin += '0';
      epsilonBin += '1';
      epsilon += Math.pow(2, length - 1 - n) * 1;
    }
  }

  console.log('count', count);
  console.log('gammaBin', gammaBin);
  console.log('epsilonBin', epsilonBin);
  console.log(gamma * epsilon);
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
