


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

export default function Cursos() {
  const API = "http://localhost:5000/api/cursos";

  const [cursos, setCursos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    codigo_curso: "",
    nombre_curso: "",
    estado: "activo",
  });

  const cargarCursos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCursos(data);
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const limpiar = () => {
    setForm({
      codigo_curso: "",
      nombre_curso: "",
      estado: "activo",
    });

    setEditando(false);
    setIdEditar(null);
  };

  const guardar = async (e) => {
    e.preventDefault();

    const options = {
      method: editando ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const url = editando
      ? `${API}/${idEditar}`
      : API;

    await fetch(url, options);

    limpiar();
    cargarCursos();
  };

  const editar = (item) => {
    setEditando(true);
    setIdEditar(item.id_curso);

    setForm({
      codigo_curso: item.codigo_curso,
      nombre_curso: item.nombre_curso,
      estado: item.estado,
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Desactivar curso?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarCursos();
  };

  const filtrados = cursos.filter((c) =>
    `${c.codigo_curso} ${c.nombre_curso}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <BookOpen
          className="text-indigo-600"
          size={34}
        />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Gestión de Cursos
          </h2>

          <p className="text-slate-500">
            Catálogo académico institucional
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
          placeholder="Código curso"
          value={form.codigo_curso}
          onChange={(e) =>
            setForm({
              ...form,
              codigo_curso: e.target.value,
            })
          }
          required
        />

        <select
          className="border p-3 rounded-2xl"
          value={form.estado}
          onChange={(e) =>
            setForm({
              ...form,
              estado: e.target.value,
            })
          }
        >
          <option value="activo">
            Activo
          </option>
          <option value="inactivo">
            Inactivo
          </option>
        </select>

        <input
          className="border p-3 rounded-2xl md:col-span-2"
          placeholder="Nombre curso"
          value={form.nombre_curso}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_curso: e.target.value,
            })
          }
          required
        />

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? (
              <Save size={18} />
            ) : (
              <PlusCircle size={18} />
            )}

            {editando
              ? "Actualizar"
              : "Crear Curso"}
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
        <Search
          className="text-slate-400"
          size={20}
        />

        <input
          className="w-full outline-none"
          placeholder="Buscar curso..."
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
              <th className="p-4 text-left">
                Código
              </th>
              <th className="p-4 text-left">
                Curso
              </th>
              <th className="p-4 text-left">
                Estado
              </th>
              <th className="p-4 text-center">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((item) => (
              <tr
                key={item.id_curso}
                className="border-t"
              >
                <td className="p-4 font-semibold">
                  {item.codigo_curso}
                </td>

                <td className="p-4">
                  {item.nombre_curso}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.estado === "activo"
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
                      onClick={() =>
                        editar(item)
                      }
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        eliminar(
                          item.id_curso
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-8 text-slate-500"
                >
                  No hay cursos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

