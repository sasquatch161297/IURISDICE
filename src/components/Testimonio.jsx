import React from "react";

export default function Testimonio() {
  return (
    <section className="bg-white py-16 px-6 text-center">
      <div className="max-w-xl mx-auto bg-[#fdfaf4] rounded-xl p-8 shadow">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Testimonio"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <p className="italic mb-2 text-gray-700">
          “Gracias a su asesoría pude resolver un problema laboral sin ir a
          juicio. Muy claro y profesional.”
        </p>
        <p className="font-semibold">Sandra M.</p>
      </div>
    </section>
  );
}
