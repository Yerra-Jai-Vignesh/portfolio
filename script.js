// Batman Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initProgressBars();
    initContactForm();
    initMobileMenu();
    initParallaxEffects();
    initLoadingAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on links
        const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .achievement-card, .stat-card');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    // Initialize EmailJS
    emailjs.init("IJHyYiAnH5GLCXS1d"); // Your actual public key
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send notification email to you
            const notificationParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'jaivigneshyerra@gmail.com'
            };
            
            // Send auto-reply to the person who contacted you
            const autoReplyParams = {
                to_name: name,
                to_email: email,
                from_name: 'Yerra Jai Vignesh',
                from_email: 'jaivigneshyerra@gmail.com'
            };
            
            console.log('Sending notification email with params:', notificationParams);
            console.log('Sending auto-reply with params:', autoReplyParams);
            
            // Send both emails
            Promise.all([
                emailjs.send('service_246q42c', 'template_v16y9r1', notificationParams), // Notification to you
                emailjs.send('service_246q42c', 'template_9rxgw5i', autoReplyParams) // Auto-reply to them
            ])
                .then(function(responses) {
                    console.log('SUCCESS! Both emails sent:', responses);
                    showToast('Message sent successfully! You will receive a confirmation email shortly.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    console.log('Error details:', error.text || error.message);
                    showToast(`Failed to send message: ${error.text || error.message}`, 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
        const toastContent = toast.querySelector('span');
        if (toastContent) {
            toastContent.textContent = message;
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Animate elements on page load
    const heroElements = document.querySelectorAll('#hero h1, #hero p, #hero .btn-primary, #hero .btn-secondary');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Bat logo hover effect
document.addEventListener('DOMContentLoaded', function() {
    const batLogo = document.querySelector('.bat-logo');
    if (batLogo) {
        batLogo.addEventListener('mouseenter', () => {
            batLogo.style.filter = 'drop-shadow(0 0 30px rgba(254, 231, 21, 0.8))';
        });
        
        batLogo.addEventListener('mouseleave', () => {
            batLogo.style.filter = 'drop-shadow(0 0 20px rgba(254, 231, 21, 0.5))';
        });
    }
});

// Typing effect for hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(254, 231, 21, 0.3);
        border-radius: 50%;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Add floating animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particle effect
document.addEventListener('DOMContentLoaded', initParticleEffect);

// Smooth reveal animation for sections
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        revealObserver.observe(element);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', initRevealAnimations);

// Add hover sound effects (optional)
function initSoundEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Add subtle hover effect
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize sound effects
document.addEventListener('DOMContentLoaded', initSoundEffects);

// Add keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initKeyboardNavigation);

// Add loading screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--batman-black);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div class="bat-logo" style="width: 80px; height: 80px; margin: 0 auto 20px;">
                <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; color: var(--batman-yellow);">
                    <path d="M50 10 L60 30 L80 30 L65 45 L75 65 L50 50 L25 65 L35 45 L20 30 L40 30 Z" fill="currentColor"/>
                </svg>
            </div>
            <div style="color: var(--batman-yellow); font-family: 'Orbitron', sans-serif; font-size: 24px; font-weight: bold;">
                Loading...
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
document.addEventListener('DOMContentLoaded', initLoadingScreen);

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--batman-yellow);
        z-index: 9998;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', initScrollProgress);

// Profile image scroll effect
function initProfileImageScroll() {
    const profileContainer = document.querySelector('.profile-image-container');
    
    if (profileContainer) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const aboutSection = document.getElementById('about');
            
            if (aboutSection) {
                const aboutTop = aboutSection.offsetTop;
                const aboutHeight = aboutSection.offsetHeight;
                const aboutBottom = aboutTop + aboutHeight;
                
                // Trigger image swap when scrolling past the about section
                if (scrollY > aboutTop + 100) {
                    profileContainer.classList.add('scrolled');
                } else {
                    profileContainer.classList.remove('scrolled');
                }
            }
        });
    }
}

// Initialize profile image scroll effect
document.addEventListener('DOMContentLoaded', initProfileImageScroll);
