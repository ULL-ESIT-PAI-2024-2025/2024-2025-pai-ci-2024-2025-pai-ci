/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * Integración Continua
 *
 * @since 21 Apr 2025
 * @desc Function to see the code smells
 * @author Franco Alla
 * @author Nailea Fayna Cruz Galván
 * @author Raúl González Acosta
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-ci-2024-2025-pai-ci}
 */

/**
 * @brief Calculates the total amount of an order
 * @param price Price of the order
 * @param tax Tax applied to the order
 * @param discount Discount applied to the order
 * @param shipping Shipping cost of the order
 * @returns 
 */
function calculateTotal(price: number, tax: number, discount: number, shipping: number): number {
  const taxAmount = price * tax;
  return price + taxAmount - discount + shipping;
}

/**
 * @brief Creates a greeting message for the user
 * @param userName User name of the order
 * @param total Total amount of the order
 * @returns String with the greeting message
 */

function createGreeting(userName: string, total: number): string {
  if (!userName) return 'Invalid user.';
  if (total <= 0) return 'Something went wrong.';
  return `Hello ${userName}! Your total is $${total.toFixed(2)}`;
}

/**
 * @brief Analyzes the order and prints messages based on conditions
 * @param price Price of the order
 * @param discount Discount applied to the order
 * @param shipping Shipping cost of the order
 */

function analyzeOrder(price: number, discount: number, shipping: number): void {
  if (price > 100 && discount > 10) {
    console.log('Big discount!');
  } else if (shipping > 20) {
    console.log('High shipping!');
  }
}

/**
 * @brief Processes an order and prints a greeting message
 * @param price Price of the order
 * @param tax Tax applied to the order
 * @param discount Discount applied to the order
 * @param shipping Shipping cost of the order
 * @param userName User name of the order
 */

export function processOrderClean(price: number, tax: number, discount: number, shipping: number, userName: string): void {
  const total = calculateTotal(price, tax, discount, shipping);
  console.log(createGreeting(userName, total));
  analyzeOrder(price, discount, shipping);
}