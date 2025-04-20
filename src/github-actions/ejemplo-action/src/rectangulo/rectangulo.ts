/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para representar un rectángulo y calcular su área en el canvas
*/

import { Figura } from "../figura/figura.js";

/**
 * @class Clase para representar un rectángulo y calcular su área en el canvas
*/

export class Rectangulo extends Figura {
  /**
   * @constructor Constructor de la clase rectángulo
   * @param {number} base - La base del rectángulo
   * @param {number} altura - La altura del rectángulo
   * @param {number} coordenadaX - La coordenada x del rectángulo
   * @param {number} coordenadaY - La coordenada y del rectángulo
   * @param {string} color - El color del rectángulo
  */
  constructor(private coordenadaX: number, private coordenadaY: number, private base: number, private altura: number, color: string) {
    super(color);
    base = this.base;
    altura = this.altura;
    coordenadaX = this.coordenadaX;
    coordenadaY = this.coordenadaY;
  }

  /**
   * @brief Método para calcular el área del rectángulo
   * @returns {number} El área del rectángulo
  */
  public getArea(): number {
    return this.base * this.altura;
  }
  
  /**
   * @brief Método para dibujar el rectángulo en el canvas
   * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
   * @returns {void}
  */
  public pintar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.coordenadaX, this.coordenadaY, this.base, this.altura);
  }
}