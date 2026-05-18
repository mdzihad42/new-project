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

// --- Interactive Glowing Snake Mouse Follower ---
const snakeCanvas = document.createElement('canvas');
snakeCanvas.id = 'snakeCanvas';
document.body.appendChild(snakeCanvas);

Object.assign(snakeCanvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '-1'
});

const ctx = snakeCanvas.getContext('2d');

let width, height;
function resizeCanvas() {
    width = snakeCanvas.width = window.innerWidth;
    height = snakeCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const mouse = { x: -1000, y: -1000, active: false };
let idleTimer;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        mouse.active = false;
    }, 2000); // Snake wanders after 2s of no mouse movement
});

window.addEventListener('mouseleave', () => {
    mouse.active = false;
});

// Touch support
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
        
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { mouse.active = false; }, 2000);
    }
});
window.addEventListener('touchend', () => {
    mouse.active = false;
});

const points = [];
const numPoints = 40; // Length of the snake

// Initialize points
for (let i = 0; i < numPoints; i++) {
    points.push({ x: width / 2, y: height / 2 });
}

let wanderAngle = Math.random() * Math.PI * 2;
let targetX = width / 2;
let targetY = height / 2;

function animateSnake() {
    ctx.clearRect(0, 0, width, height);

    // Determine target based on mode (follow vs wander)
    let isFollowing = false;
    
    if (mouse.active) {
        let distToMouse = Math.hypot(mouse.x - points[0].x, mouse.y - points[0].y);
        // Follow if mouse is within 500px range
        if (distToMouse < 500) {
            targetX = mouse.x;
            targetY = mouse.y;
            isFollowing = true;
        }
    }

    if (!isFollowing) {
        // Autonomous wandering
        wanderAngle += (Math.random() - 0.5) * 0.4; // Random angle drift
        const speed = 4;
        targetX += Math.cos(wanderAngle) * speed;
        targetY += Math.sin(wanderAngle) * speed;

        // Bounce off screen edges softly
        const margin = 50;
        if (targetX < margin) { targetX = margin; wanderAngle = 0; }
        if (targetX > width - margin) { targetX = width - margin; wanderAngle = Math.PI; }
        if (targetY < margin) { targetY = margin; wanderAngle = Math.PI / 2; }
        if (targetY > height - margin) { targetY = height - margin; wanderAngle = -Math.PI / 2; }
    }

    // Move head towards target with easing
    let dx = targetX - points[0].x;
    let dy = targetY - points[0].y;
    let easing = isFollowing ? 0.15 : 0.05;
    
    points[0].x += dx * easing;
    points[0].y += dy * easing;

    // Move the rest of the body
    for (let i = 1; i < numPoints; i++) {
        let pt = points[i];
        let prevPt = points[i - 1];
        
        let dirX = prevPt.x - pt.x;
        let dirY = prevPt.y - pt.y;
        
        // Elastic trailing effect
        pt.x += dirX * 0.45;
        pt.y += dirY * 0.45;
    }

    // Draw the glowing snake body (Tapered)
    for (let i = numPoints - 1; i > 0; i--) {
        ctx.beginPath();
        let radius = 12 - (i * 10 / numPoints); // Tapering from 12 at head to 2 at tail
        if (radius < 2) radius = 2;
        ctx.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(69, 243, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#45f3ff';
        ctx.fill();
    }
    
    // Calculate head angle
    let dxAngle = points[0].x - points[1].x;
    let dyAngle = points[0].y - points[1].y;
    let angle = Math.atan2(dyAngle, dxAngle);
    
    // Draw head with eyes and tongue
    ctx.save();
    ctx.translate(points[0].x, points[0].y);
    ctx.rotate(angle);
    
    // Head shape
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0b0c10'; // Dark head body
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#45f3ff'; // Cyan border
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.arc(6, -5, 3, 0, Math.PI * 2); // Left eye
    ctx.arc(6, 5, 3, 0, Math.PI * 2);  // Right eye
    ctx.fillStyle = '#ff0055'; // Red glowing eyes
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#ff0055';
    ctx.fill();
    
    // Black Pupils
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(7, -5, 1.5, 0, Math.PI * 2); // Left pupil
    ctx.arc(7, 5, 1.5, 0, Math.PI * 2);  // Right pupil
    ctx.fillStyle = '#000000';
    ctx.fill();
    
    // Tongue animation (flicks in and out)
    let time = Date.now() / 150; // Speed of flicking
    let tongueLength = Math.max(0, Math.sin(time)) * 18; // Only positive part of sine wave
    
    if (tongueLength > 2) {
        ctx.beginPath();
        ctx.moveTo(16, 0); // Start at the tip of the head
        ctx.lineTo(16 + tongueLength, 0); // Main tongue
        ctx.lineTo(16 + tongueLength + 5, -4); // Fork left
        ctx.moveTo(16 + tongueLength, 0);
        ctx.lineTo(16 + tongueLength + 5, 4);  // Fork right
        
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ff0055';
        ctx.stroke();
    }

    ctx.restore();

    requestAnimationFrame(animateSnake);
}

// Start animation
animateSnake();

/* ==========================================================================
   CV Modal Control
   ========================================================================== */
const cvModal = document.getElementById('cvModal');
const openCvBtn = document.getElementById('openCvBtn');
const closeCvElements = document.querySelectorAll('.cv-modal-close, .cv-modal-close-btn');

if (openCvBtn && cvModal) {
    openCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    });
}

closeCvElements.forEach(element => {
    element.addEventListener('click', () => {
        if (cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
        }
    });
});

if (cvModal) {
    // Close modal when clicking outside content
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal when pressing ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Create Toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icons from font-awesome
    const iconClass = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
    `;

    // Append to container
    container.appendChild(toast);

    // Trigger sliding animation with tiny delay
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-remove toast after 5 seconds
    const autoCloseTimeout = setTimeout(() => {
        removeToast(toast);
    }, 5000);

    // Close button event
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoCloseTimeout);
        removeToast(toast);
    });
}

function removeToast(toast) {
    toast.classList.remove('show');
    // Wait for transition before removing from DOM
    toast.addEventListener('transitionend', () => {
        toast.remove();
    });
}

/* ==========================================================================
   AJAX Contact Form Submission
   ========================================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origBtnHTML = submitBtn.innerHTML;

        // Visual loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending... <i class="fas fa-spinner fa-spin"></i>`;

        // Get Form Data
        const formData = new FormData(contactForm);
        formData.append('is_ajax', 'true'); // Backup flag

        // Fetch URL
        const formAction = contactForm.getAttribute('action') || '/';

        // AJAX Request
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // Standard Django AJAX header
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnHTML;

            if (data.success) {
                showToast('Success!', data.message || 'Your message has been sent successfully.', 'success');
                contactForm.reset(); // Clear all form inputs
            } else {
                showToast('Form Error', data.message || 'Please check the form and try again.', 'error');
            }
        })
        .catch(error => {
            console.error('AJAX Submit Error:', error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnHTML;
            showToast('Connection Error', 'Could not send message. Please check your internet connection.', 'error');
        });
    });
}
