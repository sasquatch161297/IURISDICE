import React from "react";
import Hero from "./components/Hero";
import Paquetes from "./components/Paquetes";
import Especialidades from "./components/Especialidades";
import Testimonio from "./components/Testimonio";
import CTA from "./components/CTA";
import FormularioModal from "./components/FormularioModal";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Hero />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#0c1b33",
            color: "#fff",
            fontFamily: "serif",
            fontSize: "14px",
            borderRadius: "8px",
          },
        }}
      />
      <Paquetes />
      <FormularioModal />
      <Especialidades />
      <Testimonio />
      <CTA />
    </>
  );
}
