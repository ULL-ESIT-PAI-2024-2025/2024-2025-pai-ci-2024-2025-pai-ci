/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the GraphFunction class, which is used to
 *       change the strategy for different type functions.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Class that represents a function and allows changing the strategy for different type functions.
 */
export class GraphFunction {
  private strategy: GraphFunctionStrategy;

  /**
   * Creates a GraphFunction object with the given strategy.
   * 
   * @param strategy The strategy to be used for the function.
   */
  public constructor(strategy: GraphFunctionStrategy) {
    this.strategy = strategy;
  }

  /**
   * Sets the strategy for the function.
   * 
   * @param strategy The new strategy to be used for the function.
   */
  public setStrategy(strategy: GraphFunctionStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Calculates the value for a given x value using the current strategy.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.strategy.calculate(xValue);
  }
}