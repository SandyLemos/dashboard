"use client"

import React from "react"
import { useCheckout } from "./context/CheckoutContext"
import StepOneReceiver from "./StepOneReceiver"
import StepTwoPayment from "./StepTwoPayment"
import OrderSummary from "./OrderSummary"
import Image from "next/image"

const CheckoutFlow: React.FC = () => {
  const { currentStep, setCurrentStep, paymentData, paymentStatus } =
    useCheckout()

  const getStepClass = (
    step: 1 | 2 | 3
  ) => `py-3 px-4 text-left border-l-4 font-semibold cursor-pointer transition-colors duration-200

 ${
   currentStep === step
     ? "border-indigo-600 bg-indigo-50 text-indigo-800"
     : "border-purple-200 text-gray-600 hover:bg-purple-100"
 }`

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOneReceiver onNext={() => setCurrentStep(2)} />

      case 2:
        return (
          <StepTwoPayment
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )

      case 3: // Lógica de Confirmação: Adapta a mensagem ao status de pagamento
        const isPending = paymentStatus === "pending"
        const isSucceeded = paymentStatus === "succeeded"
        const isPix = paymentData.method === "pix"

        return (
          <div className="flex flex-col space-y-4">
            <h3
              className={`text-xl font-bold flex items-center ${
                isSucceeded ? "text-green-600" : "text-orange-600"
              }`}
            >
              {isSucceeded
                ? "✅ Pagamento recebido com sucesso!"
                : "⏳ Pagamento aguardando confirmação"}
            </h3>

            {/* ⬅️ LÓGICA DO QR CODE: Exibe apenas se PIX e PENDENTE */}
            {isPix && isPending && (
              <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-gray-50">
                <p className="text-lg font-medium text-gray-800">
                  Escaneie o QR Code para completar o pagamento:
                </p>

                <div className="relative w-48 h-48 border-2 border-indigo-500 rounded-lg p-2 bg-white">
                  <Image
                    src={paymentData.pixQrCodeUrl || "/qrCode.png"}
                    alt="QR Code para pagamento Pix"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  O pagamento expira em 30 minutos.
                </p>

                {/* Botão para copiar o código PIX Copia e Cola, se necessário */}
                <button className="text-indigo-600 font-semibold hover:underline">
                  Copiar Código PIX
                </button>
              </div>
            )}

            <p className="text-gray-700">
              {/* Mensagem de sucesso/pendente */}
              {isSucceeded
                ? `Seu ingresso foi enviado para o e-mail cadastrado. Detalhes: ${
                    isPix
                      ? "Pagamento PIX confirmado."
                      : "Pagamento com cartão processado imediatamente."
                  }`
                : "Seu ingresso será enviado assim que o pagamento PIX for confirmado (geralmente em segundos)."}
            </p>

            <button className="mt-4 w-48 rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition">
              Ver Meus Ingressos
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Lado Esquerdo: Fluxo de Passos */}

      <div className="lg:w-2/3 space-y-4">
        {/* Seção 1: Recebimento do ingresso (Título) */}

        <div
          className={getStepClass(1)}
          onClick={() => (currentStep > 1 ? setCurrentStep(1) : null)}
        >
          Recebimento do ingresso
        </div>

        {/* Seção 1: Recebimento do ingresso (Conteúdo) */}

        {/* CORREÇÃO: Altera (currentStep === 1 || currentStep > 1) para currentStep === 1 */}

        {currentStep === 1 && (
          <div className="rounded-lg bg-white p-6 shadow-md border border-purple-300">
            {renderStepContent()}
          </div>
        )}

        {/* Seção 2: Forma de pagamento (Título) */}

        <div
          className={getStepClass(2)}
          onClick={() => (currentStep > 2 ? setCurrentStep(2) : null)}
        >
          Forma de pagamento
        </div>

        {currentStep === 2 && (
          <div className="rounded-lg bg-white p-6 shadow-md border border-purple-300">
            {renderStepContent()}
          </div>
        )}

        {/* Seção 3: Confirmação (Título) */}

        <div className={getStepClass(3)}>Confirmação</div>

        {currentStep === 3 && (
          <div className="rounded-lg bg-white p-6 shadow-md border border-purple-300">
            {renderStepContent()}
          </div>
        )}
      </div>

      {/* Lado Direito: Resumo do Pedido */}

      <div className="lg:w-1/3">
        <OrderSummary />
      </div>
    </div>
  )
}

export default CheckoutFlow
