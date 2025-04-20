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
export class Figura {
    /**
     * @brief Constructor de la clase Figura
     * @param {string} color - El color de la figura
     */
    constructor(color) {
        this.color = color;
        color = this.color;
    }
    getColor() {
        return this.color;
    }
}
;
