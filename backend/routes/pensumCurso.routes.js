


const express = require("express");
const router = express.Router();

const {
  obtenerPensumCursos,
  crearPensumCurso,
  eliminarPensumCurso
} = require("../controllers/pensumCurso.controller");

router.get("/", obtenerPensumCursos);
router.post("/", crearPensumCurso);
router.delete("/:id", eliminarPensumCurso);

module.exports = router;

