// 1. Importa el módulo de Express
const express = require('express');

// 2. Crea una instancia de la aplicación Express
const app = express();

// 3. Define el puerto en el que se ejecutará el servidor
const port = 3000;

// 4. Define una ruta GET simple a la URL raíz ('/')
app.get('/', (req, res) => {
    res.send('¡Hola Mundo desde Express!');
});

// 5. Inicia el servidor y escucha las conexiones en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});