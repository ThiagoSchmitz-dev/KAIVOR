/* KAIVOR | interface enhancements */
(() => {
    const root = document.documentElement;
    const navbar = document.querySelector(".navbar");
    const navToggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".menu");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("js");

    const setMenuState = (isOpen) => {
        if (!navbar || !navToggle) return;

        navbar.classList.toggle("menu-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    };

    if (navToggle && menu) {
        navToggle.addEventListener("click", () => {
            setMenuState(!navbar.classList.contains("menu-open"));
        });

        menu.addEventListener("click", (event) => {
            if (event.target.closest("a")) setMenuState(false);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setMenuState(false);
        });
    }

    if (navbar) {
        let scrolling = false;

        const updateNavbar = () => {
            navbar.classList.toggle("scrolled", window.scrollY > 80);
            scrolling = false;
        };

        window.addEventListener("scroll", () => {
            if (!scrolling) {
                window.requestAnimationFrame(updateNavbar);
                scrolling = true;
            }
        }, { passive: true });

        updateNavbar();
    }

    const revealElements = document.querySelectorAll(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("active"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const animateValue = (element, decimal = false) => {
        const target = Number(element.dataset.target);
        const duration = 900;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = target * progress;
            element.textContent = decimal ? value.toFixed(1) : Math.floor(value).toString();

            if (progress < 1) {
                window.requestAnimationFrame(update);
            } else {
                element.textContent = decimal ? target.toFixed(1) : target.toString();
            }
        };

        window.requestAnimationFrame(update);
    };

    const featured = document.querySelector(".featured");
    const counters = document.querySelectorAll(".counter");
    const decimalCounters = document.querySelectorAll(".counter-decimal");
    let countersStarted = false;

    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;

        if (reducedMotion) {
            counters.forEach((counter) => { counter.textContent = counter.dataset.target; });
            decimalCounters.forEach((counter) => { counter.textContent = Number(counter.dataset.target).toFixed(1); });
            return;
        }

        counters.forEach((counter) => animateValue(counter));
        decimalCounters.forEach((counter) => animateValue(counter, true));
    };

    if (featured && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                startCounters();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        counterObserver.observe(featured);
    } else {
        startCounters();
    }

    const supportsPointerEffects = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursor = document.querySelector(".cursor");
    const heroContent = document.querySelector(".hero-content");

    if (supportsPointerEffects && !reducedMotion) {
        root.classList.add("has-custom-cursor");
        let pointerX = 0;
        let pointerY = 0;
        let pointerFrame = 0;

        const renderPointerEffects = () => {
            if (cursor) {
                cursor.style.left = `${pointerX}px`;
                cursor.style.top = `${pointerY}px`;
            }

            if (heroContent) {
                const x = (pointerX / window.innerWidth - 0.5) * 18;
                const y = (pointerY / window.innerHeight - 0.5) * 18;
                heroContent.style.transform = `translate(${x}px, ${y}px)`;
            }

            pointerFrame = 0;
        };

        document.addEventListener("pointermove", (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointerEffects);
        }, { passive: true });
    }
})();