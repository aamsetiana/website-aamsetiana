// Mobile menu toggle functionality
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Set default active menu to 'Home'
navLinks[0].classList.add('active'); // 'Home' menu is the default active menu

// Toggle mobile menu visibility
menuToggle.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent the click from propagating to the body
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside of the menu or toggle button
body.addEventListener('click', (event) => {
    if (window.innerWidth < 768 && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Prevent clicks inside the mobile menu from closing it
mobileMenu.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent closing when clicking inside the mobile menu
});

// Close mobile menu when scrolling on mobile view
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768 && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    // Highlight the current section in the navbar
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200, // Duration of the animation in milliseconds
    easing: 'ease-in-out', // Easing function
    once: true, // Run the animation only once
});