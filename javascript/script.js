/**
 * Redirect to a specific dashboard page
 * @param {string} page - URL of the page to navigate to
 */
function navigateTo(page) {
  window.location.href = page;
}

// Optional: Add animations on scroll (example using IntersectionObserver)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".dashboard-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
});
