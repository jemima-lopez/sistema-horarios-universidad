



const db = require("../config/db");
const bcrypt = require("bcryptjs");

// LISTAR
const obtenerUsuarios = (req, res) => {
  db.query(
    `SELECT 
      id_usuario,
      nombres,
      apellidos,
      nombre_usuario,
      correo_electronico,
      estado
     FROM usuario`,
    (error, results) => {
      if (error) return res.status(500).json(error);
      res.json(results);
    }
  );
};

// CREAR
const crearUsuario = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      nombre_usuario,
      correo_electronico,
      password
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO usuario (
        nombres,
        apellidos,
        nombre_usuario,
        correo_electronico,
        password_hash,
        pregunta_seguridad,
        respuesta_seguridad_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombres,
        apellidos,
        nombre_usuario,
        correo_electronico,
        hash,
        "Color favorito",
        "respuesta_hash"
      ],
      (error) => {
        if (error) return res.status(500).json(error);

        res.json({
          ok: true,
          msg: "Usuario creado"
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// ELIMINAR (soft delete)
const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE usuario SET estado='inactivo' WHERE id_usuario=?`,
    [id],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Usuario desactivado"
      });
    }
  );
};

// EDITAR
const editarUsuario = (req, res) => {
  const { id } = req.params;

  const {
    nombres,
    apellidos,
    nombre_usuario,
    correo_electronico
  } = req.body;

  db.query(
    `UPDATE usuario
     SET nombres=?,
         apellidos=?,
         nombre_usuario=?,
         correo_electronico=?
     WHERE id_usuario=?`,
    [
      nombres,
      apellidos,
      nombre_usuario,
      correo_electronico,
      id
    ],
    (error) => {
      if (error) return res.status(500).json(error);

      res.json({
        ok: true,
        msg: "Usuario actualizado"
      });
    }
  );
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario
};
