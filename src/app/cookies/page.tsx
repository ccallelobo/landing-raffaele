import Link from "next/link";

export const metadata = {
  title: "Política de Cookies | Dr. Raffaele Del Prete",
  description: "Información sobre el uso de cookies en el sitio web del Dr. Raffaele Del Prete.",
};

export default function CookiesPage() {
  return (
    <main className="bg-stone min-h-screen">
      {/* Header */}
      <div className="bg-noir py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-8 md:px-12">
          <Link
            href="/"
            className="text-gold text-[12px] font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            &larr; Volver al inicio
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-white mt-6">
            Política de Cookies
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o móvil)
              cuando visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período
              de tiempo, para que no tenga que volver a introducirlos cada vez que visite el sitio o navegue de una
              página a otra.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Tipos de Cookies que Utilizamos</h2>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">Cookies Técnicas (Necesarias)</h3>
            <p>
              Son imprescindibles para el funcionamiento del sitio web. Permiten la navegación y el uso de las
              diferentes opciones o servicios. Sin ellas, el sitio web no funcionaría correctamente.
            </p>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">Cookies de Análisis</h3>
            <p>
              Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico
              de la utilización del sitio web. Para ello se analiza su navegación con el fin de mejorar
              la oferta de productos o servicios.
            </p>

            <h3 className="font-display text-xl text-noir mb-2 mt-6">Cookies de Preferencias</h3>
            <p>
              Permiten recordar información para que el usuario acceda al servicio con determinadas características
              que pueden diferenciar su experiencia de la de otros usuarios (idioma, aspecto, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Cookies de Terceros</h2>
            <p>Este sitio web puede utilizar servicios de terceros que recopilan información con fines estadísticos y de uso del sitio:</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-noir/20">
                    <th className="text-left py-3 pr-4 font-semibold text-noir">Servicio</th>
                    <th className="text-left py-3 pr-4 font-semibold text-noir">Finalidad</th>
                    <th className="text-left py-3 font-semibold text-noir">Más información</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-noir/10">
                    <td className="py-3 pr-4">Vercel Analytics</td>
                    <td className="py-3 pr-4">Análisis de rendimiento</td>
                    <td className="py-3">
                      <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                        Política de Vercel
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Gestión de Cookies</h2>
            <p>
              Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración
              de las opciones del navegador instalado en su ordenador.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="mt-4">
              Si desactiva las cookies, es posible que algunas funcionalidades del sitio web no estén disponibles
              o no funcionen correctamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Actualización de la Política</h2>
            <p>
              Esta política de cookies puede actualizarse en cualquier momento para adaptarse a novedades
              normativas o cambios en nuestro sitio web. Le recomendamos revisar esta página periódicamente
              para estar informado de cómo y para qué usamos las cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Contacto</h2>
            <p>
              Si tiene cualquier duda sobre esta Política de Cookies, puede contactar con nosotros a través de:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> contacto@drraffaele.com<br />
              <strong>Teléfono:</strong> +34 604 89 46 97
            </p>
          </section>

          <p className="text-sm text-noir/50 pt-8 border-t border-noir/10">
            Última actualización: Enero 2025
          </p>
        </div>
      </div>
    </main>
  );
}
