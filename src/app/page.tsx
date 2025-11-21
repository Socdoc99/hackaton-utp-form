import Form from "@/components/form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0F] text-[#E0E0E0] flex flex-col items-center justify-center py-10 px-4">
      <Head>
        <title>Hackatón UTP 2025/2 – Formulario de Inscripción</title>
      </Head>

      <div className="md:w-1/2 w-full max-w-2xl p-8 border border-[#00FFAB]/40 bg-[#1A1B26] rounded-2xl shadow-[0_0_25px_#00FFAB50] relative">
        <Image
          src="/Mainbanner.png"
          alt="Hackatón UTP 2025/2 Banner"
          width={800}
          height={200}
          className="rounded-lg mb-6 shadow-[0_0_10px_#00FFAB80]"
          priority
        />

        <h1 className="text-3xl font-mono font-bold text-center text-[#00FFAB] drop-shadow-[0_0_5px_#00FFAB] mb-3">
          Hackatón UTP 2025/2
        </h1>

        <p className="text-center text-[#A0A0A0] font-mono mb-6 leading-relaxed">
          🚀 Evento de programación y creatividad tecnológica organizado por Santiago Ospina Calle {" "}
          <strong className="text-[#3A86FF]">
             - Estudiante de la Universidad Tecnológica de Pereira
          </strong>
          .
        </p>

        <div className="text-sm mb-6 font-mono text-center text-[#E0E0E0]">
          <p>
            📅 <strong className="text-[#00FFAB]">29 de Noviembre de 2025</strong>
          </p>
          <p>
            🕕 <strong className="text-[#B5179E]">6:00 p.m.</strong>
          </p>
          <p>
            📍 <strong className="text-[#3A86FF]">Bloque 3 – CRIE UTP</strong>
          </p>
        </div>

        <div>
          <p className="text-center text-[#A0A0A0] font-mono mb-6 leading-relaxed">
          👾 ¡Llena el formulario y recibirás un correo electrónico con la confirmación de tu inscripción!
        </p>
          </div>

        <Form />

        <div className="text-center mt-8 text-xs text-[#6c757d]">
          <Link
            className="underline text-[#3A86FF] hover:text-[#00FFAB] transition-colors"
            href="https://github.com/Socdoc99/hackaton-utp-form"
            target="_blank"
          >
            Ver GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
