document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!header || !toggle || !menu || !overlay) return;

    const desktopLinks = header.querySelector(".navlinks");
    if (desktopLinks) {
        menu.innerHTML = desktopLinks.innerHTML;
    }

    function closeMenu() {
        menu.classList.remove("is-open");
        overlay.classList.remove("is-visible");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
    }

    function openMenu() {
        menu.classList.add("is-open");
        overlay.classList.add("is-visible");
        toggle.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
    }

    toggle.addEventListener("click", function () {
        if (menu.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener("click", closeMenu);

    menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });
});