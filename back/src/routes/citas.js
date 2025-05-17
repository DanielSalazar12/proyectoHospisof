import express from "express";
import citasController from "../controllers/citas/citas.js";

const router = express.Router();

// Rutas que entrega la API
router.get("/citas/listartodos", citasController.getAll);
router.post("/citas/nuevo", citasController.nuevo);
//router.get("/citas/listarMedicos", citasController.getMedicos);
//router.post("/usuario/login", usuarioController.login);

// Agrega más rutas según sea necesario

export default router;
