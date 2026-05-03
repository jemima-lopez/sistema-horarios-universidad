


import { useEffect, useState } from "react";
import {
  CalendarDays,
  Search,
  PlusCircle,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

export default function Periodos() {
  const API = "http://localhost:5000/api/periodos";

  const [periodos, setPeriodos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    nombre_periodo: "",
    anio: "",
    numero_periodo: "",
    fecha_inicio: "",
    fecha_fin: "",
    fecha_limite_edicion_horarios: "",
    estado: "planificacion",
    es_vigente: 0,
  });

  const cargarPeriodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPeriodos(data);
  };

  useEffect(() => {
    cargarPeriodos();
  }, []);

  const limpiar = () => {
    setForm({
      nombre_periodo: "",
      anio: "",
      numero_periodo: "",
      fecha_inicio: "",
      fecha_fin: "",
      fecha_limite_edicion_horarios: "",
      estado: "planificacion",
      es_vigente: 0,
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
    cargarPeriodos();
  };

  const editar = (item) => {
    setEditando(true);
    setIdEditar(item.id_periodo_academico);

    setForm({
      nombre_periodo: item.nombre_periodo,
      anio: item.anio,
      numero_periodo: item.numero_periodo,
      fecha_inicio: item.fecha_inicio?.slice(0, 10),
      fecha_fin: item.fecha_fin?.slice(0, 10),
      fecha_limite_edicion_horarios:
        item.fecha_limite_edicion_horarios
          ?.slice(0, 16) || "",
      estado: item.estado,
      es_vigente: item.es_vigente,
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Cerrar período académico?"))
      return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarPeriodos();
  };

  const filtrados = periodos.filter((p) =>
    `${p.nombre_periodo} ${p.anio}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const colorEstado = (estado) => {
    if (estado === "activo")
      return "bg-green-100 text-green-700";

    if (estado === "cerrado")
      return "bg-red-100 text-red-700";

    if (estado === "finalizado")
      return "bg-slate-200 text-slate-700";

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <CalendarDays
          className="text-indigo-600"
          size={34}
        />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Períodos Académicos
          </h2>

          <p className="text-slate-500">
            Gestión de ciclos universitarios
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
          placeholder="Nombre período"
          value={form.nombre_periodo}
          onChange={(e) =>
            setForm({
              ...form,
              nombre_periodo: e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          className="border p-3 rounded-2xl"
          placeholder="Año"
          value={form.anio}
          onChange={(e) =>
            setForm({
              ...form,
              anio: e.target.value,
            })
          }
          required
        />

        <select
          className="border p-3 rounded-2xl"
          value={form.numero_periodo}
          onChange={(e) =>
            setForm({
              ...form,
              numero_periodo: e.target.value,
            })
          }
          required
        >
          <option value="">Número período</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

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
          <option value="planificacion">
            Planificación
          </option>
          <option value="activo">
            Activo
          </option>
          <option value="cerrado">
            Cerrado
          </option>
          <option value="finalizado">
            Finalizado
          </option>
        </select>

        <input
          type="date"
          className="border p-3 rounded-2xl"
          value={form.fecha_inicio}
          onChange={(e) =>
            setForm({
              ...form,
              fecha_inicio: e.target.value,
            })
          }
          required
        />

        <input
          type="date"
          className="border p-3 rounded-2xl"
          value={form.fecha_fin}
          onChange={(e) =>
            setForm({
              ...form,
              fecha_fin: e.target.value,
            })
          }
          required
        />

        <input
          type="datetime-local"
          className="border p-3 rounded-2xl"
          value={
            form.fecha_limite_edicion_horarios
          }
          onChange={(e) =>
            setForm({
              ...form,
              fecha_limite_edicion_horarios:
                e.target.value,
            })
          }
        />

        <select
          className="border p-3 rounded-2xl"
          value={form.es_vigente}
          onChange={(e) =>
            setForm({
              ...form,
              es_vigente: e.target.value,
            })
          }
        >
          <option value="0">
            No vigente
          </option>
          <option value="1">
            Vigente
          </option>
        </select>

        <div className="md:col-span-2 flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            {editando ? (
              <Save size={18} />
            ) : (
              <PlusCircle size={18} />
            )}

            {editando
              ? "Actualizar"
              : "Crear Período"}
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
          placeholder="Buscar período..."
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
                Período
              </th>
              <th className="p-4 text-left">
                Año
              </th>
              <th className="p-4 text-left">
                No.
              </th>
              <th className="p-4 text-left">
                Estado
              </th>
              <th className="p-4 text-left">
                Vigente
              </th>
              <th className="p-4 text-center">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((item) => (
              <tr
                key={
                  item.id_periodo_academico
                }
                className="border-t"
              >
                <td className="p-4 font-semibold">
                  {item.nombre_periodo}
                </td>

                <td className="p-4">
                  {item.anio}
                </td>

                <td className="p-4">
                  {item.numero_periodo}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${colorEstado(
                      item.estado
                    )}`}
                  >
                    {item.estado}
                  </span>
                </td>

                <td className="p-4">
                  {item.es_vigente == 1
                    ? "Sí"
                    : "No"}
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
                          item.id_periodo_academico
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
                  No hay períodos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

