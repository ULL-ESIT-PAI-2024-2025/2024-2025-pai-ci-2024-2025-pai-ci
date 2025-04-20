/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para representar un círculo y calcular su área en el canvas
*/
import { Figura } from "../figura/figura.js";
/**
 * @class Clase para representar un circulo y calcular su área en el canvas
*/
export class Circulo extends Figura {
    /**
     * @Constructor Constructor de la clase circulo
     * @param {number} radio - El radio del círculo
     * @param {number} coordenadaX - La coordenada x del círculo
     * @param {number} coordenadaY - La coordenada y del círculo
     * @param {string} color - El color del círculo
     *
    */
    constructor(coordenadaX, coordenadaY, radio, color) {
        super(color);
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
        this.radio = radio;
        radio = this.radio;
        coordenadaX = this.coordenadaX;
        coordenadaY = this.coordenadaY;
    }
    /**
     * @brief Método para calcular el área del circulo
     * @returns {number} El área del círculo
    */
    getArea() {
        return Math.PI * Math.pow(this.radio, 2);
    }
    /**
     * @brief Método para dibujar el círculo en el canvas
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas
     * @returns {void}
    */
    pintar(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.coordenadaX, this.coordenadaY, this.radio, 0, 2 * Math.PI);
        ctx.fill();
    }
}
