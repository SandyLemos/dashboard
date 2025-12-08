"use client"

import CheckoutFlow from "./components/CheckoutFlow"
import { CheckoutProvider } from "./components/context/CheckoutContext"
import Header from "./components/Header" // Criaremos este componente

export default function PaymentPage() {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Container principal do conteúdo */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Fundo roxo/lavanda da sua imagem */}
          <div className="rounded-xl bg-purple-50 p-6 shadow-lg lg:p-10">
            <CheckoutFlow />
          </div>
        </main>

        {/* O Footer está no layout.tsx */}
      </div>
    </CheckoutProvider>
  )
}