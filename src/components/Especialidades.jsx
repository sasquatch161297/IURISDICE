import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    async function fetchEspecialidades() {
      const { data, error } = await supabase.from("especialidades").select("*");
      if (!error) setEspecialidades(data);
      else console.error("Error al obtener especialidades:", error);
    }
    fetchEspecialidades();
  }, []);

  const triggerNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === especialidades.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 300);
  };

  const triggerPrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? especialidades.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  const especialidad = especialidades[index];

  return (
    <section className="bg-[#f9f6ef] py-16 px-6 font-serif">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#0c1b33] mb-10">
          Áreas de <span className="block sm:inline">Especialización</span>
        </h2>
        <div
          className={`bg-white rounded-xl shadow-md p-6 h-full transform transition-all duration-500 ease-in-out ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {especialidad && (
            <>
              <div className="text-xl font-semibold text-[#0c1b33] mb-2">
                {especialidad.nombre}
              </div>
              <p className="text-sm text-[#4b4b4b]">
                {especialidad.descripcion}
              </p>
            </>
          )}
        </div>
        <div className="flex justify-center gap-6 mt-6 text-[#0c1b33]">
          <button
            onClick={triggerPrev}
            className="hover:text-[#1d2e4a] transition"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={triggerNext}
            className="hover:text-[#1d2e4a] transition"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
