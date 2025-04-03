import express from "express";
import cors from "cors";
import conexion from "./src/models/bd_conexion/bd_conexion.js";
// Importa la conexión a la BD
import usuarioRuta from "./src/routes/user.js";
import rolesRuta from "./src/routes/roles.js";

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
conexion();

// Rutas globales de la aplicación
app.use("/api", usuarioRuta);
app.use("/api", rolesRuta);

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
