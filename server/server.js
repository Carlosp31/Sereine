const express = require("express");
const path = require("path");

const app = express();
const PORT = 80;

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "..", "public")));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Levantar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🔥 Sereine Soul corriendo en http://localhost:${PORT}`);
});
