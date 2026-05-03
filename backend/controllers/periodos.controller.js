


const db = require("../config/db");

// LISTAR
const obtenerPeriodos = (req, res) => {
  db.query(
    `SELECT *
     FROM periodo_academico
     ORDER BY id_periodo_academico DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearPeriodo = (req, res) => {
  const {
    nombre_periodo,
    anio,
    numero_periodo,
    fecha_inicio,
    fecha_fin,
    fecha_limite_edicion_horarios
  } = req.body;

  db.query(
    `INSERT INTO periodo_academico
    (
      nombre_periodo,
      anio,
      numero_periodo,
      fecha_inicio,
      fecha_fin,
      fecha_limite_edicion_horarios
    )
    VALUES (?,?,?,?,?,?)`,
    [
      nombre_periodo,
      anio,
      numero_periodo,
      fecha_inicio,
      fecha_fin,
      fecha_limite_edicion_horarios
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Periodo creado"
      });
    }
  );
};

// EDITAR
const editarPeriodo = (req, res) => {
  const { id } = req.params;

  const {
    nombre_periodo,
    anio,
    numero_periodo,
    fecha_inicio,
    fecha_fin,
    fecha_limite_edicion_horarios,
    estado,
    es_vigente
  } = req.body;

  db.query(
    `UPDATE periodo_academico
     SET nombre_periodo=?,
         anio=?,
         numero_periodo=?,
         fecha_inicio=?,
         fecha_fin=?,
         fecha_limite_edicion_horarios=?,
         estado=?,
         es_vigente=?
     WHERE id_periodo_academico=?`,
    [
      nombre_periodo,
      anio,
      numero_periodo,
      fecha_inicio,
      fecha_fin,
      fecha_limite_edicion_horarios,
      estado,
      es_vigente,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Periodo actualizado"
      });
    }
  );
};

// ELIMINAR LÓGICO
const eliminarPeriodo = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE periodo_academico
     SET estado='cerrado'
     WHERE id_periodo_academico=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Periodo cerrado"
      });
    }
  );
};

module.exports = {
  obtenerPeriodos,
  crearPeriodo,
  editarPeriodo,
  eliminarPeriodo
};

