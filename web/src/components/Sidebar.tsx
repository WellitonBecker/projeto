import { User, ClipboardList, PackageOpen, Calendar, Diff } from "lucide-react";
import LinkMenu from "./LinkMenu";
import { getEmpresa } from "@/lib/auth";

export default function Sidebar() {
  const empresa = getEmpresa()
  return (
    <div className="hidden h-screen w-60 shadow-lg lg:block">
      {/* { dark:bg-gray-700} */}
      <div className="h-full bg-gray-400">
        <div className="flex items-center justify-center pt-6">
          {/* { dark:text-white} */}
          <p className="text-xl font-bold text-gray-50">{empresa.nomeEmpresa}</p>
        </div>
        <nav className="mt-6 flex gap-5">
          <div className="w-full">
            <LinkMenu href="/agendamento">
              <div className="flex items-center justify-start ">
                {/* <Calendar size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Agendamentos</span>
              </div>
            </LinkMenu>
            <LinkMenu href="/funcionario">
              <div className="flex items-center justify-start ">
                {/* <User size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Funcionários</span>
              </div>
            </LinkMenu>
            <LinkMenu href="/servico">
              <div className="flex items-center justify-start">
                {/* <ClipboardList size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Serviços</span>
              </div>
            </LinkMenu>
            <LinkMenu href="/restricaoempresa">
              <div className="flex items-center justify-start">
                {/* <ClipboardList size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Restrições da Empresa</span>
              </div>
            </LinkMenu>
            <LinkMenu href="/usuario">
              <div className="flex items-center justify-start ">
                {/* <PackageOpen size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Usuários</span>
              </div>
            </LinkMenu>

            <hr className="mb-4 mt-4 w-full border-gray-700" />
            <LinkMenu href="http://localhost:3000/api/empresa/out">
              <div className="flex items-center justify-start ">
                {/* <Diff size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Sair da Empresa</span>
              </div>
            </LinkMenu>
          </div>
        </nav>
      </div>
    </div>
  );
}
