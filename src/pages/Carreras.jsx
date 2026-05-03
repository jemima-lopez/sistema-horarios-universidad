


import { useEffect, useState } from "react";
import {
  BookOpen,
  Search,
  PlusCircle,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

export default function Carreras() {
  const API = "http://localhost:5000/api/carreras";
  const API_FACULTADES = "http://localhost:5000/api/facultades";

  const [carreras, setCarreras] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    id_facultad: "",
    nombre_carrera: "",
    codigo_carrera: "",
  });

  const cargarCarreras = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCarreras(data);
  };

  const cargarFacultades = async () => {
    const res = await fetch(API_FACULTADES);
    const data = await res.json();
    setFacultades(data);
  };

  useEffect(() => {
    cargarCarreras();
    cargarFacultades();
  }, []);

  const limpiar = () => {
    setForm({
      id_facultad: "",
      nombre_carrera: "",
      codigo_carrera: "",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    const options = {
      method: editando ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };

    const url = editando
      ? `${API}/${idEditar}`
      : API;

    await fetch(url, options);

    limpiar();
    cargarCarreras();
  };

  const editar = (item) => {
    setEditando(true);
    setIdEditar(item.id_carrera);

    setForm({
      id_facultad: item.id_facultad || "",
      nombre_carrera: item.nombre_carrera,
      codigo_carrera: item.codigo_carrera,
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Deseas desactivar esta carrera?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarCarreras();
  };

  const filtradas = carreras.filter((item) =>
    `${item.nombre_carrera} ${item.codigo_carrera} ${item.nombre_facultad}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <BookOpen className="text-indigo-600" size={34} />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Gestión de Carreras
          </h2>

          <p className="text-slate-500">
            Administra carreras universitarias
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white rounded-3xl shadow-md p-6 grid md:grid-cols-2 gap-4"
      >
        <select
          className="border p-3 rounded-2xl"
          value={form.id_facultad}
          onChange={(e) =>
            setForm({
              ...form,
              id_facultad: e.target.value,
            })
          }
          required
        >
          <option value="">Seleccione facultad</option>

          {facultades.map((f) => (
            <option
              key={f.id_facultad}
              value={f.id_facultad}
            >
              {f.nombre_facultad}
            </option>
          ))}
        </select>

        <input
          className="border p-3 rounded-2xl"
          placeholder="Código carrera"
          value={form.codigo_carrera}
          onChange={(e) =>
            setForm({
              ...form,
              codigo_carrera: e.target.value,
            })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl md:col-span-2"
          placeholder="Nombre carrera"
          value={form.nombre_carrera}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_carrera: e.target.value,
            })
          }
          required
        />

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? <Save size={18} /> : <PlusCircle size={18} />}
            {editando ? "Actualizar" : "Crear Carrera"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={limpiar}
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
          placeholder="Buscar carrera..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Código</th>
              <th className="p-4 text-left">Carrera</th>
              <th className="p-4 text-left">Facultad</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((item) => (
              <tr
                key={item.id_carrera}
                className="border-t"
              >
                <td className="p-4 font-semibold">
                  {item.codigo_carrera}
                </td>

                <td className="p-4">
                  {item.nombre_carrera}
                </td>

                <td className="p-4">
                  {item.nombre_facultad}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.estado === "activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.estado}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => editar(item)}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        eliminar(item.id_carrera)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtradas.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-slate-500"
                >
                  No hay carreras registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

