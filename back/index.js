import express from "express";
import cors from "cors";
import { cnx } from "./src/models/db/connection.js";
import medicamentos from "./src/routes/medicamentos.js";
import patient from "./src/routes/patient.js";
import usuarioRuta from "./src/routes/user.js";
import rolesRuta from "./src/routes/roles.js";
/* import user from "./src/routes/user.js";
import patient from "./src/routes/patient.js"; */

const app = express();
app.use(express.json());
// rutas
app.use("/api", medicamentos);
app.use("/api", patient);
app.use("/api", usuarioRuta);
app.use("/api", rolesRuta);

const initServe = async () => {
  await cnx();
  app.use(cors);
  const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });
};
initServe().catch(console.error);
