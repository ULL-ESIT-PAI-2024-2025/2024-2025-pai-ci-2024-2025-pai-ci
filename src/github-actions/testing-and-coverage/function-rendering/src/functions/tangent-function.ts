/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the TangentFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Tangent function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = a * tan(x + h) + k.
 */
export class TangentFunction implements GraphFunctionStrategy {
  private coefficient: number;
  private insideTrigShift: number;
  private outsideTrigShift: number;

  /**
   * Creates a tangent function object with the given parameters.
   * 
   * @param coefficient The coefficient of the tangent function (a).
   * @param insideTanShift The shift that is inside the tangent function (h).
   * @param outsideTanShift The shift that is outside the tangent function (k).
   */
  constructor(coefficient: number, insideTrigShift: number, outsideTrigShift: number) {
    this.coefficient = coefficient;
    this.insideTrigShift = insideTrigShift;
    this.outsideTrigShift = outsideTrigShift;
  }

  /**
   * Calculates the value for a given x value using the tangent function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  calculate(xValue: number): number {
    return this.coefficient * Math.tan(xValue + this.insideTrigShift) + this.outsideTrigShift;
  }
}