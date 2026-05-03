
import { useState } from "react";

function Facultades() {
  const [facultades, setFacultades] = useState([
    {
      id: 1,
      nombre: "Facultad de Ingeniería",
      codigo: "FI",
      estado: "Activa",
    },
    {
      id: 2,
      nombre: "Facultad de Ciencias Económicas",
      codigo: "FCE",
      estado: "Activa",
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);

  const guardarFacultad = () => {
    if (!nombre || !codigo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (
      facultades.some(
        (f) =>
          f.codigo.toLowerCase() === codigo.toLowerCase() &&
          f.id !== editando
      )
    ) {
      alert("Ya existe una facultad con ese código");
      return;
    }

    if (editando) {
      const nuevas = facultades.map((f) =>
        f.id === editando
          ? { ...f, nombre, codigo }
          : f
      );

      setFacultades(nuevas);
      setEditando(null);
    } else {
      const nueva = {
        id: Date.now(),
        nombre,
        codigo,
        estado: "Activa",
      };

      setFacultades([...facultades, nueva]);
    }

    setNombre("");
    setCodigo("");
  };

  const editarFacultad = (facultad) => {
    setNombre(facultad.nombre);
    setCodigo(facultad.codigo);
    setEditando(facultad.id);
  };

  const eliminarFacultad = (id) => {
    const nuevas = facultades.filter((f) => f.id !== id);
    setFacultades(nuevas);
  };

  const cambiarEstado = (id) => {
    const nuevas = facultades.map((f) =>
      f.id === id
        ? {
            ...f,
            estado:
              f.estado === "Activa"
                ? "Inactiva"
                : "Activa",
          }
        : f
    );

    setFacultades(nuevas);
  };

  const filtradas = facultades.filter((f) =>
    f.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>

      {/* Título */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Gestión de Facultades
        </h2>
        <p className="text-slate-500">
          Administra las facultades universitarias
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h3 className="text-xl font-semibold mb-4">
          {editando ? "Editar Facultad" : "Nueva Facultad"}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Nombre facultad"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border px-4 py-3 rounded-xl"
          />

        </div>

        <button
          onClick={guardarFacultad}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar facultad..."
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
              <th className="p-4">Estado</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>

          <tbody>

            {filtradas.map((f) => (
              <tr
                key={f.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4">{f.nombre}</td>
                <td className="p-4">{f.codigo}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      f.estado === "Activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.estado}
                  </span>
                </td>

                <td className="p-4 space-x-2">

                  <button
                    onClick={() => editarFacultad(f)}
                    className="bg-yellow-400 px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => cambiarEstado(f.id)}
                    className="bg-slate-700 text-white px-3 py-1 rounded-lg"
                  >
                    Estado
                  </button>

                  <button
                    onClick={() => eliminarFacultad(f.id)}
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

export default Facultades;