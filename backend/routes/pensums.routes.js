


const express = require("express");
const router = express.Router();

const {
  obtenerPensums,
  crearPensum,
  editarPensum,
  eliminarPensum
} = require("../controllers/pensums.controller");

router.get("/", obtenerPensums);
router.post("/", crearPensum);
router.put("/:id", editarPensum);
router.delete("/:id", eliminarPensum);

module.exports = router;