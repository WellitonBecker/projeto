import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";

import { ReactNode } from "react";
import LayoutApp from "@/components/layouts/LayoutApp";
import LayoutLogin from "@/components/layouts/LayoutLogin";
import { cookies } from "next/headers";
import LayoutMinhasEmpresas from "@/components/layouts/LayoutMinhasEmpresas";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jumjeree",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAutenticado = cookies().has("token");
  const isEmpresaSel = cookies().has("empresa");

  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${baiJamjuree.variable}`}>
        {!isAutenticado ? <LayoutLogin /> : (!isEmpresaSel ? <LayoutMinhasEmpresas /> : <LayoutApp>{children}</LayoutApp>)}
      </body>
    </html>
  );
}
