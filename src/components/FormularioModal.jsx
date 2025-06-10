import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";

export default function FormularioModal({ visible, onClose, paqueteId }) {
  const [paquete, setPaquete] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  useEffect(() => {
    if (visible && paqueteId) {
      supabase
        .from("paquetes")
        .select("*")
        .eq("id", paqueteId)
        .single()
        .then(({ data }) => setPaquete(data));
    }
    if (visible) {
      setForm({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        mensaje: "",
      });
    }
  }, [visible, paqueteId]);

  if (!visible) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.correo || !form.telefono) {
      return toast.error("Por favor completá todos los campos requeridos.");
    }

    if (!paqueteId) {
      return toast.error("No se ha seleccionado un paquete válido.");
    }

    const { data: existingClient, error: searchError } = await supabase
      .from("clientes")
      .select("*")
      .eq("correo", form.correo)
      .single();

    let cliente = existingClient;

    if (searchError && searchError.code !== "PGRST116") {
      return toast.error("Error buscando cliente existente");
    }

    if (!existingClient) {
      const { data: newClient, error: insertError } = await supabase
        .from("clientes")
        .insert([
          {
            nombre: form.nombre,
            apellido: form.apellido,
            correo: form.correo,
            telefono: form.telefono,
          },
        ])
        .select()
        .single();

      if (insertError) return toast.error("Error registrando cliente");
      console.log(insertError);

      cliente = newClient;
    }

    // Verificar si ya existe una solicitud con el mismo cliente y paquete
    const { data: existingSolicitud, error: solicitudError } = await supabase
      .from("formularios_solicitudes")
      .select("id")
      .eq("cliente_id", cliente.id)
      .eq("paquete_id", paqueteId);

    if (solicitudError) {
      console.error("Error validando solicitud existente:", solicitudError);
      return toast.error("No se pudo validar solicitudes anteriores.");
    }

    if (Array.isArray(existingSolicitud) && existingSolicitud.length > 0) {
      return toast("Ya has solicitado este paquete anteriormente", {
        icon: "⚠️",
        style: {
          background: "#fff3cd",
          color: "#856404",
          fontFamily: "serif",
        },
      });
    }

    const { data: solicitudInsertada, error: err2 } = await supabase
      .from("formularios_solicitudes")
      .insert([
        {
          cliente_id: cliente.id,
          paquete_id: paqueteId,
          mensaje: form.mensaje,
        },
      ])
      .select()
      .single();

    if (err2) {
      if (err2.code === "42501" || err2.code === "23505") {
        return toast("Ya has solicitado este paquete anteriormente", {
          icon: "⚠️",
          style: {
            background: "#fff3cd",
            color: "#856404",
            fontFamily: "serif",
          },
        });
      }
      return toast.error("Error enviando solicitud");
    }

    try {
      await fetch("https://iurisdice.onrender.com/api/notificar-solicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          correo: form.correo,
          telefono: form.telefono,
          mensaje: form.mensaje,
          paquete: paquete?.nombre,
        }),
      });
    } catch (err) {
      console.error("Error enviando correo:", err);
      toast.error("Solicitud guardada, pero el correo no se pudo enviar");
      return;
    }

    toast.success(`✅ Solicitud para "${paquete?.nombre}" enviada con éxito`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#f9f6ef] w-full max-w-lg p-6 rounded-xl relative shadow-xl font-serif">
        <button
          className="absolute top-2 right-3 text-xl font-bold text-neutral-700"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#0c1b33]">
          Solicitar paquete: {paquete?.nombre}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            required
            value={form.apellido}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            required
            value={form.correo}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            required
            value={form.telefono}
            onChange={handleChange}
            className="p-3 border rounded"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje (opcional)"
            rows={3}
            value={form.mensaje}
            onChange={handleChange}
            className="p-3 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-[#0c1b33] text-white py-2 rounded hover:bg-[#1b2e4a] transition"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
