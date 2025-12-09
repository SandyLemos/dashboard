// src/app/evem-projeto/tickets/page.tsx

"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import "../../src/ingressos.css" // Importação do CSS específico
import Image from "next/image"

// --- 1. CONFIGURAÇÃO E DADOS MOCKADOS ---

const tabs = ["Ativos", "Pendentes", "Cancelados", "Encerrados"]

const categories = [
  { icon: "fa-solid fa-music", title: "Shows e Festas", slug: "shows" },
  {
    icon: "fa-solid fa-chalkboard-user",
    title: "Cursos e Workshops",
    slug: "cursos",
  },
  {
    icon: "fa-solid fa-masks-theater",
    title: "Teatro e Cultura",
    slug: "teatro",
  },
  {
    icon: "fa-solid fa-person-running",
    title: "Esportes e Bem-estar",
    slug: "esportes",
  },
  {
    icon: "fa-solid fa-briefcase",
    title: "Negócios e Carreira",
    slug: "negocios",
  },
  {
    icon: "fa-solid fa-rocket",
    title: "Tecnologia e Inovação",
    slug: "tecnologia",
  },
  // Adicionei a classe 'active' em alguns para refletir o HTML original (visual)
  {
    icon: "fa-solid fa-utensils",
    title: "Gastronomia e Bebidas",
    slug: "gastronomia",
    active: true,
  },
  {
    icon: "fa-solid fa-book-bible",
    title: "Religião e Espiritualidade",
    slug: "religiao",
    active: true,
  },
  {
    icon: "fa-solid fa-people-roof",
    title: "Infantil e Família",
    slug: "infantil",
    active: true,
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
          {/* Esta é a página atual, mas manter o Link é bom para consistência */}
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

// --- 3. COMPONENTE PRINCIPAL (TicketsPage) ---

export default function TicketsPage() {
  // Estado para controlar a aba ativa (simulando filtro de ingressos)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const [activeTab, setActiveTab] = useState("Ativos")

  // Simulação do conteúdo principal baseado na aba
  const renderTicketContent = () => {
    // Por enquanto, sempre mostra o estado vazio, como no HTML original
    // Em um app real, aqui haveria a lista de ingressos filtrada pela activeTab
    return (
      <div className="tickets-content empty">
        <p>Não há ingressos para próximos eventos</p>
        <Link href="/evem-projeto/events" className="btn-find">
          ENCONTRAR EVENTOS
        </Link>
      </div>
    )
  }

  return (
    <div className="tickets-page-wrapper">
      {/* --- CABEÇALHO --- */}
      <header className="account-header">
        <div className="header-logo">
          <Image
            src="/img/logo-header.png"
            alt="Evem"
            width={100} // Valor baseado em usos anteriores do logo
            height={30} // Valor baseado em usos anteriores do logo
            priority // Otimiza o carregamento do logo
          />
        </div>
        <ProfileDropdown isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="tickets-container">
        {/* Título da Página */}
        <div className="page-title">
          <i className="fa-solid fa-ticket icon-blue"></i>
          <h1>Ingressos</h1>
        </div>

        {/* Barra de Controles: Abas e Busca */}
        <div className="controls-bar">
          <div className="tabs-group">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar pelo nome, email, ingresso ou pedido"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        {/* Conteúdo dos Ingressos (Simulando estado vazio) */}
        {renderTicketContent()}

        {/* Seção de Categorias */}
        <section className="section-categories">
          <h2>Navegue por Categorias</h2>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              // Mapeando os dados mockados para criar os cartões
              <Link
                key={index}
                href={`/evem-projeto/events?category=${cat.slug}`}
                className={`cat-card ${cat.active ? "active" : ""}`}
              >
                <i className={cat.icon}></i>
                {/* Usando <br/> para forçar a quebra de linha como no HTML original */}
                <span>
                  {cat.title
                    .replace(" e ", " e\u200b")
                    .split("\u200b")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

// Nota: A função complexa no span da categoria é apenas para replicar a quebra de linha <br> do HTML original.
// Se você não quiser replicar a quebra de linha, simplifique para:
// <span>{cat.title}</span>
