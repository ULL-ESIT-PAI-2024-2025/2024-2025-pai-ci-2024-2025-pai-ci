function calculateTotal(price: number, tax: number, discount: number, shipping: number): number {
  const taxAmount = price * tax;
  return price + taxAmount - discount + shipping;
}

function createGreeting(userName: string, total: number): string {
  if (!userName) return 'Invalid user.';
  if (total <= 0) return 'Something went wrong.';
  return `Hello ${userName}! Your total is $${total.toFixed(2)}`;
}

function analyzeOrder(price: number, discount: number, shipping: number): void {
  if (price > 100 && discount > 10) {
    console.log('Big discount!');
  } else if (shipping > 20) {
    console.log('High shipping!');
  }
}

export function processOrderClean(price: number, tax: number, discount: number, shipping: number, userName: string): void {
  const total = calculateTotal(price, tax, discount, shipping);
  console.log(createGreeting(userName, total));
  analyzeOrder(price, discount, shipping);
}