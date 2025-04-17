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
 * 
 * @param price Price of the order
 * @param tax Tax applied to the order
 * @param discount Discount applied to the order
 * @param shipping Shipping cost of the order
 * @param userName User name of the order
 * @returns void
 */
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