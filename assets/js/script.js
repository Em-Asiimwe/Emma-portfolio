const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", link.getAttribute("href"));
  });
});

const filterButtons = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".projects-section .featured-project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

const revealElements = document.querySelectorAll(
  ".hero-copy, .hero-art, .about-section, .expertise-section, .projects-intro, .featured-project, .contact-layout"
);
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const pageSections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

pageSections.forEach((section) => sectionObserver.observe(section));

const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsHover && !reducedMotion) {
  document.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    document.body.classList.add("has-pointer-glow");
  });

  document.querySelectorAll(".featured-project").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2;
      const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

const projectCount = document.querySelector(".project-count");
const statsRow = document.querySelector(".about-stats");

if (projectCount && statsRow) {
  const targetCount = Number(projectCount.dataset.count);
  const suffix = projectCount.dataset.suffix || "";

  const countProjects = () => {
    if (reducedMotion) {
      projectCount.textContent = `${targetCount}${suffix}`;
      return;
    }

    const duration = 1400;
    let startTime = null;

    const updateCount = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const progress = ((currentTime - startTime) % duration) / duration;
      const currentCount = Math.floor(progress * targetCount);
      projectCount.textContent = `${currentCount}${suffix}`;

      window.requestAnimationFrame(updateCount);
    };

    window.requestAnimationFrame(updateCount);
  };

  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          countProjects();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    countObserver.observe(statsRow);
  } else {
    countProjects();
  }
}

const contactForm = document.querySelector("#contact-form");
const formStatus = contactForm ? contactForm.querySelector(".form-status") : null;
const formToast = document.querySelector(".form-toast");

const showFormToast = (message, isError = false) => {
  if (!formToast) {
    return;
  }

  formToast.textContent = message;
  formToast.classList.toggle("is-error", isError);
  formToast.classList.add("is-visible");
  formToast.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    formToast.classList.remove("is-visible");
    formToast.setAttribute("aria-hidden", "true");
  }, 5000);
};

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessKey = contactForm.querySelector('input[name="access_key"]').value;
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      formStatus.textContent = "Add your Web3Forms access key before sending messages.";
      formStatus.className = "form-status error";
      showFormToast("Your message was not sent. Add the Web3Forms access key.", true);
      return;
    }

    submitButton.disabled = true;
    formStatus.textContent = "Sending your message...";
    formStatus.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send the message.");
      }

      contactForm.reset();
      formStatus.textContent = "Thanks! Your message has been sent.";
      formStatus.className = "form-status success";
      showFormToast("Message sent successfully. Thank you for reaching out!");
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.className = "form-status error";
      showFormToast("Your message could not be sent. Please try again.", true);
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
