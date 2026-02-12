import type { Viewport } from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// This root layout is required by Next.js but we delegate to child layouts
// Each child layout ([locale], version-*, studio) handles their own html/body
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
