

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Todos los campos son obligatorios"
    });
  }

  const sql = `
    SELECT u.id_usuario, u.nombres, u.apellidos, u.nombre_usuario,
           u.password_hash, u.estado,
           r.nombre_rol
    FROM usuario u
    JOIN usuario_rol ur ON ur.id_usuario = u.id_usuario
    JOIN rol r ON r.id_rol = ur.id_rol
    WHERE u.nombre_usuario = ?
    LIMIT 1
  `;

  db.query(sql, [usuario], async (error, results) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        msg: "Error del servidor",
        error
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario no encontrado"
      });
    }

    const user = results[0];

    if (user.estado !== "activo") {
      return res.status(403).json({
        ok: false,
        msg: "Usuario inactivo o bloqueado"
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        ok: false,
        msg: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: user.id_usuario,
        usuario: user.nombre_usuario,
        rol: user.nombre_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      ok: true,
      msg: "Login exitoso",
      token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombres,
        apellido: user.apellidos,
        rol: user.nombre_rol
      }
    });
  });
};

module.exports = { login };