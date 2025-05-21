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

    // Resume section interactions
    const resumePreview = document.querySelector('.resume-preview');
    if (resumePreview) {
        // Make the resume preview clickable
        resumePreview.addEventListener('click', () => {
            const viewResumeLink = document.querySelector('.resume-actions .secondary-btn');
            if (viewResumeLink) {
                viewResumeLink.click(); // Open the resume in a new tab
            }
        });
        
        // Try to load the PDF rendering script if iframe doesn't render well
        // Add PDF.js script if not already available
        if (typeof pdfjsLib === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
            script.onload = function() {
                renderPdfPreview();
            };
            document.head.appendChild(script);
        } else {
            renderPdfPreview();
        }
        
        // Function to render the PDF preview
        function renderPdfPreview() {
            if (typeof pdfjsLib !== 'undefined') {
                // Configure worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';
                
                const pdfUrl = 'assets/DivijSinghThakurCS-Resume2025.pdf';
                const iframe = document.querySelector('.resume-preview-img');
                
                // If iframe isn't rendering properly, replace with canvas
                if (iframe && (iframe.clientHeight < 100 || getComputedStyle(iframe).visibility === 'hidden')) {
                    const canvas = document.createElement('canvas');
                    canvas.className = 'resume-preview-img';
                    iframe.parentNode.replaceChild(canvas, iframe);
                    
                    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
                        pdf.getPage(1).then(function(page) {
                            const viewport = page.getViewport({scale: 1.5});
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
                            
                            const renderContext = {
                                canvasContext: canvas.getContext('2d'),
                                viewport: viewport
                            };
                            
                            page.render(renderContext);
                        });
                    });
                }
            }
        }
    }
    
    // Initialize animations for fade in effects
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}); 