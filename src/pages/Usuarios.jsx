

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Pencil,
  UserPlus,
  UserX,
  Save,
  X,
} from "lucide-react";

export default function Usuarios() {
  const api = "http://localhost:5000/api/usuarios";

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    nombre_usuario: "",
    correo_electronico: "",
    password: "",
  });

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarUsuarios = async () => {
    const res = await fetch(api);
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const limpiarForm = () => {
    setForm({
      nombres: "",
      apellidos: "",
      nombre_usuario: "",
      correo_electronico: "",
      password: "",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await fetch(`${api}/${idEditar}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    }

    limpiarForm();
    cargarUsuarios();
  };

  const editar = (u) => {
    setForm({
      nombres: u.nombres,
      apellidos: u.apellidos,
      nombre_usuario: u.nombre_usuario,
      correo_electronico: u.correo_electronico,
      password: "",
    });

    setEditando(true);
    setIdEditar(u.id_usuario);
  };

  const desactivar = async (id) => {
    if (!confirm("¿Deseas desactivar este usuario?")) return;

    await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    cargarUsuarios();
  };

  const filtrados = usuarios.filter((u) =>
    `${u.nombres} ${u.apellidos} ${u.nombre_usuario}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="text-blue-600" size={30} />
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Gestión de Usuarios
            </h2>
            <p className="text-slate-500">
              Crear, editar y administrar accesos
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white rounded-3xl shadow-md p-6 grid md:grid-cols-2 gap-4"
      >
        <input
          className="border p-3 rounded-2xl"
          placeholder="Nombres"
          value={form.nombres}
          onChange={(e) =>
            setForm({ ...form, nombres: e.target.value })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={(e) =>
            setForm({ ...form, apellidos: e.target.value })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Usuario"
          value={form.nombre_usuario}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_usuario: e.target.value,
            })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Correo"
          value={form.correo_electronico}
          onChange={(e) =>
            setForm({
              ...form,
              correo_electronico: e.target.value,
            })
          }
          required
        />

        {!editando && (
          <input
            type="password"
            className="border p-3 rounded-2xl md:col-span-2"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />
        )}

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? <Save size={18} /> : <UserPlus size={18} />}
            {editando ? "Actualizar" : "Crear Usuario"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={limpiarForm}
              className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <X size={18} />
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Buscador */}
      <div className="bg-white rounded-3xl shadow-md p-4 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />

        <input
          className="w-full outline-none"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Usuario</th>
              <th className="p-4 text-left">Correo</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((u) => (
              <tr key={u.id_usuario} className="border-t">
                <td className="p-4">
                  {u.nombres} {u.apellidos}
                </td>

                <td className="p-4">{u.nombre_usuario}</td>

                <td className="p-4">{u.correo_electronico}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      u.estado === "activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.estado}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => editar(u)}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        desactivar(u.id_usuario)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl"
                    >
                      <UserX size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-slate-500"
                >
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}