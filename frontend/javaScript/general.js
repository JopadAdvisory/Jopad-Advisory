document.getElementById("year").textContent = new Date().getFullYear();

// Accordion
const mediaQuery = window.matchMedia("(min-width: 860px)");
let accordions = document.getElementsByClassName("footer__header");
let handlers = [];

for (let i = 0; i < accordions.length; i++) {
    handlers[i] = () => {
        let panel = document.getElementsByClassName("footer__link-container")[i];
        let chevron = document.getElementsByClassName("chevron")[i];
        chevron.classList.toggle("active");
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        }
    };
}

function handleWidthChange(e) {
    for (let i = 0; i < accordions.length; i++) {
        if (e.matches) {
        accordions[i].removeEventListener("click", handlers[i]);
        } else {
        accordions[i].addEventListener("click", handlers[i]);
        }
    }
}

handleWidthChange(mediaQuery);
mediaQuery.addEventListener("change", handleWidthChange);

// Footer email security obfuscation
const footerEmail = document.getElementById("footer-email");
const emailUser = "jopadvirtual247";
const emailDomain = "gmail.com";
let revealed = false
footerEmail.href = `mailto:${emailUser}@${emailDomain}`;

footerEmail.addEventListener("click", () => {
    if (!revealed) {
    footerEmail.textContent = `${emailUser}@${emailDomain}`;
    revealed = true;

    setTimeout(() => {
        footerEmail.textContent = "Email";
        revealed = false;
    }, 10_000);
    }
});

