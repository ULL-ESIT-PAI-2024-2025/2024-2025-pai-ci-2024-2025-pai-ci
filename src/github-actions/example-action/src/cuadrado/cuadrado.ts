/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para representar un cuadrado y calcular su área en el canvas
*/

import { Figura } from "../figura/figura.js";

/**
 * @class Clase para representar un cuadrado y calcular su área en el canvas
*/

export class Cuadrado extends Figura {
  /**
   * @constructor Constructor de la clase cuadrado
   * @param {number} lado - El lado del cuadrado
   * @param {number} coordenadaX - La coordenada x del cuadrado
   * @param {number} coordenadaY - La coordenada y del cuadrado
   * @param {string} color - El color del cuadrado
  */
  public constructor(private coordenadaX: number, private coordenadaY: number, private lado: number, color: string) {
    super(color);
    lado = this.lado;
    coordenadaX = this.coordenadaX;
    coordenadaY = this.coordenadaY;
  }

  /**
   * @brief Método para calcular el área del cuadrado
   * @returns {number} El área del cuadrado
  */
  public getArea(): number {
    return Math.pow(this.lado, 2);
  }

  /**
   * @brief Método para dibujar el cuadrado en el canvas
   * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
   * @returns {void}
  */
  public pintar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.coordenadaX, this.coordenadaY, this.lado, this.lado);
  }
}