import React from "react";

export default function CTA() {
  return (
    <section className="bg-[#0c1b33] text-white py-16 px-6 text-center font-serif">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        ¿Listo para resolver tu situación legal?
      </h2>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="bg-white text-[#0c1b33] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
          Agendar cita
        </button>
        <button className="bg-white text-[#0c1b33] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
          Llamar ahora
        </button>
        <button className="bg-white text-[#0c1b33] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
          WhatsApp
        </button>
      </div>
    </section>
  );
}
