// app/payment/components/StepOneReceiver.tsx
"use client"

import React, { useState } from "react"
import { useCheckout, ReceiverData } from "./context/CheckoutContext"

interface StepOneProps {
  onNext: () => void
}

const StepOneReceiver: React.FC<StepOneProps> = ({ onNext }) => {
  const { receiverData, setReceiverData } = useCheckout()
  const [errors, setErrors] = useState<Partial<ReceiverData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverData({ ...receiverData, [e.target.name]: e.target.value })
    if (errors[e.target.name as keyof ReceiverData]) {
      setErrors({ ...errors, [e.target.name]: undefined })
    }
  }

  const validate = () => {
    const newErrors: Partial<ReceiverData> = {}
    if (!receiverData.fullName)
      newErrors.fullName = "Nome completo é obrigatório."
    if (!receiverData.email) newErrors.email = "E-mail é obrigatório."
    if (receiverData.email !== receiverData.confirmEmail)
      newErrors.confirmEmail = "Os e-mails não coincidem."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 text-xl font-bold text-gray-800">
        Recebimento do ingresso
      </h3>
      <div className="space-y-4">
        {/* Nome Completo */}
        <div>
          {/* Cor do Título: #4A0071 */}
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium text-[#4A0071]"
          >
            Nome Completo <span className="text-[#565656]">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={receiverData.fullName}
            onChange={handleChange}
            // Cor do Contorno de Foco: #5300C0
            className={`w-full rounded-md border p-3 ${
              errors.fullName
                ? "border-red-500"
                : "border-purple-300 focus:border-[#5300C0]"
            }`}
            placeholder="seu nome completo"
            required
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-[#4A0071]"
          >
            E-mail <span className="text-[#565656]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={receiverData.email}
            onChange={handleChange}
            className={`w-full rounded-md border p-3 ${
              errors.email
                ? "border-red-500"
                : "border-purple-300 focus:border-[#5300C0]"
            }`}
            placeholder="usuario@gmail.com"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Confirmação de E-mail */}
        <div>
          <label
            htmlFor="confirmEmail"
            className="mb-1 block text-sm font-medium text-[#4A0071]"
          >
            Confirmação do e-mail <span className="text-[#565656]">*</span>
          </label>
          <input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            value={receiverData.confirmEmail}
            onChange={handleChange}
            className={`w-full rounded-md border p-3 ${
              errors.confirmEmail
                ? "border-red-500"
                : "border-purple-300 focus:border-[#5300C0]"
            }`}
            placeholder="usuario@gmail.com"
            required
          />
          {errors.confirmEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmEmail}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          // Cor do Botão: #058BD3, Cor do Texto: Branco, Adicionando Seta
          className="rounded-lg bg-[#058BD3] px-6 py-2 font-semibold text-white transition hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>Próximo</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0L4.945 1.055L9.125 5.25H0V6.75H9.125L4.945 10.945L6 12L12 6L6 0Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default StepOneReceiver