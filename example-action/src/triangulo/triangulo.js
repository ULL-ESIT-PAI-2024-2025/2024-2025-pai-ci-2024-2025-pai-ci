/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para representar un trianguo y calcular su área en el canvas
*/
import { Figura } from "../figura/figura.js";
/**
 * @class Clase para representar un trianguo y calcular su área en el canvas
*/
export class Triangulo extends Figura {
    /**
     * @constructor Constructor de la clase trianguo
     * @param {number} base - La base del trianguo
     * @param {number} altura - La altura del trianguo
     * @param {number} coordenadaX - La coordenada x del trianguo
     * @param {number} coordenadaY - La coordenada y del trianguo
     * @param {string} color - El color del trianguo
    */
    constructor(coordenadaX, coordenadaY, base, altura, color) {
        super(color);
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
        this.base = base;
        this.altura = altura;
        base = this.base;
        altura = this.altura;
        coordenadaX = this.coordenadaX;
        coordenadaY = this.coordenadaY;
    }
    /**
     * @brief Método para calcular el área del trianguo
     * @returns {number} El área del trianguo
    */
    getArea() {
        return (this.base * this.altura) / 2;
    }
    /**
     * @brief Método para dibujar el trianguo en el canvas
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
     * @returns {void}
    */
    pintar(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.coordenadaX, this.coordenadaY);
        ctx.lineTo(this.coordenadaX + this.base, this.coordenadaY);
        ctx.lineTo(this.coordenadaX + this.base / 2, this.coordenadaY - this.altura);
        ctx.fill();
    }
}
;
