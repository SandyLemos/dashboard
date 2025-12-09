import React from "react";
// O cabeçalho 'use client' e os estilos globais geralmente ficam no arquivo principal
"use client"
import "./styles/globals.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Componentes de Roteamento da 'origin/main'
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import SignupPage from "./pages/SignupPage"; 
import AccountPage from "./pages/AccountPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TicketsPage from "./pages/TicketsPage";
import FavoritesPage from "./pages/FavoritesPage";

// Novo componente criado a partir do conteúdo da 'HEAD'
import AdminDashboardPage from "./pages/AdminDashboardPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas existentes da 'origin/main' */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/account" element={<AccountPage />} />
        <Route path="/event-details/:id" element={<EventDetailsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        
        {/* Nova Rota para o Painel de Gerenciamento (seu código anterior) */}
        <Route path="/admin" element={<AdminDashboardPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;