document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');

    if (!header || !toggle || !nav) return;

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
});
