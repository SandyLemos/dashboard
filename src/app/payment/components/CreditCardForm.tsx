// app/payment/components/CreditCardForm.tsx
"use client"

import React from "react"
import { useCheckout } from "./context/CheckoutContext"

interface CreditCardFormProps {
  onSubmit: () => void
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit }) => {
  const { paymentData, setPaymentData } = useCheckout()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
  }

  // Adiciona a função de submissão com prevenção de recarregamento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit() // <--- CHAMA A PROP AQUI
  }

  return (
    <form
      className="space-y-4 p-4 border rounded-lg bg-white shadow-sm" onSubmit={handleSubmit}>
      <h4 className="font-semibold text-lg border-b pb-2">
        Detalhes do Cartão
      </h4>

      {/* Número do Cartão */}
      <div>
        <label
          htmlFor="cardNumber"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Número do Cartão
        </label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-3"
          placeholder="XXXX XXXX XXXX XXXX"
          required
        />
      </div>

      <div className="flex space-x-4">
        {/* Validade */}
        <div className="w-1/2">
          <label
            htmlFor="expiryDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Validade (MM/AA)
          </label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3"
            placeholder="MM/AA"
            required
          />
        </div>

        {/* CVV */}
        <div className="w-1/2">
          <label
            htmlFor="cvv"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            CVV
          </label>
          <input
            id="cvv"
            name="cvv"
            type="text"
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-3"
            placeholder="***"
            required
          />
        </div>
      </div>
      {/* O botão de submissão está no StepTwoPayment */}
    </form>
  )
}

export default CreditCardForm
