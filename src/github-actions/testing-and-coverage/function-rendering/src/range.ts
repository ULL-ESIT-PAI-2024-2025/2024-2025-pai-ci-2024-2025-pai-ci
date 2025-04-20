/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Nailea Fayna Cruz Galván (alu0101477497)
 * @since Mar 31 2025
 * @desc This file includes the range interface, which is used to
 *       represent a range of values, useful for the coordinate system.
 */

/**
 * Interface that represents a range of values.
 *
 * @property {number} min - The minimum value of the range.
 * @property {number} max - The maximum value of the range.  
 */
export interface Range {
  min: number;
  max: number;
}