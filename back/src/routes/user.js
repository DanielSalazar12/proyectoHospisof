import express from "express";
import usuarioController from "../controllers/Usuario/user.js";

const router = express.Router();

// Rutas que entrega la API
router.get("/usuario/listartodos", usuarioController.listarTodos);
router.post("/usuario/nuevo", usuarioController.nuevo);
router.put("/usuario/actualizar/:id", usuarioController.actualizarPorId);

//router.post("/usuario/login", usuarioController.login);

// Agrega más rutas según sea necesario

export default router;
