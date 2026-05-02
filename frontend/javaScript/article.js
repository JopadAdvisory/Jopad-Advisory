document.addEventListener('DOMContentLoaded', function() {
  const API_URL = "https://jopad-backend.onrender.com";

  // Get slug from URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const loader = document.getElementsByClassName("loader")[0];
  const wrapper = document.getElementsByClassName("wrapper")[0];
  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".carousel-dots");
  
  let currentIndex = 0;
  let itemsPerView = window.innerWidth < 768 ? 1 : 3;

  async function fetchArticle() {
    try {
      const res = await fetch(`${API_URL}/api/articles/${slug}`);
      const article = await res.json();

      renderArticle(article);
      loader.style.display = "none";  
      wrapper.style.display = "block";
    } catch (err) {
      console.error("Error loading article:", err);
    }
  }

  async function fetchMoreArticles() {
    try {
      const res = await fetch(`${API_URL}/api/articles?exclude=${slug}&limit=5`);
      const moreArticles = await res.json();

      renderMoreArticles(moreArticles);
      setupCarousel(moreArticles);
    } catch (err) {
      console.error("Error loading article:", err);
    }
  }

  function calculateReadTime(htmlContent) {
    const text = htmlContent.replace(/<[^>]*>/g, ""); // remove HTML tags
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 180);
    return `${minutes} min read`;
  }

  function renderArticle(article) {
    const category = document.getElementById("articleCategory");
    const title = document.getElementById("articleTitle");
    const date = document.getElementById("articleDate");
    const readTime = document.getElementById("articleRead");
    const pdfs = document.querySelectorAll(".articlePdf");
    const image = document.getElementsByClassName("bg")[0];
    const content = document.getElementById("articleContent");

    title.innerText = article.title;

    const formattedDate = new Date(article.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    pdfs.forEach(pdf => {
      pdf.href = article.pdfUrl;
    });

    date.innerText = `${formattedDate} |`;

    category.innerText = article.category;

    image.style.backgroundImage = `url('${article.images[0]}')`;

    content.innerHTML = article.content;

    readTime.innerText  = calculateReadTime(article.content);

  }

  fetchArticle();

  function renderMoreArticles(moreArticles) {
      track.innerHTML = "";

      moreArticles.forEach(article => {
          const card = document.createElement("a");
          const formattedDate = new Date(article.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
          });
          card.classList.add("insight__card");
          card.classList.add("solutions-grid__card");
          card.href = `/frontend/article.html?slug=${article.slug}`;

          card.innerHTML = `
          <div class="insight__img"> 
              <img class="img" src="${article.images[0]}" alt="${article.title}" class="insight__image"/>
          </div>
          
          <div class="insight__header"> 
              <h5 class="insight__category solutions-grid__card-text">${article.category}</h5>
              <span class="solutions-grid__card-text date">
                  <svg class="insight__ico"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>
                  <span>${formattedDate}</span>
              </span>
          </div>
          
          <div class="insight__content">
              <h3 class="insight__title ">${article.title}</h3>

              <p class="insight__summary solutions-grid__card-text">${article.summary}</p>

              <div class="insight__actions">
                  <a href="/frontend/article.html?slug=${article.slug}" class="nav__link read-btn">
                      Read More →
                  </a>

                  <a href="${article.pdfUrl}" target="_blank" class="nav__link nav__link--button btn--ghost" download>
                      <svg class="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/></svg>
                      <span>Download PDF</span>
                  </a>
              </div>
          </div>`
          ;

          track.appendChild(card);
      });
  }

  fetchMoreArticles();


  function setupCarousel(moreArticles) {
    if (!dotsContainer) return;

    const totalSlides = Math.ceil(moreArticles.length / itemsPerView);

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");

      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        scrollToIndex(i);
      });

      dotsContainer.appendChild(dot);
    }

  }

  function scrollToIndex(index) {
    const wrapper = track.parentElement;
    const card = document.querySelector(".insight__card");

    if (!card) return;

    const cardWidth = card.offsetWidth + 20;

    wrapper.scrollTo({
      left: index * cardWidth * itemsPerView,
      behavior: "smooth"
    });

    updateDots(index);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  track.parentElement.addEventListener("scroll", () => {
    const wrapper = track.parentElement;
    const card = document.querySelector(".insight__card");

    if (!card) return;

    const cardWidth = card.offsetWidth + 20;

    const index = Math.round(wrapper.scrollLeft / (cardWidth * itemsPerView));

    updateDots(index);
  });

  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      const wrapper = track.parentElement;
      const card = document.querySelector(".insight__card");

      if (!card) return;

      const cardWidth = card.offsetWidth + 20;
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

      if (wrapper.scrollLeft >= maxScroll) {
        wrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        wrapper.scrollBy({
          left: cardWidth * itemsPerView,
          behavior: "smooth"
        });
      }
    }, 4000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  const wrapperEl = track.parentElement;

  wrapperEl.addEventListener("mouseenter", stopAutoScroll);
  wrapperEl.addEventListener("mouseleave", startAutoScroll);

  renderMoreArticles(moreArticles);
  setupCarousel(moreArticles);
  startAutoScroll();
});