// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and scrolling functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const scrollDownBtn = document.querySelector('.scroll-down a');

    // Mobile navigation toggle
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('nav-active');
        
        // Burger animation
        burger.classList.toggle('toggle');

        // Animate nav items
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && !e.target.closest('.navbar')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach((link) => {
                link.style.animation = '';
            });
        }
    });

    // Scroll event handling
    window.addEventListener('scroll', () => {
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Add animations to elements when they come into view
        animateOnScroll();
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu when a link is clicked
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Scroll down button functionality
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    // Dark mode toggle functionality
    const createDarkModeToggle = () => {
        // Create the toggle element
        const toggle = document.createElement('div');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(toggle);

        // Check for saved user preference
        if (localStorage.getItem('dark-mode') === 'enabled') {
            document.body.classList.add('dark-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle dark mode
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
                toggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('dark-mode', 'disabled');
                toggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Style the toggle button with CSS
        const style = document.createElement('style');
        style.textContent = `
            .dark-mode-toggle {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: var(--transition);
            }
            
            .dark-mode-toggle:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
            }
            
            .dark-mode .dark-mode-toggle {
                background-color: var(--dark-primary);
                box-shadow: 0 4px 10px rgba(0, 180, 216, 0.3);
            }
            
            .dark-mode .dark-mode-toggle:hover {
                box-shadow: 0 8px 15px rgba(0, 180, 216, 0.4);
            }
            
            .dark-mode-toggle i {
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    };

    createDarkModeToggle();
    
    // Animation on scroll functionality
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .skill-category, .detail');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    
                    // Apply animations to non-timeline elements only
                    if (element.classList.contains('skill-category') || element.classList.contains('detail')) {
                        element.classList.add('fade-in');
                    } else if (!element.classList.contains('timeline-item')) {
                        element.classList.add('slide-up');
                    }
                }
            }
        });
        
        // Make timeline items visible without animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const position = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                item.style.opacity = 1;
            }
        });
    }

    // Trigger animations on initial load
    setTimeout(animateOnScroll, 300);

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent the default form submission anymore
            // e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation (still useful for immediate feedback)
            if (!name || !email || !subject || !message) {
                e.preventDefault(); // Prevent submission only if validation fails
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Form will be submitted to Formspree, which will email you at dthakur9@asu.edu
            // This message will be shown briefly before the form submits
            showFormMessage('Thank you for your message, ' + name + '! I will get back to you soon.', 'success');
            
            // Allow the form to naturally submit after a short delay to show the thank you message
            // e.preventDefault();
            // setTimeout(() => {
            //     contactForm.submit();
            // }, 2000);
        });
    }

    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add message to form
        contactForm.appendChild(messageElement);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .form-message {
                padding: 1rem;
                margin-top: 1rem;
                border-radius: 10px;
                text-align: center;
            }
            
            .form-message.success {
                background-color: rgba(76, 175, 80, 0.1);
                color: var(--success-color);
                border: 1px solid var(--success-color);
            }
            
            .form-message.error {
                background-color: rgba(244, 67, 54, 0.1);
                color: var(--danger-color);
                border: 1px solid var(--danger-color);
            }
        `;
        document.head.appendChild(style);
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Typing animation for hero text
    function setupTypewriter() {
        const heroHeading = document.querySelector('.hero-text h1');
        const originalText = heroHeading.textContent;
        
        // Clear original text
        heroHeading.textContent = '';
        
        // Create span with typing animation
        const typingSpan = document.createElement('span');
        typingSpan.className = 'typing';
        typingSpan.textContent = originalText;
        heroHeading.appendChild(typingSpan);
        
        // Add typing effect CSS
        const style = document.createElement('style');
        style.textContent = `
            .typing {
                display: inline-block;
                position: relative;
            }

            .typing::after {
                content: '';
                position: absolute;
                right: -5px;
                top: 10%;
                height: 80%;
                width: 2px;
                background-color: var(--secondary-color);
                animation: blink 0.7s infinite;
            }

            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize typing animation
    setupTypewriter();

    // Add particle background effect to hero section
    function addParticleBackground() {
        const heroSection = document.querySelector('.hero');
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.className = 'particle-canvas';
        
        // Insert canvas as first child of hero section
        heroSection.insertBefore(canvas, heroSection.firstChild);
        
        // Add canvas styles
        const style = document.createElement('style');
        style.textContent = `
            .particle-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.4;
            }
        `;
        document.head.appendChild(style);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        // Particle properties
        const particlesArray = [];
        const numberOfParticles = 80;
        
        // Create particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = '#00b4d8';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.size > 0.2) this.size -= 0.05;
                
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Initialize particles
        function init() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // Connect particles with lines
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 180, 216, ${0.3 - (distance/100) * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
                
                // Replace particles when they get too small
                if (particlesArray[i].size <= 0.2) {
                    particlesArray.splice(i, 1);
                    i--;
                    particlesArray.push(new Particle());
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
            init();
        });
        
        // Start animation
        init();
        animate();
    }
    
    // Initialize particle background
    addParticleBackground();
    
    // Create scroll to top button
    function createScrollTopButton() {
        // Create button element
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(scrollTopBtn);
        
        // Add scroll event listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Add click event
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--secondary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: var(--transition);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }
            
            .scroll-top-btn.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .scroll-top-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
            }
            
            .dark-mode .scroll-top-btn {
                background-color: var(--dark-secondary);
                box-shadow: 0 4px 10px rgba(0, 150, 199, 0.3);
            }
            
            .dark-mode .scroll-top-btn:hover {
                box-shadow: 0 8px 15px rgba(0, 150, 199, 0.4);
            }
            
            .scroll-top-btn i {
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize scroll to top button
    createScrollTopButton();
}); 