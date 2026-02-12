import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Dr. Raffaele Del Prete",
  description: "Content management system",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
