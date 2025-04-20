/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the RandomColorGenerator class, which is used to
 *      generate random colors in hexadecimal format.
 */

/**
 * A class to generate random colors.
 */
export class RandomColorGenerator {
  /**
   * Generates a random color.
   * 
   * @returns A random color in hexadecimal format.
   */
  public static generateRandomColor(): string {
    const randomColor: string = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  }
}