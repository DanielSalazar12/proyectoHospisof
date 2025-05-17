import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import { cnx } from "./src/models/db/connection.js";
import medicaments from "./src/routes/medicaments.js";
import diganostico from "./src/routes/diganostico.js";
import medical from "./src/routes/medical.js";
import patient from "./src/routes/patient.js";
import user from "./src/routes/user.js";
import roles from "./src/routes/roles.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// rutas
router.use(errors());
app.use("/api", diganostico);
app.use("/api", medicaments);
app.use("/api", medical);
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
