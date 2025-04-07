import express, { json } from "express";

const router = express.Router();
import {
  getAll,
  add,
  updateMedical,
  searchById,
  deleteById,
} from "../controllers/Medicamentos/medicamentos.js";

import { celebrate, Joi, errors, Segments } from "celebrate";

router.get("/medicamentos/list", async (req, res) => {
  try {
    const response = await getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de medicamentos" });
  }
});
/* router.get("/medicamentos/img", async (req, res) => {
  try {
    const response = await avatar();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de médicos" });
  }
}); */
router.get("/medicamentos/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const response = await searchById(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la informacion" });
  }
});

router.post(
  "/medicamentos/create",
  celebrate({
    body: Joi.object({
      nombre: Joi.string().required(),
      codigo: Joi.string().required(),
      presentacion: Joi.string().required(),
      descripcion: Joi.string().required(),
      concentracion: Joi.string().required(),
      formaFarma: Joi.string().required(),
      administracion: Joi.string().required(),
      envase: Joi.string().required(),
      medida: Joi.string().required(),
      stock: Joi.number().required(),
      vencimiento: Joi.date().required(),
      prCompra: Joi.number().required(),
      prVenta: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req; // obtenemos los datos del body
      const response = await add(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al Registrar el Medicamento" });
    }
  }
);
router.post(
  "/medicamentos/update",
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      nombre: Joi.string().required(),
      codigo: Joi.string().required(),
      presentacion: Joi.string().required(),
      descripcion: Joi.string().required(),
      concentracion: Joi.string().required(),
      formaFarma: Joi.string().required(),
      administracion: Joi.string().required(),
      envase: Joi.string().required(),
      medida: Joi.string().required(),
      stock: Joi.number().required(),
      vencimiento: Joi.date().required(),
      prCompra: Joi.number().required(),
      prVenta: Joi.number().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await updateMedical(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar" });
    }
  }
);

router.post(
  "/medicamentos/delet",
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await deleteById(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar" });
    }
  }
);

export default router;
