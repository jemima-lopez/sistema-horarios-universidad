
import { useState } from "react";

function Carreras() {
  const [facultades] = useState([
    "Facultad de Ingeniería",
    "Facultad de Ciencias Económicas",
    "Facultad de Humanidades",
  ]);

  const [carreras, setCarreras] = useState([
    {
      id: 1,
      nombre: "Ingeniería en Sistemas",
      codigo: "IS01",
      facultad: "Facultad de Ingeniería",
      jornada: "Matutina",
      coordinador: "Sin asignar",
      estado: "Activa",
    },
  ]);

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    facultad: "",
    jornada: "",
  });

  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const actualizarCampo = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarCarrera = () => {
    const { nombre, codigo, facultad, jornada } = form;

    if (!nombre || !codigo || !facultad || !jornada) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const repetido = carreras.some(
      (c) =>
        c.codigo.toLowerCase() === codigo.toLowerCase() &&
        c.id !== editando
    );

    if (repetido) {
      alert("Ya existe una carrera con ese código");
      return;
    }

    if (editando) {
      const nuevas = carreras.map((c) =>
        c.id === editando
          ? { ...c, ...form }
          : c
      );

      setCarreras(nuevas);
      setEditando(null);
    } else {
      const nueva = {
        id: Date.now(),
        ...form,
        coordinador: "Sin asignar",
        estado: "Activa",
      };

      setCarreras([...carreras, nueva]);
    }

    setForm({
      nombre: "",
      codigo: "",
      facultad: "",
      jornada: "",
    });
  };

  const editarCarrera = (c) => {
    setForm({
      nombre: c.nombre,
      codigo: c.codigo,
      facultad: c.facultad,
      jornada: c.jornada,
    });

    setEditando(c.id);
  };

  const cambiarEstado = (id) => {
    const nuevas = carreras.map((c) =>
      c.id === id
        ? {
            ...c,
            estado:
              c.estado === "Activa"
                ? "Inactiva"
                : "Activa",
          }
        : c
    );

    setCarreras(nuevas);
  };

  const eliminarCarrera = (id) => {
    const nuevas = carreras.filter((c) => c.id !== id);
    setCarreras(nuevas);
  };

  const filtradas = carreras.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Gestión de Carreras
        </h2>

        <p className="text-slate-500">
          Administra carreras universitarias
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h3 className="text-xl font-semibold mb-4">
          {editando ? "Editar Carrera" : "Nueva Carrera"}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="nombre"
            placeholder="Nombre carrera"
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

          <select
            name="facultad"
            value={form.facultad}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Seleccione facultad</option>

            {facultades.map((f, i) => (
              <option key={i}>{f}</option>
            ))}
          </select>

          <select
            name="jornada"
            value={form.jornada}
            onChange={actualizarCampo}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="">Seleccione jornada</option>
            <option>Matutina</option>
            <option>Vespertina</option>
            <option>Fin de Semana</option>
          </select>

        </div>

        <button
          onClick={guardarCarrera}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </div>

      {/* Buscar */}
      <input
        placeholder="Buscar carrera..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full border px-4 py-3 rounded-xl mb-6"
      />

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr className="text-left">
              <th className="p-4">Carrera</th>
              <th className="p-4">Código</th>
              <th className="p-4">Facultad</th>
              <th className="p-4">Jornada</th>
              <th className="p-4">Coordinador</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>

            {filtradas.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">{c.nombre}</td>
                <td className="p-4">{c.codigo}</td>
                <td className="p-4">{c.facultad}</td>
                <td className="p-4">{c.jornada}</td>
                <td className="p-4">{c.coordinador}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.estado === "Activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.estado}
                  </span>
                </td>

                <td className="p-4 space-x-2">

                  <button
                    onClick={() => editarCarrera(c)}
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
                    onClick={() => eliminarCarrera(c.id)}
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

export default Carreras;