


const express = require("express");
const router = express.Router();

const {
  obtenerFacultades,
  crearFacultad,
  editarFacultad,
  eliminarFacultad
} = require("../controllers/facultades.controller");

router.get("/", obtenerFacultades);
router.post("/", crearFacultad);
router.put("/:id", editarFacultad);
router.delete("/:id", eliminarFacultad);

module.exports = router;