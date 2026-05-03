


const express = require("express");
const router = express.Router();

const {
  obtenerDocentes,
  crearDocente,
  editarDocente,
  eliminarDocente
} = require("../controllers/docentes.controller");

router.get("/", obtenerDocentes);
router.post("/", crearDocente);
router.put("/:id", editarDocente);
router.delete("/:id", eliminarDocente);

module.exports = router;

