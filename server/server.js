const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");

const app = express();

// Detectar si estamos en local o en servidor AWS
const isLocal = process.env.NODE_ENV === "development";

// Configuración de puertos
const HTTP_PORT = isLocal ? 3000 : 80;
const HTTPS_PORT = isLocal ? null : 443;

// Rutas para certificados (solo en AWS)
const options = !isLocal
  ? {
      key: fs.readFileSync("/home/ubuntu/certs/privkey.pem"),
      cert: fs.readFileSync("/home/ubuntu/certs/fullchain.pem"),
    }
  : null;

// Middleware: redirigir sin www → www (solo en AWS)
if (!isLocal) {
  app.use((req, res, next) => {
    if (!req.headers.host.startsWith("www.")) {
      return res.redirect(301, `https://www.${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Middleware: evitar cache problemático
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// ---- SERVIDOR ----
if (isLocal) {
  // Solo HTTP en local
  app.listen(HTTP_PORT, () => {
    console.log(`🔥 Sereine Soul corriendo en http://localhost:${HTTP_PORT}`);
  });
} else {
  // HTTPS en AWS
  https.createServer(options, app).listen(HTTPS_PORT, "0.0.0.0", () => {
    console.log(`🔥 Sereine Soul corriendo en https://www.sereinesoul.com`);
  });

  // HTTP → HTTPS en AWS
  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://www.sereinesoul.com${req.url}` });
    res.end();
  }).listen(HTTP_PORT, "0.0.0.0", () => {
    console.log(`🌐 Redireccionando HTTP a HTTPS en puerto ${HTTP_PORT}`);
  });
}
