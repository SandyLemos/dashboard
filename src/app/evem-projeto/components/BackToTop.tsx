"use client"

import React from "react"

export function BackToTop() {
  // A única lógica do 'back-to-top' é o evento de clique.

  const scrollToTop = () => {
    // Usa a API nativa do navegador para rolagem suave.
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className="back-to-top"
      id="backToTop"
      onClick={scrollToTop} // Evento de clique no React
    >
      <i className="fa-solid fa-arrow-up"></i> De volta ao topo
    </div>
  )
}
