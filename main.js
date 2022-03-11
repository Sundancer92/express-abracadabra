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
app.get("/abracadabra/usuarios", (req, res) => {
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
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
	const nombres = JSON.parse(fs.readFileSync("assets/nombres.json", "utf8"));

	for (const usuario of nombres.usuarios) {
		if (usuario === req.params.usuario) {
			res.send(`<div style="text-align: center">
						<h1 style="color: green">El usuario ${usuario} existe en el juego</h1>	
					</div>`);
			return;
		}
	}
	next();
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
	const usuario = req.params.usuario;
	res.setHeader("Content-Type", "text/html");
	res.send(`<div style="text-align: center">
				<h1>El usuario ${usuario} no existe en el juego</h1>
				<img src="/who.jpeg" alt="No existe">	
			</div>`);
});

// Basado en un número aleatorio del 1 al 4, devolver la foto
// del conejo en caso de coincidir con el número recibido como parámetro ó devolver la
// foto de Voldemort en caso de no coincidir.

app.get("/abracadabra/conejo/:n", (req, res) => {
	const n = req.params.n;
	const numero = Math.floor(Math.random() * 4) + 1;

	console.log(`El número recibido es ${n}`);
	console.log(`El número aleatorio es ${numero}`);

	numero == n
		? res.sendFile(__dirname + "/assets/conejito.jpg")
		: res.sendFile(__dirname + "/assets/voldemort.jpg");
});

// Inicializacion del servidor en el puerto 3000
app.listen(3000, () => {
	console.log("El servidor está inicializado en http://localhost:3000/");
});
