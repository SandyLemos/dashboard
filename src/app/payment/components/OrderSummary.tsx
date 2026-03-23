"use client"

import React from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// 1. Definimos a interface para o evento
interface PaymentEvent {
  title: string
  location: string
  category: string
  price: string
  date: string
  img: string
}

// 2. Aplicamos a tipagem no mapeamento de dados
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

const OrderSummary: React.FC = () => {
  const searchParams = useSearchParams()
  const eventId = searchParams.get("id")

  // Busca o evento ou usa o Raphael Ghanem como padrão (fallback)
  const event =
    eventId && paymentEventData[eventId]
      ? paymentEventData[eventId]
      : paymentEventData["4"]

  const GRADIENT_BORDER_CLASS =
    "p-[2px] bg-gradient-to-r from-[#4D53EA] to-[#CE00AD] rounded-xl"
  const SUMMARY_BAR_CLASS =
    "bg-[#058BD3] text-white py-1 px-4 font-semibold text-lg rounded-t-lg rounded-b-none"

  return (
    <div className="top-20 w-full">
      {/* 1. Ticket do Evento (Topo Dinâmico) */}
      <div
        className={`mb-4 shadow-lg bg-white ${GRADIENT_BORDER_CLASS} relative`}
      >
        <div className="bg-white rounded-[10px] p-4 flex items-start space-x-3">
          <div className="flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={event.img}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <h4 className="text-base font-bold text-gray-900 leading-tight uppercase">
              {event.title}
            </h4>
            <p className="text-xs mt-1 flex items-center text-[#838383]">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {event.location}
            </p>
            <span className="mt-2 inline-block rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">
              {event.category}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Resumo do Pedido Dinâmico */}
      <div
        className={`rounded-xl bg-white shadow-lg ${GRADIENT_BORDER_CLASS} p-[2px]`}
      >
        <div className="bg-white rounded-[10px] p-0 overflow-hidden">
          <h3 className={SUMMARY_BAR_CLASS}>Resumo do Pedido</h3>

          <div className="mt-4 space-y-2 px-4 pb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">{event.date}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ingresso</span>
              <span className="font-medium text-gray-900">Entrada geral</span>
            </div>

            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span className="text-gray-900">Total</span>
              <span className="text-[#CE00AD]">R$ {event.price}</span>
            </div>

            <div className="w-full h-1 bg-gradient-to-r from-[#4D53EA] to-[#CE00AD] rounded-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary