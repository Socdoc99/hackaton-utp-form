// app/api/send/route.ts
import nodemailer from "nodemailer";
import path from "node:path";

export const runtime = "nodejs";

/**
 * POST /api/send
 * Envía un correo de confirmación al usuario que se inscribe.
 * Requiere: { nameSurname: string; email: string }
 */
export async function POST(req: Request) {
  try {
    const { nameSurname, email } = (await req.json()) as {
      nameSurname?: string;
      email?: string;
    };

    // Validación mínima del payload
    const name = (nameSurname ?? "").trim();
    const mail = (email ?? "").trim();
    if (!name || !mail) {
      return json({ error: "Faltan datos del formulario" }, 400);
    }

    // Validación básica del entorno (fail-fast si falta algo crítico)
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
      console.error("Env incompleto:", {
        SMTP_HOST: !!SMTP_HOST,
        SMTP_PORT: !!SMTP_PORT,
        SMTP_USER: !!SMTP_USER,
        SMTP_PASS: !!SMTP_PASS,
        MAIL_FROM: !!MAIL_FROM,
      });
      return json({ error: "Configuración SMTP incompleta" }, 500);
    }

    // Transporte SMTP (secure solo si puerto 465)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Ruta absoluta del asset incrustado (CID)
    const headerPath = path.join(process.cwd(), "public", "Mailheader.png");

    // HTML (look & feel neón)
    const htmlContent = `
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Confirmación de inscripción - Hackatón UTP 2025/2</title>
        </head>
        <body style="background-color:#0D0D0F;margin:0;padding:0;font-family:'JetBrains Mono', monospace;color:#E0E0E0;">
          <div style="max-width:600px;margin:30px auto;border:2px solid #00FFAB;border-radius:12px;background-color:#1A1B26;box-shadow:0 0 25px #00FFAB40;overflow:hidden;">
            <div style="background-color:#0D0D0F;text-align:center;padding:20px;">
              <img src="cid:mailheader" alt="Hackatón UTP 2025/2" width="460" height="90" style="border-radius:8px;" />
            </div>
            <div style="padding:24px;text-align:center;">
              <h2 style="color:#00FFAB;font-size:22px;text-shadow:0 0 8px #00FFAB;margin-bottom:8px;">
                ¡Hola ${escapeHtml(name)} 👋!
              </h2>
              <p style="color:#A0A0A0;font-size:15px;line-height:1.6;">
                🎉 <strong style="color:#3A86FF;">Gracias por inscribirte</strong> en la 
                <strong style="color:#00FFAB;">Hackatón UTP 2025/2</strong>.<br/>
                Nos alegra contar contigo en este evento donde la creatividad, la tecnología y la pasión por el código se encuentran.
              </p>
              <p style="margin-top:18px;color:#E0E0E0;font-size:14px;">
                🗓️ <strong style="color:#00FFAB;">Fecha:</strong> 29 de noviembre de 2025<br/>
                🕕 <strong style="color:#B5179E;">Hora:</strong> 6:00 p.m.<br/>
                📍 <strong style="color:#3A86FF;">Lugar:</strong> Bloque 3 - CRIE UTP
              </p>
              <div style="margin:24px auto;width:80%;border-top:1px solid #00FFAB40;"></div>
              <p style="font-size:14px;color:#A0A0A0;">
                💡 Recibirás más información próximamente en tu correo.<br/>
                Mientras tanto, prepara tus ideas... ¡y tu PC! ⚡
              </p>
              <a href="https://www.utp.edu.co" target="_blank" 
                style="display:inline-block;margin-top:24px;padding:12px 24px;background-color:#00FFAB;color:#0D0D0F;
                border:2px solid #00FFAB;border-radius:8px;text-decoration:none;font-weight:bold;
                font-family:'JetBrains Mono', monospace;transition:all 0.3s;">
                Ver más sobre el evento
              </a>
            </div>
            <div style="background-color:#0D0D0F;padding:20px;text-align:center;border-top:1px solid #00FFAB40;">
              <p style="font-size:12px;color:#888;margin:0;">
                📍 <strong style="color:#3A86FF;">Universidad Tecnológica de Pereira</strong><br/>
                <span style="color:#B5179E;">Hackatón UTP 2025/2 — Santiago Ospina Calle</span>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: mail,
      subject: "✅ Confirmación de inscripción - Hackatón UTP 2025/2",
      html: htmlContent,
      attachments: [
        { filename: "Mailheader.png", path: headerPath, cid: "mailheader" },
      ],
    });

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("Error enviando correo:", err);
    return json({ error: "No se pudo enviar el correo" }, 500);
  }
}

/** Respuesta JSON consistente */
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Escapa caracteres en el nombre para evitar inyección HTML */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
