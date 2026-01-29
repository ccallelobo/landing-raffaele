import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import Resenas from "@/components/Resenas";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { getTratamientos, getResultados, getResenas } from "@/lib/sanity";

// Revalidar datos de Sanity cada 60 segundos
export const revalidate = 60;

export default async function Home() {
  const [tratamientos, resultados, resenas] = await Promise.all([
    getTratamientos(),
    getResultados(),
    getResenas(),
  ]);

  return (
    <>
      <Navbar />
      <main className="relative" style={{ clipPath: 'inset(0)', contain: 'paint' }}>
        <Hero />
        <Tratamientos data={tratamientos} />
        <SobreMi />
        <Resultados data={resultados} />
        <Resenas data={resenas} />
        <Contacto />
        <Footer />
      </main>
    </>
  );
}
