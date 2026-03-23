"use client"

import { useSearchParams } from "next/navigation"
import CheckoutFlow from "./components/CheckoutFlow"
import { CheckoutProvider } from "./components/context/CheckoutContext"
import Header from "./components/Header"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Mock simplificado apenas para exibir o nome do evento no topo do pagamento
const eventNames: { [key: string]: string } = {
  "1": "Retiro Anual de Integração da Equipe",
  "2": "FEIRA TECH — INOVAÇÃO E TECNOLOGIA",
  "3": "OFICINA REACT - DESENVOLVIMENTO WEB",
  "4": "RAPHAEL GHANEM — SE É QUE VOCÊ ME ENTENDE!",
  "5": "FESTIVAL DE DELÍCIAS CULINÁRIAS",
  "101": "MASTERCLASS DE IA GENERATIVA",
  "102": "FESTIVAL DE INVERNO: JAZZ & BLUES",
  "103": "MARATONA DO SOL",
  "104": "DEGUSTAÇÃO DE VINHOS E QUEIJOS",
  "105": "FESTIVAL CIENTISTAS DO FUTURO",
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get("id") // Pega o ID da URL

  // Busca o nome do evento ou usa um nome padrão
  const selectedEventName = eventId ? eventNames[eventId] : "Evento Selecionado"

  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Título dinâmico para o usuário saber o que está pagando */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              <div className="mb-6">
                <Link
                  href={`/events/${eventId || ""}`}
                  className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors w-fit group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">
                    Voltar para o evento
                  </span>
                </Link>
              </div>
              Finalizar Compra
            </h1>
            <p className="text-purple-600 font-medium">{selectedEventName}</p>
          </div>

          <div className="rounded-xl bg-purple-50 p-6 shadow-lg lg:p-10">
            {/* O CheckoutFlow agora poderia receber o eventId se precisar */}
            <CheckoutFlow />
          </div>
        </main>
      </div>
    </CheckoutProvider>
  )
}
