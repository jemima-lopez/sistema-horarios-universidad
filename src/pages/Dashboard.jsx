

import { useState } from "react";
import Usuarios from "./Usuarios";
import Facultades from "./Facultades";


import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarDays,
  School,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 🔥 NUEVO: control de módulo activo
  const [modulo, setModulo] = useState("dashboard");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white p-6 hidden md:block">
        <h1 className="text-3xl font-bold mb-10">
          🎓 UniSchedule
        </h1>

        <nav className="space-y-3">

          {/* Dashboard */}
          <button
            onClick={() => setModulo("dashboard")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
              modulo === "dashboard"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <School size={20} />
            Dashboard
          </button>

          {/* Usuarios */}
          <button
            onClick={() => setModulo("usuarios")}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
              modulo === "usuarios"
                ? "bg-slate-800"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={20} />
            Usuarios
          </button>

          {/* Facultades */}
          <button
  onClick={() => setModulo("facultades")}
  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition ${
    modulo === "facultades"
      ? "bg-slate-800"
      : "hover:bg-slate-800"
  }`}
>
  <GraduationCap size={20} />
  Facultades
</button>

          {/* Carreras */}
          <button
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800 transition"
          >
            <BookOpen size={20} />
            Carreras
          </button>

          {/* Horarios */}
          <button
            className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800 transition"
          >
            <CalendarDays size={20} />
            Horarios
          </button>

        </nav>

        <button
          onClick={cerrarSesion}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 py-3 rounded-2xl flex justify-center gap-2"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8">

        {/* 🔥 SI ESTÁ EN DASHBOARD */}
        {modulo === "dashboard" && (
          <>
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-md p-6 mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Bienvenido, {usuario?.nombre}
                </h2>

                <p className="text-slate-500">
                  Rol: {usuario?.rol}
                </p>
              </div>

              <div className="text-right">
                <p className="text-slate-500">Sistema Universitario</p>
                <p className="font-semibold">Panel Maestro</p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">

              <div className="bg-white p-6 rounded-3xl shadow-md">
                <p className="text-slate-500">Usuarios</p>
                <h3 className="text-4xl font-bold mt-2">12</h3>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-md">
                <p className="text-slate-500">Facultades</p>
                <h3 className="text-4xl font-bold mt-2">5</h3>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-md">
                <p className="text-slate-500">Carreras</p>
                <h3 className="text-4xl font-bold mt-2">18</h3>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-md">
                <p className="text-slate-500">Horarios</p>
                <h3 className="text-4xl font-bold mt-2">24</h3>
              </div>

            </div>

            {/* Estado */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">
                Estado del sistema
              </h3>

              <p className="text-slate-600">
                Todo listo para comenzar el desarrollo completo del sistema.
              </p>
            </div>
          </>
        )}

        {/* 🔥 SI ESTÁ EN USUARIOS */}
        {modulo === "usuarios" && <Usuarios />}
        {modulo === "facultades" && <Facultades />}

      </main>
    </div>
  );
}
