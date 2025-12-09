// src/app/evem-projeto/account/page.tsx

"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import "../../src/account.css" // Importação do CSS específico

// --- 1. COMPONENTE PROFILE DROPDOWN (Reutilizado e adaptado) ---

/**
 * Componente do Dropdown de Perfil com lógica de fechar ao clicar fora.
 */
const ProfileDropdown: React.FC<{
  isMenuOpen: boolean
  toggleMenu: () => void
}> = ({ isMenuOpen, toggleMenu }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Verifica se o clique ocorreu fora do menu E fora do botão
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
          {/* Alterado avatar-circle para o estilo do CSS da Navbar, garantindo o azul no dropdown */}
          <div className="avatar-circle" style={{ backgroundColor: "#0085D7" }}>
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="user-info">
            <strong>FULANO DE TAL</strong>
            <span>fulanodetal@gmail.com</span>
          </div>
        </div>
        <ul className="dropdown-links">
          {/* Paths mapeados para as rotas do Next.js */}
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

// --- 2. COMPONENTE PRINCIPAL (AccountPage) ---

export default function AccountPage() {
  // Estado do menu de perfil
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  // Simulação dos dados do usuário
  const userData = {
    name: "Fulana de Tal",
    email: "Fulanadetal@gmail.com",
    passwordMask: "************", // Senha mascarada
  }

  // Função para simular o clique no lápis (em um app real, ativaria a edição)
  const handleEditClick = (field: string) => {
    alert(`Ação: Ativar edição do campo "${field}"`)
    // Aqui você implementaria a lógica para transformar o input em editável
  }

  return (
    <div className="account-page-wrapper">
      {/* --- CABEÇALHO FLUTUANTE (BRANCO) --- */}
      <header className="account-header">
        <div
          className="header-logo"
          style={{ position: "relative", height: "120px" }}
        >
          <Image
            src="/img/logo-header.png"
            alt="Evem"
            fill // Permite que a imagem ocupe o espaço do contêiner pai
            style={{ objectFit: "contain" }} // Mantém a proporção e respeita o height: 120px
            priority // Otimização para LCP, pois é o logo
          />
        </div>

        <ProfileDropdown isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>

      <main className="account-container">
        <div className="account-card">
          <h2>Dados da Conta</h2>

          {/* Nota: Em um app real, este seria um formulário com métodos onSubmit e estados gerenciados */}
          <form className="account-form" onSubmit={(e) => e.preventDefault()}>
            {/* Campo Nome */}
            <div className="input-group">
              <label htmlFor="account-name">Nome</label>
              <div className="input-wrapper">
                <input
                  id="account-name"
                  type="text"
                  defaultValue={userData.name}
                  readOnly
                />
                <i
                  className="fa-solid fa-pen pencil-icon"
                  onClick={() => handleEditClick("Nome")}
                  title="Editar Nome"
                ></i>
              </div>
            </div>

            {/* Campo E-mail */}
            <div className="input-group">
              <label htmlFor="account-email">E-mail</label>
              <div className="input-wrapper">
                <input
                  id="account-email"
                  type="email"
                  defaultValue={userData.email}
                  readOnly
                />
                <i
                  className="fa-solid fa-pen pencil-icon"
                  onClick={() => handleEditClick("E-mail")}
                  title="Editar E-mail"
                ></i>
              </div>
            </div>

            {/* Campo Senha */}
            <div className="input-group">
              <label htmlFor="account-password">Senha</label>
              <div className="input-wrapper">
                <input
                  id="account-password"
                  type="password"
                  defaultValue={userData.passwordMask}
                  readOnly
                />
                <i
                  className="fa-solid fa-pen pencil-icon"
                  onClick={() => handleEditClick("Senha")}
                  title="Mudar Senha"
                ></i>
              </div>
            </div>

            <div className="form-footer">
              <span className="manage-text">Gerenciamento de conta</span>
              <Link href="#" className="delete-link">
                Excluir a conta
              </Link>{" "}
              {/* A rota de exclusão seria criada aqui */}
            </div>

            <div style={{ marginTop: 20, textAlign: "center" }}>
              {/* Link de volta para a lista de eventos */}
              <Link
                href="/evem-projeto/events"
                style={{
                  color: "#d62f98",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                &larr; Voltar para Eventos
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

// Nota: Para que esta página funcione, o arquivo account.css deve estar em
// 'src/app/evem-projeto/src/account.css' e a imagem da logo em '/public/img/logo-header.png'.
