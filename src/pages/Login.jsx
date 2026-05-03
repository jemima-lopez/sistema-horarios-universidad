

import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const respuesta = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario,
          password
        })
      });

      const data = await respuesta.json();

      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        window.location.href = "/dashboard";
      } else {
        setMensaje(data.msg);
      }

    } catch (error) {
      setMensaje("Error al conectar con servidor");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          UniSchedule
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Iniciar sesión
        </p>

        <form onSubmit={iniciarSesion} className="space-y-5">

          <input
            type="text"
            placeholder="Usuario"
            className="w-full border p-3 rounded-2xl"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border p-3 rounded-2xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        {mensaje && (
          <p className="text-red-500 text-center mt-5">
            {mensaje}
          </p>
        )}

      </div>
    </div>
  );
}