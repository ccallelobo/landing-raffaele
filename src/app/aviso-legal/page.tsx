import Link from "next/link";

export const metadata = {
  title: "Aviso Legal | Dr. Raffaele Del Prete",
  description: "Aviso legal e información sobre el titular del sitio web del Dr. Raffaele Del Prete.",
};

export default function AvisoLegalPage() {
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
            Aviso Legal
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">1. Datos Identificativos</h2>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa:</p>
            <p>
              <strong>Titular:</strong> Dr. Raffaele Del Prete<br />
              <strong>Actividad:</strong> Medicina Estética y Cirugía Plástica<br />
              <strong>Domicilio:</strong> Madrid, España<br />
              <strong>Teléfono:</strong> +34 604 89 46 97<br />
              <strong>Email:</strong> contacto@drraffaele.com<br />
              <strong>Número de Colegiado:</strong> [Número de colegiación]
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Objeto</h2>
            <p>
              El presente sitio web tiene como finalidad informar sobre los servicios de medicina estética y cirugía plástica
              ofrecidos por el Dr. Raffaele Del Prete, así como facilitar el contacto con potenciales pacientes.
            </p>
            <p>
              La información contenida en este sitio web tiene carácter meramente informativo y en ningún caso
              sustituye el consejo médico profesional. Para cualquier consulta médica, debe concertar una cita
              con el profesional.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Condiciones de Uso</h2>
            <p>El acceso a este sitio web es gratuito y no requiere registro previo. El usuario se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hacer un uso adecuado de los contenidos y servicios ofrecidos</li>
              <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
              <li>No difundir contenidos de carácter racista, xenófobo, pornográfico, o que atenten contra los derechos humanos</li>
              <li>No introducir virus informáticos o realizar actuaciones que puedan dañar los sistemas</li>
              <li>No intentar acceder a cuentas de otros usuarios o áreas restringidas</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software,
              diseño gráfico, código fuente, etc.) son propiedad intelectual del Dr. Raffaele Del Prete o de terceros
              que han autorizado su uso, quedando prohibida su reproducción, distribución, comunicación pública o
              transformación sin autorización expresa.
            </p>
            <p>
              Las marcas, nombres comerciales o signos distintivos son propiedad del Dr. Raffaele Del Prete o de terceros,
              sin que el acceso al sitio web atribuya derecho alguno sobre los mismos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
            <p>El titular del sitio web no se hace responsable de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La falta de disponibilidad, continuidad o calidad del sitio web</li>
              <li>Los daños que puedan causarse por el uso indebido del sitio</li>
              <li>La presencia de virus o elementos lesivos en los contenidos</li>
              <li>El contenido de las páginas web a las que se pueda acceder mediante enlaces</li>
              <li>Los errores u omisiones en los contenidos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Enlaces a Terceros</h2>
            <p>
              Este sitio web puede contener enlaces a páginas de terceros. El Dr. Raffaele Del Prete no asume
              ninguna responsabilidad por el contenido, informaciones o servicios que pudieran aparecer en dichos sitios,
              que tendrán exclusivamente carácter informativo y que en ningún caso implican relación alguna entre
              el Dr. Raffaele Del Prete y las personas o entidades titulares de tales contenidos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">7. Protección de Datos</h2>
            <p>
              El tratamiento de datos personales se rige por nuestra <Link href="/privacidad" className="text-gold hover:underline">Política de Privacidad</Link>,
              donde se informa de manera detallada sobre el tratamiento de datos personales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">8. Cookies</h2>
            <p>
              Este sitio web utiliza cookies. Para más información, consulte nuestra <Link href="/cookies" className="text-gold hover:underline">Política de Cookies</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">9. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que pudiera
              derivarse del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales de Madrid,
              con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">10. Modificaciones</h2>
            <p>
              El titular se reserva el derecho de modificar en cualquier momento las presentes condiciones,
              siendo publicadas en el sitio web. La versión vigente será la publicada en cada momento.
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
