/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the QuadraticFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Quadratic function class implementing the GraphFunctionStrategy interface
 * This is for the function that follows: f(x) = ax² + bx + c.
 */
export class QuadraticFunction implements GraphFunctionStrategy {
  private coefficientQuadratic: number;
  private coefficientLinear: number;
  private constantTerm: number;

  /**
   * Creates a quadratic function object with the given coefficients.
   * 
   * @param coefficientQuadratic Coefficient for the quadratic term (a).
   * @param coefficientLinear Coefficient for the linear term (b).
   * @param constantTerm Constant term.
   */
  public constructor(coefficientQuadratic: number, coefficientLinear: number, constantTerm: number) {
    this.coefficientQuadratic = coefficientQuadratic;
    this.coefficientLinear = coefficientLinear;
    this.constantTerm = constantTerm;
  }

  /**
   * Calculates the value for a given x value using the quadratic function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.coefficientQuadratic * Math.pow(xValue, 2) + this.coefficientLinear * xValue + this.constantTerm;
  }
}