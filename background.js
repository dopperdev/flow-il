const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle parameters
let particlesArray = [];
const numberOfParticles = 50 / window.devicePixelRatio;
const maxDistance = 300;

// Create Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() * 2) - 1;
        this.speedY = (Math.random() * 2) - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reverse direction when particles hit the edge
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = '#00ffea'; // Neon color for particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create multiple particles
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animate the particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        particle.update();
        particle.draw();

        // Check for nearby particles to draw lines
        for (let j = i; j < particlesArray.length; j++) {
            const distance = Math.hypot(
                particle.x - particlesArray[j].x,
                particle.y - particlesArray[j].y
            );

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(0, 191, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize and animate
if (!window.matchMedia('(max-width: 767px)').matches) {
    init();
    animate();
}