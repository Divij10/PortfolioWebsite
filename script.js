// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and scrolling functionality
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const contactForm = document.getElementById('contact-form');
    const scrollDownBtn = document.querySelector('.scroll-down a');
    const heroSection = document.querySelector('.hero');
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Hide logo initially
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(-20px)';
    
    // Force dark mode as the only option
    document.body.classList.add('dark-mode');
    
    // Mobile navigation toggle
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('nav-active');
        
        // Burger animation
        burger.classList.toggle('toggle');

        // Reset animations first
        navItems.forEach(item => {
            item.style.animation = '';
        });
        
        // Force visible color for menu items
        if (nav.classList.contains('nav-active')) {
            // Small delay to ensure menu has started showing
            setTimeout(() => {
                // Manually apply styles for better visibility
                navItems.forEach((item, index) => {
                    // Force opacity to 1
                    item.style.opacity = '0';
                    
                    // Force reflow
                    void item.offsetWidth;
                    
                    // Let CSS animations take over
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.1}s`;
                    
                    // Ensure link text is visible
                    const link = item.querySelector('a');
                    if (link) {
                        link.style.color = '#ffffff';
                    }
                });
            }, 100);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && !e.target.closest('.navbar')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navItems.forEach((item) => {
                item.style.animation = '';
            });
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navItems.forEach((item) => {
                    item.style.animation = '';
                });
            }
        });
    });

    // Create back to top button
    function createBackToTopButton() {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize back to top button
    createBackToTopButton();
    
    // Scroll event handling
    window.addEventListener('scroll', () => {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const headerHeight = navbar.offsetHeight;
        
        // Show/hide logo based on scroll position
        if (scrollPosition > (heroHeight - headerHeight)) {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
            navbar.classList.add('scrolled');
        } else {
            logo.style.opacity = '0';
            logo.style.transform = 'translateY(-20px)';
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
                
                navItems.forEach((item) => {
                    item.style.animation = '';
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
                opacity: 0.6;
            }
        `;
        document.head.appendChild(style);
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        
        // Particle properties
        const particlesArray = [];
        // Reduce particles for mobile devices
        const numberOfParticles = isMobile ? 40 : 80;
        
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
                // Reduce connections for mobile to improve performance
                const connectDistance = isMobile ? 80 : 100;
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 180, 216, ${0.3 - (distance/connectDistance) * 0.3})`;
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
    
    // We've already created the back-to-top button with createBackToTopButton
    
    // Add swipe functionality for mobile
    if (isMobile) {
        // For mobile - add touch gestures for navbar
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            // Swipe right to open menu
            if (touchEndX - touchStartX > 100 && !nav.classList.contains('nav-active')) {
                nav.classList.add('nav-active');
                burger.classList.add('toggle');
                
                navItems.forEach((item, index) => {
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                });
            }
            
            // Swipe left to close menu
            if (touchStartX - touchEndX > 100 && nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navItems.forEach((item) => {
                    item.style.animation = '';
                });
            }
        }
        
        // Improve mobile form experience with auto-scroll
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Small delay to let keyboard appear
                setTimeout(() => {
                    // Scroll to keep input in view
                    const rect = this.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 150; // 150px buffer above the input
                    
                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                    });
                }, 300);
            });
        });
    }
}); 