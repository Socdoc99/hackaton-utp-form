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
Proyecto final – Curso de Inteligencia Artificial

---

# 🧩 **2. GUION PROFESIONAL PARA LA PRESENTACIÓN DEL PROYECTO**

Puedes leerlo tal cual durante tu exposición.

---

## 🎤 **GUION: Presentación del Proyecto Final – Hackatón UTP 2025/2**

### **1. Introducción**
Buenos días/tardes.  
Mi nombre es **Santiago Ospina Calle** y hoy presento el proyecto final del curso:  
**Formulario de inscripción automatizado para la Hackatón UTP 2025/2**.

La idea principal es crear un sistema profesional que permita registrar participantes y enviarles una confirmación automática por correo.

---

## **2. Problema que resuelve**
Tradicionalmente, los eventos requieren:
- Formularios manuales,
- Revisión correo por correo,
- Validación individual,
- Contactar a cada persona.

Esto genera demoras, errores y un proceso poco profesional.

---

## **3. Solución desarrollada**
Diseñé una aplicación moderna con:
- **Formulario interactivo**.
- **Validación automática**.
- **Protección contra bots**.
- **Correo de confirmación personalizado**.
- **Diseño visual alineado a una hackatón: neón + estilo hacker**.

---

## **4. Arquitectura del Proyecto**
Explicar brevemente:

- **Frontend:** Next.js + React + Tailwind.
- **Backend:** API routes + Server Actions (Next.js 14).
- **Correo:** Nodemailer + Mailtrap.
- **Plantillas:** Handlebars.
- **Seguridad:** Google reCAPTCHA.
- **Hosting:** Vercel.

---

## **5. Flujo General del Sistema**
1. El usuario abre el formulario.  
2. Llena nombre, email y teléfono.  
3. El sistema ejecuta reCAPTCHA invisible.  
4. Se valida que sea humano.  
5. Se envía una solicitud a la API interna.  
6. La API envía un correo personalizado al usuario.  
7. El usuario queda registrado y recibe confirmación inmediata.

---

## **6. Parte Técnica (explicación para el profesor)**

### **Formulario (form.tsx)**
- Validación con **React Hook Form** y **Zod**.
- Inputs con diseño neon.
- Mensajes de error dinámicos.
- reCAPTCHA invisible integrado.

### **Server Actions (actions.ts)**
- Se valida el token reCAPTCHA.
- Se genera el correo interno con Handlebars.

### **Ruta API (send/route.ts)**
- Nodemailer genera y envía el correo.
- Se adjunta un banner en CID para el header.
- Estética neón en el HTML del email.

### **Plantilla HTML del correo**
- Colores neón.
- Tipografía monoespaciada.
- Banner de la Hackatón.
- Mensaje personalizado con el nombre del usuario.

### **Estilos globales**
- Reescritura total con Tailwind + CSS variables.
- Tema **oscuro** + acentos neón dinámicos.

---

## **7. Parte Práctica (lo que vas a mostrar en clase)**

1. Abrir el sitio local o en Vercel.  
2. Mostrar la estética del formulario.  
3. Completar un registro de prueba.  
4. Mostrar validaciones dinámicas.  
5. Enviar el formulario.  
6. Abrir Mailtrap y mostrar el correo recibido.  
7. Mostrar el código:
   - `page.tsx`
   - `components/form.tsx`
   - `app/api/send/route.ts`
   - `app/actions.ts`
8. Explicar la estructura del repositorio.

---

## **8. Cierre**
Resumir:

> “Este proyecto integra frontend, backend, seguridad, automatización y diseño moderno, brindando una experiencia real y profesional en un evento académico.”

