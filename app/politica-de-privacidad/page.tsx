import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de ROMIL PLUS.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const sections = [
  {
    title: "1. Información que podemos tratar",
    body: "ROMIL PLUS puede tratar datos que el usuario proporciona al registrarse, realizar una compra, contactar con soporte o comunicarse mediante WhatsApp Business. Esto puede incluir nombre, correo electrónico, número de teléfono, mensajes, archivos adjuntos, comprobantes de pago y datos necesarios para atender pedidos o consultas.",
  },
  {
    title: "2. Finalidades",
    body: "Usamos la información para gestionar cuentas, procesar y dar seguimiento a pedidos, brindar soporte, responder consultas, prevenir fraudes, mantener la seguridad del servicio y mejorar la atención al cliente.",
  },
  {
    title: "3. WhatsApp y mensajería",
    body: "Cuando el usuario se comunica con ROMIL PLUS mediante WhatsApp Business, los mensajes y archivos enviados pueden ser procesados para atender la conversación. La integración puede utilizar servicios de Meta y la Plataforma de WhatsApp Business conforme a sus propios términos y políticas.",
  },
  {
    title: "4. Proveedores de servicio",
    body: "ROMIL PLUS puede utilizar proveedores tecnológicos para alojamiento, base de datos, autenticación, almacenamiento, mensajería y entrega del sitio. Estos proveedores solo intervienen en la medida necesaria para operar el servicio.",
  },
  {
    title: "5. Conservación y eliminación",
    body: "Conservamos la información durante el tiempo necesario para cumplir las finalidades descritas, atender obligaciones operativas y resolver incidencias. Algunos archivos de soporte pueden eliminarse cuando una conversación se marca como resuelta o cuando dejan de ser necesarios.",
  },
  {
    title: "6. Seguridad",
    body: "Aplicamos medidas razonables para proteger la información frente a acceso no autorizado, pérdida, alteración o divulgación indebida. Ningún sistema de transmisión o almacenamiento es completamente infalible.",
  },
  {
    title: "7. Derechos y consultas",
    body: "El usuario puede solicitar información, corrección o eliminación de sus datos, cuando corresponda, contactando a ROMIL PLUS mediante el canal de soporte disponible en el sitio web.",
  },
  {
    title: "8. Cambios a esta política",
    body: "Podemos actualizar esta política para reflejar cambios en el servicio, requisitos legales o proveedores utilizados. La versión vigente será siempre la publicada en esta página.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto min-h-[75vh] max-w-4xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl border border-[#d6b25e]/20 bg-white/[0.03] p-6 shadow-[0_0_45px_rgba(214,178,94,.06)] sm:p-8">
        <p className="text-xs font-black uppercase tracking-[.18em] text-[#d6b25e]">ROMIL PLUS</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Política de privacidad</h1>
        <p className="mt-3 text-sm leading-6 text-white/55">Última actualización: 8 de septiembre de 2026.</p>

        <div className="mt-8 space-y-7">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-black text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-white/65">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/55">
          Para consultas relacionadas con privacidad, utiliza el canal de <Link href="/soporte" className="font-black text-[#e3b64f] underline underline-offset-4">Soporte de ROMIL PLUS</Link>.
        </div>
      </div>
    </main>
  );
}
