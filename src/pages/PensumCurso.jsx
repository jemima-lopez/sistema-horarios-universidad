


import { useEffect, useState } from "react";
import {
  Link2,
  Search,
  PlusCircle,
  Trash2,
} from "lucide-react";

export default function PensumCurso() {
  const API = "http://localhost:5000/api/pensum-cursos";

  const [registros, setRegistros] = useState([]);
  const [pensums, setPensums] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    id_pensum: "",
    id_curso: "",
    ciclo_semestre: "",
  });

  const cargarTodo = async () => {
    const r1 = await fetch(API);
    const d1 = await r1.json();
    setRegistros(d1);

    const r2 = await fetch(
      "http://localhost:5000/api/pensums"
    );
    const d2 = await r2.json();
    setPensums(d2);

    const r3 = await fetch(
      "http://localhost:5000/api/cursos"
    );
    const d3 = await r3.json();
    setCursos(d3);
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const limpiar = () => {
    setForm({
      id_pensum: "",
      id_curso: "",
      ciclo_semestre: "",
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    limpiar();
    cargarTodo();
  };

  const eliminar = async (id) => {
    if (
      !confirm(
        "¿Eliminar curso del pensum?"
      )
    )
      return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    cargarTodo();
  };

  const filtrados = registros.filter(
    (r) =>
      `${r.nombre_pensum} ${r.nombre_curso} ${r.codigo_curso}`
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center gap-4">
        <Link2
          size={34}
          className="text-indigo-600"
        />

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Pensum - Cursos
          </h2>

          <p className="text-slate-500">
            Asignación de cursos al
            plan de estudios
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form
        onSubmit={guardar}
        className="bg-white rounded-3xl shadow-md p-6 grid md:grid-cols-3 gap-4"
      >
        <select
          className="border p-3 rounded-2xl"
          value={form.id_pensum}
          onChange={(e) =>
            setForm({
              ...form,
              id_pensum:
                e.target.value,
            })
          }
          required
        >
          <option value="">
            Seleccione pensum
          </option>

          {pensums.map((p) => (
            <option
              key={p.id_pensum}
              value={p.id_pensum}
            >
              {p.nombre_pensum}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded-2xl"
          value={form.id_curso}
          onChange={(e) =>
            setForm({
              ...form,
              id_curso:
                e.target.value,
            })
          }
          required
        >
          <option value="">
            Seleccione curso
          </option>

          {cursos.map((c) => (
            <option
              key={c.id_curso}
              value={c.id_curso}
            >
              {c.codigo_curso} -{" "}
              {c.nombre_curso}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded-2xl"
          value={
            form.ciclo_semestre
          }
          onChange={(e) =>
            setForm({
              ...form,
              ciclo_semestre:
                e.target.value,
            })
          }
          required
        >
          <option value="">
            Semestre
          </option>

          {[1,2,3,4,5,6,7,8,9,10].map(
            (n) => (
              <option
                key={n}
                value={n}
              >
                {n}
              </option>
            )
          )}
        </select>

        <div className="md:col-span-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2">
            <PlusCircle size={18} />
            Agregar Curso
          </button>
        </div>
      </form>

      {/* Buscar */}
      <div className="bg-white rounded-3xl shadow-md p-4 flex items-center gap-3">
        <Search
          size={20}
          className="text-slate-400"
        />

        <input
          className="w-full outline-none"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Pensum
              </th>
              <th className="p-4 text-left">
                Código
              </th>
              <th className="p-4 text-left">
                Curso
              </th>
              <th className="p-4 text-left">
                Semestre
              </th>
              <th className="p-4 text-left">
                Estado
              </th>
              <th className="p-4 text-center">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map(
              (item) => (
                <tr
                  key={
                    item.id_pensum_curso
                  }
                  className="border-t"
                >
                  <td className="p-4 font-semibold">
                    {
                      item.nombre_pensum
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.codigo_curso
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.nombre_curso
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.ciclo_semestre
                    }
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.estado ===
                        "activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        item.estado
                      }
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          eliminar(
                            item.id_pensum_curso
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}

            {filtrados.length ===
              0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-slate-500"
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

