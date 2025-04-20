/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the GraphFunctionStrategy interface, which is used to
 *      represent a strategy for calculating the value of a function at a given x value.
 */

/**
 * Interface for the GraphicFunctionStrategy pattern
 */
export interface GraphFunctionStrategy {
  /**
   * Calculates the value for a given x value.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  calculate(xValue: number): number;
}