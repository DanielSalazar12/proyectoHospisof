import express from "express";
import cors from "cors";
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
