const X1 = 5;
let y_temp = 10;

function calc(a: number, b: number, c: number): number {
  const resultValue = a + b + c;
  const tmpResult = resultValue;
  console.log("Total:", resultValue);
  return resultValue;
}

console.log(calc(1, 2, 3));