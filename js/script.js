// Figma-Inspired Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const backToTopBtn = document.querySelector('.back-to-top');
    const navLinks = document.querySelectorAll('.nav-links a');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    const mobileMenuClose = document.createElement('div');
    mobileMenuClose.classList.add('mobile-menu-close');
    mobileMenuClose.innerHTML = '<span></span><span></span>';
    
    const mobileNavLinks = document.createElement('div');
    mobileNavLinks.classList.add('mobile-nav-links');
    
    // Clone navigation links for mobile menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileNavLinks.appendChild(mobileLink);
    });
    
    const mobileContactBtn = document.createElement('div');
    mobileContactBtn.classList.add('mobile-contact-btn');
    mobileContactBtn.innerHTML = document.querySelector('.contact-btn').innerHTML;
    
    mobileMenu.appendChild(mobileMenuClose);
    mobileMenu.appendChild(mobileNavLinks);
    mobileMenu.appendChild(mobileContactBtn);
    document.body.appendChild(mobileMenu);
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                document.querySelectorAll(`.nav-links a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
                
                // Mobile menu links
                document.querySelectorAll(`.mobile-nav-links a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show success alert
                alert('Your message has been sent successfully!');
            }, 2000);
        });
    }
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-item');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                elementBottomPosition >= windowTopPosition &&
                elementTopPosition <= windowBottomPosition
            ) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Initialize animations
    document.querySelector('.hero-text').classList.add('fade-in-up');
    document.querySelector('.hero-image').classList.add('fade-in');
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in-up');
    });
    
    // Preload images
    function preloadImages() {
        const projectImages = document.querySelectorAll('.project-img img');
        projectImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    window.addEventListener('load', preloadImages);
});
