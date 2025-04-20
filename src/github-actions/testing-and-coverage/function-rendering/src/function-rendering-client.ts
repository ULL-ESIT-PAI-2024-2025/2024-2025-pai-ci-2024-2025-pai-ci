/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the client for the function rendering program.
 */

import { CoordinateSystem } from "./coordinate-system";
import { FunctionRenderer } from "./function-renderer";
import { Range } from "./range";
import { RandomColorGenerator } from "./colors";
import { GraphFunction } from "./functions/graphic-function";

import { CosineFunction } from "./functions/cosine-function";
import { CubicFunction } from "./functions/cubic-function";
import { ExponentialFunction } from "./functions/exponential-function";
import { LinearFunction } from "./functions/linear-function";
import { LogarithmicFunction } from "./functions/logarithmic-function";
import { QuadraticFunction } from "./functions/quadratic-function";
import { SineFunction } from "./functions/sine-function";
import { SquareRootFunction } from "./functions/square-root-function";
import { TangentFunction } from "./functions/tangent-function";

export function main(): void { 
  // First, decide which will be the range of the coordinate system
  const xRange: Range = { min: -17, max: 23 };
  const yRange: Range = { min: -9, max: 7 };
  
  // Now, draw the coordinate system
  const coordinateSystem = new CoordinateSystem(xRange, yRange);
  coordinateSystem.drawAxis();
  
  // Create the renderer for the functions
  const renderer = new FunctionRenderer(xRange, yRange);
  
  // Create the functions
  const cosineFunction = new CosineFunction(1, 0, 0); // f(x) = cos(x)
  const cubicFunction = new CubicFunction(1, 0, 0, 0); // f(x) = x³
  const exponentialFunction = new ExponentialFunction(1, 0, 0); // f(x) = e^x
  const linearFunction = new LinearFunction(1, 0); // f(x) = x
  const logarithmicFunction = new LogarithmicFunction(1, 0, 0, 10); // f(x) = log(x)
  const quadraticFunction = new QuadraticFunction(1, 0, 0); // f(x) = x²
  const sineFunction = new SineFunction(1, 0, 0); // f(x) = sin(x)
  const squareRootFunction = new SquareRootFunction(1, 0, 0); // f(x) = √x
  const tangentFunction = new TangentFunction(2, 0, 0); // f(x) = tan(x)
  
  // Finally, create the GraphFunction object and set the initial strategy
  const graphFunction = new GraphFunction(cosineFunction); 

  // Draw the initial function on the coordinate system
  renderer.drawFunction(graphFunction, RandomColorGenerator.generateRandomColor());
  
  // If we wanted to change the function strategy, we could do it like this:
  // graphFunction.setStrategy(cosineFunction); 
  //renderer.drawFunction(exponentialFunction, RandomColorGenerator.generateRandomColor());
}

main();