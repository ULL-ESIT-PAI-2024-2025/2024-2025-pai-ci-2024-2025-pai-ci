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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/**
 * Clase para obtener datos de una URL externa y formatearlos.
 * @class DataFetcher
 * @method fetchData - Obtiene datos desde una URL externa y los formatea.
 * @returns Promesa con un array de objetos { label, value }.
 */
var DataFetcher = /** @class */ (function () {
    function DataFetcher() {
    }
    /**
     * Obtiene datos desde una URL externa y los formatea.
     * @param url - URL de la que obtener los datos.
     * @returns Promesa con un array de objetos F1Standings.
     * @throws Error si no se pueden obtener los datos.
     * @async
     * @static
     */
    DataFetcher.fetchData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _e.sent();
                        if (!response.ok) {
                            throw new Error("Error al obtener los datos: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _e.sent();
                        console.log("Datos recibidos:", data);
                        return [2 /*return*/, ((_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.MRData) === null || _a === void 0 ? void 0 : _a.StandingsTable) === null || _b === void 0 ? void 0 : _b.StandingsLists) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.DriverStandings) || []];
                    case 3:
                        error_1 = _e.sent();
                        console.error("Error de carga de datos:", error_1);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DataFetcher;
}());
/**
 * Clase para dibujar un gráfico de barras en un canvas.
 * @class BarChart
 */
var BarChart = /** @class */ (function () {
    /**
     * Constructor de la clase BarChart.
     * @param {string} canvasId - ID del canvas donde dibujar el gráfico.
     */
    function BarChart(canvasId) {
        var _this = this;
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas)
            throw new Error("No se encontró el canvas.");
        this.context = this.canvas.getContext("2d");
        this.data = [];
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));
        this.canvas.addEventListener("mousemove", function (event) { return _this.handleMouseMove(event); });
    }
    /**
     * Formatea los datos de la Fórmula 1 para mostrar en el gráfico.
     * @param {F1Standings[]} standings - Datos de la Fórmula 1.
     * @returns Datos formateados para el gráfico.
     * @public
     */
    BarChart.prototype.formatData = function (standings) {
        return standings.map(function (item) { return ({
            label: "".concat(item.Driver.givenName, " ").concat(item.Driver.familyName),
            value: parseFloat(item.points) || 0,
            driver_number: Number(item.Driver.permanentNumber) || -1,
        }); });
    };
    /**
     * Redimensiona el canvas al tamaño de la ventana.
     * @private
     */
    BarChart.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth * 0.9;
        this.canvas.height = window.innerHeight * 0.6;
        this.draw();
    };
    /**
     * Genera un color RGB aleatorio.
     * @private
     * @returns Color RGB aleatorio.
     */
    BarChart.prototype.getRandomColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
    };
    /**
     * Manejador de eventos para el movimiento del ratón.
     * @param {MouseEvent} event - Evento de movimiento del ratón.
     * @private
     */
    BarChart.prototype.handleMouseMove = function (event) {
        var _this = this;
        var offsetX = event.offsetX, offsetY = event.offsetY;
        var barWidth = (this.canvas.width - 120) / this.data.length;
        var padding = 60;
        var mouseX = offsetX;
        var mouseY = offsetY;
        var found = false;
        this.data.forEach(function (item, index) {
            var x = padding + index * barWidth;
            var barHeight = (item.value / Math.max.apply(Math, _this.data.map(function (d) { return d.value; }))) * (_this.canvas.height - 2 * padding);
            var y = _this.canvas.height - padding - barHeight;
            if (mouseX >= x && mouseX <= x + barWidth - 10 && mouseY >= y && mouseY <= y + barHeight) {
                found = true;
                _this.showTooltip(x, y, item.label, item.value);
            }
        });
        if (!found) {
            this.hideTooltip();
        }
    };
    /**
     * Muestra un tooltip en la posición especificada.
     * @param {number} x - Posición X del tooltip.
     * @param {number} y - Posición Y del tooltip.
     * @param {string} label - Etiqueta del tooltip.
     * @param {number} value - Valor del tooltip.
     * @private
     */
    BarChart.prototype.showTooltip = function (x, y, label, value) {
        var tooltip = document.getElementById("tooltip");
        if (tooltip) {
            tooltip.style.display = "block";
            tooltip.style.left = "".concat(x + 10, "px");
            tooltip.style.top = "".concat(y - 30, "px");
            tooltip.innerHTML = "".concat(label, ": ").concat(value);
        }
    };
    /**
     * Oculta el tooltip.
     * @private
     */
    BarChart.prototype.hideTooltip = function () {
        var tooltip = document.getElementById("tooltip");
        if (tooltip) {
            tooltip.style.display = "none";
        }
    };
    /**
     * Establece los datos a mostrar en el gráfico.
     * @param {{ label: string; value: number; driver_number: number }[]} data - Datos a mostrar en el gráfico.
     */
    BarChart.prototype.setData = function (data) {
        this.data = data.sort(function (a, b) { return b.value - a.value; });
        this.draw();
    };
    /**
     * Dibuja el gráfico en el canvas.
     * @private
     */
    BarChart.prototype.draw = function () {
        var _this = this;
        if (!this.context)
            return;
        var width = this.canvas.width;
        var height = this.canvas.height;
        var padding = 80;
        var barWidth = (width - 2 * padding) / this.data.length;
        var maxValue = Math.max.apply(Math, this.data.map(function (d) { return d.value; }));
        this.context.clearRect(0, 0, width, height);
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, width, height);
        // Líneas de guía horizontales
        this.context.strokeStyle = "#ddd";
        for (var i = 0; i <= 5; i++) {
            var y = height - padding - (i * (height - 2 * padding) / 5);
            this.context.beginPath();
            this.context.moveTo(padding, y);
            this.context.lineTo(width - padding, y);
            this.context.stroke();
            this.context.fillStyle = "#333";
            this.context.fillText("".concat(Math.round((maxValue / 5) * i)), padding - 40, y + 5);
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
        this.data.forEach(function (item, index) {
            var x = padding + index * barWidth;
            var barHeight = (item.value / maxValue) * (height - 2 * padding);
            var y = height - padding - barHeight;
            var color = _this.getRandomColor();
            _this.context.fillStyle = color;
            _this.context.fillRect(x, y, barWidth - 10, barHeight);
            // Agregar etiquetas de valor en la parte superior
            _this.context.fillStyle = "black";
            _this.context.font = "bold 14px Arial";
            _this.context.textAlign = "center";
            _this.context.fillText(item.value.toString(), x + (barWidth / 2) - 5, y - 5);
            // Agregar etiquetas de los pilotos en el eje X con nombre y apellido separados
            var _a = item.label.split(" "), firstName = _a[0], lastName = _a[1];
            _this.context.save();
            _this.context.translate(x + barWidth / 2, height - 45);
            _this.context.rotate(-Math.PI / 4); // Rotar diagonalmente
            _this.context.font = "12px Arial";
            _this.context.fillText(firstName, 0, 0);
            _this.context.fillText(lastName, 0, 15);
            _this.context.restore();
        });
    };
    return BarChart;
}());
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var serverIP, dataURL, rawData, chart, formattedData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                serverIP = window.location.hostname;
                dataURL = "http://".concat(serverIP, ":8080/data");
                return [4 /*yield*/, DataFetcher.fetchData(dataURL)];
            case 1:
                rawData = _a.sent();
                console.log("Datos en formato F1Standings:", rawData);
                if (rawData.length > 0) {
                    chart = new BarChart("barChartCanvas");
                    formattedData = chart.formatData(rawData);
                    chart.setData(formattedData);
                }
                else {
                    console.warn("No hay datos disponibles para graficar.");
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error de carga de datos:", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
