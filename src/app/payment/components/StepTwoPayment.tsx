"use client"

import React, { useState } from "react"
import { useCheckout } from "./context/CheckoutContext"
import CreditCardForm from "./CreditCardForm"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface PaymentEvent {
  title: string
  location: string
  category: string
  price: string
  date: string
  img: string
}

const paymentEventData: Record<string, PaymentEvent> = {
  "1": {
    title: "Retiro Anual de Integração",
    location: "Mountain View Resort",
    category: "Social",
    price: "250,00",
    date: "Quinta, 19 Dez - 09:00",
    img: "/img/Retiro-Anual-de-Integração.jpg",
  },
  "2": {
    title: "Feira Tech — Inovação",
    location: "Anhembi - SP",
    category: "Tecnologia",
    price: "45,00",
    date: "Segunda, 09 Dez - 10:00",
    img: "/img/Feira-Tech.jpg",
  },
  "3": {
    title: "Oficina React",
    location: "Rio de Janeiro",
    category: "Educação",
    price: "120,00",
    date: "Quarta, 18 Dez - 19:00",
    img: "/img/Oficina-React.jpg",
  },
  "4": {
    title: "Raphael Ghanem — Stand Up",
    location: "BeFly Minascentro",
    category: "Stand Up Comedy",
    price: "80,00",
    date: "Quinta, 27 Nov - 22:00",
    img: "/img/poster-raphael.jpg",
  },
  "5": {
    title: "Festival de delícias culinárias",
    location: "Curitiba - PR",
    category: "Gastronomia",
    price: "35,00",
    date: "Outubro - 12:00",
    img: "/img/breakfast.jpg",
  },
  "101": {
    title: "Masterclass de IA Generativa",
    location: "Recife - PE",
    category: "Tecnologia",
    price: "199,00",
    date: "Quarta, 15 Out - 13:00",
    img: "/img/Masterclass-de-IA.jpg",
  },
  "102": {
    title: "Festival: Jazz & Blues",
    location: "Vitória - ES",
    category: "Shows",
    price: "120,00",
    date: "Sábado, 15 Jun - 19:00",
    img: "/img/Festival-de-Inverno.jpg",
  },
  "103": {
    title: "Maratona do Sol",
    location: "Fortaleza - CE",
    category: "Esportes",
    price: "85,00",
    date: "Domingo, 20 Abr - 06:00",
    img: "/img/Maratona-do-Sol.jpg",
  },
  "104": {
    title: "Degustação de Vinhos",
    location: "Bento Gonçalves - RS",
    category: "Gastronomia",
    price: "180,00",
    date: "Sábado, 10 Ago - 16:00",
    img: "/img/Degustacao-de-Vinhos-e-Queijos.jpg",
  },
  "105": {
    title: "Cientistas do Futuro",
    location: "Porto Alegre - RS",
    category: "Kids",
    price: "40,00",
    date: "Sexta, 12 Dez - 14:00",
    img: "/img/Festival-Cientistas-do-Futuro.jpg",
  },
}

interface StepTwoProps {
  onBack: () => void
  onNext: () => void
}

const StepTwoPayment: React.FC<StepTwoProps> = ({ onBack, onNext }) => {
  const { paymentData, setPaymentStatus, saveTicket } = useCheckout()
  const searchParams = useSearchParams()
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false)

  const eventId = searchParams.get("id") || "4"
  const currentEvent = paymentEventData[eventId] || paymentEventData["4"]

  const handlePaymentSubmit = async () => {
    if (
      paymentData.method === "creditCard" ||
      paymentData.method === "boleto"
    ) {
      setPaymentStatus("succeeded")
      saveTicket(currentEvent)
      onNext()
      return
    }

    if (paymentData.method === "pix") {
      if (!qrCodeGenerated) {
        setQrCodeGenerated(true)
      } else {
        setPaymentStatus("pending")
        saveTicket(currentEvent)
        onNext()
      }
    }
  }

  const handlePixConfirmed = () => {
    setPaymentStatus("succeeded")
    saveTicket(currentEvent) // Salva como ativo
    onNext()
  }

  const getButtonText = () => {
    if (paymentData.method === "pix") {
      return qrCodeGenerated ? "Próximo" : "Gerar QR Code"
    }
    return "Finalizar Compra"
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
                  <Image
                    src={paymentData.pixQrCodeUrl || "/qrCode.png"}
                    alt="QR Code para pagamento Pix"
                    width={128}
                    height={128}
                    className="p-1 object-contain"
                  />
                </div>
                <button
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-4 block"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "00020126360014BR.GOV.BC.PIX...",
                    )
                  }
                >
                  Copiar Código PIX
                </button>
                <button
                  onClick={handlePixConfirmed}
                  className="text-xs text-green-600 block hover:underline"
                >
                  (Simular PIX Confirmado)
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {paymentData.method === "creditCard" && (
        <CreditCardForm onSubmit={handlePaymentSubmit} />
      )}

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

// Mantenha o PaymentOption como você já tinha
interface PaymentOptionProps {
  method: "creditCard" | "pix" | "boleto"
  label: string
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ method, label }) => {
  const { paymentData, setPaymentData } = useCheckout()
  const handleMethodChange = (m: "creditCard" | "pix" | "boleto") => {
    setPaymentData({ ...paymentData, method: m })
  }

  return (
    <div
      className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-150 
              ${paymentData.method === method ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-gray-300 hover:bg-gray-50"}`}
      onClick={() => handleMethodChange(method)}
    >
      <div
        className={`w-4 h-4 rounded-full border-2 mr-3 ${paymentData.method === method ? "bg-indigo-600 border-indigo-600" : "border-gray-400"}`}
      ></div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
  )
}

export default StepTwoPayment
