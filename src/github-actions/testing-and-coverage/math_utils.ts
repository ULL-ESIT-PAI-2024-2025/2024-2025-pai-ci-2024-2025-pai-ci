/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * Integración Continua
 *
 * @since 21 Apr 2025
 * @desc Simple calculator class to study testing and coverage with GitHub Actions
 * @author Franco Alla
 * @author Nailea Fayna Cruz Galván
 * @author Raúl González Acosta
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-ci-2024-2025-pai-ci}
 */

/**
 * A simple calculator class that provides basic arithmetic operations.
 */
export class Calculator {
  /**
   * Adds two numbers.
   * 
   * @param a The first number.
   * @param b The second number.
   * @returns The sum of `a` and `b`.
   */
  add(a: number, b: number): number { return a + b; }

  /**
   * Subtracts one number from another.
   * 
   * @param a The number to subtract from.
   * @param b The number to subtract.
   * @returns The result of `a` minus `b`.
   */
  subtract(a: number, b: number): number { return a - b; }

  /**
   * Multiplies two numbers.
   * 
   * @param a The first number.
   * @param b The second number.
   * @returns The product of `a` and `b`.
   */
  multiply(a: number, b: number): number { return a * b; }

  /**
   * Divides one number by another.
   * 
   * @param a The dividend.
   * @param b The divisor.
   * @throws Will throw an error if `b` is zero.
   * @returns The result of `a` divided by `b`.
   */
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Error: Division by zero is not allowed");
    return a / b;
  }

  /**
   * Calculates the factorial of a non-negative integer.
   * 
   * @param n A non-negative integer.
   * @throws Will throw an error if `n` is negative.
   * @returns The factorial of `n`.
   */
  factorial(n: number): number {
    if (n < 0) throw new Error("Error: Negative numbers not allowed");
    if (n === 0) return 1;
    return n * this.factorial(n - 1);
  }
}
