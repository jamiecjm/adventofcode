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

  let oxygenRatings = lines;
  let co2Ratings = lines;
  let oxygenCount = JSON.parse(JSON.stringify(count));
  let co2Count = JSON.parse(JSON.stringify(count));
  for (let n = 0; n < length; n++) {
    if (oxygenRatings.length > 1){
      [oxygenRatings, oxygenCount] = filterAndCount(oxygenRatings, 1, n, oxygenCount);
    }
    if (co2Ratings.length > 1) {
      [co2Ratings, co2Count] = filterAndCount(co2Ratings, 0, n, co2Count);
    }
    if (oxygenRatings.length === 1 && co2Ratings.length === 1) {
      break;
    }
  }

  let oxygenDecimal = 0;
  let co2Decimal = 0;
  for (let n = 0; n < length; n++) {
    oxygenDecimal += Math.pow(2, length - 1 - n) * Number(oxygenRatings[0][n]);
    co2Decimal += Math.pow(2, length - 1 - n) * Number(co2Ratings[0][n]);
  }

  console.log('oxygenRatings', oxygenRatings);
  console.log('oxygenDecimal', oxygenDecimal);
  console.log('co2Ratings', co2Ratings);
  console.log('co2Decimal', co2Decimal);
  console.log(oxygenDecimal * co2Decimal);
}

const filterAndCount = (numbers, criteria, position, count) => {
  if (count[position][0] > count[position][1]) {
    criteria = criteria === 1 ? 0 : 1;
  }
  numbers = numbers.filter((number) => {
    if (Number(number[position]) === criteria) {
      return true;
    } else {
      for (let n = position + 1; n < number.length; n++) {
        count[n][Number(number[n])]--;
      }
      return false;
    }
  });

  return [numbers, count];
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
