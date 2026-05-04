


const express = require("express");
const router = express.Router();

const {
  obtenerDisponibilidad,
  crearDisponibilidad,
  eliminarDisponibilidad,
} = require("../controllers/disponibilidad.controller");

router.get("/", obtenerDisponibilidad);
router.post("/", crearDisponibilidad);
router.delete("/:id", eliminarDisponibilidad);

module.exports = router;

