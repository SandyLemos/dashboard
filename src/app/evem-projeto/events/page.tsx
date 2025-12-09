// src/app/evem-projeto/events/page.tsx

"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
// Importação do CSS (assumindo que está na pasta src)
import "../src/events.css"
import Image from "next/image"

// --- Componentes Reutilizáveis serão definidos logo abaixo ---

// ----------------------------------------------------
// 1. CARDS REUTILIZÁVEIS (Simulando Dados Dinâmicos)
// ----------------------------------------------------
interface EventData {
  id: number
  title: string
  description: string
  category: "purple" | "orange"
  categoryText: string
  location: string
  date: string
  tickets: number | "Esgotado"
  imageSrc: string
  isFavorite: boolean
  // O slug será usado para a rota dinâmica
  slug: string
}

// Simulação de 3 cards da lista (para mapeamento)
const mockEvents: EventData[] = [
  {
    id: 101,
    title: "Festival de delícias culinárias",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    category: "purple",
    categoryText: "Gastronomia e bebidas",
    location: "The Plaza, San Francisco, CA",
    date: "Quarta, 15 a 23 de Outubro, 2025 - 13:00",
    tickets: 115,
    imageSrc: "/img/breakfast.jpg",
    isFavorite: false,
    slug: "festival-delicias",
  },
  {
    id: 102,
    title: "Workshop de Culinária",
    description:
      "Aprenda com os melhores chefs da região as técnicas para um café da manhã perfeito.",
    category: "purple",
    categoryText: "Gastronomia e bebidas",
    location: "Centro Gastronômico",
    date: "Sábado, 20 de Outubro, 2025 - 10:00",
    tickets: 40,
    imageSrc: "/img/breakfast.jpg",
    isFavorite: false,
    slug: "workshop-culinaria",
  },
  {
    id: 103,
    title: "Raphael Ghanem - Se é que você me entende!",
    description: "Espetáculo de Stand up Comedy imperdível.",
    category: "orange",
    categoryText: "Stand up comedy",
    location: "BeFly Minascentro",
    date: "Sexta às 22h00",
    tickets: 15,
    imageSrc: "/img/poster-raphael.jpg",
    isFavorite: true,
    slug: "raphael-ghanem-standup",
  },
  // Você pode adicionar mais eventos aqui...
]

/**
 * Componente: Card de Evento na Lista Principal
 * Substitui o bloco '.event-row-card'
 */
const EventCardRow: React.FC<{ event: EventData }> = ({ event }) => {
  // 2. LÓGICA DO BOTÃO FAVORITO (CORAÇÃO)
  const [isFavorite, setIsFavorite] = useState(event.isFavorite)

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev)
    // Aqui viria a chamada à API para salvar/remover dos favoritos
  }

  // Define o caminho para a página de detalhes do evento (rota dinâmica)
  const eventDetailPath = `/evem-projeto/event-details/${event.slug}`

  // Define os ícones do Font Awesome (fa-solid para preenchido, fa-regular para vazio)
  const heartIconClass = isFavorite ? "fa-solid" : "fa-regular"

  return (
    // O card inteiro pode ser um link, mas o HTML original não tinha.
    // Vamos manter a estrutura e tornar a imagem clicável (como no terceiro card original)
    <div className={`event-row-card ${isFavorite ? "active-border" : ""}`}>
      <div className="card-image" style={{ position: "relative" }}>
        <Link href={eventDetailPath} className="img-link">
          <Image
            src={event.imageSrc}
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 300px" // Adiciona sizes para otimização responsiva
          />
        </Link>
      </div>

      <div className="card-info">
        <span className={`category-badge ${event.category}`}>
          {event.categoryText}
        </span>
        <h3>{event.title}</h3>
        <p className="description">{event.description}</p>
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <i className="fa-solid fa-location-dot"></i>{" "}
          <span>{event.location}</span>
        </div>
        <div className="meta-item">
          <i className="fa-regular fa-calendar"></i> <span>{event.date}</span>
        </div>

        <div className="price-action">
          <div className="price-tag">
            <i className="fa-solid fa-ticket"></i>
            <div className="price-text">
              {/* Verifica se o ingresso está esgotado */}
              <strong>
                {event.tickets === "Esgotado" ? "Esgotado" : event.tickets}
              </strong>
              <span>
                {event.tickets === "Esgotado"
                  ? "Disponibilidade"
                  : "Ingressos restantes"}
              </span>
            </div>
          </div>
          {/* Botão de coração agora controlado pelo estado React */}
          <i
            className={`${heartIconClass} fa-heart heart-icon ${
              isFavorite ? "filled" : ""
            }`}
            onClick={toggleFavorite}
          ></i>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 2. NAVBAR E DROPDOWN DE PERFIL (ProfileDropdown)
// ----------------------------------------------------
const ProfileDropdown: React.FC<{
  isMenuOpen: boolean
  toggleMenu: () => void
}> = ({ isMenuOpen, toggleMenu }) => {
  // Para fechar o menu ao clicar fora (substituindo o JS original)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Se o clique não estiver dentro do menu e o menu estiver aberto, feche.
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Verificação adicional para garantir que o clique não veio do botão de toggle
        const btn = document.querySelector(".profile-btn")
        if (btn && !btn.contains(event.target as Node)) {
          if (isMenuOpen) toggleMenu()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen, toggleMenu])

  return (
    <div
      className="nav-profile"
      style={{ position: "relative" }}
      ref={dropdownRef}
    >
      <button className="profile-btn" onClick={toggleMenu}>
        <i className="fa-solid fa-bars menu-icon"></i>
        <div className="avatar-circle">
          <i className="fa-solid fa-user"></i>
        </div>
      </button>

      {/* A classe 'show' é controlada pelo estado isMenuOpen */}
      <div
        className={`profile-dropdown ${isMenuOpen ? "show" : ""}`}
        id="profileMenu"
      >
        <div className="dropdown-header">
          <div className="avatar-large">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="user-info">
            <strong>FULANO DE TAL</strong>
            <span>fulanodetal@gmail.com</span>
          </div>
        </div>

        <ul className="dropdown-links">
          {/* Links internos convertidos para Next.js Link */}
          <li>
            <Link href="/evem-projeto/account">
              <i className="fa-regular fa-id-card"></i> Minha conta
            </Link>
          </li>
          <li>
            <Link href="/evem-projeto/tickets">
              <i className="fa-solid fa-ticket-simple"></i> Meus Ingressos
            </Link>
          </li>
          <li>
            <Link href="/evem-projeto/favorites">
              <i className="fa-solid fa-heart"></i> Favoritos
            </Link>
          </li>
        </ul>

        <div className="dropdown-footer">
          <Link href="/evem-projeto" className="logout-link">
            {" "}
            {/* Redireciona para a home (Logout) */}
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </Link>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 3. CARROSSEL DE DESTAQUES (FeaturedCarousel)
// ----------------------------------------------------

// Simulação de dados para o carrossel (Você já tinha 4 cards)
const carouselEvents: EventData[] = [
  {
    id: 1,
    title: "Raphael Ghanem",
    description: "",
    category: "purple",
    categoryText: "",
    location: "Salvador - BA",
    tickets: 15,
    imageSrc: "/img/poster-raphael.jpg",
    isFavorite: false,
    date: "",
    slug: "raphael-ghanem-1",
  },
  {
    id: 2,
    title: "Show Extra",
    description: "",
    category: "purple",
    categoryText: "",
    location: "Salvador - BA",
    tickets: 40,
    imageSrc: "/img/poster-raphael.jpg",
    isFavorite: false,
    date: "",
    slug: "show-extra",
  },
  {
    id: 3,
    title: "Final Tour",
    description: "",
    category: "purple",
    categoryText: "",
    location: "Salvador - BA",
    tickets: "Esgotado",
    imageSrc: "/img/poster-raphael.jpg",
    isFavorite: false,
    date: "",
    slug: "final-tour",
  },
  {
    id: 4,
    title: "Encerramento",
    description: "",
    category: "purple",
    categoryText: "",
    location: "Salvador - BA",
    tickets: 100,
    imageSrc: "/img/poster-raphael.jpg",
    isFavorite: false,
    date: "",
    slug: "encerramento",
  },
]

const CARD_WIDTH = 320 // Definido no seu JS original. Usado para o cálculo da translação.

const FeaturedCarousel: React.FC = () => {
  // Substitui a variável JS 'currentIndex'
  const [currentIndex, setCurrentIndex] = useState(0)
  // Substitui o 'document.getElementById('track')'
  const trackRef = useRef<HTMLDivElement>(null)
  const totalItems = carouselEvents.length

  // Função que substitui 'updateCarousel'
  useEffect(() => {
    if (trackRef.current) {
      const position = -(currentIndex * CARD_WIDTH)
      trackRef.current.style.transform = `translateX(${position}px)`
    }
  }, [currentIndex]) // Recalcula sempre que o índice muda

  const handleNext = () => {
    // Lógica para avançar: se não for o último item
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    // Lógica para voltar: se não for o primeiro item
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Função para renderizar um card específico do carrossel
  const CarouselCard: React.FC<{ event: EventData }> = ({ event }) => {
    const detailPath = `/evem-projeto/event-details/${event.slug}`

    return (
      <Link
        href={detailPath}
        className="event-card"
        style={{ position: "relative" }}
      >
        <Image
          src={event.imageSrc}
          alt={event.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="320px" // Define o tamanho fixo do carrossel
        />
        <div className="event-overlay">
          {event.tickets !== undefined && (
            <div className="ticket-badge">
              <i className="fa-solid fa-ticket"></i>
              <strong>
                {event.tickets === "Esgotado" ? "Esgotado" : event.tickets}
              </strong>
              {event.tickets !== "Esgotado" && " rest."}
            </div>
          )}
          <h3>{event.title}</h3>
          <p>{event.location}</p>
        </div>
      </Link>
    )
  }

  return (
    <section className="featured-carousel-area">
      <h2 style={{ padding: "0 60px", marginBottom: "20px", color: "#4B0082" }}>
        Destaques da Semana
      </h2>

      <div className="carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {carouselEvents.map((event) => (
            <CarouselCard key={event.id} event={event} />
          ))}
        </div>

        <div className="carousel-controls">
          {/* Botões de controle */}
          <button
            className="nav-arrow"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>

          {/* Dots (substituindo a lógica JS de criação de dots) */}
          <div
            id="dots-container"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            {carouselEvents.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>

          <button
            className="nav-arrow"
            onClick={handleNext}
            disabled={currentIndex === totalItems - 1}
          >
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// 4. COMPONENTE PRINCIPAL (EventsPage)
// ----------------------------------------------------

export default function EventsPage() {
  // 1. ESTADO DO MENU DE PERFIL
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  // 2. FUNÇÃO VOLTAR AO TOPO
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    // O body original é o conteúdo do <body> no React
    <div className="events-page-wrapper">
      {/* --- NAVBAR --- */}
      <nav className="main-navbar">
        <div className="nav-placeholder"></div>
        <div className="nav-logo">
          <Image
            src="/img/logo-header.png"
            alt="Evem"
            width={100} // Tamanho de largura assumido (ajuste conforme seu CSS)
            height={30} // Tamanho de altura assumido (ajuste conforme seu CSS)
            priority // Otimiza para carregamento rápido (LCP)
          />
        </div>

        <ProfileDropdown isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav>

      {/* --- CARROSSEL --- */}
      <FeaturedCarousel />

      {/* --- HEADER/FILTROS --- */}
      <header className="events-header">
        {/* Nota: A lógica de filtro/busca pode ser adicionada aqui usando estado, se necessário. */}
        <div className="top-filters">
          <div className="left-group">
            <button className="btn-blue">Ativo</button>
            <div className="location-btn">
              <i className="fa-solid fa-location-dot"></i> Catu{" "}
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>

          <div className="search-wrapper">
            <input type="text" placeholder="Busque evento, local, etc" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <div className="right-group">
            <button className="btn-filter">
              Todas as categorias <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button className="btn-filter">
              Este Mês <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>

        <div className="tags-row">
          <button className="tag-btn">Eventos Corporativos</button>
          <button className="tag-btn">Stand up comedy</button>
          <button className="tag-btn">Festas e Shows</button>
        </div>
      </header>

      {/* --- LISTA PRINCIPAL DE EVENTOS --- */}
      <main className="events-container">
        {/* Mapeando os dados simulados para gerar a lista de cards */}
        {mockEvents.map((event) => (
          <EventCardRow key={event.id} event={event} />
        ))}
      </main>

      {/* --- RODAPÉ E BOTÃO VOLTAR AO TOPO --- */}
      <div className="footer-wrapper">
        {/* Botão Voltar ao Topo agora com função React */}
        <div className="back-to-top" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up"></i> De volta ao topo
        </div>

        <footer className="main-footer">
          <div className="footer-columns">
            <div className="footer-col">
              <h3>Sobre nós</h3>
              <p>
                A EVEM é uma plataforma de gerenciamento de eventos que conecta
                pessoas a experiências únicas.
              </p>
              <p>
                Nossa missão é simplificar a organização e a participação em
                eventos de todos os tipos.
              </p>
            </div>

            <div className="footer-col">
              <h3>Contato e Redes</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="footer-col">
              <h3>Navegue</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/evem-projeto">Início</Link>
                </li>
                <li>
                  <Link href="/evem-projeto/login">Login</Link>
                </li>
                <li>
                  <Link href="/evem-projeto/signup">Cadastro</Link>
                </li>
                <li>
                  <Link href="/evem-projeto/events">Lista de Eventos</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="copyright">
            © 2025 EVEM – Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  )
}

// Nota: Para este código funcionar, você precisará ter o seu events.css
// no caminho 'src/app/evem-projeto/src/events.css' e as imagens em '/public/img/'.
