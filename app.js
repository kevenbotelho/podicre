// Podicrê Podcast Website - JavaScript Application

// Global variables
let episodes = [];
let categories = [];
let currentEpisodeIndex = 0;
let isPlaying = false;
let audio = new Audio();
let isUserInteracting = false;

// DOM Elements
const featuredEpisodesContainer = document.getElementById('featured-episodes');
const episodesListContainer = document.getElementById('episodes-list');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const audioPlayer = document.getElementById('audio-player');
const playerArt = document.getElementById('player-art');
const playerTitle = document.getElementById('player-title');
const playerCategory = document.getElementById('player-category');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const episodeModal = document.getElementById('episode-modal');
const closeModal = document.getElementById('close-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalArt = document.getElementById('modal-art');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');
const playModalBtn = document.getElementById('play-modal-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupThemeToggle();
});

// Initialize function
async function init() {
    try {
        // Load data
        await loadCategories();
        await loadEpisodes();
        
        // Set up event listeners
        setupEventListeners();
        
        // Render initial content
        renderFeaturedEpisodes();
        renderEpisodesList();
        renderCategories();
        
        // Set initial volume
        audio.volume = 1;
        volumeBar.value = 1;
        
        // Handle scroll effects
        window.addEventListener('scroll', handleScroll);
        
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
        
        // Garantir que os episódios sejam exibidos corretamente
        setTimeout(() => {
            renderEpisodesList();
        }, 100);
        
    } catch (error) {
        console.error('Error initializing application:', error);
        showError('Erro ao carregar o site. Por favor, recarregue a página.');
    }
}

// Load categories from JSON
async function loadCategories() {
    try {
        const response = await fetch('data/categories.json');
        if (!response.ok) throw new Error('Failed to load categories');
        categories = await response.json();
    } catch (error) {
        console.warn('Categories file not found, using default categories');
        // Default categories if JSON file doesn't exist
        categories = [
            { id: 1, name: 'Desenvolvimento Pessoal', slug: 'desenvolvimento-pessoal' },
            { id: 2, name: 'Criatividade', slug: 'criatividade' },
            { id: 3, name: 'Produtividade', slug: 'produtividade' },
            { id: 4, name: 'Bem-estar', slug: 'bem-estar' },
            { id: 5, name: 'Inspiração', slug: 'inspiracao' }
        ];
    }
}

// Load episodes from JSON
async function loadEpisodes() {
    try {
        const response = await fetch('data/episodes.json');
        if (!response.ok) throw new Error('Failed to load episodes');
        episodes = await response.json();
        
        // Sort episodes by date (newest first)
        episodes.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.warn('Episodes file not found, using default episodes');
        // Default episodes if JSON file doesn't exist
        episodes = getDefaultEpisodes();
    }
}

// Get default episodes for development
function getDefaultEpisodes() {
    return [
        {
            id: 1,
            title: "Começando o dia com propósito",
            description: "Descubra como transformar suas manhãs em um ritual de produtividade e propósito. Neste episódio, compartilhamos estratégias práticas para começar o dia com energia e foco.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
            categoryId: 1,
            date: "2024-01-15",
            duration: "25:30"
        },
        {
            id: 2,
            title: "Desbloqueando sua criatividade",
            description: "A criatividade não é um dom, é uma prática. Aprenda exercícios diários que podem ajudar a desbloquear sua criatividade e trazer novas ideias para sua vida.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
            categoryId: 2,
            date: "2024-01-10",
            duration: "22:15"
        },
        {
            id: 3,
            title: "Produtividade sem estresse",
            description: "Como ser produtivo sem cair na armadilha do burnout. Estratégias para manter o equilíbrio entre produtividade e bem-estar.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            categoryId: 3,
            date: "2024-01-05",
            duration: "28:45"
        },
        {
            id: 4,
            title: "Mindfulness no dia a dia",
            description: "Pequenas práticas de mindfulness que podem transformar seu dia a dia. Aprenda a estar presente e reduzir o estresse do cotidiano.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            categoryId: 4,
            date: "2023-12-28",
            duration: "20:10"
        },
        {
            id: 5,
            title: "Histórias que inspiram",
            description: "Neste episódio especial, compartilhamos histórias reais de pessoas comuns que fizeram coisas extraordinárias. Inspiração pura para o seu dia.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            categoryId: 5,
            date: "2023-12-20",
            duration: "30:00"
        },
        {
            id: 6,
            title: "Hábitos que transformam vidas",
            description: "Pequenas mudanças, grandes resultados. Descubra hábitos simples que podem transformar completamente a sua vida.",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            categoryId: 1,
            date: "2023-12-15",
            duration: "24:20"
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Audio player events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextEpisode);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    // Control buttons
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevEpisode);
    nextBtn.addEventListener('click', nextEpisode);
    
    // Progress bar
    progressBar.addEventListener('input', () => {
        isUserInteracting = true;
    });
    
    progressBar.addEventListener('change', () => {
        const seekTime = audio.duration * (progressBar.value / 100);
        audio.currentTime = seekTime;
        isUserInteracting = false;
    });
    
    // Volume control
    volumeBar.addEventListener('input', () => {
        audio.volume = volumeBar.value;
    });
    
    // Search and filter
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleFilter);
    
    // Modal events
    closeModal.addEventListener('click', closeEpisodeModal);
    closeModalBtn.addEventListener('click', closeEpisodeModal);
    playModalBtn.addEventListener('click', playModalEpisode);
    
    // Close modal when clicking outside
    episodeModal.addEventListener('click', (e) => {
        if (e.target === episodeModal) {
            closeEpisodeModal();
        }
    });
}

// Render featured episodes
function renderFeaturedEpisodes() {
    const featured = episodes.slice(0, 3);
    featuredEpisodesContainer.innerHTML = '';
    
    featured.forEach(episode => {
        const category = getCategoryById(episode.categoryId);
        const episodeElement = createEpisodeCard(episode, category);
        featuredEpisodesContainer.appendChild(episodeElement);
    });
}

// Render all episodes list
function renderEpisodesList(filteredEpisodes = null) {
    episodesListContainer.innerHTML = '';
    
    // Use filtered episodes if provided, otherwise use all episodes
    const episodesToRender = filteredEpisodes || episodes;
    
    if (!episodesToRender || episodesToRender.length === 0) {
        episodesListContainer.innerHTML = `
            <div class="no-results">
                <h3>Nenhum episódio encontrado</h3>
                <p>Tente ajustar sua busca ou filtro.</p>
            </div>
        `;
        return;
    }
    
    // Limitar a exibição a apenas 2 episódios na seção "Últimos Episódios"
    const episodesToShow = episodesToRender.slice(0, 2);
    
    episodesToShow.forEach((episode, index) => {
        const category = getCategoryById(episode.categoryId);
        const episodeElement = createEpisodeItem(episode, category, index);
        episodesListContainer.appendChild(episodeElement);
    });
}

// Render categories in filter
function renderCategories() {
    categoryFilter.innerHTML = '<option value="all">Todas as Categorias</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}

// Create episode card element
function createEpisodeCard(episode, category) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    card.innerHTML = `
        <div class="episode-art">
            <img src="${episode.imageUrl}" alt="${episode.title}">
        </div>
        <div class="episode-info">
            <span class="episode-category">${category.name}</span>
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-description">${episode.description}</p>
            <div class="episode-meta">
                <span class="episode-date">${formatDate(episode.date)}</span>
                <span class="episode-duration">${episode.duration}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openEpisodeModal(episode));
    
    return card;
}

// Create episode item element
function createEpisodeItem(episode, category, index) {
    const item = document.createElement('div');
    item.className = 'episode-item';
    item.innerHTML = `
        <div class="episode-art">
            <img src="${episode.imageUrl}" alt="${episode.title}">
        </div>
        <div class="episode-item-info">
            <h4>${episode.title}</h4>
            <p class="episode-description">${episode.description}</p>
            <div class="episode-item-meta">
                <span class="episode-item-category">${category.name}</span>
                <span class="episode-date">${formatDate(episode.date)}</span>
                <span class="episode-duration">${episode.duration}</span>
            </div>
        </div>
        <div class="episode-actions">
            <button class="btn-primary" onclick="playEpisode(${index})">Ouvir</button>
        </div>
    `;
    
    return item;
}

// Play episode
function playEpisode(index) {
    currentEpisodeIndex = index;
    loadCurrentEpisode();
    audioPlayer.classList.add('active');
    playAudio();
}

// Load current episode data
function loadCurrentEpisode() {
    const episode = episodes[currentEpisodeIndex];
    const category = getCategoryById(episode.categoryId);
    
    // Update player UI
    playerArt.src = episode.imageUrl;
    playerTitle.textContent = episode.title;
    playerCategory.textContent = category.name;
    
    // Update audio source
    audio.src = episode.audioUrl;
    
    // Update modal data for play button
    playModalBtn.dataset.episodeIndex = currentEpisodeIndex;
}

// Toggle play/pause
function togglePlay() {
    if (audio.src) {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    }
}

// Play audio
function playAudio() {
    audio.play();
    isPlaying = true;
    playIcon.className = 'fas fa-pause';
    document.body.classList.add('audio-playing');
}

// Pause audio
function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    document.body.classList.remove('audio-playing');
}

// Next episode
function nextEpisode() {
    if (episodes.length > 0) {
        currentEpisodeIndex = (currentEpisodeIndex + 1) % episodes.length;
        loadCurrentEpisode();
        if (isPlaying) {
            playAudio();
        }
    }
}

// Previous episode
function prevEpisode() {
    if (episodes.length > 0) {
        currentEpisodeIndex = (currentEpisodeIndex - 1 + episodes.length) % episodes.length;
        loadCurrentEpisode();
        if (isPlaying) {
            playAudio();
        }
    }
}

// Update progress bar
function updateProgress() {
    if (audio.duration && !isUserInteracting) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTime.textContent = formatTime(audio.currentTime);
    }
}

// Update duration
function updateDuration() {
    duration.textContent = formatTime(audio.duration);
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryId = categoryFilter.value;
    
    let filtered = episodes.filter(episode => {
        const matchesSearch = episode.title.toLowerCase().includes(searchTerm) || 
                             episode.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryId === 'all' || episode.categoryId.toString() === categoryId;
        
        return matchesSearch && matchesCategory;
    });
    
    renderEpisodesList(filtered);
}

// Handle filter
function handleFilter() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryId = categoryFilter.value;
    
    let filtered = episodes.filter(episode => {
        const matchesSearch = episode.title.toLowerCase().includes(searchTerm) || 
                             episode.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryId === 'all' || episode.categoryId.toString() === categoryId;
        
        return matchesSearch && matchesCategory;
    });
    
    renderEpisodesList(filtered);
}

// Open episode modal
function openEpisodeModal(episode) {
    const category = getCategoryById(episode.categoryId);
    
    modalArt.src = episode.imageUrl;
    modalTitle.textContent = episode.title;
    modalCategory.textContent = category.name;
    modalDate.textContent = `Publicado em: ${formatDate(episode.date)}`;
    modalDescription.textContent = episode.description;
    
    playModalBtn.dataset.episodeId = episode.id;
    
    episodeModal.style.display = 'block';
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

// Close episode modal
function closeEpisodeModal() {
    episodeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Play episode from modal
function playModalEpisode() {
    const episodeId = playModalBtn.dataset.episodeId;
    const index = episodes.findIndex(ep => ep.id.toString() === episodeId);
    
    if (index !== -1) {
        playEpisode(index);
        closeEpisodeModal();
    }
}

// Get category by ID
function getCategoryById(id) {
    return categories.find(cat => cat.id === id) || { name: 'Geral' };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Format time
function formatTime(seconds) {
    if (!seconds) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
    return `${minutes}:${formattedSeconds}`;
}

// Handle scroll effects
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show error message
function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <h3>Ops! Algo deu errado</h3>
            <p>${message}</p>
            <button onclick="location.reload()">Recarregar Página</button>
        </div>
    `;
    container.appendChild(errorDiv);
}

// Setup theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        themeToggle.classList.add('sun');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.className = 'fas fa-moon';
        themeToggle.classList.remove('sun');
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isDarkTheme = body.classList.contains('dark-theme');
        
        if (isDarkTheme) {
            // Switch to light theme
            body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-moon';
            themeToggle.classList.remove('sun');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-sun';
            themeToggle.classList.add('sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Add some CSS for error message
const style = document.createElement('style');
style.textContent = `
    .error-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .error-content {
        text-align: center;
        max-width: 500px;
        padding: 2rem;
    }
    .error-content button {
        margin-top: 1rem;
        padding: 10px 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
