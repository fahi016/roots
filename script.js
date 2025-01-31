// Add this at the beginning of script.js
window.addEventListener('load', () => {
    // Hide preloader
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6a11cb'
            },
            opacity: {
                value: 0.3,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6a11cb',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 4,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            }
        },
        retina_detect: true
    });
});

// Smooth scrolling with progress indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Remove active class from all links
            document.querySelectorAll('.nav a').forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Add animation class to target section
            targetElement.classList.add('section-animate');
            setTimeout(() => {
                targetElement.classList.remove('section-animate');
            }, 1000);
        }
    });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Enhanced reveal animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('stat')) {
                animateStats(entry.target);
            }
            
            // Stagger animation for service cards
            if (entry.target.classList.contains('service-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
            
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all sections and elements that need animation
document.querySelectorAll('section, .service-card, .portfolio-item, .stat').forEach(element => {
    element.classList.add('hidden');
    observer.observe(element);
});

// Animate statistics
function animateStats(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    const targetNumber = parseInt(numberElement.textContent);
    let currentNumber = 0;
    
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = targetNumber / steps;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            numberElement.textContent = targetNumber + '+';
            clearInterval(counter);
        } else {
            numberElement.textContent = Math.floor(currentNumber) + '+';
        }
    }, interval);
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Update theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(!isDark);
    });

    // Function to update moon/sun icon
    function updateThemeIcon(isDark) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("WGwDb98bOGLSWVwbm"); // Replace with your actual User ID
})();

// Form handling
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.closest('.form-group').classList.remove('focused');
        }
    });
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const templateParams = {
        from_name: document.getElementById('name').value,
        reply_to: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_hmgjrd9', 'template_n92kj3h', templateParams)  // Replace with your actual Service ID and Template ID
        .then(function(response) {
            alert('Message sent successfully!');
            contactForm.reset();
        }, function(error) {
            alert('Failed to send message. Please try again.');
            console.error('Error:', error);
        });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('hover');
    });
    
    item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
    });
});

// Add parallax effect to hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add smooth scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero section animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6a11cb'
            },
            opacity: {
                value: 0.3,
                random: false
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6a11cb',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 4,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Hero animations
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const stats = document.querySelectorAll('.stat');

    setTimeout(() => {
        heroTitle.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        heroSubtitle.classList.add('slide-up');
    }, 1000);

    setTimeout(() => {
        heroButtons.classList.add('fade-in');
    }, 1500);

    // Animate stats one by one
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('slide-up');
            animateNumber(stat.querySelector('.stat-number'));
        }, 2000 + (index * 200));
    });
});

// Animate numbers in stats
function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16); // 60fps

    function updateNumber() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + '+';
            element.classList.add('highlight');
        }
    }

    requestAnimationFrame(updateNumber);
}

// Enhanced parallax effect for hero section
let lastScrollY = window.pageYOffset;
const hero = document.querySelector('.hero');
const particles = document.getElementById('particles-js');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    const speed = 0.5;
    
    // Parallax effect for hero content
    hero.style.transform = `translateY(${scrollY * speed}px)`;
    
    // Particles movement based on scroll
    if (particles) {
        particles.style.transform = `translateY(${scrollY * speed * 0.5}px)`;
    }
    
    // Fade effect based on scroll position
    const opacity = Math.max(1 - (scrollY / window.innerHeight), 0);
    hero.style.opacity = opacity;
    
    lastScrollY = scrollY;
});

// Add floating animation to hero elements
const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero-buttons');
heroElements.forEach((element, index) => {
    element.style.animation = `float ${2 + index * 0.2}s ease-in-out infinite`;
}); 