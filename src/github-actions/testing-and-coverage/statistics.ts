/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 * Integración Continua
 *
 * @since 21 Apr 2025
 * @desc Simple statistics class to study testing and coverage with GitHub Actions
 * @author Franco Alla
 * @author Nailea Fayna Cruz Galván
 * @author Raúl González Acosta
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025-pai-ci-2024-2025-pai-ci}
 */

/**
 * A class that provides basic statistical operations on numeric datasets.
 */
export class Statistics {
  /**
   * Calculates the mean (average) of an array of numbers.
   * 
   * @param data Array of numbers.
   * @returns The mean of the numbers.
   * @throws If the array is empty.
   */
  mean(data: number[]): number {
    if (data.length === 0) throw new Error("Error: Empty data array");
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  /**
   * Calculates the median (middle value) of an array of numbers.
   * 
   * @param data Array of numbers.
   * @returns The median value.
   * @throws If the array is empty.
   */
  median(data: number[]): number {
    if (data.length === 0) throw new Error("Error: Empty data array");
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  /**
   * Calculates the mode (most frequent value) of an array of numbers.
   * If there are multiple modes, returns the smallest.
   * 
   * @param data Array of numbers.
   * @returns The mode value.
   * @throws If the array is empty.
   */
  mode(data: number[]): number {
    if (data.length === 0) throw new Error("Error: Empty data array");
    const frequencyMap = new Map<number, number>();
    data.forEach((value) => {
      frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    });
    let maxFreq = 0;
    let mode = data[0];
    for (const [num, freq] of frequencyMap.entries()) {
      if (freq > maxFreq || (freq === maxFreq && num < mode)) {
        maxFreq = freq;
        mode = num;
      }
    }
    return mode;
  }
}
