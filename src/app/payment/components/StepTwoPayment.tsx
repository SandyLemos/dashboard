// app/payment/components/StepTwoPayment.tsx
"use client"

import React, { useState } from "react"
import { useCheckout } from "./context/CheckoutContext"
import CreditCardForm from "./CreditCardForm"
import Image from "next/image"

interface StepTwoProps {
  onBack: () => void
  onNext: () => void
}

// --------------------------------------------------------
// Componente Auxiliar (fora do render)
// --------------------------------------------------------
interface PaymentOptionProps {
  method: "creditCard" | "pix" | "boleto"
  label: string
}

// const pixData = await api.generatePixPayment()

// setPaymentData((prev) => ({
//   ...prev,
//   pixQrCodeUrl: pixData.qrCodeUrl, // Armazena o URL
//   paymentStatus: "pending",
// }))

const PaymentOption: React.FC<PaymentOptionProps> = ({ method, label }) => {
  const { paymentData, setPaymentData } = useCheckout()

  const handleMethodChange = (m: "creditCard" | "pix" | "boleto") => {
    setPaymentData({ ...paymentData, method: m })
  }

  return (
    <div
      className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-150 
              ${
                paymentData.method === method
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
      onClick={() => handleMethodChange(method)}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 mr-3 ${
          paymentData.method === method
            ? "bg-indigo-600 border-indigo-600"
            : "border-gray-400"
        }`}
      ></div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  )
}

const StepTwoPayment: React.FC<StepTwoProps> = ({ onBack, onNext }) => {
  const { paymentData, setPaymentStatus } = useCheckout()

  // Estado local para gerenciar a UI do QR Code (Gerado vs. Inicial)
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false)

  const handlePaymentSubmit = async () => {
    if (
      paymentData.method === "creditCard" ||
      paymentData.method === "boleto"
    ) {
      // Simular chamada API para Cartão/Boleto
      setPaymentStatus("succeeded") // Para Cartão: Simulação de sucesso imediato
      onNext()
      return
    }

    if (paymentData.method === "pix") {
      if (!qrCodeGenerated) {
        // 1. Geração do QR Code
        setQrCodeGenerated(true)
      } else {
        // 2. Submissão do pedido (para monitoramento)
        setPaymentStatus("pending")
        onNext()
      }
    }
  }

  // Define o texto do botão principal com base no método e status do PIX
  const getButtonText = () => {
    if (paymentData.method === "pix") {
      return qrCodeGenerated ? "Próximo" : "Gerar QR Code"
    }
    return "Finalizar Compra"
  }

  // Simulação de confirmação PIX (para demonstração)
  const handlePixConfirmed = () => {
    setPaymentStatus("succeeded")
    onNext()
  }

  return (
    <div>
      <h3 className="mb-6 text-xl font-bold text-gray-800">
        Forma de pagamento
      </h3>

      <div className="space-y-4 mb-8">
        <PaymentOption method="creditCard" label="Cartão de Crédito/Débito" />
        <PaymentOption method="pix" label="PIX" />
        <PaymentOption method="boleto" label="Boleto" />
      </div>

      {/* Conteúdo dinâmico: PIX */}
      {paymentData.method === "pix" && (
        <div className="p-4 bg-purple-50 border border-purple-300 rounded-lg shadow-inner flex space-x-6">
          <div className="flex-1">
            <p className="text-sm text-purple-700 mb-2">
              Escaneie ou copie o código abaixo para finalizar. O ingresso será
              confirmado automaticamente.
            </p>

            {qrCodeGenerated && (
              <>
                <div className="w-32 h-32 bg-white flex items-center justify-center rounded-md border shadow-md my-4 relative">
                  {/* Contêiner de Imagem */}
                  <Image
                    src={paymentData.pixQrCodeUrl || "/qrCode.png"} // Use a URL armazenada
                    alt="QR Code para pagamento Pix"
                    width={128} // Dimensão fixa para otimização
                    height={128} // Dimensão fixa para otimização
                    objectFit="contain"
                    className="p-1" // Um pequeno padding dentro do contêiner
                  />
                </div>
                <button
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-4"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "00020126360014BR.GOV.BC.PIX..." // Seu código Pix Copia e Cola
                    )
                  }
                >
                  Copiar Código PIX 
                </button>
                <button
                  onClick={handlePixConfirmed}
                  className="text-xs text-green-600 block"
                >
                  (Simular PIX Confirmado) 
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo dinâmico: Cartão de Crédito */}
      {paymentData.method === "creditCard" && (
        <CreditCardForm onSubmit={handlePaymentSubmit} />
      )}

      {/* Botões de navegação */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          type="button"
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          &larr; Voltar
        </button>

        <button
          onClick={handlePaymentSubmit}
          type="button"
          className="rounded-lg bg-indigo-600 px-6 py-2 font-semibold text-white transition hover:bg-indigo-700"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  )
}

export default StepTwoPayment
