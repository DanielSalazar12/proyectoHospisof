import express from "express";
import cors from "cors";
<<<<<<< HEAD
import { cnx } from "./src/models/db/connection.js";
import medicametos from "./src/routes/medicamentos.js";
import patient from "./src/routes/patient.js";
/* import user from "./src/routes/user.js";
import patient from "./src/routes/patient.js"; */

const app = express();
app.use(express.json());
// rutas
app.use("/api", medicametos);
app.use("/api", patient);

const initServe = async () => {
  await cnx();
  app.use(cors);
  const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });
};
initServe().catch(console.error);
=======
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
>>>>>>> salazar
