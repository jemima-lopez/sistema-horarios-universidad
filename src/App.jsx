


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";



export default function App() {
  const token = localStorage.getItem("token");

  return token ? <Dashboard /> : <Login />;

}