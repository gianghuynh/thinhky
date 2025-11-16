/**
 * Main JavaScript file for Thịnh Ký restaurant website
 * Handles navigation, form submissions, animations, and menu functionality
 */

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect - REMOVED
    // Header will stay visible at all times

    /**
     * Form submission handling for booking form
     * Validates required fields and shows confirmation message
     */
    const bookingForm = document.querySelector('.form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const guests = formData.get('guests');
            const date = formData.get('date');
            const time = formData.get('time');
            const tableType = formData.get('table_type');
            const notes = formData.get('notes');
            
            // Basic validation
            if (!name || !phone || !guests || !date || !time) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
                return;
            }
            
            // Simulate booking confirmation
            const confirmMessage = `Cảm ơn ${name} đã đặt bàn!\n\nThông tin đặt bàn:\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Số lượng khách: ${guests} người\n- Ngày: ${date}\n- Giờ: ${time}\n- Loại bàn: ${tableType || 'Không chọn'}\n- Ghi chú: ${notes || 'Không có'}\n\nChúng tôi sẽ liên hệ lại để xác nhận!`;
            
            alert(confirmMessage);
            
            // Reset form
            this.reset();
        });
    }

    /**
     * Phone number click handler
     * Opens phone dialer when phone button is clicked
     */
    const phoneButtons = document.querySelectorAll('button[class*="btn-secondary"]');
    
    phoneButtons.forEach(button => {
        if (button.textContent.includes('0123 456 789')) {
            button.addEventListener('click', function() {
                // Open phone dialer
                window.location.href = 'tel:0123456789';
            });
        }
    });

    /**
     * Menu item hover effects
     * Adds smooth animation when hovering over menu items
     */
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    /**
     * Feature cards animation on scroll
     * Uses Intersection Observer to animate elements when they come into view
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe menu items
    const menuItemsToAnimate = document.querySelectorAll('.menu-item');
    menuItemsToAnimate.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    /**
     * Button click animations
     * Creates ripple effect when buttons are clicked
     */
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    /**
     * Add ripple effect styles dynamically
     * Creates CSS for ripple animation effect
     */
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    /**
     * Fixed parallax effect for hero image
     * Creates subtle parallax scrolling effect for hero section
     */
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            const heroRect = heroSection.getBoundingClientRect();
            
            // Only apply parallax when hero section is visible
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                const parallax = scrolled * 0.3;
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

    /**
     * Loading animation
     * Smooth fade-in effect when page loads
     */
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    /**
     * Mobile menu toggle (if needed for smaller screens)
     * Creates responsive mobile menu for smaller devices
     */
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-menu');
        const header = document.querySelector('.header-content');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileBtn.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #333;
                    cursor: pointer;
                `;
                
                header.appendChild(mobileBtn);
                
                // Toggle mobile menu
                mobileBtn.addEventListener('click', function() {
                    nav.classList.toggle('mobile-open');
                });
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Menu page functionality
    initializeMenuPage();
    
    // FAQ functionality
    initializeFAQ();
});

/**
 * Menu page functionality
 * Handles category switching and menu display for menu.html page
 */
function initializeMenuPage() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (categoryBtns.length === 0 || menuSections.length === 0) {
        return; // Not on menu page
    }
    
    console.log('Menu script loaded');
    console.log('Found buttons:', categoryBtns.length);
    console.log('Found sections:', menuSections.length);
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Button clicked:', this.getAttribute('data-category'));
            
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and sections
            categoryBtns.forEach(b => b.classList.remove('active'));
            menuSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(category);
            
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Activated section:', category);
            } else {
                console.error('Section not found:', category);
            }
            
            // Scroll to top when switching
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize with full-menu active
    const fullMenuBtn = document.querySelector('[data-category="full-menu"]');
    const fullMenuSection = document.getElementById('full-menu');
    
    if (fullMenuBtn && fullMenuSection) {
        fullMenuBtn.classList.add('active');
        fullMenuSection.classList.add('active');
        console.log('Initialized with full menu');
    }
}

/**
 * FAQ functionality
 * Handles FAQ accordion for contact page
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        return; // Not on contact page
    }
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Utility functions
 * Collection of helper functions for common operations
 */
const utils = {
    /**
     * Debounce function for performance
     * Limits the rate at which a function can fire
     * @param {Function} func - Function to debounce
     * @param {number} wait - Delay in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Check if element is in viewport
     * Determines if an element is visible in the current viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} True if element is in viewport
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

/**
 * Export for potential module use
 * Makes utils available for Node.js module system
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
