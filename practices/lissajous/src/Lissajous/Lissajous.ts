/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas (PAI)
 *
 * @file    Lissajous.ts
 * @brief   Implementación de las curvas de Lissajous en un canvas HTML.
 * @author  Raúl González Acosta (alu0101543529)
 * @date    01/04/2025
 */

/**
 * @description Lissajous curves are a family of parametric curves defined by the equations:
 *              x(t) = A * sin(a * t + delta)
 *              y(t) = B * sin(b * t)
 * where A and B are the amplitudes, a and b are the frequencies, delta is the phase difference, and t is the parameter.
 */
class LissajousModel {
  /**
   * @description Frequency in the x-axis.
   * @param {number} parameterA - Frequency in the x-axis.
   */
  private parameterA: number;

  /**
   * @description Frequency in the y-axis.
   * @param {number} parameterB - Frequency in the y-axis.
   */
  private parameterB: number;

  /**
   * @description Phase difference.
   * @param {number} parameterDelta - Phase difference.
   */
  private parameterDelta: number;

  /**
   * @description Constructor of the LissajousModel class.
   * @param {number} parameterA - Frequency in the x-axis.
   * @param {number} parameterB - Frequency in the y-axis.
   * @param {number} parameterDelta - Phase difference.
   */
  public constructor(parameterA: number = 3, parameterB: number = 2, parameterDelta: number = Math.PI / 2) {
    this.parameterA = parameterA;
    this.parameterB = parameterB;
    this.parameterDelta = parameterDelta;
  }

  /**
   * @description Get the frequency in the x-axis.
   * @returns {number} Frequency in the x-axis.
   */
  public getParameterA(): number {
    return this.parameterA;
  }

  /**
   * @description Get the frequency in the y-axis.
   * @returns {number} Frequency in the y-axis.
   */
  public getParameterB(): number {
    return this.parameterB;
  }

  /**
   * @description Get the phase difference.
   * @returns {number} Phase difference.
   */
  public getParameterDelta(): number {
    return this.parameterDelta;
  }

  /**
   * @description Set the frequency in the x-axis.
   * @param {number} parameterA - Frequency in the x-axis.
   */
  public setParameterA(parameterA: number) {
    this.parameterA = parameterA;
  }

  /**
   * @description Set the frequency in the y-axis.
   * @param {number} parameterB - Frequency in the y-axis.
   */
  public setParameterB(parameterB: number) {
    this.parameterB = parameterB;
  }

  /**
   * @description Set the phase difference.
   * @param {number} parameterDelta - Phase difference.
   */
  public setParameterDelta(parameterDelta: number) {
    this.parameterDelta = parameterDelta;
  }
}

/**
 * @description LissajousView is responsible for rendering the Lissajous curves on a canvas.
 */
class LissajousView {
  /**
   * @description Canvas element where the Lissajous curves are drawn.
   * @param {HTMLCanvasElement} canvas - Canvas element.
   */
  private canvas: HTMLCanvasElement;

  /**
   * @description Context of the canvas where the Lissajous curves are drawn.
   * @param {CanvasRenderingContext2D} context - Context of the canvas.
   */
  private context: CanvasRenderingContext2D;

  /**
   * @description Width of the canvas.
   * @param {number} width - Width of the canvas.
   */
  private width!: number;

  /**
   * @description Height of the canvas.
   * @param {number} height - Height of the canvas.
   */
  private height!: number;

  /**
   * @description Constructor of the LissajousView class.
   * @param {string} canvasId - ID of the canvas element.
   */
  public constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!;
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  /**
   * @description Resize the canvas to fit the window size.
   */
  private resizeCanvas() {
    this.width = this.canvas.width = window.innerWidth * 0.7;
    this.height = this.canvas.height = window.innerHeight;
  }

  /**
   * @description Draw the Lissajous curves on the canvas.
   * @param {number} parameterA - Frequency in the x-axis.
   * @param {number} parameterB - Frequency in the y-axis.
   * @param {number} parameterDelta - Phase difference.
   */
  public draw(parameterA: number, parameterB: number, parameterDelta: number) {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();

    for (let time = 0; time <= 2 * Math.PI; time += 0.01) {
      let coordinateX = Math.sin(parameterA * time + parameterDelta) * (this.width / 3) + this.width / 2;
      let coordinateY = Math.sin(parameterB * time) * (this.height / 3) + this.height / 2;
      this.context.lineTo(coordinateX, coordinateY);
    }

    this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
    this.context.stroke();
  }
}

/**
 * @description LissajousController is responsible for managing the interaction between the model and the view.
 */
class LissajousController {
  /**
   * @description LissajousModel instance.
   * @param {LissajousModel} model - LissajousModel instance.
   */
  private model: LissajousModel;

  /**
   * @description LissajousView instance.
   * @param {LissajousView} view - LissajousView instance.
   */
  private view: LissajousView;

  /**
   * @description Constructor of the LissajousController class.
   * @param {LissajousModel} model - LissajousModel instance.
   * @param {LissajousView} view - LissajousView instance.
   */
  public constructor(model: LissajousModel, view: LissajousView) {
    this.model = model;
    this.view = view;
    this.update();
    this.animateDelta();
  }

  /**
   * @description Set the parameters of the Lissajous curve.
   * @param {number} parameterA - Frequency in the x-axis.
   * @param {number} parameterB - Frequency in the y-axis.
   * @param {number} parameterDelta - Phase difference.
   */
  public setParameters(parameterA: number, parameterB: number, parameterDelta: number) {
    this.model.setParameterA(parameterA);
    this.model.setParameterB(parameterB);
    this.model.setParameterDelta(parameterDelta);
    this.update();
  }

  /**
   * @description Update the view with the current parameters of the model.
   */
  public update = (): void => {
    this.view.draw(this.model.getParameterA(), this.model.getParameterB(), this.model.getParameterDelta());
    updateValue("aValue", this.model.getParameterA().toString());
    updateValue("bValue", this.model.getParameterB().toString());
    const deltaValue = this.model.getParameterDelta();
    (deltaValue > Math.PI) ? updateValue("deltaValue", (deltaValue - Math.PI).toFixed(2)) : updateValue("deltaValue", deltaValue.toFixed(2));
    requestAnimationFrame(this.update);
  };

  /**
   * @description Animate the phase difference parameter.
   */
  private animateDelta(): void {
    setInterval(() => {
      const newDelta: number = this.model.getParameterDelta() + 0.01;
      if (newDelta > Math.PI) {
        this.model.setParameterDelta(0);
      }
      this.model.setParameterDelta(newDelta);
      this.update();
    }, 100);
  }
}

/**
 * @description Main function to initialize the Lissajous curve application.
 */
function main() {
  const model = new LissajousModel();
  const view = new LissajousView("lissajousCanvas");
  const controller = new LissajousController(model, view);

  document.getElementById("aSlider")!.addEventListener("input", (event) => {
    const parameterA = Number((event.target as HTMLInputElement).value);
    controller.setParameters(parameterA, model.getParameterB(), model.getParameterDelta());
  });

  document.getElementById("bSlider")!.addEventListener("input", (event) => {
    const parameterB = Number((event.target as HTMLInputElement).value);
    controller.setParameters(model.getParameterA(), parameterB, model.getParameterDelta());
  });

  document.getElementById("deltaSlider")!.addEventListener("input", (event) => {
    const parameterDelta = parseFloat((event.target as HTMLInputElement).value);
    controller.setParameters(model.getParameterA(), model.getParameterB(), parameterDelta);
  });
}

/**
 * @description Update the value of an HTML element by its ID.
 * @param {string} id - ID of the HTML element.
 * @param {string} value - Value to set.
 */
function updateValue(id: string, value: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

main();
