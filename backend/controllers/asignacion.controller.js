

const db = require("../config/db");

// ===============================
// 🔎 LISTAR ASIGNACIONES
// ===============================
const obtenerAsignaciones = (req, res) => {
  const sql = `
    SELECT 
      ac.id_asignacion_docente_curso,
      u.nombres,
      u.apellidos,
      c.nombre_curso,
      s.numero_seccion AS nombre_seccion,
      s.jornada

    FROM asignacion_docente_curso ac

    INNER JOIN docente d 
      ON ac.id_docente = d.id_docente

    INNER JOIN usuario u 
      ON d.id_usuario = u.id_usuario

    INNER JOIN curso c 
      ON ac.id_curso = c.id_curso

    INNER JOIN seccion s 
      ON ac.id_seccion = s.id_seccion
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("❌ Error en obtenerAsignaciones:", error);
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener asignaciones",
        error: error.sqlMessage
      });
    }

    // 🔥 SIEMPRE devolver array
    res.json(results || []);
  });
};

// ===============================
// ➕ CREAR ASIGNACIÓN
// ===============================
const crearAsignacion = (req, res) => {
  const {
    id_docente,
    id_curso,
    id_seccion
  } = req.body;

  // 🔒 Validación básica
  if (!id_docente || !id_curso || !id_seccion) {
    return res.status(400).json({
      ok: false,
      msg: "Todos los campos son obligatorios"
    });
  }

  // 🔍 Validar duplicado
  const sqlCheck = `
    SELECT * FROM asignacion_docente_curso
    WHERE id_docente = ? AND id_curso = ? AND id_seccion = ?
  `;

  db.query(sqlCheck, [id_docente, id_curso, id_seccion], (err, rows) => {
    if (err) {
      console.error("❌ Error en validación:", err);
      return res.status(500).json({
        ok: false,
        msg: "Error validando asignación",
        error: err.sqlMessage
      });
    }

    if (rows.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "Esta asignación ya existe"
      });
    }

    // 💾 Insertar
    const sqlInsert = `
      INSERT INTO asignacion_docente_curso
      (id_docente, id_curso, id_seccion)
      VALUES (?, ?, ?)
    `;

    db.query(sqlInsert, [id_docente, id_curso, id_seccion], (error, result) => {
      if (error) {
        console.error("❌ Error al crear asignación:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error al crear asignación",
          error: error.sqlMessage
        });
      }

      res.json({
        ok: true,
        msg: "Asignación creada correctamente",
        id: result.insertId
      });
    });
  });
};

// ===============================
// ❌ ELIMINAR ASIGNACIÓN
// ===============================
const eliminarAsignacion = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      ok: false,
      msg: "ID requerido"
    });
  }

  const sql = `
    DELETE FROM asignacion_docente_curso
    WHERE id_asignacion_docente_curso = ?
  `;

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("❌ Error al eliminar:", error);
      return res.status(500).json({
        ok: false,
        msg: "Error al eliminar asignación",
        error: error.sqlMessage
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        msg: "Asignación no encontrada"
      });
    }

    res.json({
      ok: true,
      msg: "Asignación eliminada"
    });
  });
};

module.exports = {
  obtenerAsignaciones,
  crearAsignacion,
  eliminarAsignacion
};

