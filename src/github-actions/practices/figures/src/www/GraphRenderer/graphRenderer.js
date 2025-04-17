"use strict";
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
    context;
    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    constructor(context) {
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
    drawAxes(width, height, offsetX, offsetY) {
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
    drawScale(width, height, scale, offsetX, offsetY) {
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
    canvas;
    /**
     * @property {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    context;
    /**
     * @property {number} width - Ancho del canvas.
     */
    width = 0;
    /**
     * @property {number} height - Alto del canvas.
     */
    height = 0;
    /**
     * @constructor
     * @param {string} canvasId - ID del elemento canvas HTML.
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    /**
     * @method resizeCanvas
     * @description Redimensiona el canvas al tamaño de la ventana.
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    /**
     * @method clearCanvas
     * @description Limpia el canvas.
     */
    clearCanvas() {
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
    currentExpression = null;
    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    context;
    /**
     * @property {any} math - Librería 'mathjs' para evaluar expresiones.
     */
    math = window.math;
    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @method renderFunction
     * @description Establece la función a graficar.
     * @param {string} expression - Expresión matemática a graficar.
     */
    renderFunction(expression) {
        this.currentExpression = expression;
    }
    /**
     * @method clearFunction
     * @description Limpia la función actual.
     */
    clearFunction() {
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
    drawFunction(width, height, scale, offsetX, offsetY) {
        if (!this.currentExpression) {
            return;
        }
        this.context.beginPath();
        this.context.strokeStyle = 'red';
        for (let pixelX = 0; pixelX < width; pixelX += 2) {
            const graphX = (pixelX - width / 2 - offsetX) / scale;
            try {
                const graphY = this.math.evaluate(this.currentExpression, { x: graphX });
                const pixelY = height / 2 - graphY * scale + offsetY;
                pixelX === 0 ? this.context.moveTo(pixelX, pixelY) : this.context.lineTo(pixelX, pixelY);
            }
            catch {
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
    showGrid = true;
    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    context;
    /**
     * @constructor
     * @param {CanvasRenderingContext2D} context - Contexto del canvas.
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @method toggleGrid
     * @description Activa o desactiva la cuadrícula.
     * @param {boolean} show - Indica si se debe mostrar la cuadrícula.
     */
    toggleGrid(show) {
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
    drawGrid(width, height, scale, offsetX, offsetY) {
        if (!this.showGrid) {
            return;
        }
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
    scale = 50;
    /**
     * @property {number} offsetX - Desplazamiento en el eje X.
     */
    offsetX = 0;
    /**
     * @property {number} offsetY - Desplazamiento en el eje Y.
     */
    offsetY = 0;
    /**
     * @property {boolean} isPanning - Indica si se está desplazando el canvas.
     */
    isPanning = false;
    /**
     * @property {number} lastX - Última posición X del ratón.
     */
    lastX = 0;
    /**
     * @property {number} lastY - Última posición Y del ratón.
     */
    lastY = 0;
    /**
     * @property {HTMLCanvasElement} canvas - Elemento canvas HTML.
     */
    canvas;
    /**
     * @property {function} renderCallback - Función de callback para renderizar el canvas.
     */
    renderCallback;
    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - Elemento canvas HTML.
     * @param {function} renderCallback - Función de callback para renderizar el canvas.
     */
    constructor(canvas, renderCallback) {
        this.canvas = canvas;
        this.renderCallback = renderCallback;
        this.initEvents();
    }
    /**
     * @method initEvents
     * @description Inicializa los eventos de desplazamiento y zoom.
     */
    initEvents() {
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
    resetView() {
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
    getScale() {
        return this.scale;
    }
    /**
     * @method getOffset
     * @description Obtiene el desplazamiento actual del canvas.
     * @returns {{x: number, y: number}} Desplazamiento actual.
     */
    getOffset() {
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
    canvasManager;
    /**
     * @property {GridRenderer} gridRenderer - Gestor de la cuadrícula.
     */
    gridRenderer;
    /**
     * @property {AxesRenderer} axesRenderer - Gestor de los ejes.
     */
    axesRenderer;
    /**
     * @property {FunctionPlotter} functionPlotter - Gestor de la función.
     */
    functionPlotter;
    /**
     * @property {PanZoomController} panZoomController - Gestor del desplazamiento y zoom.
     */
    panZoomController;
    /**
     * @constructor
     * @param {string} canvasId - ID del elemento canvas HTML.
     */
    constructor(canvasId) {
        this.canvasManager = new CanvasManager(canvasId);
        this.gridRenderer = new GridRenderer(this.canvasManager.context);
        this.axesRenderer = new AxesRenderer(this.canvasManager.context);
        this.functionPlotter = new FunctionPlotter(this.canvasManager.context);
        this.panZoomController = new PanZoomController(this.canvasManager.canvas, () => this.render());
        this.render();
    }
    /**
     * @method toggleGrid
     * @description Activa o desactiva la cuadrícula.
     * @param {boolean} show - Indica si se debe mostrar la cuadrícula.
     */
    toggleGrid(show) {
        this.gridRenderer.toggleGrid(show);
        this.render();
    }
    /**
     * @method resetView
     * @description Restablece la vista del canvas a su estado inicial.
     */
    resetView() {
        this.panZoomController.resetView();
        this.functionPlotter.clearFunction();
        this.render();
    }
    /**
     * @method renderFunction
     * @description Establece la función a graficar.
     * @param {string} expression - Expresión matemática a graficar.
     */
    renderFunction(expression) {
        this.functionPlotter.renderFunction(expression);
        this.render();
    }
    /**
     * @method render
     * @description Renderiza el canvas.
     */
    render() {
        const { width, height } = this.canvasManager;
        const { x, y } = this.panZoomController.getOffset();
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
    const input = document.getElementById('functionInput');
    const button = document.getElementById('plotButton');
    const toggleGrid = document.getElementById('toggleGrid');
    const resetButton = document.getElementById('resetButton');
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
