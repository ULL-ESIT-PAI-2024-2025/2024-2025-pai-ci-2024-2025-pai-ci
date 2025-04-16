function calculateTotal(price, tax, discount, shipping) {
    const taxAmount = price * tax;
    return price + taxAmount - discount + shipping;
}
function createGreeting(userName, total) {
    if (!userName)
        return 'Invalid user.';
    if (total <= 0)
        return 'Something went wrong.';
    return `Hello ${userName}! Your total is $${total.toFixed(2)}`;
}
function analyzeOrder(price, discount, shipping) {
    if (price > 100 && discount > 10) {
        console.log('Big discount!');
    }
    else if (shipping > 20) {
        console.log('High shipping!');
    }
}
export function processOrderClean(price, tax, discount, shipping, userName) {
    const total = calculateTotal(price, tax, discount, shipping);
    console.log(createGreeting(userName, total));
    analyzeOrder(price, discount, shipping);
}
