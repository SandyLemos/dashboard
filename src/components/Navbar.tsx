import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-[#E2DDF8] relative z-50">
      <div className="w-[100px] hidden md:block"></div>

      <div className="flex justify-center">
        <Link to="/events">
          <img 
            src="/img/logo-header.png" 
            alt="Evem" 
            className="h-[60px] md:h-[120px] w-auto object-contain" 
          />
        </Link>
      </div>

      <div className="flex justify-end relative w-[100px]" ref={dropdownRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white border-none py-1.5 px-2 pr-1.5 pl-4 rounded-full flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="flex flex-col gap-1 md:hidden">
            <span className="w-4 h-0.5 bg-[#0085D7]"></span>
            <span className="w-4 h-0.5 bg-[#0085D7]"></span>
            <span className="w-4 h-0.5 bg-[#0085D7]"></span>
          </div>
          
          <div className="w-9 h-9 bg-[#0d001a] text-white rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </button>

        {isMenuOpen && (
          <div className="absolute top-14 right-0 w-64 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 animate-in fade-in zoom-in-95 duration-200 z-50">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100 mb-2">
              <div className="w-10 h-10 bg-[#0085D7] text-white rounded-full flex items-center justify-center text-lg">👤</div>
              <div className="flex flex-col text-left">
                <strong className="text-sm text-black">FULANO DE TAL</strong>
                <span className="text-xs text-gray-500">fulano@gmail.com</span>
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/account" className="flex items-center gap-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>💳</span> Minha conta
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="flex items-center gap-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>🎟️</span> Meus Ingressos
                </Link>
              </li>
              <li>
                {/* CORREÇÃO AQUI: Link apontando para /favorites */}
                <Link to="/favorites" className="flex items-center gap-3 p-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <span>❤️</span> Favoritos
                </Link>
              </li>
            </ul>
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link to="/" className="flex items-center gap-3 p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium">
                <span>🚪</span> Sair
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}