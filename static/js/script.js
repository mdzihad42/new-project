// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if(hamburger) {
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Galaxy Background Effect (Canvas based approach injected dynamically)
function createStars(containerId, count, sizeClass) {
    const container = document.getElementById(containerId);
    if(!container) return;
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        
        let size = Math.random() * 2;
        if(sizeClass === 'medium') size = Math.random() * 3 + 1;
        if(sizeClass === 'large') size = Math.random() * 4 + 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity and animation duration
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s linear infinite`;
        
        container.appendChild(star);
    }
}

// Add CSS keyframes dynamically for twinkle
const style = document.createElement('style');
style.innerHTML = `
@keyframes twinkle {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
}
`;
document.head.appendChild(style);

// Initialize stars
createStars('stars', 100, 'small');
createStars('stars2', 50, 'medium');
createStars('stars3', 20, 'large');

// Add parallax effect to stars on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const stars1 = document.getElementById('stars');
    const stars2 = document.getElementById('stars2');
    const stars3 = document.getElementById('stars3');
    
    if(stars1) stars1.style.transform = `translateY(${scrollY * -0.1}px)`;
    if(stars2) stars2.style.transform = `translateY(${scrollY * -0.3}px)`;
    if(stars3) stars3.style.transform = `translateY(${scrollY * -0.5}px)`;
});
