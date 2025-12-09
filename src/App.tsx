import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import SignupPage from "./pages/SignupPage"; 
import AccountPage from "./pages/AccountPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TicketsPage from "./pages/TicketsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/event-details/:id" element={<EventDetailsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;