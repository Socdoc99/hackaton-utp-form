"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";
import { CgSpinner } from "react-icons/cg";

const formSchema = z.object({
  nameSurname: z.string().min(1, { message: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Correo no válido" }),
  phone: z.string().min(7, { message: "Número de teléfono no válido" }),
});
type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const baseInput =
    "w-full bg-[#1A1B26] text-[#E0E0E0] font-mono border-2 rounded-md outline-none transition-all duration-300 placeholder:text-[#00FFAB]/60 focus:border-[#3A86FF] focus:shadow-[0_0_10px_#3A86FF40]";
  const withIconPad = "py-2 pl-10 pr-3";
  const borderNeon = "border-[#00FFAB]";
  const errorBorder =
    "border-red-500 placeholder:text-red-400/70 focus:shadow-[0_0_10px_#ff000040]";
  const labelCls = "text-sm text-[#A0A0A0] font-mono mb-1 block";
  const errorText = "text-red-400 text-xs mt-1 font-mono";

  const onSubmit = async (data: FormData) => {
    const token = await recaptchaRef.current?.executeAsync();
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, token }),
    });

    if (!res.ok) {
      toast({
        title: "❌ Error",
        description: "Hubo un problema al enviar la inscripción.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "✅ Enviado", description: "Inscripción registrada." });
    reset();
  };

  const handleReset = () => {
    reset();
    toast({ title: "🧹 Formulario limpiado" });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Campo Nombre */}
      <div className="mb-4">
        <label className={labelCls}>Nombre completo</label>
        <div className="relative">
          <FiUser
            className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3 ${
              errors.nameSurname ? "text-red-400" : "text-[#E0E0E0]"
            }`}
          />
          <input
            type="text"
            placeholder="Tu nombre y apellido"
            {...register("nameSurname")}
            className={`${baseInput} ${withIconPad} ${
              errors.nameSurname ? errorBorder : borderNeon
            }`}
          />
        </div>
        {errors.nameSurname && (
          <div className={errorText}>{errors.nameSurname.message}</div>
        )}
      </div>

      {/* Campo Email */}
      <div className="mb-4">
        <label className={labelCls}>Correo electrónico</label>
        <div className="relative">
          <FiMail
            className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3 ${
              errors.email ? "text-red-400" : "text-[#E0E0E0]"
            }`}
          />
          <input
            type="email"
            placeholder="tu@email.com"
            {...register("email")}
            className={`${baseInput} ${withIconPad} ${
              errors.email ? errorBorder : borderNeon
            }`}
          />
        </div>
        {errors.email && (
          <div className={errorText}>{errors.email.message}</div>
        )}
      </div>

      {/* Campo Teléfono */}
      <div className="mb-6">
        <label className={labelCls}>Teléfono</label>
        <div className="relative">
          <FiPhone
            className={`w-5 h-5 absolute top-1/2 -translate-y-1/2 left-3 ${
              errors.phone ? "text-red-400" : "text-[#E0E0E0]"
            }`}
          />
          <input
            type="tel"
            placeholder="+57 300 000 0000"
            {...register("phone")}
            className={`${baseInput} ${withIconPad} ${
              errors.phone ? errorBorder : borderNeon
            }`}
          />
        </div>
        {errors.phone && (
          <div className={errorText}>{errors.phone.message}</div>
        )}
      </div>

      {/* reCAPTCHA invisible */}
      <div className="hidden">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          size="invisible"
          ref={recaptchaRef}
          hl="es"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-mono px-8 h-11 rounded-md border-2 transition-all duration-300
            ${isSubmitting ? "opacity-60 cursor-not-allowed" : "opacity-100"}
            border-[#00FFAB] text-[#0D0D0F] bg-[#00FFAB]
            hover:bg-transparent hover:text-[#E0E0E0]
            hover:shadow-[0_0_16px_#00FFAB80]
            focus:shadow-[0_0_16px_#3A86FF80] focus:border-[#3A86FF]
          `}
        >
          {isSubmitting ? <CgSpinner className="animate-spin w-6 h-6" /> : "Enviar inscripción"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="font-mono px-8 h-11 rounded-md border-2 border-[#3A86FF] text-[#3A86FF] hover:text-[#E0E0E0] hover:border-[#00FFAB] hover:shadow-[0_0_12px_#00FFAB60] bg-transparent transition-all duration-300"
        >
          Limpiar formulario
        </button>
      </div>
    </form>
  );
}
