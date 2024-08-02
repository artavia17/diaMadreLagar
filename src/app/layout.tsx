import type { Metadata } from "next";
import "../scss/global.scss";

export const metadata: Metadata = {
  title: "Día de la madre | El Lagar",
  description: "Celebra el Día de la Madre con El Lagar. Encuentra el regalo perfecto con nuestras ofertas especiales en herramientas, decoración y productos para el hogar. ¡Sorprende a mamá con lo mejor!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {children}
    </html>
  );
}
