document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.episode-card, .about-content, .contact-form');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Configura animação inicial
    const setupAnimations = function() {
        const elements = document.querySelectorAll('.episode-card, .about-content, .contact-form');

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };

    // Validação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');

            if (!name.value || !email.value || !message.value) {
                alert('Por favor, preencha todos os campos do formulário.');
                return;
            }

            if (!validateEmail(email.value)) {
                alert('Por favor, insira um email válido.');
                return;
            }

            // Simular envio do formulário
            alert('Obrigado por entrar em contato! Sua mensagem foi enviada com sucesso.');
            this.reset();
        });
    }

    // Função para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Inicializar animações
    setupAnimations();
    animateOnScroll();

    // Adicionar listener para scroll
    window.addEventListener('scroll', animateOnScroll);

    // Menu mobile (se necessário)
    const mobileMenu = function() {
        // Esta função pode ser expandida se precisarmos de um menu hamburguer
        // Por enquanto, o design responsivo do CSS já cuida da navegação em mobile
    };

    // Inicializar menu mobile
    mobileMenu();
});