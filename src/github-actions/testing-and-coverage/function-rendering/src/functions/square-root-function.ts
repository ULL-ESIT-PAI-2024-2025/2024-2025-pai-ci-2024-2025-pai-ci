/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the SquareRootFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Square root function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = a * sqrt(x + h) + k.
 */
export class SquareRootFunction implements GraphFunctionStrategy {
  private coefficient: number;
  private insideTrigShift: number;
  private outsideTrigShift: number;

  /**
   * Creates a square root function object with the given parameters.
   * 
   * @param coefficient The coefficient for the square root term (a).
   * @param insideTrigShift The shift applied to the x value inside the square root (h).
   * @param outsideTrigShift The shift applied to the square root term (k).
   */
  public constructor(coefficient: number, insideTrigShift: number, outsideTrigShift: number) {
    this.coefficient = coefficient;
    this.insideTrigShift = insideTrigShift;
    this.outsideTrigShift = outsideTrigShift;
  }

  /**
   * Calculates the value for a given x value using the square root function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.coefficient * Math.sqrt(xValue + this.insideTrigShift) + this.outsideTrigShift;
  }
}