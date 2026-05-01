const API_URL = "https://jopad-backend.onrender.com";

// Get slug from URL
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

async function fetchArticle() {
  try {
    const res = await fetch(`${API_URL}/api/articles/${slug}`);
    const article = await res.json();

    renderArticle(article);
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