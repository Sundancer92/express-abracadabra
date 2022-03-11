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

// A traves de un middleware se valida la existencia del nombre en el el archivo JSON
app.use("/juego/:usuario", (req, res, next) => {
	const nombres = JSON.parse(fs.readFileSync("assets/nombres.json", "utf8"));

	for (const usuario of nombres.usuarios) {
		if (usuario === req.params.usuario) {
			res.send(`El usuario ${usuario} existe en el juego`);
			return;
		}
	}
	next();
});

app.get("/juego/:usuario", (req, res) => {
	const usuario = req.params.usuario;
	res.send(`El usuario ${usuario} no existe en el juego`);
});

// Inicializacion del servidor en el puerto 3000
app.listen(3000, () => {
	console.log("El servidor está inicializado en http://localhost:3000/");
});
