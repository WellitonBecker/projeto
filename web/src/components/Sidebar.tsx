import { User, ClipboardList, PackageOpen, Calendar, Diff } from 'lucide-react'
import LinkMenu from './LinkMenu'

const nomeProjeto = 'PROJETO TCC'

export default function Sidebar() {
  return (
    <div className="hidden h-screen w-60 shadow-lg lg:block">
      {/* { dark:bg-gray-700} */}
      <div className="h-full bg-gray-400">
        <div className="flex items-center justify-center pt-6">
          {/* { dark:text-white} */}
          <p className="text-xl font-bold text-gray-50">{nomeProjeto}</p>
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
            <LinkMenu href="/produto">
              <div className="flex items-center justify-start ">
                {/* <PackageOpen size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Produtos</span>
              </div>
            </LinkMenu>

            <hr className="mb-4 mt-4 w-full border-gray-700" />
            <LinkMenu href="fluxocaixa">
              <div className="flex items-center justify-start ">
                {/* <Diff size={18} className="mr-2" /> */}
                <span className="hidden lg:block">Entrada/Saída</span>
              </div>
            </LinkMenu>
            <a href='http://localhost:3000/api/empresa/out'>
              Sair da Empresa
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
