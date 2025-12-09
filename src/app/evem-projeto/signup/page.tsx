// src/app/evem-projeto/signup/page.tsx

"use client"

import React, { useState } from "react"
import Link from "next/link"

// Importa o CSS dedicado para esta página.
import "../src/signup.css"

// Define os tipos de visualização possíveis (para a variável de estado)
type CardType = "selection" | "participant" | "organizer"

// Interface de propriedades para os sub-componentes
interface CardProps {
  // A função para mudar o estado do formulário
  showForm: (type: CardType) => void
}

// ----------------------------------------------------
// 1. COMPONENTE DE SELEÇÃO (CardSelection)
// ----------------------------------------------------
const CardSelection: React.FC<CardProps> = ({ showForm }) => (
  // 'class' mudado para 'className' e 'onclick' para 'onClick'
  <div className="signup-card" id="card-selection">
    <h2>Cadastro</h2>
    <p className="subtitle">Selecione o tipo de usuário</p>

    <div className="type-buttons">
      <button onClick={() => showForm("participant")} className="btn-type">
        Participante
      </button>
      <button onClick={() => showForm("organizer")} className="btn-type">
        Organizador
      </button>
    </div>

    <div className="footer-link">
      Já tem uma conta? <Link href="/evem-projeto/login">Login</Link>
    </div>
    <Link href="/evem-projeto" className="back-link">
      ← Voltar para o site
    </Link>
  </div>
)

// ----------------------------------------------------
// 2. COMPONENTE PARTICIPANTE (CardParticipant)
// ----------------------------------------------------
const CardParticipant: React.FC<CardProps> = ({ showForm }) => {
  // Função de envio do formulário (substitui a lógica de JS)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de cadastro do Participante (ex: API call)
    alert("Cadastro de Participante efetuado (simulação)! Redirecionando...")
    // Em um projeto real, após o sucesso, você usaria o router.push:
    // window.location.href = '/evem-projeto/events';
  }

  return (
    <div className="signup-card" id="card-participant">
      <h2>Cadastro</h2>
      <div className="badge">Participante</div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="p_name">Nome</label>
          <input type="text" id="p_name" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="p_email">Email</label>
          <input type="email" id="p_email" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="p_password">Senha</label>
          <input type="password" id="p_password" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="p_confirm_password">Repita a senha</label>
          <input type="password" id="p_confirm_password" required />
        </div>
        <button type="submit" className="btn-submit">
          Cadastro
        </button>
        <button
          type="button"
          onClick={() => showForm("selection")} // Volta para a seleção
          className="btn-back"
        >
          Voltar
        </button>
      </form>
    </div>
  )
}

// ----------------------------------------------------
// 3. COMPONENTE ORGANIZADOR (CardOrganizer)
// ----------------------------------------------------
const CardOrganizer: React.FC<CardProps> = ({ showForm }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de cadastro do Organizador (ex: API call)
    alert("Cadastro de Organizador efetuado (simulação)! Redirecionando...")
    // window.location.href = '/evem-projeto/events';
  }

  return (
    <div className="signup-card" id="card-organizer">
      <h2>Cadastro</h2>
      <div className="badge">Organizador</div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="o_company_name">Nome da empresa</label>
          <input type="text" id="o_company_name" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_document">CNPJ ou CPF</label>
          <input type="text" id="o_document" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_phone">Telefone comercial</label>
          <input type="text" id="o_phone" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_email">Email corporativo</label>
          <input type="email" id="o_email" required />
        </div>

        <div className="divider">
          <span>Endereço</span>
        </div>

        <div className="input-wrapper">
          <label htmlFor="o_city">Nome da cidade</label>
          <input type="text" id="o_city" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_cep">CEP</label>
          <input type="text" id="o_cep" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_street">Rua</label>
          <input type="text" id="o_street" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="o_district">Bairro</label>
          <input type="text" id="o_district" required />
        </div>

        <button type="submit" className="btn-submit">
          Cadastro
        </button>
        <button
          type="button"
          onClick={() => showForm("selection")} // Volta para a seleção
          className="btn-back"
        >
          Voltar
        </button>
      </form>
    </div>
  )
}

// ----------------------------------------------------
// 4. COMPONENTE PRINCIPAL (SignupPage)
// ----------------------------------------------------
export default function SignupPage() {
  // O estado inicial é 'selection'
  const [currentCard, setCurrentCard] = useState<CardType>("selection")

  // Função que substitui a lógica JS original
  const handleShowForm = (type: CardType) => {
    setCurrentCard(type)
  }

  // Renderiza o componente correto com base no estado
  return (
    <main>
      {currentCard === "selection" && (
        <CardSelection showForm={handleShowForm} />
      )}
      {currentCard === "participant" && (
        <CardParticipant showForm={handleShowForm} />
      )}
      {currentCard === "organizer" && (
        <CardOrganizer showForm={handleShowForm} />
      )}
    </main>
  )
}
