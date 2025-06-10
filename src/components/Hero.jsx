import React from "react";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white font-serif"
      style={{
        backgroundImage: "url('/images/cover.jpg')",
        minHeight: "90vh",
      }}
    >
      {/* Overlay de color oscuro para mejorar contraste */}
      <div className="absolute inset-0 bg-[#0c1b33]/70"></div>

      {/* Contenido centrado */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
          Servicios Legales Claros, Confiables
          <br />y al Alcance de Todos
        </h1>
        <p className="text-lg md:text-xl mb-8 text-neutral-200">
          Nombre del Abogado
          <br />
          Abogada Especialista
        </p>
        <button className="bg-white text-[#0c1b33] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-neutral-200 transition">
          Ver Paquetes
        </button>
      </div>
    </section>
  );
}
