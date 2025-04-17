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
var LissajousModel = /** @class */ (function () {
    /**
     * @description Constructor of the LissajousModel class.
     * @param {number} parameterA - Frequency in the x-axis.
     * @param {number} parameterB - Frequency in the y-axis.
     * @param {number} parameterDelta - Phase difference.
     */
    function LissajousModel(parameterA, parameterB, parameterDelta) {
        if (parameterA === void 0) { parameterA = 3; }
        if (parameterB === void 0) { parameterB = 2; }
        if (parameterDelta === void 0) { parameterDelta = Math.PI / 2; }
        this.parameterA = parameterA;
        this.parameterB = parameterB;
        this.parameterDelta = parameterDelta;
    }
    /**
     * @description Get the frequency in the x-axis.
     * @returns {number} Frequency in the x-axis.
     */
    LissajousModel.prototype.getParameterA = function () {
        return this.parameterA;
    };
    /**
     * @description Get the frequency in the y-axis.
     * @returns {number} Frequency in the y-axis.
     */
    LissajousModel.prototype.getParameterB = function () {
        return this.parameterB;
    };
    /**
     * @description Get the phase difference.
     * @returns {number} Phase difference.
     */
    LissajousModel.prototype.getParameterDelta = function () {
        return this.parameterDelta;
    };
    /**
     * @description Set the frequency in the x-axis.
     * @param {number} parameterA - Frequency in the x-axis.
     */
    LissajousModel.prototype.setParameterA = function (parameterA) {
        this.parameterA = parameterA;
    };
    /**
     * @description Set the frequency in the y-axis.
     * @param {number} parameterB - Frequency in the y-axis.
     */
    LissajousModel.prototype.setParameterB = function (parameterB) {
        this.parameterB = parameterB;
    };
    /**
     * @description Set the phase difference.
     * @param {number} parameterDelta - Phase difference.
     */
    LissajousModel.prototype.setParameterDelta = function (parameterDelta) {
        this.parameterDelta = parameterDelta;
    };
    return LissajousModel;
}());
/**
 * @description LissajousView is responsible for rendering the Lissajous curves on a canvas.
 */
var LissajousView = /** @class */ (function () {
    /**
     * @description Constructor of the LissajousView class.
     * @param {string} canvasId - ID of the canvas element.
     */
    function LissajousView(canvasId) {
        var _this = this;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.resizeCanvas();
        window.addEventListener("resize", function () { return _this.resizeCanvas(); });
    }
    /**
     * @description Resize the canvas to fit the window size.
     */
    LissajousView.prototype.resizeCanvas = function () {
        this.width = this.canvas.width = window.innerWidth * 0.7;
        this.height = this.canvas.height = window.innerHeight;
    };
    /**
     * @description Draw the Lissajous curves on the canvas.
     * @param {number} parameterA - Frequency in the x-axis.
     * @param {number} parameterB - Frequency in the y-axis.
     * @param {number} parameterDelta - Phase difference.
     */
    LissajousView.prototype.draw = function (parameterA, parameterB, parameterDelta) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.beginPath();
        for (var time = 0; time <= 2 * Math.PI; time += 0.01) {
            var coordinateX = Math.sin(parameterA * time + parameterDelta) * (this.width / 3) + this.width / 2;
            var coordinateY = Math.sin(parameterB * time) * (this.height / 3) + this.height / 2;
            this.context.lineTo(coordinateX, coordinateY);
        }
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;
        this.context.stroke();
    };
    return LissajousView;
}());
/**
 * @description LissajousController is responsible for managing the interaction between the model and the view.
 */
var LissajousController = /** @class */ (function () {
    /**
     * @description Constructor of the LissajousController class.
     * @param {LissajousModel} model - LissajousModel instance.
     * @param {LissajousView} view - LissajousView instance.
     */
    function LissajousController(model, view) {
        var _this = this;
        /**
         * @description Update the view with the current parameters of the model.
         */
        this.update = function () {
            _this.view.draw(_this.model.getParameterA(), _this.model.getParameterB(), _this.model.getParameterDelta());
            updateValue("aValue", _this.model.getParameterA().toString());
            updateValue("bValue", _this.model.getParameterB().toString());
            var deltaValue = _this.model.getParameterDelta();
            (deltaValue > Math.PI) ? updateValue("deltaValue", (deltaValue - Math.PI).toFixed(2)) : updateValue("deltaValue", deltaValue.toFixed(2));
            requestAnimationFrame(_this.update);
        };
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
    LissajousController.prototype.setParameters = function (parameterA, parameterB, parameterDelta) {
        this.model.setParameterA(parameterA);
        this.model.setParameterB(parameterB);
        this.model.setParameterDelta(parameterDelta);
        this.update();
    };
    /**
     * @description Animate the phase difference parameter.
     */
    LissajousController.prototype.animateDelta = function () {
        var _this = this;
        setInterval(function () {
            var newDelta = _this.model.getParameterDelta() + 0.01;
            if (newDelta > Math.PI) {
                _this.model.setParameterDelta(0);
            }
            _this.model.setParameterDelta(newDelta);
            _this.update();
        }, 100);
    };
    return LissajousController;
}());
/**
 * @description Main function to initialize the Lissajous curve application.
 */
function main() {
    var model = new LissajousModel();
    var view = new LissajousView("lissajousCanvas");
    var controller = new LissajousController(model, view);
    document.getElementById("aSlider").addEventListener("input", function (event) {
        var parameterA = Number(event.target.value);
        controller.setParameters(parameterA, model.getParameterB(), model.getParameterDelta());
    });
    document.getElementById("bSlider").addEventListener("input", function (event) {
        var parameterB = Number(event.target.value);
        controller.setParameters(model.getParameterA(), parameterB, model.getParameterDelta());
    });
    document.getElementById("deltaSlider").addEventListener("input", function (event) {
        var parameterDelta = parseFloat(event.target.value);
        controller.setParameters(model.getParameterA(), model.getParameterB(), parameterDelta);
    });
}
/**
 * @description Update the value of an HTML element by its ID.
 * @param {string} id - ID of the HTML element.
 * @param {string} value - Value to set.
 */
function updateValue(id, value) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}
main();
