"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navbar } from "../evem-projeto/components/Navbar"
import { Ticket, MapPin, Calendar, Heart } from "lucide-react"

// Dados simulados baseados na sua imagem
const favoriteEventsData = [
  {
    id: 103,
    title: "Raphael Ghanem - Se é que você me entende!",
    description:
      'Com texto, interpretação e direção de Raphael Ghanem, "Se é que você me entende" é um espetáculo de Stand up Comedy, repleto de interações e improvisações, feito com texto 100% autoral.',
    categoryLabel: "Stand up comedy",
    categoryColor: "bg-[#FFF3E0] text-[#E65100]", // Laranja
    location:
      "Befly Minascentro - Avenida Augusto de Lima, 785, Belo Horizonte - Minas Gerais",
    date: "Quinta e Sexta às 22h00, Sábado às 21h00",
    tickets: 15,
    imageSrc: "/img/poster-raphael.jpg",
  },
  {
    id: 101,
    title: "Festival de delicias culinárias",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    categoryLabel: "Gastronomia e bebidas",
    categoryColor: "bg-[#F3E5F5] text-[#7B1FA2]", // Roxo
    location: "The Plaza, San Francisco, CA",
    date: "Quarta, 15 a 23 de Outubro, 2025 - 13:00",
    tickets: 115,
    imageSrc: "/img/breakfast.jpg",
  },
]

export default function FavoritesPage() {
  // Estado local para permitir remover da lista (apenas visualmente por enquanto)
  const [favorites, setFavorites] = useState(favoriteEventsData)

  const removeFavorite = (id: number) => {
    // Remove o item da lista ao clicar no coração
    setFavorites((prev) => prev.filter((event) => event.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#dae4f8] pb-10 flex flex-col items-center">
      <Navbar />

      <main className="w-[95%] max-w-[1200px] mt-8 bg-white/50 backdrop-blur-sm border border-white/60 rounded-[30px] p-6 md:p-10 shadow-xl relative overflow-hidden">
        {/* Borda Azul ao redor do container principal (estilo da imagem) */}
        <div className="absolute inset-0 border-[3px] border-[#3B82F6] rounded-[30px] pointer-events-none"></div>

        {/* Título da Página */}
        <div className="flex items-center gap-3 mb-8 relative z-10">
          {/* Ícone de Ticket Vermelho (Estilizado) */}
          <div className="relative">
            <Ticket className="text-[#D32F2F] w-8 h-8 -rotate-12 fill-[#FFCDD2]" />
          </div>
          <h1 className="text-3xl font-bold text-black font-serif">
            Eventos Favoritos
          </h1>
        </div>

        {/* Lista de Favoritos */}
        <div className="flex flex-col gap-6 relative z-10">
          {favorites.length > 0 ? (
            favorites.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-[25px] p-5 flex flex-col md:flex-row gap-6 items-center shadow-sm border border-transparent hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Imagem */}
                <div className="w-full md:w-[220px] h-[140px] flex-shrink-0 rounded-2xl overflow-hidden relative shadow-inner">
                  <img
                    src={event.imageSrc}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-grow text-center md:text-left w-full">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${event.categoryColor}`}
                  >
                    {event.categoryLabel}
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                    <Link
                      href={`/event-details/${event.id}`}
                      className="hover:text-[#0085D7] transition-colors"
                    >
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {event.description}
                  </p>
                </div>

                {/* Meta Dados (Direita) */}
                <div className="w-full md:w-[350px] flex-shrink-0 flex flex-col justify-between h-full pl-0 md:pl-6 border-l-0 md:border-l border-gray-100 gap-3">
                  {/* Local e Data */}
                  <div className="flex flex-col gap-2 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#7b2cbf] flex-shrink-0 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7b2cbf] flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                  </div>

                  {/* Tickets e Ação */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="bg-[#F3F0FA] px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#7b2cbf]" />
                      <div className="flex flex-col leading-none">
                        <strong className="text-gray-800 text-sm">
                          {event.tickets}
                        </strong>
                        <span className="text-[9px] text-gray-500 font-bold uppercase">
                          ingressos restantes
                        </span>
                      </div>
                    </div>

                    {/* Botão Coração (Remover) */}
                    <button
                      onClick={() => removeFavorite(event.id)}
                      className="text-[#D32F2F] hover:scale-110 transition-transform cursor-pointer p-2"
                      title="Remover dos favoritos"
                    >
                      <Heart className="w-6 h-6 fill-[#D32F2F]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Estado Vazio
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">
                Você ainda não tem eventos favoritos.
              </p>
              <Link
                href="/events"
                className="text-[#0085D7] font-bold hover:underline"
              >
                Explorar eventos
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
