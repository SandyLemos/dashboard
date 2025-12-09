"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

// Mapeando a imagem para importação (Next.js)
import posterRaphael from "@/public/img/poster-raphael.jpg"

// Dados Fictícios do Carrossel (usados no lugar da leitura direta do DOM)
const events = [
  {
    id: 1,
    title: "Raphael Ghanem",
    location: "Salvador - BA",
    image: posterRaphael,
  },
  {
    id: 2,
    title: "Show Extra",
    location: "Salvador - BA",
    image: posterRaphael,
  },
  {
    id: 3,
    title: "Final Tour",
    location: "Salvador - BA",
    image: posterRaphael,
  },
  {
    id: 4,
    title: "Encerramento",
    location: "Salvador - BA",
    image: posterRaphael,
  },
  {
    id: 5,
    title: "Sessão Extra 2",
    location: "Salvador - BA",
    image: posterRaphael,
  },
]

// Largura da carta e gap (valores baseados no seu CSS: 350px min-width + 20px gap)
const CARD_WIDTH = 370
const TOTAL_ITEMS = events.length

export function Carousel() {
  // 1. ESTADO: Substitui a propriedade 'currentIndex' da classe
  const [currentIndex, setCurrentIndex] = useState(0)

  // 2. REF: Substitui a propriedade 'track' (document.getElementById('track'))
  const trackRef = useRef<HTMLDivElement>(null)

  // Calcula a posição do trilho (translateX)
  const position = -(currentIndex * CARD_WIDTH)

  // 3. LÓGICA DE MOVIMENTAÇÃO (Substitui moveNext e movePrev)
  const moveNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex < TOTAL_ITEMS - 1 ? prevIndex + 1 : prevIndex
    )
  }, [])

  const movePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }, [])

  // 4. EFEITO: Atualiza a interface (Substitui updateCarousel da classe)
  useEffect(() => {
    if (trackRef.current) {
      // Aplica a transformação CSS baseada no estado 'currentIndex'
      trackRef.current.style.transform = `translateX(${position}px)`
    }
  }, [position]) // Depende apenas da 'position' calculada

  // 5. EFEITO: Lógica de redimensionamento (Substitui o window.addEventListener('resize'))
  useEffect(() => {
    const handleResize = () => {
      // Resetar o carrossel no redimensionamento (lógica do seu código original)
      setCurrentIndex(0)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup: Remove o listener quando o componente for desmontado
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 6. RENDERIZAÇÃO DAS BOLINHAS (DOTS)
  const renderDots = () => {
    return events.map((_, index) => (
      <div
        key={index}
        className={`dot ${index === currentIndex ? "active" : ""}`}
        onClick={() => setCurrentIndex(index)} // Seta o novo estado
      />
    ))
  }

  // 7. RENDERIZAÇÃO PRINCIPAL (JSX)
  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        ref={trackRef} // Associa a Referência (Ref) ao elemento HTML
      >
        {/* Mapeia os dados dos eventos para renderizar os cards */}
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <Link href={`/evem-projeto/${event.id}`} className="img-link">
              {/* Usando Image do Next.js e o caminho da imagem importada */}
              <Image
                src={event.image}
                alt={event.title}
                fill={true} // Ocupa 100% do parent (event-card, que tem height/width definido)
                objectFit="cover"
              />
            </Link>
            <div className="event-overlay">
              <h3>{event.title}</h3>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        {/* Botões que chamam as funções de atualização de estado */}
        <button
          className="nav-arrow"
          onClick={movePrev}
          disabled={currentIndex === 0} // Desabilita o botão no primeiro slide
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>

        <div
          id="dots-container"
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          {renderDots()}
        </div>

        <button
          className="nav-arrow"
          onClick={moveNext}
          disabled={currentIndex === TOTAL_ITEMS - 1} // Desabilita o botão no último slide
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}
