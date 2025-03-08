import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import RootProvider from "./providers";

export const metadata: Metadata = {
  title: "Restaurant Dashboard",
  description: "Dashboard para gerenciamento de restaurantes",
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