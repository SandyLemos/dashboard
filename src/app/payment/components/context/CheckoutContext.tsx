"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"

// --- Tipos de dados ---
export interface ReceiverData {
  fullName: string
  email: string
  confirmEmail: string
}

export type PaymentMethod = "creditCard" | "pix" | "boleto"

export interface PaymentData {
  method: PaymentMethod
  pixQrCodeUrl?: string | null
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

export interface SavedTicket {
  id: string | number // O ID do evento original (ex: 'masterclass-ia')
  ticketUniqueId: number // Um ID único para a transação (timestamp)
  title: string
  imageSrc: string
  categoryLabel: string
  location: string
  date: string
  status: "active" | "pending" | "cancelled" | "finished"
  type: string
  description?: string
}

interface CheckoutContextType {
  receiverData: ReceiverData
  setReceiverData: (data: ReceiverData) => void
  paymentData: PaymentData
  setPaymentData: (data: PaymentData) => void
  currentStep: 1 | 2 | 3
  setCurrentStep: (step: 1 | 2 | 3) => void
  paymentStatus: "initial" | "processing" | "succeeded" | "pending" | "failed"
  setPaymentStatus: (
    status: "initial" | "processing" | "succeeded" | "pending" | "failed",
  ) => void
  saveTicket: (eventData: any) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
)

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (!context)
    throw new Error("useCheckout deve ser usado dentro de um CheckoutProvider")
  return context
}

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [receiverData, setReceiverData] = useState<ReceiverData>({
    fullName: "",
    email: "",
    confirmEmail: "",
  })
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "creditCard",
  })
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [paymentStatus, setPaymentStatus] = useState<
    "initial" | "processing" | "succeeded" | "pending" | "failed"
  >("initial")

  // --- LÓGICA DE SALVAMENTO CORRIGIDA ---
  const saveTicket = (eventData: any) => {
    if (typeof window === "undefined") return

    // 1. Verificação Crítica: Se não houver ID do evento, avisar no console
    if (!eventData.id) {
      console.error(
        "ERRO CRÍTICO: Tentativa de salvar ticket sem ID de evento original!",
      )
    }

    const savedTickets: SavedTicket[] = JSON.parse(
      localStorage.getItem("@evem:tickets") || "[]",
    )

    // 2. Definimos o status com base no método de pagamento ou status atual
    // Pix e Boleto geralmente ficam "pending", Cartão fica "active" (succeeded)
    const finalStatus = paymentStatus === "succeeded" ? "active" : "pending"

    // 3. Verificamos se esse usuário já tem esse evento (para atualizar em vez de duplicar)
    const existingIndex = savedTickets.findIndex(
      (t) => String(t.id) === String(eventData.id),
    )

    if (existingIndex !== -1) {
      // Atualiza o ticket existente
      savedTickets[existingIndex] = {
        ...savedTickets[existingIndex],
        status: finalStatus,
        // Mantemos os dados, mas atualizamos o status
      }
      localStorage.setItem("@evem:tickets", JSON.stringify(savedTickets))
      console.log("Status do ingresso atualizado:", finalStatus)
    } else {
      // Cria um novo ticket usando o ID DO EVENTO ORIGINAL
      const newTicket: SavedTicket = {
        id: eventData.id, // AQUI: Manter o ID do evento (ex: 1, 2, ou 'show-x')
        ticketUniqueId: Date.now(), // ID único para controle interno se precisar
        title: eventData.title || "Evento",
        imageSrc: eventData.imageSrc || eventData.img || "",
        categoryLabel: eventData.categoryLabel || eventData.category || "Geral",
        location: eventData.location || "Local não informado",
        date: eventData.date || "Data a definir",
        type: eventData.type || "Entrada Geral",
        status: finalStatus,
        description:
          eventData.description || "Ingresso adquirido via plataforma Evem.",
      }

      const newList = [newTicket, ...savedTickets]
      localStorage.setItem("@evem:tickets", JSON.stringify(newList))
      console.log(
        "Novo ingresso salvo com sucesso. ID de redirecionamento:",
        newTicket.id,
      )
    }
  }

  return (
    <CheckoutContext.Provider
      value={{
        receiverData,
        setReceiverData,
        paymentData,
        setPaymentData,
        currentStep,
        setCurrentStep,
        paymentStatus,
        setPaymentStatus,
        saveTicket,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
