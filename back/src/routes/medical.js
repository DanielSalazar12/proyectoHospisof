import express, { json } from "express";
const router = express.Router();
import { getAll, add, updateMedical } from "../controllers/Medico/medical.js";
import { celebrate, Joi, errors, Segments } from "celebrate";

router.get("/medical/list", async (req, res) => {
  try {
    const response = await getAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/medical/id:", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await searchById(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/medical/create",
  Joi.celebrate({
    body: Joi.object({
      nombreMedico: Joi.string().required(),
      emailMedico: Joi.string().required(),
      especialidadMedico: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req; // obtenemos los datos del body
      const response = await add(data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
);
router.post(
  "/medical/update",
  Joi.celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      nombreMedico: Joi.string().required(),
      emailMedico: Joi.string().required(),
      especialidadMedico: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req; // obtenemos los datos del body
      const response = await updateMedical(data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
