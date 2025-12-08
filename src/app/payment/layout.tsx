import React from "react"
import { GeistSans } from "geist/font/sans" 

const geist = GeistSans

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className={geist.className}> 
        {/* Conteúdo da página de pagamento (children) */}
        <main className="min-h-[80vh] bg-purple-50">
              {children}
        </main>

        {/* Rodapé da tela de pagamento (Footer) */}
        <footer className="py-12 bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Seção Principal do Rodapé */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              
              {/* Coluna 1: Sobre nós */}
              <div>
                <h4 className="mb-4 font-bold text-gray-800">Sobre nós</h4>
                <p className="text-sm text-gray-600">
                  A EVEM é uma plataforma de gerenciamento de eventos que
                  conecta pessoas a experiências únicas. Nossa missão é
                  simplificar a organização e a participação em eventos de todos
                  os tipos.
                </p>
              </div>
              
              {/* Coluna 2: Contato e Redes */}
              <div>
                <h4 className="mb-4 font-bold text-gray-800">
                  Contato e Redes
                </h4>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              
              {/* Coluna 3: Navegue */}
              <div>
                <h4 className="mb-4 font-bold text-gray-800">Navegue</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Início</li>
                  <li>Login</li>
                  <li>Cadastro</li>
                  <li>Lista de Eventos</li>
                </ul>
              </div>
            </div>

            {/* Link De Volta ao Topo */}
            <div className="mt-8 text-center text-indigo-600 text-sm font-medium flex items-center justify-center">
              <span className="text-xl mr-2">&uarr;</span> De volta ao topo
            </div>
            
            {/* Copyright */}
            <div className="mt-4 border-t border-gray-300 pt-4 text-center text-xs text-gray-500">
              &copy; 2025 EVEM – Todos os direitos reservados.
            </div>

          </div>
        </footer>
  </div>
  )
}