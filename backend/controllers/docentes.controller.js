


const db = require("../config/db");

// LISTAR
const obtenerDocentes = (req, res) => {
  db.query(
    `SELECT 
      d.id_docente,
      d.codigo_docente,
      d.telefono,
      d.direccion_correo_laboral,
      d.prioridad,
      d.estado,
      u.nombres,
      u.apellidos,
      u.nombre_usuario
     FROM docente d
     INNER JOIN usuario u
       ON d.id_usuario = u.id_usuario
     ORDER BY d.id_docente DESC`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearDocente = (req, res) => {
  const {
    id_usuario,
    codigo_docente,
    telefono,
    direccion_correo_laboral,
    prioridad
  } = req.body;

  db.query(
    `INSERT INTO docente
    (
      id_usuario,
      codigo_docente,
      telefono,
      direccion_correo_laboral,
      prioridad
    )
    VALUES (?,?,?,?,?)`,
    [
      id_usuario,
      codigo_docente,
      telefono,
      direccion_correo_laboral,
      prioridad
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Docente creado"
      });
    }
  );
};

// EDITAR
const editarDocente = (req, res) => {
  const { id } = req.params;

  const {
    codigo_docente,
    telefono,
    direccion_correo_laboral,
    prioridad,
    estado
  } = req.body;

  db.query(
    `UPDATE docente
     SET codigo_docente=?,
         telefono=?,
         direccion_correo_laboral=?,
         prioridad=?,
         estado=?
     WHERE id_docente=?`,
    [
      codigo_docente,
      telefono,
      direccion_correo_laboral,
      prioridad,
      estado,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Docente actualizado"
      });
    }
  );
};

// ELIMINAR LÓGICO
const eliminarDocente = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE docente
     SET estado='inactivo'
     WHERE id_docente=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Docente desactivado"
      });
    }
  );
};

module.exports = {
  obtenerDocentes,
  crearDocente,
  editarDocente,
  eliminarDocente
};

