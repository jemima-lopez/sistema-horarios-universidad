


import { useEffect, useState } from "react";
import { Link2, Trash2 } from "lucide-react";

export default function Asignacion() {
  const API = "http://localhost:5000/api/asignaciones";

  const [data, setData] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [periodos, setPeriodos] = useState([]);

  const [form, setForm] = useState({
    id_docente: "",
    id_curso: "",
    id_seccion: "",
    id_periodo_academico: "",
  });

  // 🔄 Cargar todo
  const cargarTodo = async () => {
    const r1 = await fetch(API);
    const json = await r1.json();

if (Array.isArray(json)) {
  setData(json);
} else {
  console.error("Error backend:", json);
  setData([]);
}

    const r2 = await fetch("http://localhost:5000/api/docentes");
    setDocentes(await r2.json());

    const r3 = await fetch("http://localhost:5000/api/cursos");
    setCursos(await r3.json());

    const r4 = await fetch("http://localhost:5000/api/secciones");
    setSecciones(await r4.json());

    const r5 = await fetch("http://localhost:5000/api/periodos");
    setPeriodos(await r5.json());
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  // 💾 Guardar
  const guardar = async (e) => {
    e.preventDefault();

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json?.msg || json?.sqlMessage || "Error");
      return;
    }

    setForm({
      id_docente: "",
      id_curso: "",
      id_seccion: "",
      id_periodo_academico: "",
    });

    cargarTodo();
  };

  // 🗑 Eliminar
  const eliminar = async (id) => {
    if (!confirm("¿Eliminar asignación?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarTodo();
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-md flex items-center gap-4">
        <Link2 size={34} className="text-indigo-600" />
        <div>
          <h2 className="text-3xl font-bold">
            Asignación Docente - Curso
          </h2>
          <p className="text-slate-500">
            Relación entre docente, curso, sección y período
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white p-6 rounded-3xl shadow-md grid md:grid-cols-4 gap-4"
      >

        {/* Docente */}
        <select
          className="border p-3 rounded-2xl"
          value={form.id_docente}
          onChange={(e) =>
            setForm({ ...form, id_docente: e.target.value })
          }
          required
        >
          <option value="">Docente</option>
          {docentes.map((d) => (
            <option key={d.id_docente} value={d.id_docente}>
              {d.nombres} {d.apellidos}
            </option>
          ))}
        </select>

        {/* Curso */}
        <select
          className="border p-3 rounded-2xl"
          value={form.id_curso}
          onChange={(e) =>
            setForm({ ...form, id_curso: e.target.value })
          }
          required
        >
          <option value="">Curso</option>
          {cursos.map((c) => (
            <option key={c.id_curso} value={c.id_curso}>
              {c.nombre_curso}
            </option>
          ))}
        </select>

        {/* Sección */}
        <select
          className="border p-3 rounded-2xl"
          value={form.id_seccion}
          onChange={(e) =>
            setForm({ ...form, id_seccion: e.target.value })
          }
          required
        >
          <option value="">Sección</option>
          {secciones.map((s) => (
            <option key={s.id_seccion} value={s.id_seccion}>
              {s.nombre} ({s.jornada})
            </option>
          ))}
        </select>

        {/* Periodo */}
        <select
          className="border p-3 rounded-2xl"
          value={form.id_periodo_academico}
          onChange={(e) =>
            setForm({ ...form, id_periodo_academico: e.target.value })
          }
          required
        >
          <option value="">Periodo</option>
          {periodos.map((p) => (
            <option key={p.id_periodo_academico} value={p.id_periodo_academico}>
              {p.nombre}
            </option>
          ))}
        </select>

        <div className="md:col-span-4">
          <button className="bg-indigo-600 text-white px-5 py-3 rounded-2xl">
            Asignar
          </button>
        </div>
      </form>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Docente</th>
              <th className="p-4">Curso</th>
              <th className="p-4">Sección</th>
              <th className="p-4">Jornada</th>
              <th className="p-4">Periodo</th>
              <th className="p-4">Acción</th>
            </tr>
          </thead>

          <tbody>
            {data.map((a) => (
              <tr key={a.id_asignacion} className="border-t">
                <td className="p-4">
                  {a.nombres} {a.apellidos}
                </td>
                <td className="p-4">{a.nombre_curso}</td>
                <td className="p-4">{a.nombre_seccion}</td>
                <td className="p-4">{a.jornada}</td>
                <td className="p-4">{a.nombre_periodo}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => eliminar(a.id_asignacion)}
                    className="bg-red-600 text-white p-2 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-slate-500">
                  No hay asignaciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

