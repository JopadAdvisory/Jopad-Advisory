const container = document.querySelector(".testimonials-container");
const track = document.querySelector(".testimonials-track");
const dotsContainer = document.querySelector(".testimonials-dots");

// Original cards
let cards = [...document.querySelectorAll(".testimonials-card")];

// Clone first and last cards
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.prepend(lastClone);

// Update cards list
cards = [...document.querySelectorAll(".testimonials-card")];

let currentIndex = 1;
let autoScroll;

// Wait for layout
window.addEventListener("load", () => {
    jumpToCard(currentIndex, false);
    createDots();
    updateDots(0);
    startAutoScroll();
});

function cardPosition(index) {
    const card = cards[index];

    return (
        card.offsetLeft -
        (container.clientWidth - card.offsetWidth) / 2
    );
}

function jumpToCard(index, smooth = true) {
    container.scrollTo({
        left: cardPosition(index),
        behavior: smooth ? "smooth" : "auto",
    });

    currentIndex = index;
}

function nextCard() {
    currentIndex++;
    jumpToCard(currentIndex);
}

function prevCard() {
    currentIndex--;
    jumpToCard(currentIndex);
}

function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < cards.length - 2; i++) {
        const dot = document.createElement("button");
        dot.className = "testimonials__dot";

        dot.addEventListener("click", () => {
            currentIndex = i + 1;
            jumpToCard(currentIndex);
        });

        dotsContainer.appendChild(dot);
    }
}

function updateDots(index) {
    document
        .querySelectorAll(".testimonials__dot")
        .forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
}

container.addEventListener("scroll", () => {
    let closest = currentIndex;
    let smallest = Infinity;

    cards.forEach((card, index) => {
        const center =
            card.offsetLeft + card.offsetWidth / 2;

        const viewportCenter =
            container.scrollLeft + container.clientWidth / 2;

        const distance = Math.abs(center - viewportCenter);

        if (distance < smallest) {
            smallest = distance;
            closest = index;
        }
    });

    currentIndex = closest;

    // Ignore clones when updating dots
    if (currentIndex === 0) {
        updateDots(cards.length - 3);
    } else if (currentIndex === cards.length - 1) {
        updateDots(0);
    } else {
        updateDots(currentIndex - 1);
    }
});

container.addEventListener("scrollend", () => {
    // If we're on the cloned last card
    if (currentIndex === cards.length - 1) {
        currentIndex = 1;
        jumpToCard(currentIndex, false);
    }

    // If we're on the cloned first card
    if (currentIndex === 0) {
        currentIndex = cards.length - 2;
        jumpToCard(currentIndex, false);
    }
});

function startAutoScroll() {
    stopAutoScroll();

    autoScroll = setInterval(() => {
        nextCard();
    }, 5000);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

// Pause on interaction
container.addEventListener("mouseenter", stopAutoScroll);
container.addEventListener("mouseleave", startAutoScroll);

container.addEventListener("touchstart", stopAutoScroll, {
    passive: true,
});

container.addEventListener("touchend", startAutoScroll);