// BaMaxi English - Interactive Functionality

// Tab switching functionality
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact form handling
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input, textarea');
    let formValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            formValid = false;
            input.style.borderBottom = '2px solid #FF6B6B';
        } else {
            input.style.borderBottom = '2px solid #4ECDC4';
        }
    });

    if (formValid) {
        // Show success message
        alert('Thank you! Your message has been sent. We will respond within 24 hours!');
        this.reset();

        // Reset styles
        inputs.forEach(input => {
            input.style.borderBottom = '';
        });
    } else {
        alert('Please fill in all fields before sending.');
    }
});

// Highlight active navigation link based on scroll position
function highlightNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add some interactivity to vocab cards
document.querySelectorAll('.vocab-card').forEach(card => {
    card.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('click', function() {
        const english = this.querySelector('.english');
        if (english) {
            // Simple pronunciation message (in real app, would play audio)
            const word = english.textContent;
            console.log('Pronunciation: ' + word);
        }
    });
});

// Initialize first tab as active
document.addEventListener('DOMContentLoaded', function() {
    const firstTab = document.querySelector('.tab-button');
    if (firstTab) {
        firstTab.click();
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.feature-card, .lesson-card, .vocab-card, .resource-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (if you add a hamburger menu later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Prevent form submission (replace with actual backend later)
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);

    // You can later connect this to a backend service like:
    // - Firebase
    // - Formspree
    // - EmailJS
    // - Your own backend

    console.log('Form submitted with data:', Object.fromEntries(formData));
});

// Log that the site has loaded
console.log('🎉 BaMaxi English loaded successfully!');
console.log('📧 Contact: contact@bamaxi.eng');
console.log('🌐 Learn English with us today!');
