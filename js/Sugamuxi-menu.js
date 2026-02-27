document.addEventListener('DOMContentLoaded', () => {
    initTypeWriterEffect();
    initFilterTabs();
    initAnimations();
    initHoverEffects();
    initCurrentYear();
    // global.js handles Nav, Mobile Menu, etc.
});

/**
 * Efecto de escritura para el título Hero
 */
function initTypeWriterEffect() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent.trim();
    heroTitle.textContent = '';

    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 300);
}

/**
 * Sistema de filtrado por pestañas
 */
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.media-card');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('noResults');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Activar pestaña
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            let visibleCount = 0;

            // Filtrar tarjetas
            cards.forEach(card => {
                const type = card.getAttribute('data-type');

                if (filter === 'todos' || type === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'scaleIn 0.4s ease forwards';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.animation = 'none';
                }
            });

            // Actualizar contador
            if (resultsCount) resultsCount.textContent = visibleCount;

            // Mostrar mensaje si no hay resultados
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });
}

/**
 * Animaciones al hacer scroll usando Intersection Observer
 */
function initAnimations() {
    const cards = document.querySelectorAll('.media-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

/**
 * Efectos visuales de hover y touch
 */
function initHoverEffects() {
    // Se eliminan los efectos hover simulados de audio porque
    // ahora estamos utilizando etiquetas <audio controls> nativas.
}

/**
 * Sistema de Lightbox / Modal para imágenes
 */
function openLightbox(src, captionText) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (modal && img) {
        img.src = src;
        if (caption && captionText) {
            caption.textContent = captionText;
        } else if (caption) {
            caption.textContent = '';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll al fondo

        // Cerrar con Escape
        window.addEventListener('keydown', handleEscKey);
    }
}

function closeLightbox(event, isCloseBtn = false) {
    const modal = document.getElementById('lightbox-modal');
    // Si se hizo clic en el botón de cerrar explícitamente, o haciendo clic fuera de la imagen/contenido
    if (isCloseBtn || (event && event.target === modal)) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll

        // Remover evento de teclado
        window.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeLightbox(null, true);
    }
}

/**
 * Actualiza el año actual en el footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}