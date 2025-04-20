/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para representar figuras geometricas y calcular su área en el canvas   
*/

export abstract class Figura {

  /**
   * @brief Constructor de la clase Figura
   * @param {string} color - El color de la figura
   */
  constructor(protected color: string) {
    color = this.color;
  }
  /**
   * @brief Método para calcular el área de la figura
   * @returns {number} El área de la figura
   */
  public abstract getArea(): number;

  public getColor(): string {
    return this.color;
  }

  /**
   * @brief Método para dibujar la figura en el canvas
   * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
   */
  public abstract pintar(ctx: CanvasRenderingContext2D): void;
};