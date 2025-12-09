// src/app/evem-projeto/favorites/page.tsx

"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Componente de otimização de imagens
// Reutilizando o CSS de ingressos que continha o estilo do cabeçalho e utilitários
import "../../src/ingressos.css"
import "./favorites.css"

// --- 1. DADOS MOCKADOS ---
interface FavoriteEventData {
  imageSrc: string
  tag: string
  tagClass: string
  title: string
  description: string
  location: string
  date: string
  ticketsRemaining: number | string
  slug: string
}

const favoriteEvents: FavoriteEventData[] = [
  // ESTA VARIÁVEL É UTILIZADA NO COMPONENTE PRINCIPAL ABAIXO
  {
    imageSrc: "/img/poster-raphael.jpg",
    tag: "Stand up comedy",
    tagClass: "tag-orange",
    title: "Raphael Ghanem - Se é que você me entende!",
    description:
      'Com texto, interpretação e direção de Raphael Ghanem, "Se é que você me entende" é um espetáculo de Stand up Comedy repleto de interações.',
    location: "BeFly Minascentro",
    date: "Quinta e Sexta às 22h00",
    ticketsRemaining: 15,
    slug: "raphael-ghanem-stand-up",
  },
  {
    imageSrc: "/img/breakfast.jpg",
    tag: "Gastronomia e bebidas",
    tagClass: "tag-purple",
    title: "Festival de delícias culinárias",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
    location: "The Plaza, San Francisco",
    date: "Quarta, 15 a 23 Out - 13:00",
    ticketsRemaining: 115,
    slug: "festival-delicias-culinarias",
  },
]

// --- 2. COMPONENTE PROFILE DROPDOWN (Reutilizado) ---

const ProfileDropdown: React.FC<{
  isMenuOpen: boolean
  toggleMenu: () => void
}> = ({ isMenuOpen, toggleMenu }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        const btn = document.querySelector(".profile-btn")
        if (btn && !btn.contains(event.target as Node)) {
          if (isMenuOpen) toggleMenu()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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

      <div
        className={`profile-dropdown ${isMenuOpen ? "show" : ""}`}
        id="profileMenu"
      >
        <div className="dropdown-header">
          <div className="avatar-circle" style={{ backgroundColor: "#0085D7" }}>
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="user-info">
            <strong>FULANO DE TAL</strong>
            <span>fulano@gmail.com</span>
          </div>
        </div>
        <ul className="dropdown-links">
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
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </Link>
        </div>
      </div>
    </div>
  )
}

// --- 3. COMPONENTE PRINCIPAL (FavoritesPage) ---

export default function FavoritesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  // Função para simular a remoção de um item da lista
  const handleRemoveFavorite = (title: string) => {
    alert(`Ação: Remover "${title}" dos favoritos.`)
    // Em um app real, você atualizará o estado da lista de favoritos aqui (ex: usando useState ou uma API global).
  }

  return (
    <div className="favorites-page-wrapper">
      {/* --- CABEÇALHO --- */}
      <header className="account-header">
        <div className="header-logo">
          {/* Imagem otimizada */}
          <Image
            src="/img/logo-header.png"
            alt="Evem"
            width={100}
            height={30}
            priority
          />
        </div>
        <ProfileDropdown isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="tickets-container">
        {/* Título da Página */}
        <div className="page-title">
          <i
            className="fa-solid fa-heart fav-title-icon" // Ícone de coração
            style={{
              color: "#d35400", // Cor laranja para favoritos
              marginRight: 10,
            }}
          ></i>
          <h1>Eventos Favoritos</h1>
        </div>

        {/* Mapeamento dos eventos: SOLUÇÃO PARA O AVISO 'never used' */}
        {favoriteEvents.length > 0 ? (
          <div className="tickets-list">
            {/* O .map() utiliza o array favoriteEvents, resolvendo o aviso. */}
            {favoriteEvents.map((event) => (
              <Link
                href={`/evem-projeto/event-details/${event.slug}`}
                key={event.slug}
                className="fav-card"
              >
                {/* Contêiner da imagem com Image fill para otimização */}
                <div
                  className="fav-img-wrapper"
                  style={{
                    position: "relative",
                    width: "200px", // Defina a largura do card, se necessário
                    height: "100%", // Adapte a altura conforme o layout CSS
                  }}
                >
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    className="fav-img"
                    fill // Ocupa todo o contêiner pai
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 600px) 100vw, 200px"
                  />
                </div>

                <div className="fav-info">
                  <span className={`fav-tag ${event.tagClass}`}>
                    {event.tag}
                  </span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>

                <div className="fav-meta">
                  <div className="meta-row">
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {event.location}
                  </div>
                  <div className="meta-row">
                    <i className="fa-regular fa-calendar"></i> {event.date}
                  </div>
                </div>

                <div className="fav-actions">
                  <div className="ticket-status">
                    <i className="fa-solid fa-ticket"></i>{" "}
                    {event.ticketsRemaining} restantes
                  </div>
                  {/* Ícone de coração clicável (usa onMouseDown para prevenir navegação) */}
                  <i
                    className="fa-solid fa-heart heart-btn"
                    onMouseDown={(e) => {
                      e.preventDefault() // Impede a navegação do Link ao clicar no botão
                      handleRemoveFavorite(event.title)
                    }}
                    title="Remover dos favoritos"
                  ></i>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Estado de lista vazia
          <div
            className="empty-state"
            style={{ padding: "40px", textAlign: "center" }}
          >
            <h2>Nenhum Evento Favorito</h2>
            <p>
              Clique no ícone de coração nos eventos para salvá-los aqui e não
              perder as novidades!
            </p>
            <Link
              href="/evem-projeto/events"
              className="btn-blue"
              style={{ marginTop: "20px", display: "inline-block" }}
            >
              Ver Todos os Eventos
            </Link>
          </div>
        )}
      </main>

      {/* --- RODAPÉ SIMPLIFICADO --- */}
      <footer className="simple-footer">
        <p>© 2025 EVEM – Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
