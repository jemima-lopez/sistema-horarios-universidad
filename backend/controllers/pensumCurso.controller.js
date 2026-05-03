


const db = require("../config/db");

// LISTAR
const obtenerPensumCursos = (req, res) => {
  db.query(
    `SELECT 
      pc.id_pensum_curso,
      pc.ciclo_semestre,
      pc.estado,
      p.nombre_pensum,
      c.nombre_curso,
      c.codigo_curso
     FROM pensum_curso pc
     INNER JOIN pensum p
       ON pc.id_pensum = p.id_pensum
     INNER JOIN curso c
       ON pc.id_curso = c.id_curso
     ORDER BY pc.ciclo_semestre ASC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearPensumCurso = (req, res) => {
  const {
    id_pensum,
    id_curso,
    ciclo_semestre
  } = req.body;

  db.query(
    `INSERT INTO pensum_curso
    (id_pensum,id_curso,ciclo_semestre)
    VALUES (?,?,?)`,
    [
      id_pensum,
      id_curso,
      ciclo_semestre
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Curso agregado al pensum"
      });
    }
  );
};

// ELIMINAR
const eliminarPensumCurso = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE pensum_curso
     SET estado='inactivo'
     WHERE id_pensum_curso=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Registro desactivado"
      });
    }
  );
};

module.exports = {
  obtenerPensumCursos,
  crearPensumCurso,
  eliminarPensumCurso
};

