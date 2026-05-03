
import { useState } from "react";

function Pensums() {
  const [carreras] = useState([
    "Ingeniería en Sistemas",
    "Administración de Empresas",
    "Contaduría Pública",
    "Derecho",
  ]);

  const [pensums, setPensums] = useState([
    {
      id: 1,
      nombre: "Pensum Ingeniería 2026",
      codigo: "PEN-IS-26",
      periodo: "Semestre 1",
      carrera: "Ingeniería en Sistemas",
      estado: "Activo",
    },
  ]);

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    periodo: "",
    carrera: "",
  });

  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const actualizarCampo = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarPensum = () => {
    const { nombre, codigo, periodo, carrera } = form;

    if (!nombre || !codigo || !periodo || !carrera) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const existe = pensums.some(
      (p) =>
        p.codigo.toLowerCase() === codigo.toLowerCase() &&
        p.id !== editando
    );

    if (existe) {
      alert("Ya existe un pensum con ese código");
      return;
    }

    if (editando) {
      const nuevos = pensums.map((p) =>
        p.id === editando ? { ...p, ...form } : p
      );

      setPensums(nuevos);
      setEditando(null);
    } else {
      const nuevo = {
        id: Date.now(),
        ...form,
        estado: "Activo",
      };

      setPensums([...pensums, nuevo]);
    }

    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      codigo: "",
      periodo: "",
      carrera: "",
    });
  };

  const editarPensum = (p) => {
    setForm({
      nombre: p.nombre,
      codigo: p.codigo,
      periodo: p.periodo,
      carrera: p.carrera,
    });

    setEditando(p.id);
  };

  const cambiarEstado = (id) => {
    const nuevos = pensums.map((p) =>
      p.id === id
        ? {
            ...p,
            estado:
              p.estado === "Activo"
                ? "Inactivo"
                : "Activo",
          }
        : p
    );

    setPensums(nuevos);
  };

  const eliminarPensum = (id) => {
    const nuevos = pensums.filter((p) => p.id !== id);
    setPensums(nuevos);
  };

  const filtrados = pensums.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Gestión de Pensums
        </h2>

        <p className="text-slate-500">
          Administra planes de estudio por carrera
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h3 className="text-xl font-semibold mb-4">
          {editando ? "Editar Pensum" : "Nuevo Pensum"}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="nombre"
            placeholder="Nombre del pensum"
            value={form.nombre}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="codigo"
            placeholder="Código"
            value={form.codigo}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="periodo"
            placeholder="Periodo / Ciclo"
            value={form.periodo}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          />

          <select
            name="carrera"
            value={form.carrera}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Seleccione carrera</option>

            {carreras.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

        </div>

        <button
          onClick={guardarPensum}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </div>

      {/* Buscar */}
      <input
        placeholder="Buscar pensum..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border px-4 py-3 rounded-xl mb-6"
      />

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-4">Nombre</th>
              <th className="p-4">Código</th>
              <th className="p-4">Periodo</th>
              <th className="p-4">Carrera</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>

            {filtrados.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">{p.nombre}</td>
                <td className="p-4">{p.codigo}</td>
                <td className="p-4">{p.periodo}</td>
                <td className="p-4">{p.carrera}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      p.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>

                <td className="p-4 space-x-2">

                  <button
                    onClick={() => editarPensum(p)}
                    className="bg-yellow-400 px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => cambiarEstado(p.id)}
                    className="bg-slate-700 text-white px-3 py-1 rounded-lg"
                  >
                    Estado
                  </button>

                  <button
                    onClick={() => eliminarPensum(p.id)}
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

export default Pensums;