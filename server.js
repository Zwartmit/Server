import express from "express";

const app = express();

app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === "gastos20mbk") {
    console.log("✅ Webhook verificado correctamente");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/", (req, res) => {
  console.log("Mensaje recibido:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));
