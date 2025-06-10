import React, { useState, useEffect } from "react";
import { FaBalanceScale, FaFileContract, FaGavel } from "react-icons/fa";
import FormularioModal from "./FormularioModal";
import { supabase } from "../supabaseClient";

const iconMap = {
  Básico: <FaBalanceScale className="text-4xl mb-4 mx-auto text-[#0c1b33]" />,
  Estándar: <FaFileContract className="text-4xl mb-4 mx-auto text-[#0c1b33]" />,
  Premium: <FaGavel className="text-4xl mb-4 mx-auto text-[#0c1b33]" />,
};

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paqueteId, setPaqueteId] = useState(null);

  useEffect(() => {
    async function fetchPaquetes() {
      const { data, error } = await supabase.from("paquetes").select(`
          id,
          nombre,
          descripcion,
          precio,
          paquete_servicio (
            servicio_id (
              id,
              nombre
            )
          )
        `);

      if (error) {
        console.error("Error al obtener paquetes con servicios:", error);
      } else {
        setPaquetes(data);
      }
    }

    fetchPaquetes();
  }, []);

  const openModal = (id) => {
    setPaqueteId(id);
    setModalVisible(true);
  };

  return (
    <section className="py-20 px-6 bg-[#0c1b33] text-[#0c1b33] font-serif">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {paquetes.map((p, i) => (
          <div
            key={i}
            className="bg-[#f9f6ef] rounded-xl shadow-md p-8 text-center flex flex-col justify-between min-h-[360px]"
          >
            <div>
              {iconMap[p.nombre] || (
                <FaBalanceScale className="text-4xl mb-4 mx-auto text-[#0c1b33]" />
              )}
              <h3 className="text-2xl font-semibold mb-1 text-[#0c1b33] tracking-tight">
                {p.nombre}
              </h3>
              <p className="text-sm mb-4 font-medium text-[#4b4b4b]">
                Desde ${p.precio}
              </p>
              <ul className="text-left mb-8 px-6 text-sm list-disc text-[#4b4b4b]">
                {p.paquete_servicio.map((ps, idx) => (
                  <li key={idx}>{ps.servicio_id.nombre}</li>
                ))}
              </ul>
            </div>
            <button
              className="bg-[#0c1b33] text-white px-6 py-2 rounded-md font-semibold w-full hover:bg-[#1b2f50] transition"
              onClick={() => openModal(p.id)}
            >
              Solicitar
            </button>
          </div>
        ))}
      </div>

      <FormularioModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        paqueteId={paqueteId}
      />
    </section>
  );
}
