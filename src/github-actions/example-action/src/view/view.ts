/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Franco Alla
 * @since 15/03/2025
 * @desc Clase para solicitar al usuario el número de figuras e instanciarlas de manera aleatoria en el canvas
*/

import { Figura } from "../figura/figura.js";
import { Circulo } from "../circulo/circulo.js";
import { Cuadrado } from "../cuadrado/cuadrado.js";
import { Triangulo } from "../triangulo/triangulo.js";
import { Rectangulo } from "../rectangulo/rectangulo.js";

/**
 * @class View
*/

export class View {
  // Atributos privados
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private figuras: Figura[] = [];
  private ancho: number;
  private alto: number;

  /**
   * @constructor Constructor de la clase View
   * @param {string} canvasId Id del canvas
   */
  constructor(canvasId: string) {
    const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasElement) {
      throw new Error(`No se encontró el elemento canvas con id ${canvasId}`);
    }
    this.canvas = canvasElement;
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("No se pudo obtener el contexto del canvas");
    }
    this.ctx = context;
    this.ancho = this.canvas.width;
    this.alto = this.canvas.height;
  }

  /**
   * @brief Método para renderizar las figuras en el canvas
   * @returns {void}
  */
  private render(): void {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    for (const figura of this.figuras) {
      figura.pintar(this.ctx);
    }
  }

  private generarSize(): number {
    const minSize = 1;
    const maxSize = 200;
    return Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
  }

  /**
   * @brief Método para obtener un color aleatorio
   * @returns {string} Color aleatorio
  */
  private getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   * @brief Método para instanciar figuras de manera aleatoria
   * @returns {void}
   */
  public generarFigurasAleatorias(): void {
    let numFiguras: string = prompt("Introduce el número de figuras que deseas crear: ") || "0";
    let numFigurasInt: number = parseInt(numFiguras);
    if (isNaN(numFigurasInt) || numFigurasInt <= 0) {
      alert("Introduce un número válido");
      this.generarFigurasAleatorias();
    }
    this.crearFiguras(numFigurasInt);
    this.render();
  }

  /**
   * @brief Método para instanciar figuras de manera aleatoria
   * @param {number} numFiguras Número de figuras a instanciar
   * @returns {void}
  */
  public crearFiguras(numFiguras: number): void {
    const shapeTypes = ["cuadrado", "rectangulo", "triangulo", "circulo"];
    for (let i = 0; i < numFiguras; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const color = this.getRandomColor();
      const x = Math.random() * this.ancho;
      const y = Math.random() * this.alto;
      switch (type) {
        case "cuadrado":
          const side: number = this.generarSize();
          this.figuras.push(new Cuadrado(x, y, side, color));
          break;
        case "rectangulo":
          const rectBase: number = this.generarSize();
          const rectAltura: number = this.generarSize();
          this.figuras.push(new Rectangulo(x, y, rectBase, rectAltura, color));
          break;
        case "triangulo":
          const triBase: number = this.generarSize();
          const triAltura: number = this.generarSize();
          this.figuras.push(new Triangulo(x, y, triBase, triAltura, color));
          break;
        case "circulo":
          const radius: number = this.generarSize();
          this.figuras.push(new Circulo(x, y, radius, color));
          break;
        default:
          break;
      }
    }
  }
};