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
        let isScrolled = false;
        const onScroll = () => {
            const scrolled = window.scrollY > 20;
            if (scrolled !== isScrolled) {
                isScrolled = scrolled;
                header.classList.toggle('scrolled', scrolled);
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Modale Mentions légales
    const modalOverlay = document.getElementById('mentions-legales');
    const modalTrigger = document.getElementById('mentions-legales-trigger');
    if (modalOverlay && modalTrigger) {
        const modalClose = modalOverlay.querySelector('.modal-close');
        const focusableSelector = 'a[href], button:not([disabled])';
        let lastFocusedEl = null;

        const onModalKeydown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
                return;
            }
            if (event.key !== 'Tab') return;
            const focusables = Array.from(modalOverlay.querySelectorAll(focusableSelector));
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        function openModal() {
            lastFocusedEl = document.activeElement;
            modalOverlay.hidden = false;
            modalClose.focus();
            document.addEventListener('keydown', onModalKeydown);
        }

        function closeModal() {
            modalOverlay.hidden = true;
            document.removeEventListener('keydown', onModalKeydown);
            if (lastFocusedEl) lastFocusedEl.focus();
            if (location.hash === '#mentions-legales') {
                history.replaceState(null, '', location.pathname + location.search);
            }
        }

        modalTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });

        modalClose.addEventListener('click', closeModal);

        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });

        if (location.hash === '#mentions-legales') {
            openModal();
        }
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
