
const navLinks = document.querySelectorAll("nav a");
const navHeight = document.querySelector("nav").offsetHeight;

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.pageYOffset -
      navHeight -
      20; // extra spacing so it scrolls slightly past

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 40;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

const images = document.querySelectorAll(".module-image");

const imageObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

images.forEach(img => {
  img.style.opacity = "0";
  img.style.transform = "translateY(20px)";
  img.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  imageObserver.observe(img);
});

const backToTop = document.createElement("button");
backToTop.textContent = "↑ Top";
document.body.appendChild(backToTop);

backToTop.style.position = "fixed";
backToTop.style.bottom = "30px";
backToTop.style.right = "30px";
backToTop.style.padding = "0.6rem 1rem";
backToTop.style.borderRadius = "20px";
backToTop.style.border = "none";
backToTop.style.background = "#f4c430";
backToTop.style.color = "#000";
backToTop.style.fontWeight = "bold";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.zIndex = "1000";

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
