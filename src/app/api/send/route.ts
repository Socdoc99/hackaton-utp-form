// app/api/send/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // obliga a usar Node.js runtime en Vercel y local

export async function POST(req: Request) {
  try {
    // 1️⃣ Leer los datos enviados desde el formulario
    const { name, email } = await req.json();

    // 2️⃣ Crear el transporter de nodemailer usando tus variables del .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Mailtrap usa TLS, así que esto se mantiene en false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3️⃣ Enviar el correo al usuario
    await transporter.sendMail({
      from: process.env.MAIL_FROM, // Remitente configurado en tu .env
      to: email, // correo del usuario del formulario
      subject: "Confirmación de inscripción - Hackatón UTP 2025/2",
      html: `
        <div style="font-family: Arial, sans-serif; color:#333;">
          <h2>Hola ${name || "participante"} 👋</h2>
          <p>¡Gracias por inscribirte en la <strong>Hackatón UTP 2025/2</strong>!</p>
          <p>Nos alegra contar contigo, pronto recibirás más información sobre el evento.</p>
          <hr/>
          <small>Equipo Hackatón UTP</small>
        </div>
      `,
    });

    // 4️⃣ Retornar una respuesta exitosa
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return new Response(JSON.stringify({ error: "No se pudo enviar el correo" }), { status: 500 });
  }
}
