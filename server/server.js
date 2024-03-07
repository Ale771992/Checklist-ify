// Conexion a la base de datos. 
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alejandra77$',
    database: 'Checklist_ify'
})
connection.connect()

// Archivo principal para tu servidor.
const express = require('express');
const app = express(); // Creas una instanacia de Express llamada app, esa instacia es tu aplicación web. 
const port = 3000; //Defines el puerto.

app.get('/', (req, res) => { // Manejas peticiones GET que llegan al servidor.
    res.send('¡Checklist-ify running!');
})

app.listen(port, () => { // Se inicia express y escucha al puerto definido. 
    console.log(`Server running en http://localhost:${port}`)
})
module.exports = connection
// Ejecuta node server.js para ejecutar tu servidor. 