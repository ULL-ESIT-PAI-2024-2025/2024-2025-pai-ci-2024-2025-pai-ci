import { CosineFunction } from '../function-rendering/src/functions/cosine-function';
import { CubicFunction } from '../function-rendering/src/functions/cubic-function';
import { ExponentialFunction } from '../function-rendering/src/functions/exponential-function';
import { LinearFunction } from '../function-rendering/src/functions/linear-function';
import { LogarithmicFunction } from '../function-rendering/src/functions/logarithmic-function';
import { QuadraticFunction } from '../function-rendering/src/functions/quadratic-function';
import { SineFunction } from '../function-rendering/src/functions/sine-function';
import { SquareRootFunction } from '../function-rendering/src/functions/square-root-function';
import { TangentFunction } from '../function-rendering/src/functions/tangent-function';
import { describe, test, expect } from "@jest/globals"

describe('LinearFunction', () => {
  test('should return the y-intercept when x is 0', () => {
      const linearFunction = new LinearFunction(2, 3);
      expect(linearFunction.calculate(0)).toBe(3);
  });

  test('should correctly calculate f(1)', () => {
      const linearFunction = new LinearFunction(2, 3);
      expect(linearFunction.calculate(1)).toBe(5);
  });

  test('should correctly calculate f(-1)', () => {
      const linearFunction = new LinearFunction(2, 3);
      expect(linearFunction.calculate(-1)).toBe(1);
  });

  test('should correctly calculate f(10)', () => {
      const linearFunction = new LinearFunction(2, 3);
      expect(linearFunction.calculate(10)).toBe(23);
  });
});

describe('CubicFunction', () => {
  test('should return the constant term when x is 0', () => {
      const cubicFunction = new CubicFunction(1, 2, 3, 4);
      expect(cubicFunction.calculate(0)).toBe(4);
  });

  test('should correctly calculate f(1)', () => {
      const cubicFunction = new CubicFunction(1, 2, 3, 4);
      expect(cubicFunction.calculate(1)).toBe(10);
  });

  test('should correctly calculate f(-1)', () => {
      const cubicFunction = new CubicFunction(1, 2, 3, 4);
      expect(cubicFunction.calculate(-1)).toBe(2);
  });

  test('should correctly calculate f(2)', () => {
      const cubicFunction = new CubicFunction(1, 2, 3, 4);
      expect(cubicFunction.calculate(2)).toBe(26);
  });
});

describe('CosineFunction', () => {
  test('should return the correct value for f(0)', () => {
      const cosineFunction = new CosineFunction(1, 0, 0); 
      expect(cosineFunction.calculate(0)).toBeCloseTo(1);
  });

  test('should return the correct value for f(π/2)', () => {
      const cosineFunction = new CosineFunction(1, 0, 0);
      expect(cosineFunction.calculate(Math.PI / 2)).toBeCloseTo(0);
  });

  test('should return the correct value for f(π)', () => {
      const cosineFunction = new CosineFunction(1, 0, 0);
      expect(cosineFunction.calculate(Math.PI)).toBeCloseTo(-1);
  });

  test('should return the correct value for f(3π/2)', () => {
      const cosineFunction = new CosineFunction(1, 0, 0);
      expect(cosineFunction.calculate((3 * Math.PI) / 2)).toBeCloseTo(0);
  });

  test('should return the correct value for f(2π)', () => {
      const cosineFunction = new CosineFunction(1, 0, 0);
      expect(cosineFunction.calculate(2 * Math.PI)).toBeCloseTo(1);
  });
});

describe('ExponentialFunction', () => {
  test('should return the base shift when x is 0', () => {
    const exponentialFunction = new ExponentialFunction(2, 0, 3); 
    expect(exponentialFunction.calculate(0)).toBeCloseTo(2 * Math.E ** 0 + 3);
  });

  test('should correctly calculate f(1)', () => {
    const exponentialFunction = new ExponentialFunction(2, 0, 3);
    expect(exponentialFunction.calculate(1)).toBeCloseTo(2 * Math.E ** 1 + 3);
  });

  test('should correctly calculate f(-1)', () => {
    const exponentialFunction = new ExponentialFunction(2, 0, 3);
    expect(exponentialFunction.calculate(-1)).toBeCloseTo(2 * Math.E ** -1 + 3);
  });

  test('should correctly calculate f(2) with base 10', () => {
    const exponentialFunction = new ExponentialFunction(1, 0, 0, 10);
    expect(exponentialFunction.calculate(2)).toBeCloseTo(10 ** 2);
  });
});

describe('LogarithmicFunction', () => {
  test('should correctly calculate f(x) with default base e when x is 0', () => {
    const logarithmicFunction = new LogarithmicFunction(1, 2, 3); 
    expect(logarithmicFunction.calculate(0)).toBeCloseTo(3.693147180559945, 5);
  });

  test('should correctly calculate f(x) with default base e when x is 1', () => {
    const logarithmicFunction = new LogarithmicFunction(1, 2, 3); 
    expect(logarithmicFunction.calculate(1)).toBeCloseTo(4.09861228866811, 5);
  });

  test('should correctly calculate f(x) with base 10 when x is 0', () => {
    const logarithmicFunction = new LogarithmicFunction(2, 3, 4, 10);
    expect(logarithmicFunction.calculate(0)).toBeCloseTo(4.954242509439324, 5); 
  });

  test('should return NaN if x + insideLogShift is less than or equal to 0', () => {
    const logarithmicFunction = new LogarithmicFunction(1, 2, 3);
    expect(logarithmicFunction.calculate(-3)).toBeNaN(); 
  });
});

describe('QuadraticFunction', () => {
  test('should correctly calculate f(x) when x is 0', () => {
    const quadraticFunction = new QuadraticFunction(1, 2, 3); 
    expect(quadraticFunction.calculate(0)).toBe(3); 
  });

  test('should correctly calculate f(x) when x is 1', () => {
    const quadraticFunction = new QuadraticFunction(1, 2, 3);
    expect(quadraticFunction.calculate(1)).toBe(6); 
  });

  test('should correctly calculate f(x) when x is -1', () => {
    const quadraticFunction = new QuadraticFunction(1, 2, 3);
    expect(quadraticFunction.calculate(-1)).toBe(2);
  });

  test('should correctly calculate f(x) when x is 2', () => {
    const quadraticFunction = new QuadraticFunction(1, 2, 3); 
    expect(quadraticFunction.calculate(2)).toBe(11);
  });
});

describe('SineFunction', () => {
  test('should correctly calculate f(x) when x is 0', () => {
    const sineFunction = new SineFunction(1, 0, 0); 
    expect(sineFunction.calculate(0)).toBe(0); // sin(0) = 0
  });

  test('should correctly calculate f(x) when x is Math.PI/2', () => {
    const sineFunction = new SineFunction(1, 0, 0); 
    expect(sineFunction.calculate(Math.PI / 2)).toBe(1); 
  });

  test('should correctly calculate f(x) when x is Math.PI / 2', () => {
    const sineFunction = new SineFunction(1, 0, 0);
    expect(sineFunction.calculate(Math.PI / 2)).toBe(1);
  });

  test('should correctly calculate f(x) when x is Math.PI/2 with a phase shift', () => {
    const sineFunction = new SineFunction(1, Math.PI / 2, 0);
    expect(sineFunction.calculate(0)).toBe(1); 
  });
});

describe('SquareRootFunction', () => {
  test('should correctly calculate f(x) when x is 0', () => {
    const squareRootFunction = new SquareRootFunction(2, 0, 1);
    expect(squareRootFunction.calculate(0)).toBe(1);
  });

  test('should correctly calculate f(x) when x is 4', () => {
    const squareRootFunction = new SquareRootFunction(2, 0, 1);
    expect(squareRootFunction.calculate(4)).toBe(5);
  });

  test('should correctly calculate f(x) when x is 9', () => {
    const squareRootFunction = new SquareRootFunction(1, 0, 0);
    expect(squareRootFunction.calculate(9)).toBe(3);
  });

  test('should correctly calculate f(x) when x is 16', () => {
    const squareRootFunction = new SquareRootFunction(3, 0, 0);
    expect(squareRootFunction.calculate(16)).toBe(12);
  });
});

describe('TangentFunction', () => {
  test('should correctly calculate f(x) when x is 0', () => {
    const tangentFunction = new TangentFunction(1, 0, 0);
    expect(tangentFunction.calculate(0)).toBe(0);
  });

  test('should correctly calculate f(x) when x is Math.PI / 4', () => {
    const tangentFunction = new TangentFunction(1, 0, 0);
    expect(tangentFunction.calculate(Math.PI / 4)).toBeCloseTo(1, 5);
  });

  test('should correctly calculate f(x) when x is Math.PI / 3', () => {
    const tangentFunction = new TangentFunction(1, 0, 0);
    expect(tangentFunction.calculate(Math.PI / 3)).toBeCloseTo(Math.sqrt(3), 5);
  });

  test('should correctly calculate f(x) when x is Math.PI / 2', () => {
    const tangentFunction = new TangentFunction(1, 0, 0);
    expect(tangentFunction.calculate(Math.PI / 2)).toBeCloseTo(16331239353195370, 5);
  });
});