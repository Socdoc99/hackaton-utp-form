# ![Logo del proyecto](public/logo.png)

# Hackatón UTP 2025/2 – Formulario de Inscripción

Este proyecto corresponde al desarrollo de un **formulario de inscripción automatizado** para la Hackatón UTP 2025/2 en la Universidad Tecnológica de Pereira.  
El sistema permite que los participantes se registren en línea y reciban un **correo de confirmación personalizado**, asegurando automatización, eficiencia y una experiencia moderna.

---

## 🚀 Características Principales

- Interfaz moderna con **estética neón + estilo hacker**.
- Formulario validado con:
  - **React Hook Form**
  - **Zod**
  - **Google reCAPTCHA v2 Invisible**
- Envío de correos automáticos con:
  - **Nodemailer**
  - **SMTP (Mailtrap)**
  - Plantilla HTML personalizada con diseño neón.
- Arquitectura organizada en **App Router (Next.js 14)**.
- Código estructurado con buenas prácticas:
  - Separación de acciones, rutas API y plantillas.
- Totalmente **responsive** y optimizado para despliegue en Vercel.

---

## 🧱 Estructura del Proyecto

hackaton-utp-form/
│
├── app/
│ ├── api/
│ │ └── send/route.ts → Envío de correos al usuario
│ ├── actions.ts → Validación reCAPTCHA + correo interno
│ └── page.tsx → Página principal del formulario
│
├── components/
│ └── form.tsx → Formulario principal
│
├── templates/
│ └── contact.tsx → Plantilla HTML del correo interno
│
├── public/
│ ├── logo.png → Logo IA del proyecto
│ ├── Mainbanner.png → Banner principal
│ ├── Mailheader.png → Header para el correo
│
└── README.md → Documentación del proyecto


---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- Next.js 14 (App Router)
- React
- Tailwind CSS
- TypeScript

### **Backend**
- Node.js
- Nodemailer (SMTP)
- Handlebars (plantillas HTML)

### **Servicios**
- Google reCAPTCHA v2 Invisible
- Mailtrap (SMTP sandbox)
- Vercel (hosting)

---

## ⚙️ Configuración del Entorno (.env.local)

Crear un archivo `.env.local` con:

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=tu_usuario_mailtrap
SMTP_PASS=tu_contraseña_mailtrap
MAIL_FROM="Hackatón UTP 2025/2 no-reply@hackatonutp.com
"

RECAPTCHA_SECRET_KEY=tu_clave_secreta
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_publica


---

## ▶️ Ejecución del Proyecto

### 1. Instalar dependencias:
npm install

### 2. Ejecutar entorno local:
npm run dev

### 3. Abrir en el navegador:
http://localhost:3000


---

## ☁️ Despliegue en Vercel

1. Subir a GitHub.
2. Importar el repositorio en Vercel.
3. Añadir las variables de entorno.
4. Deploy en un solo clic.

---

## 👨🏻‍💻 Autor

**Santiago Ospina Calle**  
Estudiante – Universidad Tecnológica de Pereira  
Proyecto final – Curso de Desarrollo web.

---
