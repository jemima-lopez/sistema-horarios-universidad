


import { useEffect, useState } from "react";
import {
  User,
  Search,
  PlusCircle,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

export default function Docentes() {
  const API = "http://localhost:5000/api/docentes";

  const [docentes, setDocentes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    id_usuario: "",
    codigo_docente: "",
    telefono: "",
    direccion_correo_laboral: "",
    prioridad: 1,
    estado: "activo",
  });

  const cargarTodo = async () => {
    const r1 = await fetch(API);
    const d1 = await r1.json();
    setDocentes(d1);

    const r2 = await fetch("http://localhost:5000/api/usuarios");
    const d2 = await r2.json();
    setUsuarios(d2);
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const limpiar = () => {
    setForm({
      id_usuario: "",
      codigo_docente: "",
      telefono: "",
      direccion_correo_laboral: "",
      prioridad: 1,
      estado: "activo",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    const url = editando ? `${API}/${idEditar}` : API;

    await fetch(url, {
      method: editando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    limpiar();
    cargarTodo();
  };

  const editar = (item) => {
    setEditando(true);
    setIdEditar(item.id_docente);

    setForm({
      id_usuario: item.id_usuario,
      codigo_docente: item.codigo_docente,
      telefono: item.telefono,
      direccion_correo_laboral: item.direccion_correo_laboral,
      prioridad: item.prioridad,
      estado: item.estado,
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Desactivar docente?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarTodo();
  };

  const filtrados = docentes.filter((d) =>
    `${d.nombres} ${d.apellidos} ${d.codigo_docente}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-md flex items-center gap-4">
        <User className="text-indigo-600" size={34} />
        <div>
          <h2 className="text-3xl font-bold">Docentes</h2>
          <p className="text-slate-500">
            Gestión de profesores del sistema
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white p-6 rounded-3xl shadow-md grid md:grid-cols-2 gap-4"
      >
        <select
          className="border p-3 rounded-2xl"
          value={form.id_usuario}
          onChange={(e) =>
            setForm({ ...form, id_usuario: e.target.value })
          }
          required
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((u) => (
            <option key={u.id_usuario} value={u.id_usuario}>
              {u.nombres} {u.apellidos}
            </option>
          ))}
        </select>

        <input
          className="border p-3 rounded-2xl"
          placeholder="Código docente"
          value={form.codigo_docente}
          onChange={(e) =>
            setForm({ ...form, codigo_docente: e.target.value })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) =>
            setForm({ ...form, telefono: e.target.value })
          }
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Correo laboral"
          value={form.direccion_correo_laboral}
          onChange={(e) =>
            setForm({
              ...form,
              direccion_correo_laboral: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-3 rounded-2xl"
          placeholder="Prioridad"
          value={form.prioridad}
          onChange={(e) =>
            setForm({ ...form, prioridad: e.target.value })
          }
        />

        <select
          className="border p-3 rounded-2xl"
          value={form.estado}
          onChange={(e) =>
            setForm({ ...form, estado: e.target.value })
          }
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-indigo-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? <Save size={18} /> : <PlusCircle size={18} />}
            {editando ? "Actualizar" : "Crear"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={limpiar}
              className="bg-gray-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <X size={18} />
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Buscador */}
      <div className="bg-white p-4 rounded-3xl shadow-md flex gap-3">
        <Search size={20} />
        <input
          className="w-full outline-none"
          placeholder="Buscar docente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Docente</th>
              <th className="p-4">Código</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Prioridad</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((d) => (
              <tr key={d.id_docente} className="border-t">
                <td className="p-4 font-semibold">
                  {d.nombres} {d.apellidos}
                </td>

                <td className="p-4">{d.codigo_docente}</td>
                <td className="p-4">{d.telefono}</td>

                <td className="p-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {d.prioridad}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      d.estado === "activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {d.estado}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => editar(d)}
                      className="bg-amber-500 text-white p-2 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => eliminar(d.id_docente)}
                      className="bg-red-600 text-white p-2 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-slate-500">
                  No hay docentes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
