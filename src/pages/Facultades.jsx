


import { useEffect, useState } from "react";
import {
  GraduationCap,
  Search,
  Pencil,
  Trash2,
  Save,
  X,
  PlusCircle,
} from "lucide-react";

export default function Facultades() {
  const api = "http://localhost:5000/api/facultades";

  const [facultades, setFacultades] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    nombre_facultad: "",
    codigo_facultad: "",
    descripcion: "",
  });

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarFacultades = async () => {
    const res = await fetch(api);
    const data = await res.json();
    setFacultades(data);
  };

  useEffect(() => {
    cargarFacultades();
  }, []);

  const limpiar = () => {
    setForm({
      nombre_facultad: "",
      codigo_facultad: "",
      descripcion: "",
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

    limpiar();
    cargarFacultades();
  };

  const editar = (f) => {
    setForm({
      nombre_facultad: f.nombre_facultad,
      codigo_facultad: f.codigo_facultad || "",
      descripcion: f.descripcion || "",
    });

    setEditando(true);
    setIdEditar(f.id_facultad);
  };

  const eliminar = async (id) => {
    if (!confirm("¿Deseas desactivar esta facultad?")) return;

    await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    cargarFacultades();
  };

  const filtradas = facultades.filter((f) =>
    `${f.nombre_facultad} ${f.codigo_facultad}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <GraduationCap className="text-indigo-600" size={34} />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Gestión de Facultades
          </h2>

          <p className="text-slate-500">
            Administra las facultades universitarias
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white rounded-3xl shadow-md p-6 grid md:grid-cols-2 gap-4"
      >
        <input
          className="border p-3 rounded-2xl"
          placeholder="Nombre de Facultad"
          value={form.nombre_facultad}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_facultad: e.target.value,
            })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Código"
          value={form.codigo_facultad}
          onChange={(e) =>
            setForm({
              ...form,
              codigo_facultad: e.target.value,
            })
          }
        />

        <textarea
          className="border p-3 rounded-2xl md:col-span-2"
          placeholder="Descripción"
          rows="3"
          value={form.descripcion}
          onChange={(e) =>
            setForm({
              ...form,
              descripcion: e.target.value,
            })
          }
        />

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? <Save size={18} /> : <PlusCircle size={18} />}
            {editando ? "Actualizar" : "Crear Facultad"}
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
          placeholder="Buscar facultad..."
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
              <th className="p-4 text-left">Código</th>
              <th className="p-4 text-left">Descripción</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((f) => (
              <tr key={f.id_facultad} className="border-t">
                <td className="p-4 font-medium">
                  {f.nombre_facultad}
                </td>

                <td className="p-4">
                  {f.codigo_facultad || "-"}
                </td>

                <td className="p-4">
                  {f.descripcion || "-"}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      f.estado === "activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.estado}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => editar(f)}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        eliminar(f.id_facultad)
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
                  No hay facultades registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

