


const db = require("../config/db");

// LISTAR
const obtenerFacultades = (req, res) => {
  db.query(
    `SELECT * FROM facultad ORDER BY id_facultad DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearFacultad = (req, res) => {
  const { nombre_facultad, codigo_facultad, descripcion } = req.body;

  db.query(
    `INSERT INTO facultad
    (nombre_facultad, codigo_facultad, descripcion)
    VALUES (?, ?, ?)`,
    [nombre_facultad, codigo_facultad, descripcion],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Facultad creada"
      });
    }
  );
};

// EDITAR
const editarFacultad = (req, res) => {
  const { id } = req.params;
  const { nombre_facultad, codigo_facultad, descripcion } = req.body;

  db.query(
    `UPDATE facultad
     SET nombre_facultad=?,
         codigo_facultad=?,
         descripcion=?
     WHERE id_facultad=?`,
    [nombre_facultad, codigo_facultad, descripcion, id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Facultad actualizada"
      });
    }
  );
};

// ELIMINAR LÓGICO
const eliminarFacultad = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE facultad
     SET estado='inactiva'
     WHERE id_facultad=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Facultad desactivada"
      });
    }
  );
};

module.exports = {
  obtenerFacultades,
  crearFacultad,
  editarFacultad,
  eliminarFacultad
};

