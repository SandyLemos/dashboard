// src/app/evem-projeto/page.tsx

"use client" // Necessário para interatividade e uso do Link

// 1. IMPORTAÇÕES DE ESTILO (CSS)
import "./src/style.css"

// 2. IMPORTAÇÕES DO REACT E NEXT
import React from "react"
import Link from "next/link" // Usaremos Link do Next.js para navegação interna
import Image from "next/image" // Usaremos Image do Next.js para otimização de imagens

// --- COMPONENTES AUXILIARES DEFINIDOS LOCALMENTE (PLACEHOLDERS) ---
// Removidas as importações externas para evitar o erro "Cannot find module"

interface HeaderProps {
  logoSrc: string
  homePath: string
  eventsPath: string
}

const Header: React.FC<HeaderProps> = ({ homePath, eventsPath }) => (
  <header className="main-header">
    <Link href={homePath} className="logo-link">
      {/* Usando Image otimizado com string path */}
      <Image
        src="/img/logo-header.png"
        alt="Evem"
        width={100}
        height={30}
        priority
      />
    </Link>
    <div className="nav-links">
      <Link href={eventsPath}>Eventos</Link>
      <Link href="/evem-projeto/about">Sobre</Link>
    </div>
    <div className="search-bar">
      <input type="text" placeholder="Buscar eventos..." />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  </header>
)

const Carousel: React.FC = () => (
  <div className="featured-carousel">
    <p
      style={{
        textAlign: "center",
        padding: "50px 0",
        background: "#f9f9f9",
        color: "#333",
      }}
    >
      Conteúdo dinâmico do Carrossel (Lógica do Carrossel)
    </p>
  </div>
)

const BackToTop: React.FC = () => (
  <button className="back-to-top" aria-label="Voltar ao topo">
    <i className="fa-solid fa-arrow-up"></i>
  </button>
)

const Footer: React.FC = () => (
  <footer className="main-footer">
    <p>© 2025 EVEM. Todos os direitos reservados.</p>
  </footer>
)

// --- COMPONENTE PRINCIPAL (EvemProjetoPage) ---

// As importações de imagem com alias foram removidas (logoHeader, logoHero, imgAA, imgBB)
// e substituídas por string paths abaixo.

export default function EvemProjetoPage() {
  return (
    <>
            {/* 4. HEADER: Usando o componente local e string path */}
           {" "}
      <Header
        logoSrc="/img/logo-header.png"
        homePath="/evem-projeto"
        eventsPath="/evem-projeto/events"
      />
            {/* 5. HERO SECTION */}     {" "}
      <section className="hero">
                <div className="decoration-circle circle-large"></div>       {" "}
        <div className="decoration-circle circle-1"></div>       {" "}
        <div className="decoration-circle circle-2"></div>       {" "}
        <div className="hero-content">
                   {" "}
          {/* Imagem usando o componente Image do Next.js e string path */}
                   {" "}
          <Image
            src="/img/logo-hero.png" // string path
            alt="Evem Event Management"
            className="hero-logo-img"
            width={400} // Adicionando dimensões necessárias
            height={200}
            priority
          />
                   {" "}
          <div className="btn-group">
                       {" "}
            <Link href="/evem-projeto/signup" className="btn btn-primary">
                            Cadastre-se            {" "}
            </Link>
                       {" "}
            <Link href="/evem-projeto/login" className="btn btn-secondary">
                            Entrar            {" "}
            </Link>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </section>
            {/* 6. BEM VINDO (WELCOME) */}     {" "}
      <section className="section-welcome" id="sobre">
               {" "}
        <div className="welcome-text">
                   {" "}
          <h2>
                        Bem-Vindo ao <span>EVEM</span>         {" "}
          </h2>
                   {" "}
          <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do             eiusmod tempor incididunt ut labore et dolore
            magna aliqua.          {" "}
          </p>
                   {" "}
          <div
            style={{
              height: "2px",
              width: "100px",
              background: "linear-gradient(to right, #7b2cbf, transparent)",
            }}
          ></div>
                 {" "}
        </div>
               {" "}
        <div className="about-visuals">
                    <div className="purple-circle-bg"></div>         {" "}
          {/* Adicionando style position: relative para que Image fill funcione */}
                   {" "}
          <div
            className="pill-container pill-left"
            style={{ position: "relative" }}
          >
                       {" "}
            {/* Imagens convertidas para o componente Image e string path */}
                       {" "}
            <Image
              src="/img/aa.jpg"
              alt="Imagem 1"
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
                     {" "}
          </div>
                   {" "}
          <div
            className="pill-container pill-right"
            style={{ position: "relative" }}
          >
                       {" "}
            <Image
              src="/img/bb.jpg"
              alt="Imagem 2"
              fill
              style={{ objectFit: "cover" }}
              sizes="300px"
            />
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </section>
            {/* 7. CATEGORIAS */}     {" "}
      <section className="section-categories">
               {" "}
        <h2>
                    <span>Categorias</span>       {" "}
        </h2>
               {" "}
        <div className="categories-grid">
          {/* Exemplo de conteúdo de categoria: */}
          <Link href="/evem-projeto/events?category=shows" className="cat-card">
            <i className="fa-solid fa-music"></i>
            <span>
              Shows e <br /> Festas
            </span>
          </Link>
          {/* ... Adicione o restante do conteúdo aqui ... */}       {" "}
        </div>
             {" "}
      </section>
            {/* 8. CARROSSEL DE DESTAQUE: Usando o componente local */}     {" "}
      <section className="section-featured">
               {" "}
        <div className="section-header">
                   {" "}
          <i
            className="fa-regular fa-calendar-plus"
            style={{ fontSize: "2rem", color: "#d62f98" }}
          ></i>
                   {" "}
          <h2>
                        Próximos eventos em <span>destaque</span>         {" "}
          </h2>
                 {" "}
        </div>
                <Carousel />     {" "}
      </section>
            {/* 9. BACK TO TOP: Usando o componente local */}
            <BackToTop />      {/* 10. FOOTER: Usando o componente local */}
            <Footer />   {" "}
    </>
  )
}
