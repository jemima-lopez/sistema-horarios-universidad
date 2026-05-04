


import { useEffect, useState } from "react";
import { CalendarX, Trash2 } from "lucide-react";

export default function Disponibilidad() {
  const API = "http://localhost:5000/api/disponibilidad";

  const [data, setData] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [bloques, setBloques] = useState([]);

  const [form, setForm] = useState({
    id_docente: "",
    id_bloque_horario: "",
  });

  const cargarTodo = async () => {
    const r1 = await fetch(API);
    const d1 = await r1.json();
    setData(d1);

    const r2 = await fetch("http://localhost:5000/api/docentes");
    const d2 = await r2.json();
    setDocentes(d2);

    const r3 = await fetch("http://localhost:5000/api/bloques");
    const d3 = await r3.json();
    setBloques(d3);
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const guardar = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      id_docente: "",
      id_bloque_horario: "",
    });

    cargarTodo();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar restricción?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarTodo();
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-md flex items-center gap-4">
        <CalendarX size={34} className="text-red-600" />
        <div>
          <h2 className="text-3xl font-bold">Disponibilidad Docente</h2>
          <p className="text-slate-500">
            Bloques NO disponibles para docentes
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
          value={form.id_docente}
          onChange={(e) =>
            setForm({ ...form, id_docente: e.target.value })
          }
          required
        >
          <option value="">Seleccionar docente</option>
          {docentes.map((d) => (
            <option key={d.id_docente} value={d.id_docente}>
              {d.nombres} {d.apellidos}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded-2xl"
          value={form.id_bloque_horario}
          onChange={(e) =>
            setForm({
              ...form,
              id_bloque_horario: e.target.value,
            })
          }
          required
        >
          <option value="">Seleccionar bloque</option>
          {bloques.map((b) => (
            <option key={b.id_bloque_horario} value={b.id_bloque_horario}>
              {b.nombre_dia} | {b.hora_inicio} - {b.hora_fin}
            </option>
          ))}
        </select>

        <div className="md:col-span-2">
          <button className="bg-red-600 text-white px-5 py-3 rounded-2xl">
            Bloquear horario
          </button>
        </div>
      </form>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Docente</th>
              <th className="p-4">Día</th>
              <th className="p-4">Hora</th>
              <th className="p-4">Acción</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id_disponibilidad_docente} className="border-t">
                <td className="p-4">
                  {item.nombres} {item.apellidos}
                </td>

                <td className="p-4">{item.nombre_dia}</td>

                <td className="p-4">
                  {item.hora_inicio} - {item.hora_fin}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      eliminar(item.id_disponibilidad_docente)
                    }
                    className="bg-red-600 text-white p-2 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-slate-500">
                  No hay restricciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

