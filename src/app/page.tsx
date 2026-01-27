import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tratamientos from "@/components/Tratamientos";
import SobreMi from "@/components/SobreMi";
import Resultados from "@/components/Resultados";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Tratamientos />
      <SobreMi />
      <Resultados />
      <Contacto />
      <Footer />
    </main>
  );
}
