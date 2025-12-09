import './style.css' // Importa seu CSS
import { Carousel } from './Carousel' 

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o Carrossel
    new Carousel('track', 'next', 'prev');

    // Lógica do botão Voltar ao Topo (Tipada)
    const backToTopBtn = document.getElementById('backToTop') as HTMLElement | null;
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lógica da Barra de Busca
    const searchInput = document.querySelector('.search-bar input') as HTMLInputElement | null;
    const searchBar = document.querySelector('.search-bar') as HTMLElement | null;

    if (searchInput && searchBar) {
        searchInput.addEventListener('focus', () => {
            searchBar.style.borderColor = '#d62f98';
            searchBar.style.boxShadow = '0 0 10px rgba(214, 47, 152, 0.5)';
        });

        searchInput.addEventListener('blur', () => {
            searchBar.style.borderColor = '#7b2cbf';
            searchBar.style.boxShadow = 'none';
        });
    }
});