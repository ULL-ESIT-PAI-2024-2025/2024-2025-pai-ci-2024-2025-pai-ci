import { Calculator } from '../calculator';
import { describe, test, expect, beforeEach } from "@jest/globals"

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add()', () => {
    test('should return the sum of two numbers', () => {
      expect(calculator.add(1, 2)).toBe(3);
      expect(calculator.add(-1, 1)).toBe(0);
      expect(calculator.add(0, 0)).toBe(0);
    });
  });

  describe('subtract()', () => {
    test('should return the result of subtracting two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
      expect(calculator.subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply()', () => {
    test('should return the product of two numbers', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
      expect(calculator.multiply(-2, 3)).toBe(-6);
    });
  });

  describe('divide()', () => {
    test('should return the quotient of two numbers', () => {
      expect(calculator.divide(6, 2)).toBe(3);
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    test('should throw an error when dividing by zero', () => {
      expect(() => calculator.divide(1, 0)).toThrow("Error: Division by zero is not allowed");
    });
  });

  describe('factorial()', () => {
    test('should return the factorial of a number', () => {
      expect(calculator.factorial(0)).toBe(1);
      expect(calculator.factorial(5)).toBe(120);
      expect(calculator.factorial(3)).toBe(6);
    });

    test('should throw an error for negative numbers', () => {
      expect(() => calculator.factorial(-1)).toThrow("Error: Negative numbers not allowed");
    });
  });
});
