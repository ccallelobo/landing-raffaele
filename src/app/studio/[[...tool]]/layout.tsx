export const metadata = {
  title: "Dr. Raffaele - CMS Studio",
  description: "Panel de administración de contenido",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
