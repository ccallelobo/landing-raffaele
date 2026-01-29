import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | Dr. Raffaele Del Prete",
  description: "Política de privacidad y protección de datos personales de la clínica del Dr. Raffaele Del Prete.",
};

export default function PrivacidadPage() {
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
            Política de Privacidad
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="prose prose-lg max-w-none text-noir/70 space-y-8">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">1. Responsable del Tratamiento</h2>
            <p>
              <strong>Identidad:</strong> Dr. Raffaele Del Prete<br />
              <strong>Dirección:</strong> Madrid, España<br />
              <strong>Teléfono:</strong> +34 604 89 46 97<br />
              <strong>Email:</strong> contacto@drraffaele.com
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Datos Personales que Recopilamos</h2>
            <p>En cumplimiento del Reglamento General de Protección de Datos (RGPD) 2016/679, le informamos que los datos personales que podemos recopilar incluyen:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Datos identificativos: nombre, apellidos, DNI/NIE</li>
              <li>Datos de contacto: dirección postal, email, teléfono</li>
              <li>Datos de salud: historial médico, tratamientos realizados (con su consentimiento expreso)</li>
              <li>Datos de navegación: cookies y datos técnicos de su visita</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Finalidad del Tratamiento</h2>
            <p>Sus datos personales serán tratados con las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestión de citas y consultas médicas</li>
              <li>Prestación de servicios médicos y estéticos</li>
              <li>Comunicaciones relacionadas con su tratamiento</li>
              <li>Envío de información comercial (solo con su consentimiento)</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Legitimación</h2>
            <p>La base legal para el tratamiento de sus datos es:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Su consentimiento expreso</li>
              <li>La ejecución de un contrato de servicios médicos</li>
              <li>El cumplimiento de obligaciones legales (especialmente en materia sanitaria)</li>
              <li>El interés legítimo del responsable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Conservación de los Datos</h2>
            <p>
              Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron.
              Los datos de salud se conservarán según la legislación sanitaria vigente (mínimo 5 años desde la última asistencia).
              Los datos de facturación se conservarán durante el plazo legal establecido.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Destinatarios</h2>
            <p>
              Sus datos no serán cedidos a terceros salvo obligación legal.
              Podrán tener acceso a sus datos los encargados del tratamiento necesarios para la prestación del servicio
              (laboratorios, centros médicos colaboradores) siempre bajo las debidas garantías de confidencialidad.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">7. Derechos del Interesado</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> conocer qué datos personales tenemos sobre usted</li>
              <li><strong>Rectificación:</strong> modificar datos inexactos o incompletos</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de sus datos</li>
              <li><strong>Limitación:</strong> solicitar la limitación del tratamiento</li>
              <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, puede contactarnos en contacto@drraffaele.com adjuntando copia de su DNI.
              También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">8. Seguridad</h2>
            <p>
              Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos
              y evitar su alteración, pérdida, tratamiento o acceso no autorizado, según el estado de la tecnología,
              la naturaleza de los datos y los riesgos a los que están expuestos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">9. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar esta política de privacidad para adaptarla a novedades legislativas
              o jurisprudenciales. En caso de cambios significativos, se lo notificaremos a través de nuestra web.
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
