"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  logoSrc: any // Use o tipo correto para sua importação de imagem
  homePath: string
  eventsPath: string
}

export function Header({ logoSrc, homePath, eventsPath }: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false)

  // Lógica do Search Bar do seu main.ts convertida para estado/estilo do React
  const searchBarStyle = {
    borderColor: isFocused ? "#d62f98" : "#7b2cbf",
    boxShadow: isFocused ? "0 0 10px rgba(214, 47, 152, 0.5)" : "none",
  }

  return (
    <header>
      <div className="logo">
        {/* Link/Image conforme a lógica */}
        <Image
          src={logoSrc}
          alt="Evem Logo"
          style={{ height: "100px", width: "auto" }}
        />
      </div>

      <div
        className="search-bar"
        style={searchBarStyle} // Estilo dinâmico aqui
      >
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ color: "#d62f98" }}
        ></i>
        <input
          type="text"
          placeholder="Buscar eventos"
          onFocus={() => setIsFocused(true)} // Evento Focus do React
          onBlur={() => setIsFocused(false)} // Evento Blur do React
        />
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link href={eventsPath}>Eventos</Link>
          </li>
          <li>
            <Link href="#sobre">Sobre</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
