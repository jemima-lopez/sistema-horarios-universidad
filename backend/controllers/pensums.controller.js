


const db = require("../config/db");

// LISTAR
const obtenerPensums = (req, res) => {
  db.query(
    `SELECT 
      p.id_pensum,
      p.nombre_pensum,
      p.codigo_pensum,
      p.estado,
      c.nombre_carrera,
      pa.nombre_periodo
     FROM pensum p
     INNER JOIN carrera c
       ON p.id_carrera = c.id_carrera
     INNER JOIN periodo_academico pa
       ON p.id_periodo_academico = pa.id_periodo_academico
     ORDER BY p.id_pensum DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearPensum = (req, res) => {
  const {
    id_carrera,
    id_periodo_academico,
    nombre_pensum,
    codigo_pensum,
    descripcion
  } = req.body;

  db.query(
    `INSERT INTO pensum
    (id_carrera,id_periodo_academico,nombre_pensum,codigo_pensum,descripcion)
    VALUES (?,?,?,?,?)`,
    [
      id_carrera,
      id_periodo_academico,
      nombre_pensum,
      codigo_pensum,
      descripcion
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Pensum creado"
      });
    }
  );
};

// EDITAR
const editarPensum = (req, res) => {
  const { id } = req.params;

  const {
    id_carrera,
    id_periodo_academico,
    nombre_pensum,
    codigo_pensum,
    descripcion
  } = req.body;

  db.query(
    `UPDATE pensum
     SET id_carrera=?,
         id_periodo_academico=?,
         nombre_pensum=?,
         codigo_pensum=?,
         descripcion=?
     WHERE id_pensum=?`,
    [
      id_carrera,
      id_periodo_academico,
      nombre_pensum,
      codigo_pensum,
      descripcion,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Pensum actualizado"
      });
    }
  );
};

// ELIMINAR LOGICO
const eliminarPensum = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE pensum
     SET estado='inactivo'
     WHERE id_pensum=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Pensum desactivado"
      });
    }
  );
};

module.exports = {
  obtenerPensums,
  crearPensum,
  editarPensum,
  eliminarPensum
};