


const express = require("express");
const router = express.Router();

const {
  obtenerPeriodos,
  crearPeriodo,
  editarPeriodo,
  eliminarPeriodo
} = require("../controllers/periodos.controller");

router.get("/", obtenerPeriodos);
router.post("/", crearPeriodo);
router.put("/:id", editarPeriodo);
router.delete("/:id", eliminarPeriodo);

module.exports = router;

