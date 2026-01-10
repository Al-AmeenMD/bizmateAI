// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const ctaForm = document.getElementById('ctaForm');
const particles = document.getElementById('particles');

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== CTA Form Submission =====
ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    
    // Show success message (in production, this would send to a server)
    const btn = ctaForm.querySelector('button');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '✓ Thanks! We\'ll be in touch';
    btn.style.background = 'linear-gradient(135deg, hsl(170, 100%, 50%) 0%, hsl(170, 100%, 40%) 100%)';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
        btn.disabled = false;
        ctaForm.reset();
    }, 3000);
});

// ===== Particle Animation =====
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: hsl(250, 100%, 65%);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particles.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.3;
        }
        50% {
            transform: translate(-10px, -50px) scale(0.8);
            opacity: 0.2;
        }
        75% {
            transform: translate(30px, -20px) scale(1.1);
            opacity: 0.25;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.feature-card, .step, .audience-card, .contact-card, .highlight').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Style for animated elements
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-card:nth-child(2) { transition-delay: 0.1s; }
    .feature-card:nth-child(3) { transition-delay: 0.2s; }
    .feature-card:nth-child(4) { transition-delay: 0.3s; }
    
    .audience-card:nth-child(2) { transition-delay: 0.05s; }
    .audience-card:nth-child(3) { transition-delay: 0.1s; }
    .audience-card:nth-child(4) { transition-delay: 0.15s; }
    .audience-card:nth-child(5) { transition-delay: 0.2s; }
    
    .contact-card:nth-child(2) { transition-delay: 0.1s; }
    .contact-card:nth-child(3) { transition-delay: 0.2s; }
    
    .highlight:nth-child(2) { transition-delay: 0.1s; }
    .highlight:nth-child(3) { transition-delay: 0.2s; }
    
    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: hsla(230, 25%, 8%, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 32px 24px;
            gap: 24px;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            border-bottom: 1px solid hsla(230, 20%, 40%, 0.2);
        }
        
        .nav-links.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(animationStyle);

// ===== Smooth Scrolling for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Typing Animation in Chat =====
function animateTypingIndicator() {
    const typingMessage = document.querySelector('.message.typing');
    if (typingMessage) {
        setTimeout(() => {
            typingMessage.innerHTML = `
                <p>Here's a promo post for your weekend sale:</p>
                <div class="promo-preview" style="
                    background: linear-gradient(135deg, hsl(250, 100%, 65%), hsl(170, 100%, 50%));
                    padding: 16px;
                    border-radius: 12px;
                    margin-top: 12px;
                    font-size: 13px;
                ">
                    🎉 <strong>WEEKEND MEGA SALE!</strong><br>
                    Up to 30% OFF on selected items!<br>
                    📅 Sat-Sun only | 📍 Visit us today!
                </div>
            `;
            typingMessage.classList.remove('typing');
        }, 2500);
    }
}

// Run typing animation after page load
setTimeout(animateTypingIndicator, 2000);

console.log('🤖 BizMate AI Landing Page Loaded Successfully');
