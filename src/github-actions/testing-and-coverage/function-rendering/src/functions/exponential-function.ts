/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the ExponentialFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */
import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Exponential function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = a * b^(x + h) + k.
 */
export class ExponentialFunction implements GraphFunctionStrategy {
  private coefficient: number;
  private exponentShift: number;
  private baseShift: number;
  private base: number;

  /**
   * Creates an exponential function object with the given parameters.
   * 
   * @param coefficient The coefficient of the exponential function (a).
   * @param exponentShift The shift applied to the exponent (h).
   * @param baseShift The shift applied to the base (k).
   * @param base The base of the exponential function. Default is e (b).
   */
  public constructor(coefficient: number, exponentShift: number, baseShift: number, base: number = Math.E) {
    this.coefficient = coefficient;
    this.exponentShift = exponentShift;
    this.base = base;
    this.baseShift = baseShift;
  }

  /**
   * Calculates the value for a given x value using the exponential function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.coefficient * Math.pow(this.base, xValue + this.exponentShift) + this.baseShift;
  }
}