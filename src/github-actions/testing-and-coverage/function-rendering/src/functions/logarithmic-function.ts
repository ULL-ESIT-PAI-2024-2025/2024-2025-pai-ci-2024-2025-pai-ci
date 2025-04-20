/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the definition of the LogarithmicFunction class,
 *       which implements the GraphFunctionStrategy interface.
 */

import { GraphFunctionStrategy } from './graphic-function-strategy';

/**
 * Logarithmic function class implementing the GraphFunctionStrategy interface.
 * This is for the function that follows: f(x) = a * log_b(x + c) + d.
 */
export class LogarithmicFunction implements GraphFunctionStrategy {
  private coefficient: number;
  private insideLogShift: number;
  private outsideLogShift: number;
  private base: number;

  /**
   * Creates a logarithmic function object with the given parameters.
   * 
   * @param coefficient The coefficient of the logarithmic function (a).
   * @param insideLogShift The shift that is inside the logarithmic function (c).
   * @param outsideLogShift The shift that is outside the logarithmic function (d).
   * @param base The base of the logarithmic function. Default is e (b).
   */
  public constructor(coefficient: number, insideLogShift: number, outsideLogShift: number, base: number = Math.E) {
    this.coefficient = coefficient;
    this.insideLogShift = insideLogShift;
    this.outsideLogShift = outsideLogShift;
    this.base = base;
  }

  /**
   * Calculates the value for a given x value using the logarithmic function formula.
   * 
   * @param xValue The x value to calculate.
   * @returns The calculated value.
   */
  public calculate(xValue: number): number {
    return this.coefficient * Math.log(xValue + this.insideLogShift) / Math.log(this.base) + 
    this.outsideLogShift;
  }
}