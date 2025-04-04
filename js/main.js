// ===== UTILITY FUNCTIONS =====
function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

// ===== HEADER SCROLL EFFECT =====
const header = select('#header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = select('.hamburger');
const mainNav = select('.main-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = selectAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// ===== HERO SLIDER =====
const slides = selectAll('.slide');
const dots = selectAll('.slide-dots .dot');
const prevSlide = select('.prev-slide');
const nextSlide = select('.next-slide');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlideHandler() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlideHandler() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initialize slider
function initSlider() {
    if (slides.length === 0) return;
    
    showSlide(0);
    
    // Auto slide
    slideInterval = setInterval(nextSlideHandler, 5000);
    
    // Event listeners
    prevSlide.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlideHandler();
        slideInterval = setInterval(nextSlideHandler, 5000);
    });
    
    nextSlide.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlideHandler();
        slideInterval = setInterval(nextSlideHandler, 5000);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlideHandler, 5000);
        });
    });
}

// ===== TESTIMONIAL SLIDER =====
const testimonialSlides = selectAll('.testimonial-slide');
const testimonialDots = selectAll('.testimonial-dots .dot');
const prevTestimonial = select('.prev-testimonial');
const nextTestimonial = select('.next-testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

function initTestimonialSlider() {
    if (testimonialSlides.length === 0) return;
    
    showTestimonial(0);
    
    prevTestimonial.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });
    
    nextTestimonial.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

// ===== PORTFOLIO FILTER =====
const filterBtns = selectAll('.filter-btn');
const portfolioItems = selectAll('.portfolio-item');

function filterPortfolio() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== COUNTER ANIMATION =====
const counters = selectAll('.counter');
let counted = false;

function startCounting() {
    if (counted) return;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    counted = true;
}

// ===== SCROLL ANIMATIONS =====
const processSteps = selectAll('.process-step');

function checkScroll() {
    // Animate counter when about section is in view
    const aboutSection = select('.about-section');
    if (aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (aboutPosition < screenPosition) {
            startCounting();
        }
    }
    
    // Animate process steps
    processSteps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (stepPosition < screenPosition) {
            step.classList.add('animate');
        }
    });
    
    // Show back to top button
    const backToTop = select('.back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
}

// ===== FORM VALIDATION =====
const contactForm = select('#consultationForm');

function validateForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// ===== VIDEO MODAL =====
const videoThumbnail = select('.video-thumbnail');
let videoModal;

function setupVideoModal() {
    if (!videoThumbnail) return;
    
    videoThumbnail.addEventListener('click', () => {
        // Create modal
        videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
        
        document.body.appendChild(videoModal);
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking on X or outside the modal
        const closeModal = select('.close-modal');
        closeModal.addEventListener('click', removeModal);
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                removeModal();
            }
        });
    });
}

function removeModal() {
    if (videoModal) {
        videoModal.remove();
        document.body.style.overflow = '';
    }
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = select('.back-to-top');

function setupBackToTop() {
    if (!backToTopBtn) return;
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INITIALIZE EVERYTHING =====
window.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initTestimonialSlider();
    filterPortfolio();
    validateForm();
    setupVideoModal();
    setupBackToTop();
    setupSmoothScrolling();
    
    // Add CSS for video modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .modal-content {
            position: relative;
            width: 80%;
            height: 80%;
            max-width: 900px;
        }
        
        .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .error {
            border-color: red !important;
        }
    `;
    document.head.appendChild(style);
});

// Check scroll position on scroll
window.addEventListener('scroll', checkScroll);
// Initial check
checkScroll();