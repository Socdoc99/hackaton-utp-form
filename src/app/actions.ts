"use server";

import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { contactTemplate } from "../templates/contact";

/** Payload esperado desde el formulario */
interface ContactData {
  nameSurname: string;
  email: string;
  phone: string;
  message: string;
  token: string; // reCAPTCHA v2/v3
}

/** Respuesta estándar de la acción */
type ActionResult =
  | { success: true }
  | { error: string };

/**
 * sendContactForm
 * - Verifica reCAPTCHA (server-side)
 * - Valida payload mínimo
 * - Renderiza plantilla handlebars
 * - Envía correo interno al organizador
 */
export async function sendContactForm(data: ContactData): Promise<ActionResult> {
  // 1) Verificación humana (fail-fast)
  const human = await validateHuman(data.token);
  if (!human) return { error: "Captcha inválido" };

  // 2) Sanitización mínima
  const name = (data.nameSurname ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !email) return { error: "Faltan nombre o correo" };
  if (!isValidEmail(email)) return { error: "Correo no válido" };

  // 3) Validación de entorno (SMTP y destinatario)
  const {
    CONTACT_FORM_HOST,
    CONTACT_FORM_SEND_EMAIL,
    CONTACT_FORM_PASS,
    CONTACT_FORM_RECEIVE_EMAIL,
  } = process.env;

  if (!CONTACT_FORM_HOST || !CONTACT_FORM_SEND_EMAIL || !CONTACT_FORM_PASS || !CONTACT_FORM_RECEIVE_EMAIL) {
    return { error: "Configuración SMTP incompleta" };
  }

  // 4) Transporte SMTP (secure solo en 465)
  const port = Number(process.env.CONTACT_FORM_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: CONTACT_FORM_HOST,
    port,
    secure: port === 465,
    auth: { user: CONTACT_FORM_SEND_EMAIL, pass: CONTACT_FORM_PASS },
  });

  try {
    // 5) Render HTML (contacto interno, sin imagen de header)
    const html = compileContactTemplate({ nameSurname: name, email, phone, message });

    await transporter.sendMail({
      from: `Website Contact Form <${CONTACT_FORM_SEND_EMAIL}>`,
      replyTo: email,
      to: CONTACT_FORM_RECEIVE_EMAIL,
      subject: `Nuevo contacto - ${name}`,
      html,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("sendContactForm error:", err);
    return { error: "No se pudo enviar el correo" };
  }
}

/** Verifica token de reCAPTCHA contra Google */
async function validateHuman(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET || process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return false;

  // Se recomienda usar POST con x-www-form-urlencoded
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    cache: "no-store",
  });

  const json = (await res.json()) as { success?: boolean; score?: number; action?: string };
  return Boolean(json.success);
}

/** Compila plantilla handlebars con el estilo neón ya aplicado en contactTemplate */
function compileContactTemplate(ctx: {
  nameSurname: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const template = handlebars.compile(contactTemplate);
  return template(ctx);
}

/** Validación simple de email */
function isValidEmail(mail: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}
