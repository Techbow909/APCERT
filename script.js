// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    createMobileMenu();
    setupSmoothScroll();
    setupEnrollButtons();
    setupPricingButtons();
    setupResourceLinks();
    setupFormValidation();
    setupScrollEffects();
});

// Create mobile menu
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    // Check if mobile menu already exists
    if (document.querySelector('.hamburger-menu')) return;
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-nav-menu';
    
    // Copy nav items to mobile menu
    const navMenu = document.querySelector('.nav-menu');
    const navItems = navMenu.innerHTML;
    mobileMenu.innerHTML = navItems;
    
    // Add hamburger to navbar
    navContainer.appendChild(hamburger);
    navbar.appendChild(mobileMenu);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Enroll button functionality for classes
function setupEnrollButtons() {
    document.querySelectorAll('.enroll-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const className = this.parentElement.querySelector('h3').textContent;
            showModal(`Interested in ${className}?`, 
                `Great choice! Sign up to learn more about our ${className} course.<br><br>
                <input type="email" placeholder="Enter your email" class="modal-input" id="emailInput">
                <button class="modal-btn">Send Info</button>`);
            
            // Setup send info button
            document.querySelector('.modal-btn').addEventListener('click', function() {
                const email = document.getElementById('emailInput').value;
                if (validateEmail(email)) {
                    closeModal();
                    showNotification(`Thanks! Information sent to ${email}`, 'success');
                } else {
                    showNotification('Please enter a valid email', 'error');
                }
            });
        });
    });
}

// Pricing button functionality
function setupPricingButtons() {
    document.querySelectorAll('.price-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = this.parentElement.querySelector('h3').textContent;
            const price = this.parentElement.querySelector('.price').textContent;
            showModal(`Subscribe to ${planName}`, 
                `You're about to subscribe to the ${planName} plan<br>
                ${price}<br><br>
                <input type="email" placeholder="Email" class="modal-input" id="emailInput">
                <input type="text" placeholder="Full Name" class="modal-input" id="nameInput">
                <button class="modal-btn">Complete Purchase</button>`);
            
            document.querySelector('.modal-btn').addEventListener('click', function() {
                const email = document.getElementById('emailInput').value;
                const name = document.getElementById('nameInput').value;
                if (email && name && validateEmail(email)) {
                    closeModal();
                    showNotification(`Welcome ${name}! Check your email for next steps.`, 'success');
                } else {
                    showNotification('Please fill in all fields correctly', 'error');
                }
            });
        });
    });
}

// Resource link interactions
function setupResourceLinks() {
    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceName = this.parentElement.querySelector('h4').textContent;
            const action = this.textContent.trim();
            showNotification(`${action} for "${resourceName}" - Coming soon!`, 'info');
        });
    });
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal functionality
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeModal);
    
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    
    const contentEl = document.createElement('div');
    contentEl.className = 'modal-content';
    contentEl.innerHTML = content;
    
    modal.appendChild(closeBtn);
    modal.appendChild(titleEl);
    modal.appendChild(contentEl);
    overlay.appendChild(modal);
    
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form validation for contact forms (if they exist)
function setupFormValidation() {
    // This can be extended if contact forms are added
}

// Scroll effects - add animation to elements as they come into view
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature boxes, class cards, pricing cards, etc.
    document.querySelectorAll('.feature-box, .class-card, .pricing-card, .resource-card, .team-member').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Add active navigation styling on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY;
    
    // Update navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 0) {
        navbar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Prevent form submissions and show feedback
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        showNotification('Form submitted! We will contact you soon.', 'success');
    }
});
