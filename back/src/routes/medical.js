import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();
import {
  getAll,
  add,
  updateMedical,
  deleteById,
  searchById,
} from "../controllers/Medicos/medical.js";

import { celebrate, Joi, errors } from "celebrate";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/medicos/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const schema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  documento: Joi.number().required(),
  telefono: Joi.number().required(),
  email: Joi.string().required(),
  especialidad: Joi.string().required(),
  rol: Joi.string().required(),
  fechaNacimiento: Joi.string().required(),
});

const uploads = multer({ storage });
router.get("/medical/list/:page/:limit", async (req, res) => {
  try {
    const page = parseInt(req.params.page || 1);
    const limit = parseInt(req.params.limit || 10);
    const response = await getAll(limit, page);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de medicos" });
  }
});


router.get("/medical/image/:file", async (req, res) => {
  const { file } = req.params;
  try {
    const filepath = path.resolve("./src/uploads/medicos", file);

    fs.stat(filepath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({
          status: false,
          message: `No existe la imagen: ${file}`,
        });
      }

      res.sendFile(filepath);
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
});
router.get("/medical/searchById:id", async (req, res) => {
  try {
    const data = req.params.id;
    const response = await searchById(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la informacion" });
  }
});
router.post(
  "/medical/create",
  uploads.single("foto"),
  celebrate({
    body: schema,
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const file = req.file;
      if (!file) {
        return res
          .status(400)
          .json({ message: "No se ha subido ninguna imagen" });
      }
      const response = await add(data, file);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: `Error al Registrar el Medicamento`,
        error: `${error}`,
      });
    }
  }
);
router.put(
  "/medical/update/:id",
  uploads.single("foto"),
  celebrate({
    body: schema,
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const file = req.file;
      const id = req.params.id;

      if (!file) {
        return res
          .status(400)
          .json({ message: "No se ha subido ninguna imagen" });
      }
      const response = await updateMedical(data, file, id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar" });
    }
  }
);
router.post(
  "/medical/delet",
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

router.use(errors());
export default router;
