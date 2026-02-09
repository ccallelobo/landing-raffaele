import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import MarcasTecnologias from "@/components/MarcasTecnologias";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import CasosExito from "@/components/CasosExito";
import Resenas from "@/components/Resenas";
import Contacto from "@/components/Contacto";
import FormularioMedicos from "@/components/FormularioMedicos";
import Footer from "@/components/Footer";
import { getResultados, getResenas } from "@/lib/sanity";

// Revalidate Sanity data every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const [resultados, resenas] = await Promise.all([
    getResultados(),
    getResenas(),
  ]);

  return (
    <>
      <Navbar />
      <main
        className="relative"
        style={{ clipPath: "inset(0)", contain: "paint" }}
      >
        <Hero />
        <Tratamientos />
        <MarcasTecnologias />
        <SobreMi />
        <Resultados data={resultados} />
        <CasosExito data={resultados} />
        <Resenas data={resenas} />
        <Contacto />
        <FormularioMedicos />
        <Footer />
      </main>
    </>
  );
}
