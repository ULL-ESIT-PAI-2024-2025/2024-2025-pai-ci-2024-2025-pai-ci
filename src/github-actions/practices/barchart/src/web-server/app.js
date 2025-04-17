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
import fetch from 'node-fetch';       // To make http requests
import path from 'path';              // provides utilities for working with file and directory paths.
import { fileURLToPath } from 'url';  // Used to convert a file URL to a file path.
import { dirname } from 'path';       // The dirname function from the path module is used to get the directory name of a file path.
import cors from 'cors';              // To enable CORS
import os from 'os'
import { get } from 'http';

const app = express();

//set the port
const PORT = 8080;
app.set('port', PORT);

// Enable CORS for all requests
app.use(cors());

// define a route for fetching data
// When a GET request is made to the '/data' endpoint, the code inside the callback function will be executed. 
// The function uses node-fetch to make a request to an external API, then sends the response as JSON to the client.
app.get('/data', async (req, res) => {
  try {
    const URL = 'https://ergast.com/api/f1/current/driverStandings.json';
    const response = await fetch(URL);
    const json = await response.json();

    // Habilitar CORS en la respuesta
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos.');
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tell express that we want to use the www folder for our static assets
app.use(express.static(path.join(__dirname, '../www/')));

// Start the server and listens for requests on the specified port
// Iniciar el servidor y mostrar la IP local
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
