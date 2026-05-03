


const db = require("../config/db");

// LISTAR
const obtenerCursos = (req, res) => {
  db.query(
    `SELECT *
     FROM curso
     ORDER BY id_curso DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearCurso = (req, res) => {
  const { codigo_curso, nombre_curso } = req.body;

  db.query(
    `INSERT INTO curso
    (codigo_curso,nombre_curso)
    VALUES (?,?)`,
    [codigo_curso, nombre_curso],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Curso creado"
      });
    }
  );
};

// EDITAR
const editarCurso = (req, res) => {
  const { id } = req.params;
  const {
    codigo_curso,
    nombre_curso,
    estado
  } = req.body;

  db.query(
    `UPDATE curso
     SET codigo_curso=?,
         nombre_curso=?,
         estado=?
     WHERE id_curso=?`,
    [
      codigo_curso,
      nombre_curso,
      estado,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Curso actualizado"
      });
    }
  );
};

// ELIMINAR LOGICO
const eliminarCurso = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE curso
     SET estado='inactivo'
     WHERE id_curso=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Curso desactivado"
      });
    }
  );
};

module.exports = {
  obtenerCursos,
  crearCurso,
  editarCurso,
  eliminarCurso
};

