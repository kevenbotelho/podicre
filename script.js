// JavaScript for Podicrê Website

// DOM Elements
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const audioPlayer = document.getElementById('audio-player');
const audioPlayPauseBtn = document.getElementById('audio-play-pause');
const audioProgress = document.getElementById('audio-progress');
const audioTime = document.getElementById('audio-time');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
const episodesGrid = document.querySelector('.episodes-grid');

// Load Backstage Video
function loadBackstageVideo(btn) {
    const videoWrapper = btn.closest('.video-wrapper');
    const videoId = videoWrapper.dataset.videoId;
    
    const iframe = document.createElement('iframe');
    iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.title = 'Backstage Video';
    
    videoWrapper.innerHTML = '';
    videoWrapper.appendChild(iframe);
    videoWrapper.classList.remove('video-cover');
}

// Episode Data
const episodes = [
    {
        id: 2,
        title: '🎧 Episódio 2 – Marketing Digital em Debate',
        desc: 'Debate dentro de uma empresa sobre falhas no marketing digital, comunicação e adaptação ao mercado atual.',
        date: '22/05/2026',
        duration: '15 min',
        guest: 'Gerente Keven Botelho',
        image: '📊',
        anchor: '#episodio2'   // FIX: ancora correta para a seção do ep2
    },
    {
        id: 1,
        title: '🎧 Episódio 1 – Racismo no esporte',
        desc: 'Conversando sobre o caso de racismo no estádio do Palmeiras - Com Glauton.',
        date: '29/01/2026',
        duration: '11 min',
        guest: 'Apresentador Lianderson',
        image: '🎧',
        anchor: '.video-section'  // FIX: era '#home', agora aponta para a seção do vídeo
    }
];

// Products Data
const products = [
    {
        id: 1,
        name: 'Camiseta Urban Vibes',
        desc: 'Design exclusivo que representa a essência do Podicrê',
        price: 'R$ 89,90',
        image: '👕'
    },
    {
        id: 2,
        name: 'Boné Street Culture',
        desc: 'Para quem curte o estilo urbano e quer mostrar sua identidade',
        price: 'R$ 69,90',
        image: '🧢'
    },
    {
        id: 3,
        name: 'Copos Podicrê',
        desc: 'Para os momentos de pausa e reflexão',
        price: 'R$ 39,90',
        image: '☕'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimation();
    initAudioPlayer();
    initNewsletter();
    generateEpisodes();
    initSmoothScroll();
    initHeaderScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenuToggle.classList.toggle('active');
        
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.classList.remove('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Scroll Animation
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    const episodeCards = document.querySelectorAll('.episode-card');
    episodeCards.forEach(card => {
        observer.observe(card);
    });
}

// ── Audio Player ────────────────────────────────────────────────────────────
// FIX: variáveis movidas para escopo do módulo, fora do initAudioPlayer()
// Antes, currentAudioUrl e progressInterval estavam presos dentro do closure
// e não podiam ser lidos/escritos por activateAudioPlayer() ou stopAudioProgress().
let currentAudioUrl = '';
let progressInterval = null;  // FIX: referência ao intervalo para poder limpar

function initAudioPlayer() {
    audioPlayPauseBtn.addEventListener('click', () => {
        toggleAudioPlayer();
    });

    audioProgress.addEventListener('input', () => {
        updateAudioProgress();
    });
}

function activateAudioPlayer(url) {
    if (url.includes('episode/1')) {
        scrollToVideo();
        return;
    }
    
    currentAudioUrl = url;  // FIX: agora funciona pois a var está no escopo correto
    audioPlayer.classList.add('active');
    audioPlayer.classList.remove('hidden');
    
    const audioTitle = document.querySelector('.audio-title');
    const audioArtist = document.querySelector('.audio-artist');
    
    audioTitle.textContent = 'Podicrê - Episódio 001';
    audioArtist.textContent = 'Com Glauton';  // FIX: era "Com Keven Botelho" (ele é o host, não o convidado do ep1)
    
    startAudioProgress();
}

function toggleAudioPlayer() {
    const isActive = audioPlayer.classList.contains('active');
    
    if (isActive) {
        audioPlayer.classList.remove('active');
        audioPlayPauseBtn.textContent = '▶';
        stopAudioProgress();   // FIX: para o intervalo ao fechar
    } else {
        audioPlayer.classList.add('active');
        audioPlayPauseBtn.textContent = '⏸';
        startAudioProgress();
    }
}

// FIX: limpa o intervalo anterior antes de criar um novo (evitava memory leak)
function stopAudioProgress() {
    if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function startAudioProgress() {
    stopAudioProgress(); // FIX: garante que só existe um intervalo ativo por vez

    let progress = parseFloat(audioProgress.value) || 0;
    const duration = 660; // FIX: era 2700 (45 min); ep1 tem 11 min = 660 segundos
    
    progressInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(progressInterval);
            progressInterval = null;
            audioPlayPauseBtn.textContent = '▶';
            audioPlayer.classList.remove('active');
            return;
        }
        
        progress += 0.1;
        audioProgress.value = progress;
        updateAudioTime(progress, duration);
    }, 100);
}

function updateAudioProgress() {
    const progress = audioProgress.value;
    const duration = 660; // FIX: consistente com startAudioProgress
    updateAudioTime(progress, duration);
}

function updateAudioTime(progress, duration) {
    const currentTime = (progress / 100) * duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    audioTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Newsletter
function initNewsletter() {
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        if (!email) {
            showMessage('Por favor, insira seu email.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }
        
        simulateNewsletterSignup(email);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateNewsletterSignup(email) {
    showMessage('Enviando...', 'info');
    
    setTimeout(() => {
        showMessage('Inscrição realizada com sucesso! Verifique seu email.', 'success');
        newsletterForm.reset();
    }, 2000);
}

function showMessage(message, type) {
    if (!newsletterMessage) return;
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 5000);
}

// Generate Episodes
function generateEpisodes() {
    if (!episodesGrid) return;
    episodesGrid.innerHTML = '';
    
    episodes.forEach((episode, index) => {
        const episodeCard = document.createElement('div');
        episodeCard.className = 'episode-card fade-in' + (index === 0 ? ' episode-card--new' : '');

        // FIX: ep1 usava anchor '#home' — agora usa a classe '.video-section' para rolar ao vídeo
        const isHashAnchor = episode.anchor.startsWith('#');
        const btnHref = isHashAnchor ? episode.anchor : 'javascript:void(0)';
        const btnOnClick = !isHashAnchor
            ? `onclick="scrollToSection('${episode.anchor}'); return false;"`
            : '';

        episodeCard.innerHTML = `
            <div class="episode-image">
                <span>${episode.image}</span>
            </div>
            <div class="episode-content">
                ${index === 0 ? '<span class="episode-new-badge">Novo</span>' : ''}
                <h3 class="episode-title">${episode.title}</h3>
                <p class="episode-desc">${episode.desc}</p>
                <div class="episode-meta">
                    <span class="meta-item">📅 ${episode.date}</span>
                    <span class="meta-item">⏱️ ${episode.duration}</span>
                    <span class="meta-item">👥 ${episode.guest}</span>
                </div>
                <div class="episode-actions">
                    <a href="${btnHref}" ${btnOnClick} class="btn-primary" style="text-decoration:none; display:inline-block;">🎧 Assistir</a>
                </div>
            </div>
        `;
        
        episodesGrid.appendChild(episodeCard);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a, .mobile-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAnchor(anchor) {
    const element = document.querySelector(anchor);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToVideo() {
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        videoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        setTimeout(() => {
            const iframe = document.querySelector('.video-wrapper iframe');
            if (iframe) {
                iframe.focus();
            }
        }, 1000);
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Accessibility
function initAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
}

document.addEventListener('DOMContentLoaded', initAccessibility);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// FIX: remover console.log e console.warn em produção é aceitável,
// mas NUNCA suprimir console.error — erros reais precisam aparecer.
if (window.location.hostname !== 'localhost') {
    console.log = () => {};
    console.warn = () => {};
    // console.error permanece ativo para depuração de problemas reais
}
