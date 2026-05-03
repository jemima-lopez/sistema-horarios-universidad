

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/facultades", require("./routes/facultades.routes"));
app.use("/api/carreras", require("./routes/carreras.routes"));
app.use("/api/pensums", require("./routes/pensums.routes"));
app.use("/api/periodos", require("./routes/periodos.routes"));
app.use("/api/cursos", require("./routes/cursos.routes"));
app.use("/api/pensum-cursos", require("./routes/pensumCurso.routes"));
app.use("/api/docentes", require("./routes/docentes.routes"));



app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});

