import express from "express";
import cors from "cors";
import { cnx } from "./src/models/db/connection.js";
import medicamentos from "./src/routes/medicamentos.js";
import patient from "./src/routes/patient.js";
import user from "./src/routes/user.js";
import roles from "./src/routes/roles.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
// rutas
app.use("/api", medicamentos);
app.use("/api", patient);
app.use("/api", user);
app.use("/api", roles);

const initServe = async () => {
  await cnx();
 
  const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });
};
initServe().catch(console.error);
