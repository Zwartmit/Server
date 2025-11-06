import express from "express";

const app = express();
app.use(express.json());

// Ruta principal que responde al reto de verificación de Meta
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === "gastos20mbk") {
      console.log("✅ Webhook verificado correctamente");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(200).send("Webhook activo 👌");
  }
});

// Ruta para manejar los mensajes POST de WhatsApp
app.post("/", (req, res) => {
  console.log("📩 Mensaje recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("🚀 Servidor corriendo en puerto 3000"));
