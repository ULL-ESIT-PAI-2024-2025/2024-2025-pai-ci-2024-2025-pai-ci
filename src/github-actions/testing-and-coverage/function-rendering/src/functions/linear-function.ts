/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the LinearFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Linear function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = mx + b.
 */
export class LinearFunction implements GraphFunctionStrategy {
  private slope: number;
  private yIntercept: number;

  /**
   * Creates a linear function object with the given parameters.
   * 
   * @param slope The slope of the linear function (m).
   * @param yIntercept The y part of the linear function (b).
   */
  public constructor(slope: number, yIntercept: number) {
    this.slope = slope;
    this.yIntercept = yIntercept;
  }

  /**
   * Calculates the value for a given x value using the linear function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.slope * xValue + this.yIntercept;
  }
}