/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the CoordinateSystem class, which is used to
 *      represent a coordinate system.
 */

import { Range } from './range';

/**
 * Class used to draw a coordinate system on the HTML5 canvas.
 * Uses the ranges the user provides to set the scale.
 */
export class CoordinateSystem {
  private static canvas: HTMLCanvasElement = document.getElementById('function') as HTMLCanvasElement;
  private static context: CanvasRenderingContext2D = CoordinateSystem.canvas.getContext('2d')!;
  private static width: number = CoordinateSystem.canvas.width;
  private static height: number = CoordinateSystem.canvas.height;

  private xRange: Range;
  private yRange: Range;
  private xScale: number;
  private yScale: number;

  /**
   * Creates a new CoordinateSystem instance. This sets the ranges for the 
   * axes and calculates the scales based on the canvas size.
   * 
   * @param xRange Range for the x-axis.
   * @param yRange Range for the y-axis.
   */
  public constructor(xRange: Range, yRange: Range) {
    this.xRange = xRange;
    this.yRange = yRange;

    this.xScale = CoordinateSystem.width / (this.xRange.max - this.xRange.min);
    this.yScale = CoordinateSystem.height / (this.yRange.max - this.yRange.min);
  }

  /**
   * This method is used to draw the coordinate system on the canvas.
   * It draws the axes and the grid.
   */
  public drawAxis(): void {
    // Clear the canvas
    CoordinateSystem.context.clearRect(0, 0, CoordinateSystem.width, CoordinateSystem.height);

    // First, we draw the grid and the axis numbers
    this.drawGrid();
    this.drawAxisNumbers();

    // Style for the axes
    CoordinateSystem.context.strokeStyle = 'black';
    CoordinateSystem.context.lineWidth = 2;

    // Axis X
    const pixelY0 = this.yToPixel(0);
    CoordinateSystem.context.beginPath();
    CoordinateSystem.context.moveTo(0, pixelY0);
    CoordinateSystem.context.lineTo(CoordinateSystem.width, pixelY0);
    CoordinateSystem.context.stroke();

    // Arrow for X-axis
    const arrowSize = 5;
    CoordinateSystem.context.beginPath();
    CoordinateSystem.context.moveTo(CoordinateSystem.width - arrowSize, pixelY0 - arrowSize);
    CoordinateSystem.context.lineTo(CoordinateSystem.width, pixelY0);
    CoordinateSystem.context.lineTo(CoordinateSystem.width - arrowSize, pixelY0 + arrowSize);
    CoordinateSystem.context.stroke();

    // Axis Y
    const pixelX0 = this.xToPixel(0);
    CoordinateSystem.context.beginPath();
    CoordinateSystem.context.moveTo(pixelX0, 0);
    CoordinateSystem.context.lineTo(pixelX0, CoordinateSystem.height);
    CoordinateSystem.context.stroke();

    // Arrow for Y-axis
    CoordinateSystem.context.beginPath();
    CoordinateSystem.context.moveTo(pixelX0 - arrowSize, arrowSize);
    CoordinateSystem.context.lineTo(pixelX0, 0);
    CoordinateSystem.context.lineTo(pixelX0 + arrowSize, arrowSize);
    CoordinateSystem.context.stroke();
  }

  /**
   * This method is used to convert the coordinates to pixels for the x-axis.
   * We have to scale the x coordinate to fit the canvas size.
   * 
   * @param x The x coordinate in the coordinate system.
   * @returns The pixel value for the x coordinate.
   */
  private xToPixel(x: number): number {
    return (x - this.xRange.min) * this.xScale;
  }

  /**
   * This method is used to convert the coordinates to pixels for the y-axis.
   * We have to scale the y coordinate to fit the canvas size.
   * 
   * @param y The y coordinate in the coordinate system.
   * @returns The pixel value for the y coordinate.
   */
  private yToPixel(y: number): number {
    return CoordinateSystem.height - (y - this.yRange.min) * this.yScale;
  }


  /**
   * Draws a grid on the canvas using dashed lines.
   */
  private drawGrid(): void {
    // First, we set the style
    CoordinateSystem.context.strokeStyle = 'silver';
    CoordinateSystem.context.lineWidth = 1;
    // This is used to draw the dashed lines, with 5px dashes and 5px gaps
    CoordinateSystem.context.setLineDash([5, 5]);

    // Draw vertical lines
    for (let x = this.xRange.min; x <= this.xRange.max; x++) {
      const pixelX = this.xToPixel(x);
      CoordinateSystem.context.beginPath();
      CoordinateSystem.context.moveTo(pixelX, 0);
      CoordinateSystem.context.lineTo(pixelX, CoordinateSystem.height);
      CoordinateSystem.context.stroke();
    }

    // Draw horizontal lines
    for (let y = this.yRange.min; y <= this.yRange.max; y++) {
      const pixelY = this.yToPixel(y);
      CoordinateSystem.context.beginPath();
      CoordinateSystem.context.moveTo(0, pixelY);
      CoordinateSystem.context.lineTo(CoordinateSystem.width, pixelY);
      CoordinateSystem.context.stroke();
    }
    CoordinateSystem.context.setLineDash([]); // Reset to solid lines
  }

  /**
   * Draws the even numbers on the axes.
   */
  private drawAxisNumbers(): void {
    // First, we set the style for the numbers
    CoordinateSystem.context.font = '12px Arial';
    CoordinateSystem.context.fillStyle = 'black';

    // X-axis 
    for (let x = this.xRange.min; x <= this.xRange.max; x++) {
      if (x % 2 !== 0) continue; // Skip odd numbers

      const pixelX = this.xToPixel(x);
      const pixelY0 = this.yToPixel(0);
      const isZero = x === 0; // Special case for zero, which needs to be a little bit to the left

      // Draw small mark
      CoordinateSystem.context.strokeStyle = 'black';
      CoordinateSystem.context.lineWidth = 2;
      CoordinateSystem.context.beginPath();
      CoordinateSystem.context.moveTo(pixelX, pixelY0);
      CoordinateSystem.context.lineTo(pixelX, pixelY0 + 3);
      CoordinateSystem.context.stroke();

      // Draw number, keeping in mind the special case for zero
      CoordinateSystem.context.textAlign = 'center';
      CoordinateSystem.context.fillText(x.toString(), pixelX - (isZero ? 10 : 0), pixelY0 + 17);
    }

    // Y-axis 
    for (let y = this.yRange.min; y <= this.yRange.max; y++) {
      if (y === 0 || y % 2 !== 0) continue; // Skip odd numbers and 0

      const pixelY = this.yToPixel(y);
      const pixelX0 = this.xToPixel(0);

      // Draw small mark
      CoordinateSystem.context.strokeStyle = 'black';
      CoordinateSystem.context.lineWidth = 2;
      CoordinateSystem.context.beginPath();
      CoordinateSystem.context.moveTo(pixelX0 - 4, pixelY);
      CoordinateSystem.context.lineTo(pixelX0, pixelY);
      CoordinateSystem.context.stroke();

      // Draw number
      CoordinateSystem.context.textAlign = 'right';
      CoordinateSystem.context.textBaseline = 'middle';
      CoordinateSystem.context.fillText(y.toString(), pixelX0 - 8, pixelY);
    }
  }
}