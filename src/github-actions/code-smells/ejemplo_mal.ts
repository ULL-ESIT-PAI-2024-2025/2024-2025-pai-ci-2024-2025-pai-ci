export function processOrder(price: number, tax: number, discount: number, shipping: number, userName: string): void {
  const total = price + (price * tax) - discount + shipping;
  if (userName !== '') {
    if (total > 0) {
      console.log('Hello ' + userName + '! Your total is $' + total.toFixed(2));
    } else {
      console.log('Something went wrong.');
    }
  } else {
    console.log('Invalid user.');
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      console.log(i * j);
    }
  }

  if (price > 100) {
    if (discount > 10) {
      console.log('Big discount!');
    }
  } else {
    if (shipping > 20) {
      console.log('High shipping!');
    }
  }
}