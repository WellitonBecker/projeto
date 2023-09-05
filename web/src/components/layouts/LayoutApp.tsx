import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Header from "../Header";
import { ReactNode } from "react";
import MainContent from "../MainContent";

export default function LayoutApp({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen">
      <div className="flex h-full flex-col">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </main>
  );
}
