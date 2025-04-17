/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas (PAI)
 *
 * @file    bar_chart.ts
 * @brief   Implementación de un gráfico de barras simple en TypeScript.
 * @author  Raúl González Acosta (alu0101543529)
 * @date    19/03/2025
 */

interface F1Standings {
  Driver: {
    givenName: string;
    familyName: string;
    permanentNumber?: number;
  };
  points: string;
}

/**
 * Clase para obtener datos de una URL externa y formatearlos.
 * @class DataFetcher
 * @method fetchData - Obtiene datos desde una URL externa y los formatea.
 * @returns Promesa con un array de objetos { label, value }.
 */
class DataFetcher {
  /**
   * Obtiene datos desde una URL externa y los formatea.
   * @param url - URL de la que obtener los datos.
   * @returns Promesa con un array de objetos F1Standings.
   * @throws Error si no se pueden obtener los datos.
   * @async
   * @static
   */
  static async fetchData(url: string): Promise<F1Standings[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Datos recibidos:", data);
  
      return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
    } catch (error) {
      console.error("Error de carga de datos:", error);
      return [];
    }
  }
  
}

/**
 * Clase para dibujar un gráfico de barras en un canvas.
 * @class BarChart
 */
class BarChart {
  /**
   * Canvas para dibujar el gráfico.
   * @private
   * @type {HTMLCanvasElement}
   */
  private canvas: HTMLCanvasElement;

  /**
   * Contexto del canvas.
   * @private
   * @type {CanvasRenderingContext2D}
   */
  private context: CanvasRenderingContext2D;

  /**
   * Datos para mostrar en el gráfico.
   * @private
   * @type {{ label: string; value: number, driver_number: number }[]}
   */
  private data: { label: string; value: number, driver_number: number }[];

  /**
   * Constructor de la clase BarChart.
   * @param {string} canvasId - ID del canvas donde dibujar el gráfico.
   */
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) throw new Error("No se encontró el canvas.");
    this.context = this.canvas.getContext("2d")!;
    this.data = [];

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));

    this.canvas.addEventListener("mousemove", (event) => this.handleMouseMove(event));
  }

  /**
   * Formatea los datos de la Fórmula 1 para mostrar en el gráfico.
   * @param {F1Standings[]} standings - Datos de la Fórmula 1.
   * @returns Datos formateados para el gráfico.
   * @public
   */
  public formatData(standings: F1Standings[]): { label: string; value: number; driver_number: number }[] {
    return standings.map((item) => ({
      label: `${item.Driver.givenName} ${item.Driver.familyName}`,
      value: parseFloat(item.points) || 0,
      driver_number: Number(item.Driver.permanentNumber) || -1,
    }));
  }
  

  /**
   * Redimensiona el canvas al tamaño de la ventana.
   * @private
   */
  private resizeCanvas() {
    this.canvas.width = window.innerWidth * 0.9;
    this.canvas.height = window.innerHeight * 0.6;
    this.draw();
  }

  /**
   * Genera un color RGB aleatorio.
   * @private
   * @returns Color RGB aleatorio.
   */
  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  /**
   * Manejador de eventos para el movimiento del ratón.
   * @param {MouseEvent} event - Evento de movimiento del ratón.
   * @private
   */
  private handleMouseMove(event: MouseEvent) {
    const { offsetX, offsetY } = event;
    const barWidth = (this.canvas.width - 120) / this.data.length;
    const padding = 60;
    const mouseX = offsetX;
    const mouseY = offsetY;

    let found = false;
    this.data.forEach((item, index) => {
      const x = padding + index * barWidth;
      const barHeight = (item.value / Math.max(...this.data.map(d => d.value))) * (this.canvas.height - 2 * padding);
      const y = this.canvas.height - padding - barHeight;

      if (mouseX >= x && mouseX <= x + barWidth - 10 && mouseY >= y && mouseY <= y + barHeight) {
        found = true;
        this.showTooltip(x, y, item.label, item.value);
      }
    });

    if (!found) { this.hideTooltip(); }
  }

  /**
   * Muestra un tooltip en la posición especificada.
   * @param {number} x - Posición X del tooltip.
   * @param {number} y - Posición Y del tooltip.
   * @param {string} label - Etiqueta del tooltip.
   * @param {number} value - Valor del tooltip.
   * @private
   */
  private showTooltip(x: number, y: number, label: string, value: number) {
    const tooltip = document.getElementById("tooltip") as HTMLDivElement;
    if (tooltip) {
      tooltip.style.display = "block";
      tooltip.style.left = `${x + 10}px`;
      tooltip.style.top = `${y - 30}px`;
      tooltip.innerHTML = `${label}: ${value}`;
    }
  }

  /**
   * Oculta el tooltip.
   * @private
   */
  private hideTooltip() {
    const tooltip = document.getElementById("tooltip") as HTMLDivElement;
    if (tooltip) {
      tooltip.style.display = "none";
    }
  }

  /**
   * Establece los datos a mostrar en el gráfico.
   * @param {{ label: string; value: number; driver_number: number }[]} data - Datos a mostrar en el gráfico.
   */
  public setData(data: { label: string; value: number; driver_number: number }[]) {
    this.data = data.sort((a, b) => b.value - a.value);
    this.draw();
  }

  /**
   * Dibuja el gráfico en el canvas.
   * @private
   */
  private draw() {
    if (!this.context) return;
    
    const width = this.canvas.width;
    const height = this.canvas.height;
    const padding = 80;
    const barWidth = (width - 2 * padding) / this.data.length;
    const maxValue = Math.max(...this.data.map(d => d.value));

    this.context.clearRect(0, 0, width, height);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, width, height);

    // Líneas de guía horizontales
    this.context.strokeStyle = "#ddd";
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - (i * (height - 2 * padding) / 5);
      this.context.beginPath();
      this.context.moveTo(padding, y);
      this.context.lineTo(width - padding, y);
      this.context.stroke();
      this.context.fillStyle = "#333";
      this.context.fillText(`${Math.round((maxValue / 5) * i)}`, padding - 40, y + 5);
    }

    // Dibujar ejes
    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.moveTo(padding, height - padding);
    this.context.lineTo(padding, padding);
    this.context.lineTo(width - padding, padding);
    this.context.stroke();

    // Dibujar barras con colores predefinidos
    this.data.forEach((item, index) => {
      const x = padding + index * barWidth;
      const barHeight = (item.value / maxValue) * (height - 2 * padding);
      const y = height - padding - barHeight;
      const color = this.getRandomColor();

      this.context.fillStyle = color;
      this.context.fillRect(x, y, barWidth - 10, barHeight);

      // Agregar etiquetas de valor en la parte superior
      this.context.fillStyle = "black";
      this.context.font = "bold 14px Arial";
      this.context.textAlign = "center";
      this.context.fillText(item.value.toString(), x + (barWidth / 2) - 5, y - 5);

      // Agregar etiquetas de los pilotos en el eje X con nombre y apellido separados
      const [firstName, lastName] = item.label.split(" ");
      this.context.save();
      this.context.translate(x + barWidth / 2, height - 45);
      this.context.rotate(-Math.PI / 4); // Rotar diagonalmente

      this.context.font = "12px Arial";
      this.context.fillText(firstName, 0, 0);
      this.context.fillText(lastName, 0, 15);

      this.context.restore();
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const serverIP = window.location.hostname;
    const dataURL = `http://${serverIP}:8080/data`;

    const rawData = await DataFetcher.fetchData(dataURL);
    console.log("Datos en formato F1Standings:", rawData);

    if (rawData.length > 0) {
      const chart = new BarChart("barChartCanvas");
      const formattedData = chart.formatData(rawData);
      chart.setData(formattedData);
    } else {
      console.warn("No hay datos disponibles para graficar.");
    }

  } catch (error) {
    console.error("Error de carga de datos:", error);
  }
});

