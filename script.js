document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');

    if (header && toggle && nav) {
        const closeMenu = () => {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Ouvrir le menu');
        };

        const openMenu = () => {
            header.classList.add('nav-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fermer le menu');
        };

        toggle.addEventListener('click', () => {
            if (header.classList.contains('nav-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    // Ombre du header une fois qu'on a commencé à scroller
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Apparition progressive des sections/cartes au scroll
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach((el) => observer.observe(el));
    }
});
