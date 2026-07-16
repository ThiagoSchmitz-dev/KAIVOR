/* ==========================================
   KAIVOR | SCRIPT.JS
========================================== */

/* ========= REVEAL ========= */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if(top < trigger){

            section.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ========= CONTADORES ========= */

const counters = document.querySelectorAll(".counter");
const decimalCounters = document.querySelectorAll(".counter-decimal");

function animateCounters(){

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 120;

        function update(){

            current += increment;

            if(current < target){

                counter.innerText = Math.floor(current);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target;

            }

        }

        update();

    });

    decimalCounters.forEach(counter => {

        const target = parseFloat(counter.dataset.target);

        let current = 0;

        const increment = target / 100;

        function update(){

            current += increment;

            if(current < target){

                counter.innerText = current.toFixed(1);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target.toFixed(1);

            }

        }

        update();

    });

}

const featured = document.querySelector(".featured");

if(featured){

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                animateCounters();

                counterObserver.disconnect();

            }

        });

    });

    counterObserver.observe(featured);

}


/* ========= NAVBAR ========= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});


/* ========= CURSOR ========= */

const cursor = document.querySelector(".cursor");

if(cursor){

    document.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";

        cursor.style.top = e.clientY + "px";

    });

}


/* ========= HERO PARALLAX ========= */

const hero = document.querySelector(".hero-content");

if(hero){

    document.addEventListener("mousemove", e => {

        const x = (e.clientX / window.innerWidth - 0.5) * 25;

        const y = (e.clientY / window.innerHeight - 0.5) * 25;

        hero.style.transform = `translate(${x}px, ${y}px)`;

    });

}