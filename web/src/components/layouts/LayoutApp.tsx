import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Header from "../Header";
import { ReactNode } from "react";
import MainContent from "../MainContent";

export default function LayoutApp({ children }: { children: ReactNode }) {
  return (
    // <main className="relative h-screen  bg-gray-100 ">
    //   {/* <div className="flex items-start justify-between">
    //     <Sidebar />
    //     <div className="w-full">
    //       <Header />
    //       <MainContent>{children}</MainContent>
    //       <Footer />
    //     </div>
    //   </div> */}
    //   <div className='grid grid-cols-[15rem_1fr] grid-rows-[10rem_1fr_10rem]'>
    //     <div className=''>

    //     </div>
    //   </div>
    // </main>
    <main className="flex h-screen">
      <div className="flex h-full flex-col">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex flex-1 flex-col overflow-hidden p-4">
          <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
            Botão
          </button>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full table-auto">
              <thead className="sticky bg-gray-300">
                <tr>
                  <th className="px-4 py-2">Cabeçalho 1</th>
                  <th className="px-4 py-2">Cabeçalho 2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="border px-4 py-2">Dado 1</td>
                  <td className="border px-4 py-2">Dado 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <footer className="bg-gray-300 p-4 text-gray-700">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
