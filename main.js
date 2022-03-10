const express = require("express");
const app = express();
const path = require("path");
// ----------
const fs = require("fs");
// ----------

// Acceso a la carpeta assets de forma estatica
app.use(express.static(path.join(__dirname, "/assets")));

// Inicializacion pagina principal
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// Se devuelve un JSON con un arreglo de nombres alojado en el servidor.
app.get("/usuarios", (req, res) => {
	// Lectura del archivo usuarios.json
	fs.readFile("assets/nombres.json", "utf8", (err, data) => {
		if (err) {
			console.log(err);
		} else {
			// Se convierte el JSON a un arreglo
			res.setHeader("Content-Type", "application/json");
			res.send(data);
		}
	});
});

// Inicializacion del servidor en el puerto 3000
app.listen(3000, () => {
	console.log("El servidor está inicializado en http://localhost:3000/");
});
