import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDEAM Estaciones - MVP",
  description: "Visualización de estaciones meteorológicas del IDEAM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
