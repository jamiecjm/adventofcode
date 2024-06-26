function processData(input) {
  //Enter your code here
  const lines = input.split('\n');
  let count = {};
  let overlap = new Set();
  for (let i = 0; i < lines.length - 1; i++) {
    console.log('i', i);
    const [startPoint, endPoint] = lines[i].split(' -> ');
    const [startX, startY] = startPoint.split(',');
    const [endX, endY] = endPoint.split(',');

    if (!(startX === endX || startY === endY)) {
      continue;
    }

    let point = startPoint;
    let x = Number(startX);
    let y = Number(startY);
    while (point !== endPoint) {
      point = `${x},${y}`
      if (count[point] === undefined) {
        count[point] = 1;
      } else {
        count[point]++;
        overlap.add(point);
      }
      if (Number(endX) > Number(startX)) {
        x++;
      } else if (Number(endX) < Number(startX)) {
        x--;
      }
      if (Number(endY) > Number(startY)) {
        y++
      } else if (Number(endY) < Number(startY)) {
        y--;
      }
    }

  }

  console.log(overlap.size);
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
