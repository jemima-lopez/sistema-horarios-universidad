

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/usuarios", require("./routes/usuarios.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});

