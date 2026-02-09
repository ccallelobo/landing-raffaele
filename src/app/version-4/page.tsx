import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import Resenas from "@/components/Resenas";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { getResultados, getResenas } from "@/lib/sanity";

export const revalidate = 60;

export default async function Version4() {
  const [resultados, resenas] = await Promise.all([
    getResultados(),
    getResenas(),
  ]);

  return (
    <>
      <Navbar />
      <main className="relative" style={{ clipPath: 'inset(0)', contain: 'paint' }}>
        <Hero heroImage="/hero-doctor-v4.webp" />
        <Tratamientos />
        <SobreMi sobreMiImage="/sobre-mi-doctor-v5.webp" />
        <Resultados data={resultados} />
        <Resenas data={resenas} />
        <Contacto />
        <Footer />
      </main>
    </>
  );
}
