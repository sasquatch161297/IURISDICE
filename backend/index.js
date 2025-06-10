// api/notificar-solicitud.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/api/notificar-solicitud", async (req, res) => {
  const { nombre, apellido, correo, telefono, mensaje, paquete } = req.body;
  console.log(paquete);
  const fecha = new Date().toLocaleString("es-CR", {
    timeZone: "America/Costa_Rica",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["javiro161297@gmail.com"],
      subject: "Nueva solicitud legal recibida",
      html: `
        <div style="font-family: serif; padding: 20px;">
          <h2>📬 Nueva Solicitud de Servicio</h2>
          <p><strong>Fecha y hora:</strong> ${fecha}</p>
          <p><strong>Paquete: </strong> ${paquete}</p>
          <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
          <p><strong>Correo:</strong> ${correo}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Mensaje:</strong><br />${mensaje || "<em>Sin mensaje adicional</em>"}</p>
        </div>
      `,
    });

    console.log("Respuesta de Resend:", response);

    res.json({ ok: true });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ error: "Error al enviar email" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});
