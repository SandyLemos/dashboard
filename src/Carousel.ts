// src/Carousel.ts

export class Carousel {
    // Definindo os tipos das propriedades
    private track: HTMLElement | null;
    private nextBtn: HTMLElement | null;
    private prevBtn: HTMLElement | null;
    private dotsContainer: HTMLElement | null;
    private slides: NodeListOf<Element>;
    private dots: NodeListOf<HTMLElement> | null = null; // Inicializa como null

    private currentIndex: number = 0;
    private cardWidth: number = 370;
    private totalItems: number;

    constructor(trackId: string, nextBtnId: string, prevBtnId: string) {
        // Busca os elementos no DOM
        this.track = document.getElementById(trackId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.dotsContainer = document.getElementById('dots-container');
        
        // Seleciona os cards (assumindo que a classe é .event-card)
        this.slides = document.querySelectorAll('.event-card');
        this.totalItems = this.slides.length;

        // Inicia apenas se o trilho existir
        if (this.track) {
            this.init();
        } else {
            console.error(`Erro: Elemento track com id "${trackId}" não encontrado.`);
        }
    }

    private init(): void {
        this.createDots();

        // Adiciona eventos com verificação de nulidade (Safety Check)
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.moveNext());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.movePrev());
        }

        // Ajuste ao redimensionar a tela
        window.addEventListener('resize', () => {
            this.currentIndex = 0;
            this.updateCarousel();
        });
    }

    private createDots(): void {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateCarousel();
            });

            this.dotsContainer?.appendChild(dot);
        });

        // Atualiza a referência das bolinhas
        this.dots = document.querySelectorAll('.dot');
    }

    private moveNext(): void {
        if (this.currentIndex < this.totalItems - 1) { 
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    private movePrev(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    private updateCarousel(): void {
        if (!this.track) return;

        const position = -(this.currentIndex * this.cardWidth);
        this.track.style.transform = `translateX(${position}px)`;

        this.updateDots();
    }

    private updateDots(): void {
        if (!this.dots) return;

        // Remove classe active de todos
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona na atual
        if (this.dots[this.currentIndex]) {
            this.dots[this.currentIndex].classList.add('active');
        }
    }
}