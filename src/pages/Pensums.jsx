



import { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  PlusCircle,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

export default function Pensums() {
  const API = "http://localhost:5000/api/pensums";
  const API_CARRERAS = "http://localhost:5000/api/carreras";
  const API_PERIODOS = "http://localhost:5000/api/periodos";

  const [pensums, setPensums] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    id_carrera: "",
    id_periodo_academico: "",
    nombre_pensum: "",
    codigo_pensum: "",
    descripcion: "",
  });

  const cargarPensums = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPensums(data);
  };

  const cargarCarreras = async () => {
    const res = await fetch(API_CARRERAS);
    const data = await res.json();
    setCarreras(data);
  };

  const cargarPeriodos = async () => {
    const res = await fetch(API_PERIODOS);
    const data = await res.json();
    setPeriodos(data);
  };

  useEffect(() => {
    cargarPensums();
    cargarCarreras();
    cargarPeriodos();
  }, []);

  const limpiar = () => {
    setForm({
      id_carrera: "",
      id_periodo_academico: "",
      nombre_pensum: "",
      codigo_pensum: "",
      descripcion: "",
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
    cargarPensums();
  };

  const editar = (item) => {
    setEditando(true);
    setIdEditar(item.id_pensum);

    setForm({
      id_carrera: item.id_carrera || "",
      id_periodo_academico:
        item.id_periodo_academico || "",
      nombre_pensum: item.nombre_pensum,
      codigo_pensum: item.codigo_pensum,
      descripcion: item.descripcion || "",
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Desactivar pensum?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarPensums();
  };

  const filtrados = pensums.filter((p) =>
    `${p.nombre_pensum} ${p.codigo_pensum} ${p.nombre_carrera}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <ClipboardList
          className="text-indigo-600"
          size={34}
        />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Gestión de Pensums
          </h2>

          <p className="text-slate-500">
            Planes académicos por carrera
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
          value={form.id_carrera}
          onChange={(e) =>
            setForm({
              ...form,
              id_carrera: e.target.value,
            })
          }
          required
        >
          <option value="">Seleccione carrera</option>

          {carreras.map((c) => (
            <option
              key={c.id_carrera}
              value={c.id_carrera}
            >
              {c.nombre_carrera}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded-2xl"
          value={form.id_periodo_academico}
          onChange={(e) =>
            setForm({
              ...form,
              id_periodo_academico:
                e.target.value,
            })
          }
          required
        >
          <option value="">
            Seleccione período
          </option>

          {periodos.map((p) => (
            <option
              key={p.id_periodo_academico}
              value={p.id_periodo_academico}
            >
              {p.nombre_periodo}
            </option>
          ))}
        </select>

        <input
          className="border p-3 rounded-2xl"
          placeholder="Código pensum"
          value={form.codigo_pensum}
          onChange={(e) =>
            setForm({
              ...form,
              codigo_pensum: e.target.value,
            })
          }
          required
        />

        <input
          className="border p-3 rounded-2xl"
          placeholder="Nombre pensum"
          value={form.nombre_pensum}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_pensum: e.target.value,
            })
          }
          required
        />

        <textarea
          rows="3"
          className="border p-3 rounded-2xl md:col-span-2"
          placeholder="Descripción"
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
            {editando ? (
              <Save size={18} />
            ) : (
              <PlusCircle size={18} />
            )}

            {editando
              ? "Actualizar"
              : "Crear Pensum"}
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
          placeholder="Buscar pensum..."
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
                Pensum
              </th>
              <th className="p-4 text-left">
                Carrera
              </th>
              <th className="p-4 text-left">
                Período
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
                key={item.id_pensum}
                className="border-t"
              >
                <td className="p-4 font-semibold">
                  {item.codigo_pensum}
                </td>

                <td className="p-4">
                  {item.nombre_pensum}
                </td>

                <td className="p-4">
                  {item.nombre_carrera}
                </td>

                <td className="p-4">
                  {item.nombre_periodo}
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
                          item.id_pensum
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
                  colSpan="6"
                  className="text-center p-8 text-slate-500"
                >
                  No hay pensums registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
