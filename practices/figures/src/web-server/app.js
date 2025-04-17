/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas (PAI)
 *
 * @file    app.js
 * @brief   Implementación of a simple web server using Express.js
 * @author  Raúl González Acosta (alu0101543529)
 * @date    19/03/2025
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os'

const app = express();

//set the port
const PORT = 8080;
app.set('port', PORT);


const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../www/')));

// Start the server and listens for requests on the specified port
const SERVER = app.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let ip;
  
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        ip = alias.address;
        break;
      }
    }
  }
  console.log(`The server is running on http://${ip}:${app.get('port')}/`);
});
