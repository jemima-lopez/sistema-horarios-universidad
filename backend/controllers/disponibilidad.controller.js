


const db = require("../config/db");

// LISTAR
const obtenerDisponibilidad = (req, res) => {
  db.query(
    `SELECT 
      dd.id_disponibilidad_docente,
      d.id_docente,
      u.nombres,
      u.apellidos,
      dia.nombre_dia,
      bh.hora_inicio,
      bh.hora_fin,
      dd.estado
     FROM disponibilidad_docente dd
     INNER JOIN docente d ON dd.id_docente = d.id_docente
     INNER JOIN usuario u ON d.id_usuario = u.id_usuario
     INNER JOIN bloque_horario bh ON dd.id_bloque_horario = bh.id_bloque_horario
     INNER JOIN dia ON bh.id_dia = dia.id_dia`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR (marcar NO disponible)
const crearDisponibilidad = (req, res) => {
  const { id_docente, id_bloque_horario } = req.body;

  db.query(
    `INSERT INTO disponibilidad_docente
     (id_docente, id_bloque_horario, tipo_disponibilidad)
     VALUES (?,?, 'no_disponible')`,
    [id_docente, id_bloque_horario],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Bloque bloqueado para el docente",
      });
    }
  );
};

// ELIMINAR
const eliminarDisponibilidad = (req, res) => {
  const { id } = req.params;

  db.query(
    `DELETE FROM disponibilidad_docente WHERE id_disponibilidad_docente=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Disponibilidad eliminada",
      });
    }
  );
};

module.exports = {
  obtenerDisponibilidad,
  crearDisponibilidad,
  eliminarDisponibilidad,
};

