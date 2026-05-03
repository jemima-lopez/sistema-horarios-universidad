


const db = require("../config/db");

// LISTAR
const obtenerCarreras = (req, res) => {
  db.query(
    `SELECT 
      c.id_carrera,
      c.nombre_carrera,
      c.codigo_carrera,
      c.estado,
      f.nombre_facultad
     FROM carrera c
     INNER JOIN facultad f
       ON c.id_facultad = f.id_facultad
     ORDER BY c.id_carrera DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearCarrera = (req, res) => {
  const {
    id_facultad,
    nombre_carrera,
    codigo_carrera
  } = req.body;

  db.query(
    `INSERT INTO carrera
    (id_facultad, nombre_carrera, codigo_carrera)
    VALUES (?, ?, ?)`,
    [id_facultad, nombre_carrera, codigo_carrera],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Carrera creada"
      });
    }
  );
};

// EDITAR
const editarCarrera = (req, res) => {
  const { id } = req.params;

  const {
    id_facultad,
    nombre_carrera,
    codigo_carrera
  } = req.body;

  db.query(
    `UPDATE carrera
     SET id_facultad=?,
         nombre_carrera=?,
         codigo_carrera=?
     WHERE id_carrera=?`,
    [
      id_facultad,
      nombre_carrera,
      codigo_carrera,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Carrera actualizada"
      });
    }
  );
};

// ELIMINAR LÓGICO
const eliminarCarrera = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE carrera
     SET estado='inactiva'
     WHERE id_carrera=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Carrera desactivada"
      });
    }
  );
};

module.exports = {
  obtenerCarreras,
  crearCarrera,
  editarCarrera,
  eliminarCarrera
};
