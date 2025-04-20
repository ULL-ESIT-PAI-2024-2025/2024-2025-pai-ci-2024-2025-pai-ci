/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the CubicFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Cubic function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = ax^3 + bx^2 + cx + d.
 */
export class CubicFunction implements GraphFunctionStrategy {
  private coefficientCubic: number;
  private coefficientQuadratic: number;
  private coefficientLinear: number;
  private constantTerm: number;

  /**
   * Creates a cubic function object with the given coefficients.
   * 
   * @param coefficientCubic The coefficient of the cubic term (a).
   * @param coefficientQuadratic The coefficient of the quadratic term (b).
   * @param coefficientLinear The coefficient of the linear term (c).
   * @param constantTerm The constant term (d).
   */
  public constructor(coefficientCubic: number, coefficientQuadratic: number, coefficientLinear: number, constantTerm: number) {
    this.coefficientCubic = coefficientCubic;
    this.coefficientQuadratic = coefficientQuadratic;
    this.coefficientLinear = coefficientLinear;
    this.constantTerm = constantTerm;
  }

  /**
   * Calculates the value for a given x value using the cubic function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return (this.coefficientCubic * Math.pow(xValue, 3) + this.coefficientQuadratic * (xValue * xValue) +
            this.coefficientLinear * xValue + this.constantTerm);
  }
}