


const express = require("express");
const router = express.Router();

const {
  obtenerCursos,
  crearCurso,
  editarCurso,
  eliminarCurso
} = require("../controllers/cursos.controller");

router.get("/", obtenerCursos);
router.post("/", crearCurso);
router.put("/:id", editarCurso);
router.delete("/:id", eliminarCurso);

module.exports = router;

