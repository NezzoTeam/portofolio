const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

const filterButtons = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project");
const projectCount = document.getElementById("projectCount");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("active");

    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("active");
    navMenu?.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    let visibleCount = 0;

    projects.forEach((project) => {
      const category = project.dataset.category;

      const visible = filter === "all" || category === filter;

      project.classList.toggle("hidden", !visible);

      if (visible) {
        visibleCount += 1;
      }
    });

    if (projectCount) {
      projectCount.textContent = `Showing ${String(visibleCount).padStart(2, "0")} ${visibleCount === 1 ? "project" : "projects"}`;
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("active"));
}
