import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import RootProvider from "./providers";
import './globals.css';

export const metadata: Metadata = {
  title: "QikServe - Dashboard de Restaurantes",
  description: "Plataforma de gerenciamento para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <RootProvider>
            {children}
          </RootProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}