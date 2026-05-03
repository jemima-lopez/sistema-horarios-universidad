


const express = require("express");
const router = express.Router();

const {
  obtenerCarreras,
  crearCarrera,
  editarCarrera,
  eliminarCarrera
} = require("../controllers/carreras.controller");

router.get("/", obtenerCarreras);
router.post("/", crearCarrera);
router.put("/:id", editarCarrera);
router.delete("/:id", eliminarCarrera);

module.exports = router;

