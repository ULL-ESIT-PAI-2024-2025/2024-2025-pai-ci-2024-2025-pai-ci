/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the FunctionRenderer class, which is used to
 *       render functions on a canvas using the strategy pattern.
 */

import { GraphFunctionStrategy } from './functions/graphic-function-strategy';
import { Range } from './range';

/**
 * This class is responsible for drawing functions on a canvas.
 * It takes a function strategy and draws the graph of the function on the canvas.
 */
export class FunctionRenderer {
  private static canvas: HTMLCanvasElement = document.getElementById('function') as HTMLCanvasElement;
  private static context: CanvasRenderingContext2D = FunctionRenderer.canvas.getContext('2d')!;

  private xRange: Range;
  private yRange: Range;

  /**
   * This constructor sets up the FunctionRenderer with the given x and y ranges.
   * 
   * @param xRange The range of x values (from min to max).
   * @param yRange The range of y values (from min to max).
   */
  public constructor(xRange: Range, yRange: Range) {
    this.xRange = xRange;
    this.yRange = yRange;
  }

  /**
   * Draws the function on the canvas.
   * This method uses the provided strategy to calculate y values for given 
   * x values, while possible avoiding vertical asymptotes (for the tangent mostly).
   * 
   * @param strategy The strategy that defines the function to draw.
   * @param color The color to use for the function line.
   */
  public drawFunction(strategy: GraphFunctionStrategy, color: string): void {
    FunctionRenderer.context.beginPath();
    FunctionRenderer.context.strokeStyle = color;
  
    const xScale = FunctionRenderer.canvas.width / (this.xRange.max - this.xRange.min);
    const yScale = FunctionRenderer.canvas.height / (this.yRange.max - this.yRange.min);
    const centerX = -this.xRange.min * xScale;
    const centerY = this.yRange.max * yScale;
    FunctionRenderer.context.translate(centerX, centerY);
  
    const step = 1 / xScale;
    let previousY = NaN; // We will use this to check if we need to reset the line (there's an asymptote)
    for (let x = this.xRange.min; x <= this.xRange.max; x += step) {
      const yValue = strategy.calculate(x);
      // Check for vertical asymptotes
      if (Math.abs(yValue) > this.yRange.max * 10 || isNaN(yValue)) {
        previousY = NaN;
        continue;
      }
      const canvasX = x * xScale;
      const canvasY = -yValue * yScale;
      if (isNaN(previousY)) {
        FunctionRenderer.context.moveTo(canvasX, canvasY);
      } else {
        FunctionRenderer.context.lineTo(canvasX, canvasY);
      }
      previousY = yValue;
    }
    FunctionRenderer.context.stroke();
    FunctionRenderer.context.resetTransform();
  }
}