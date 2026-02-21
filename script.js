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
    
    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.title = 'Backstage Video';
    
    // Clear the wrapper and add the iframe
    videoWrapper.innerHTML = '';
    videoWrapper.appendChild(iframe);
    videoWrapper.classList.remove('video-cover');
}

// Episode Data
const episodes = [
    {
        id: 1,
        title: 'Racismo no esporte',
        desc: 'Conversando sobre o caso de racismo no estádio do Palmeiras - Com Glauton.',
        date: '10/12/2025',
        duration: '11 min',
        guest: 'Apresentador Lianderson',
        image: '🎧'
    },
    {
        id: 2,
        title: 'Em breve',
        desc: 'Debate acerca da manipulação do Marketing em relação à melhor divulgação de produtos',
        date: '22/05/2026',
        duration: '15 min',
        guest: 'Gerente Keven Botelho',
        image: '📊'
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
        // Garantir que o menu esteja visível
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenuToggle.classList.toggle('active');
        
        // Animação suave para o menu toggle
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

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.classList.remove('active');
            
            // Resetar animação do toggle
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

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe episode cards
    const episodeCards = document.querySelectorAll('.episode-card');
    episodeCards.forEach(card => {
        observer.observe(card);
    });
}

// Audio Player
function initAudioPlayer() {
    let isPlaying = false;
    let currentAudioUrl = '';
    
    audioPlayPauseBtn.addEventListener('click', () => {
        toggleAudioPlayer();
    });

    // Progress bar interaction
    audioProgress.addEventListener('input', () => {
        // Simulate progress update
        updateAudioProgress();
    });
}

function activateAudioPlayer(url) {
    currentAudioUrl = url;
    audioPlayer.classList.add('active');
    audioPlayer.classList.remove('hidden');
    
    // Update audio info
    const audioTitle = document.querySelector('.audio-title');
    const audioArtist = document.querySelector('.audio-artist');
    
    audioTitle.textContent = 'Podicrê - Episódio 001';
    audioArtist.textContent = 'Com Keven Botelho';
    
    // Start progress simulation
    startAudioProgress();
}

function toggleAudioPlayer() {
    const isActive = audioPlayer.classList.contains('active');
    
    if (isActive) {
        audioPlayer.classList.remove('active');
        audioPlayPauseBtn.textContent = '▶';
    } else {
        audioPlayer.classList.add('active');
        audioPlayPauseBtn.textContent = '⏸';
        startAudioProgress();
    }
}

function startAudioProgress() {
    let progress = 0;
    const duration = 2700; // 45 minutes in seconds
    
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
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
    // Simulate progress update based on slider
    const progress = audioProgress.value;
    const duration = 2700;
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
        
        // Simulate API call
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
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 5000);
}

// Generate Episodes
function generateEpisodes() {
    episodesGrid.innerHTML = '';
    
    episodes.forEach(episode => {
        const episodeCard = document.createElement('div');
        episodeCard.className = 'episode-card fade-in';
        episodeCard.innerHTML = `
            <div class="episode-image">
                <span>${episode.image}</span>
            </div>
            <div class="episode-content">
                <h3 class="episode-title">${episode.title}</h3>
                <p class="episode-desc">${episode.desc}</p>
                <div class="episode-meta">
                    <span class="meta-item">📅 ${episode.date}</span>
                    <span class="meta-item">⏱️ ${episode.duration}</span>
                    <span class="meta-item">👥 ${episode.guest}</span>
                </div>
                <div class="episode-actions">
                    <button class="btn-primary" onclick="activateAudioPlayer('https://open.spotify.com/embed/episode/${episode.id}')">🎧 Ouvir</button>
                    <button class="btn-secondary" onclick="scrollToSection('community')">💬 Comentar</button>
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
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);
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

function scrollToVideo() {
    // Primeiro rola até a seção de vídeo
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        videoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Depois tenta focar no iframe do vídeo
        setTimeout(() => {
            const iframe = document.querySelector('.video-wrapper iframe');
            if (iframe) {
                iframe.focus();
            }
        }, 1000); // Espera 1 segundo para garantir que a rolagem termine
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

// Performance optimizations
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

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Accessibility improvements
function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ARIA labels
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent);
        }
    });
}

// Initialize accessibility
document.addEventListener('DOMContentLoaded', initAccessibility);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// Console cleanup for production
if (window.location.hostname !== 'localhost') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}