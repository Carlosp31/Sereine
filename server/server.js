const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");

const app = express();
const HTTPS_PORT = 443;
const HTTP_PORT = 80;

// Certificados Let’s Encrypt
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/sereinesoul.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/sereinesoul.com/fullchain.pem")
};

// Redirigir sin www → www
app.use((req, res, next) => {
    if (!req.headers.host.startsWith("www.")) {
        return res.redirect(301, `https://www.${req.headers.host}${req.url}`);
    }
    next();
});

// Evitar cache problemático (WhatsApp, etc)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
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

// Servidor HTTPS
https.createServer(options, app).listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`🔥 Sereine Soul corriendo en https://www.sereinesoul.com`);
});

// Servidor HTTP para redirigir a HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://www.sereinesoul.com${req.url}` });
    res.end();
}).listen(HTTP_PORT, '0.0.0.0', () => {
    console.log(`🌐 Redireccionando HTTP a HTTPS en puerto ${HTTP_PORT}`);
});
