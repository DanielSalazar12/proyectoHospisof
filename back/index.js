import express from "express";
import cors from "cors";
import { cnx } from "./src/models/db/connection.js";
import medical from "./src/routes/medical.js";
/* import user from "./src/routes/user.js";
import patient from "./src/routes/patient.js"; */

const app = express();

const initServe = async () => {
  await cnx();
  // middelware
  app.use(cors);
  app.use(express.json());

  // rutas
  /*   app.use("/api", user); */
  app.use("/api", medical);
  /* app.use("/api", patient) */ const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });
};
initServe().catch(console.error);
