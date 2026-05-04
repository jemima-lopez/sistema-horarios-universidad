


const express = require("express");
const router = express.Router();

const {
  obtenerAsignaciones,
  crearAsignacion,
  eliminarAsignacion,
} = require("../controllers/asignacion.controller");

router.get("/", obtenerAsignaciones);
router.post("/", crearAsignacion);
router.delete("/:id", eliminarAsignacion);

module.exports = router;
