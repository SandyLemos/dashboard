// app/payment/context/CheckoutContext.tsx
"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"

// Tipos de dados
export interface ReceiverData {
  fullName: string
  email: string
  confirmEmail: string
}

export type PaymentMethod = "creditCard" | "pix" | "boleto"

export interface PaymentData {
  method: PaymentMethod
  pixQrCodeUrl?: string | null
  // Campos do Cartão (Tokenização seria usada em produção)
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

interface CheckoutContextType {
  receiverData: ReceiverData
  setReceiverData: (data: ReceiverData) => void
  paymentData: PaymentData
  setPaymentData: (data: PaymentData) => void
  currentStep: 1 | 2 | 3
  setCurrentStep: (step: 1 | 2 | 3) => void
  // Novo: Estado simulado para status de PIX/Pagamento
  paymentStatus: "initial" | "processing" | "succeeded" | "pending" | "failed"
  setPaymentStatus: (
    status: "initial" | "processing" | "succeeded" | "pending" | "failed"
  ) => void
}

const defaultContext: CheckoutContextType = {
  receiverData: { fullName: "", email: "", confirmEmail: "" },
  setReceiverData: () => {},
  paymentData: { method: "creditCard" },
  setPaymentData: () => {},
  currentStep: 1,
  setCurrentStep: () => {},
  paymentStatus: "initial",
  setPaymentStatus: () => {},
}

export const CheckoutContext =
  createContext<CheckoutContextType>(defaultContext)

export const useCheckout = () => useContext(CheckoutContext)

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [receiverData, setReceiverData] = useState<ReceiverData>(
    defaultContext.receiverData
  )
  const [paymentData, setPaymentData] = useState<PaymentData>(
    defaultContext.paymentData
  )
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [paymentStatus, setPaymentStatus] = useState<
    "initial" | "processing" | "succeeded" | "pending" | "failed"
  >("initial")

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
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
