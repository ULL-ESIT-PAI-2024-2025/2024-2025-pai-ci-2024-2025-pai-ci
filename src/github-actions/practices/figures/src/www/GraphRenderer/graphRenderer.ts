/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas (PAI)
 *
 * @file    graphRenderer.ts
 * @brief   Implementación de un renderer para graficar funciones matemáticas en un canvas HTML.
 * @author  Raúl González Acosta (alu0101543529)
 * @date    26/03/2025
 */

/**
 * @class AxesRenderer
 * @description Clase que se encarga de renderizar los ejes en el canvas.
 */
class AxesRenderer {
  /**
   * @property {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  private context: CanvasRenderingContext2D;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * @method drawAxes
   * @description Dibuja los ejes X e Y en el canvas.
   * @param {number} width - Ancho del canvas.
   * @param {number} height - Alto del canvas.
   * @param {number} offsetX - Desplazamiento en el eje X.
   * @param {number} offsetY - Desplazamiento en el eje Y.
   */
  public drawAxes(width: number, height: number, offsetX: number, offsetY: number) {
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 1;
    this.context.beginPath();

    const xAxis = height / 2 + offsetY;
    const yAxis = width / 2 + offsetX;

    this.context.moveTo(0, xAxis);
    this.context.lineTo(width, xAxis);
    this.context.moveTo(yAxis, 0);
    this.context.lineTo(yAxis, height);

    this.context.stroke();
  }

  /**
   * @method drawScale
   * @description Dibuja las marcas de escala en los ejes X e Y.
   * @param {number} width - Ancho del canvas.
   * @param {number} height - Alto del canvas.
   * @param {number} scale - Escala de la gráfica.
   * @param {number} offsetX - Desplazamiento en el eje X.
   * @param {number} offsetY - Desplazamiento en el eje Y.
   */
  public drawScale(width: number, height: number, scale: number, offsetX: number, offsetY: number) {
    this.context.fillStyle = 'black';
    this.context.font = '12px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';

    const yAxis = width / 2 + offsetX;
    const xAxis = height / 2 + offsetY;

    for (let x = (yAxis % scale); x < width; x += scale) {
      let value = Math.round((x - yAxis) / scale);
      this.context.beginPath();
      this.context.moveTo(x, xAxis - 5);
      this.context.lineTo(x, xAxis + 5);
      this.context.stroke();
      if (value % 5 === 0) {
        this.context.fillText(value.toString(), x, xAxis + 15);
      }
    }

    for (let y = (xAxis % scale); y < height; y += scale) {
      let value = -Math.round((y - xAxis) / scale);
      this.context.beginPath();
      this.context.moveTo(yAxis - 5, y);
      this.context.lineTo(yAxis + 5, y);
      this.context.stroke();
      if (value % 5 === 0) {
        this.context.fillText(value.toString(), yAxis - 15, y);
      }
    }
  }
}

/**
 * @class CanvasManager
 * @description Clase que se encarga de gestionar el canvas y su contexto.
 */
class CanvasManager {
  /**
   * @property {HTMLCanvasElement} canvas - Elemento canvas HTML.
   */
  public canvas: HTMLCanvasElement;

  /**
   * @property {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  public context: CanvasRenderingContext2D;

  /**
   * @property {number} width - Ancho del canvas.
   */
  public width: number = 0;

  /**
   * @property {number} height - Alto del canvas.
   */
  public height: number = 0;

  /**
   * @constructor
   * @param {string} canvasId - ID del elemento canvas HTML.
   */
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
   * @method resizeCanvas
   * @description Redimensiona el canvas al tamaño de la ventana.
   */
  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  /**
   * @method clearCanvas
   * @description Limpia el canvas.
   */
  public clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}

/**
 * @class FunctionPlotter
 * @description Clase que se encarga de graficar funciones matemáticas en el canvas.
 */
class FunctionPlotter {
  /**
   * @property {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  private currentExpression: string | null = null;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  private context: CanvasRenderingContext2D;

  /**
   * @property {any} math - Librería 'mathjs' para evaluar expresiones.
   */
  private math: any = (window as any).math;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * @method renderFunction
   * @description Establece la función a graficar.
   * @param {string} expression - Expresión matemática a graficar.
   */
  public renderFunction(expression: string) {
    this.currentExpression = expression;
  }

  /**
   * @method clearFunction
   * @description Limpia la función actual.
   */
  public clearFunction() {
    this.currentExpression = null;
  }

  /**
   * @method drawFunction
   * @description Dibuja la función en el canvas.
   * @param {number} width - Ancho del canvas.
   * @param {number} height - Alto del canvas.
   * @param {number} scale - Escala de la gráfica.
   * @param {number} offsetX - Desplazamiento en el eje X.
   * @param {number} offsetY - Desplazamiento en el eje Y.
   */
  public drawFunction(width: number, height: number, scale: number, offsetX: number, offsetY: number) {
    if (!this.currentExpression) { return; }

    this.context.beginPath();
    this.context.strokeStyle = 'red';

    for (let pixelX = 0; pixelX < width; pixelX += 2) {
      const graphX = (pixelX - width / 2 - offsetX) / scale;
      try {
        const graphY = this.math.evaluate(this.currentExpression, { x: graphX });
        const pixelY = height / 2 - graphY * scale + offsetY;
        pixelX === 0 ? this.context.moveTo(pixelX, pixelY) : this.context.lineTo(pixelX, pixelY);
      } catch {
        continue;
      }
    }
    this.context.stroke();
  }
}

/**
 * @class GridRenderer
 * @description Clase que se encarga de renderizar la cuadrícula en el canvas.
 */
class GridRenderer {
  /**
   * @property {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  private showGrid: boolean = true;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  private context: CanvasRenderingContext2D;

  /**
   * @constructor
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * @method toggleGrid
   * @description Activa o desactiva la cuadrícula.
   * @param {boolean} show - Indica si se debe mostrar la cuadrícula.
   */
  public toggleGrid(show: boolean) {
    this.showGrid = show;
  }

  /**
   * @method drawGrid
   * @description Dibuja la cuadrícula en el canvas.
   * @param {number} width - Ancho del canvas.
   * @param {number} height - Alto del canvas.
   * @param {number} scale - Escala de la cuadrícula.
   * @param {number} offsetX - Desplazamiento en el eje X.
   * @param {number} offsetY - Desplazamiento en el eje Y.
   */
  public drawGrid(width: number, height: number, scale: number, offsetX: number, offsetY: number) {
    if (!this.showGrid)  { return; }
    this.context.strokeStyle = 'Silver';
    this.context.lineWidth = 0.5;
    this.context.setLineDash([5, 5]);
    this.context.beginPath();

    let startX = (width / 2 + offsetX) % scale;
    let startY = (height / 2 + offsetY) % scale;

    for (let x = startX; x < width; x += scale) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, height);
    }

    for (let y = startY; y < height; y += scale) {
      this.context.moveTo(0, y);
      this.context.lineTo(width, y);
    }

    this.context.stroke();
    this.context.setLineDash([]);
  }
}

/**
 * @class PanZoomController
 * @description Clase que se encarga de gestionar el zoom y el desplazamiento del canvas.
 */
class PanZoomController {
  /**
   * @property {number} scale - Escala actual del canvas.
   */
  private scale: number = 50;

  /**
   * @property {number} offsetX - Desplazamiento en el eje X.
   */
  private offsetX: number = 0;

  /**
   * @property {number} offsetY - Desplazamiento en el eje Y.
   */
  private offsetY: number = 0;

  /**
   * @property {boolean} isPanning - Indica si se está desplazando el canvas.
   */
  private isPanning: boolean = false;

  /**
   * @property {number} lastX - Última posición X del ratón.
   */
  private lastX: number = 0;

  /**
   * @property {number} lastY - Última posición Y del ratón.
   */
  private lastY: number = 0;

  /**
   * @property {HTMLCanvasElement} canvas - Elemento canvas HTML.
   */
  private canvas: HTMLCanvasElement;

  /**
   * @property {function} renderCallback - Función de callback para renderizar el canvas.
   */
  private renderCallback: () => void;

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - Elemento canvas HTML.
   * @param {function} renderCallback - Función de callback para renderizar el canvas.
   */
  constructor(canvas: HTMLCanvasElement, renderCallback: () => void) {
    this.canvas = canvas;
    this.renderCallback = renderCallback;
    this.initEvents();
  }

  /**
   * @method initEvents
   * @description Inicializa los eventos de desplazamiento y zoom.
   */
  private initEvents() {
    this.canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      this.scale *= zoomFactor;
      this.offsetX *= zoomFactor;
      this.offsetY *= zoomFactor;
      this.renderCallback();
    });

    this.canvas.addEventListener('mousedown', (event) => {
      this.isPanning = true;
      this.lastX = event.clientX;
      this.lastY = event.clientY;
    });

    window.addEventListener('mousemove', (event) => {
      if (this.isPanning) {
        this.offsetX += event.clientX - this.lastX;
        this.offsetY += event.clientY - this.lastY;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.renderCallback();
      }
    });

    window.addEventListener('mouseup', () => (this.isPanning = false));
  }

  /**
   * @method resetView
   * @description Restablece la vista del canvas a su estado inicial.
   */
  public resetView() {
    this.scale = 50;
    this.offsetX = 0;
    this.offsetY = 0;
    this.renderCallback();
  }

  /**
   * @method getScale
   * @description Obtiene la escala actual del canvas.
   * @returns {number} Escala actual.
   */
  public getScale() {
    return this.scale;
  }

  /**
   * @method getOffset
   * @description Obtiene el desplazamiento actual del canvas.
   * @returns {{x: number, y: number}} Desplazamiento actual.
   */
  public getOffset() {
    return { x: this.offsetX, y: this.offsetY };
  }
}

/**
 * @class GraphRenderer
 * @description Clase principal que gestiona el renderizado de la gráfica.
 */
class GraphRenderer {
  /**
   * @property {CanvasManager} canvasManager - Gestor del canvas.
   */
  private canvasManager: CanvasManager;

  /**
   * @property {GridRenderer} gridRenderer - Gestor de la cuadrícula.
   */
  private gridRenderer: GridRenderer;

  /**
   * @property {AxesRenderer} axesRenderer - Gestor de los ejes.
   */
  private axesRenderer: AxesRenderer;

  /**
   * @property {FunctionPlotter} functionPlotter - Gestor de la función.
   */
  private functionPlotter: FunctionPlotter;

  /**
   * @property {PanZoomController} panZoomController - Gestor del desplazamiento y zoom.
   */
  private panZoomController: PanZoomController;

  /**
   * @constructor
   * @param {string} canvasId - ID del elemento canvas HTML.
   */
  constructor(canvasId: string) {
    this.canvasManager = new CanvasManager(canvasId);
    this.gridRenderer = new GridRenderer(this.canvasManager.context);
    this.axesRenderer = new AxesRenderer(this.canvasManager.context);
    this.functionPlotter = new FunctionPlotter(this.canvasManager.context);
    this.panZoomController = new PanZoomController(
      this.canvasManager.canvas, 
      () => this.render()
    );
    
    this.render();
  }

  /**
   * @method toggleGrid
   * @description Activa o desactiva la cuadrícula.
   * @param {boolean} show - Indica si se debe mostrar la cuadrícula.
   */
  public toggleGrid(show: boolean) {
    this.gridRenderer.toggleGrid(show);
    this.render();
  }

  /**
   * @method resetView
   * @description Restablece la vista del canvas a su estado inicial.
   */
  public resetView() {
    this.panZoomController.resetView();
    this.functionPlotter.clearFunction();
    this.render();
  }

  /**
   * @method renderFunction
   * @description Establece la función a graficar.
   * @param {string} expression - Expresión matemática a graficar.
   */
  public renderFunction(expression: string) {
    this.functionPlotter.renderFunction(expression);
    this.render();
  }

  /**
   * @method render
   * @description Renderiza el canvas.
   */
  private render() {
    const {width, height} = this.canvasManager;
    const {x, y} = this.panZoomController.getOffset();
    const scale = this.panZoomController.getScale();

    this.canvasManager.clearCanvas();
    this.gridRenderer.drawGrid(width, height, scale, x, y);
    this.axesRenderer.drawAxes(width, height, x, y);
    this.axesRenderer.drawScale(width, height, scale, x, y);
    this.functionPlotter.drawFunction(width, height, scale, x, y);
  }
}

/**
 * @function main
 * @description Función principal que inicializa el renderer y gestiona los eventos.
 */
function main() {
  const renderer = new GraphRenderer('graphCanvas');
  const input = document.getElementById('functionInput') as HTMLInputElement;
  const button = document.getElementById('plotButton') as HTMLButtonElement;
  const toggleGrid = document.getElementById('toggleGrid') as HTMLInputElement;
  const resetButton = document.getElementById('resetButton') as HTMLButtonElement;

  button.addEventListener('click', () => {
    const expression = input.value;
    renderer.renderFunction(expression);
  });

  toggleGrid.addEventListener('change', () => {
    renderer.toggleGrid(toggleGrid.checked);
  });

  resetButton.addEventListener('click', () => {
    renderer.resetView();
    input.value = "";
    toggleGrid.checked = true;
    renderer.toggleGrid(true);
  });
}

main();