import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import Resenas from "@/components/Resenas";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { getTratamientos, getResultados, getResenas } from "@/lib/sanity";

export default async function Home() {
  const [tratamientos, resultados, resenas] = await Promise.all([
    getTratamientos(),
    getResultados(),
    getResenas(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Tratamientos data={tratamientos} />
      <SobreMi />
      <Resultados data={resultados} />
      <Resenas data={resenas} />
      <Contacto />
      <Footer />
    </main>
  );
}
