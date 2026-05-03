
import { useState } from "react";

function Cursos() {
  const [carreras] = useState([
    "Ingeniería en Sistemas",
    "Administración de Empresas",
    "Contaduría Pública",
  ]);

  const [pensums] = useState([
    "Pensum Ingeniería 2026",
    "Pensum Empresas 2026",
  ]);

  const [cursos, setCursos] = useState([
    {
      id: 1,
      codigo: "SIS101",
      nombre: "Programación I",
      creditos: 5,
      ciclo: "1",
      horas: 4,
      carrera: "Ingeniería en Sistemas",
      pensum: "Pensum Ingeniería 2026",
      estado: "Activo",
    },
  ]);

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    creditos: "",
    ciclo: "",
    horas: "",
    carrera: "",
    pensum: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const cambiarCampo = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const limpiar = () => {
    setForm({
      codigo: "",
      nombre: "",
      creditos: "",
      ciclo: "",
      horas: "",
      carrera: "",
      pensum: "",
    });
  };

  const guardarCurso = () => {
    const {
      codigo,
      nombre,
      creditos,
      ciclo,
      horas,
      carrera,
      pensum,
    } = form;

    if (
      !codigo ||
      !nombre ||
      !creditos ||
      !ciclo ||
      !horas ||
      !carrera ||
      !pensum
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const existe = cursos.some(
      (c) =>
        c.codigo.toLowerCase() === codigo.toLowerCase() &&
        c.id !== editando
    );

    if (existe) {
      alert("Ya existe un curso con ese código");
      return;
    }

    if (editando) {
      const nuevos = cursos.map((c) =>
        c.id === editando ? { ...c, ...form } : c
      );
      setCursos(nuevos);
      setEditando(null);
    } else {
      setCursos([
        ...cursos,
        {
          id: Date.now(),
          ...form,
          estado: "Activo",
        },
      ]);
    }

    limpiar();
  };

  const editarCurso = (curso) => {
    setForm({
      codigo: curso.codigo,
      nombre: curso.nombre,
      creditos: curso.creditos,
      ciclo: curso.ciclo,
      horas: curso.horas,
      carrera: curso.carrera,
      pensum: curso.pensum,
    });

    setEditando(curso.id);
  };

  const eliminarCurso = (id) => {
    setCursos(cursos.filter((c) => c.id !== id));
  };

  const cambiarEstado = (id) => {
    setCursos(
      cursos.map((c) =>
        c.id === id
          ? {
              ...c,
              estado:
                c.estado === "Activo"
                  ? "Inactivo"
                  : "Activo",
            }
          : c
      )
    );
  };

  const filtrados = cursos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Gestión de Cursos
        </h2>

        <p className="text-slate-500">
          Administra cursos académicos del sistema
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editando ? "Editar Curso" : "Nuevo Curso"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="nombre"
            placeholder="Nombre del curso"
            value={form.nombre}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="creditos"
            placeholder="Créditos"
            type="number"
            value={form.creditos}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="ciclo"
            placeholder="Ciclo / Semestre"
            value={form.ciclo}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="horas"
            placeholder="Horas semanales"
            type="number"
            value={form.horas}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <select
            name="carrera"
            value={form.carrera}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Seleccione carrera</option>
            {carreras.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <select
            name="pensum"
            value={form.pensum}
            onChange={cambiarCampo}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Seleccione pensum</option>
            {pensums.map((p, i) => (
              <option key={i}>{p}</option>
            ))}
          </select>
        </div>

        <button
          onClick={guardarCurso}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </div>

      {/* Buscar */}
      <input
        placeholder="Buscar curso..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border px-4 py-3 rounded-xl mb-6"
      />

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-4">Código</th>
              <th className="p-4">Curso</th>
              <th className="p-4">Créditos</th>
              <th className="p-4">Ciclo</th>
              <th className="p-4">Horas</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">{c.codigo}</td>
                <td className="p-4">{c.nombre}</td>
                <td className="p-4">{c.creditos}</td>
                <td className="p-4">{c.ciclo}</td>
                <td className="p-4">{c.horas}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.estado}
                  </span>
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => editarCurso(c)}
                    className="bg-yellow-400 px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => cambiarEstado(c.id)}
                    className="bg-slate-700 text-white px-3 py-1 rounded-lg"
                  >
                    Estado
                  </button>

                  <button
                    onClick={() => eliminarCurso(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cursos;