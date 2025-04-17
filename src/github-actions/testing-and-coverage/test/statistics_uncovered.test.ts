import { Statistics } from '../statistics';
import { describe, test, expect, beforeEach } from "@jest/globals"

describe('Statistics', () => {
  let statistics: Statistics;

  beforeEach(() => {
    statistics = new Statistics();
  });

  describe('mean()', () => {
    test('should return the mean of an array of numbers', () => {
      expect(statistics.mean([1, 2, 3])).toBe(2);
      expect(statistics.mean([10, 0, -10])).toBe(0);
      expect(statistics.mean([5])).toBe(5);
    });
  });

  describe('median()', () => {
    test('should return the median of an odd-length array', () => {
      expect(statistics.median([3, 1, 2])).toBe(2);
      expect(statistics.median([7, 5, 3])).toBe(5);
    });

    test('should return the median of an even-length array', () => {
      expect(statistics.median([1, 2, 3, 4])).toBe(2.5);
      expect(statistics.median([10, 20, 30, 40])).toBe(25);
    });
  });

  describe('mode()', () => {
    test('should return the mode of an array', () => {
      expect(statistics.mode([1, 2, 2, 3])).toBe(2);
      expect(statistics.mode([4, 4, 1, 1, 4])).toBe(4);
      expect(statistics.mode([5, 5, 3, 3, 1])).toBe(3); // same freq, smaller returned
    });
  });
});
