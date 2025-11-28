document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    initFormSubmit();
    initScrollAnimations();
});

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                const mobileMenu = document.querySelector('.nav-menu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
        navMenu.classList.add('mobile-hidden');
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.classList.remove('active', 'mobile-hidden');
            mobileMenuToggle.classList.remove('active');

            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        } else {
            if (!navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
            }
            navMenu.classList.add('mobile-hidden');
        }
    });
}

function initFormSubmit() {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        alert('Thank you for your interest! We will contact you shortly to confirm your appointment.');
        form.reset();
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const collectionCards = document.querySelectorAll('.collection-card');
    const featureItems = document.querySelectorAll('.feature-item');

    [...collectionCards, ...featureItems].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

const iconButtons = document.querySelectorAll('.icon-btn');
iconButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnType = btn.getAttribute('aria-label');
        if (btnType === 'Search') {
            alert('Search functionality coming soon!');
        } else if (btnType === 'Cart') {
            alert('Shopping cart feature coming soon!');
        }
    });
});

document.querySelectorAll('.collection-overlay .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const collectionName = btn.closest('.collection-card').querySelector('h3').textContent;
        alert(`Viewing ${collectionName} collection. Full catalog coming soon!`);
    });
});