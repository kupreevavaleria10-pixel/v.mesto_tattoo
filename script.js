const LINKS = {
  booking: "",   // ссылка на Telegram / WhatsApp для записи
  guide: "",     // ссылка на программу / гайд
  instagram: ""  // Instagram студии
};

const toast = document.querySelector(".toast");
let toastTimer;

function showToast() {
  toast?.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast?.classList.remove("show");
  }, 2600);
}

function bindExternal(selector, url) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener("click", e => {
      if (!url) {
        e.preventDefault();
        showToast();
        return;
      }

      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  });
}

bindExternal(".js-book", LINKS.booking);
bindExternal(".js-guide", LINKS.guide);
bindExternal(".js-instagram", LINKS.instagram);


// =========================
// HEADER
// =========================

const header = document.querySelector(".site-header");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();


// =========================
// MOBILE MENU
// =========================

const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

burger?.addEventListener("click", () => {
  const open = !mobileNav?.classList.contains("open");

  mobileNav?.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    burger?.setAttribute("aria-expanded", "false");
  });
});


// =========================
// PROGRAM ACCORDION
// =========================

document.querySelectorAll(".program-item").forEach(item => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const opening = !item.classList.contains("is-open");

    document.querySelectorAll(".program-item").forEach(other => {
      other.classList.remove("is-open");

      const icon = other.querySelector("button i");

      if (icon) {
        icon.textContent = "+";
      }
    });

    if (opening) {
      item.classList.add("is-open");

      const icon = item.querySelector("button i");

      if (icon) {
        icon.textContent = "−";
      }
    }
  });
});


// =========================
// FAQ
// =========================

document.querySelectorAll(".faq-item").forEach(item => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const open = item.classList.toggle("is-open");
    const icon = button.querySelector("i");

    if (icon) {
      icon.textContent = open ? "−" : "+";
    }
  });
});


// =========================
// REVIEWS SLIDER
// =========================

const cases = [...document.querySelectorAll(".review-case")];
const prev = document.querySelector(".case-prev");
const next = document.querySelector(".case-next");
const counter = document.querySelector(".case-counter");

let caseIndex = 0;

function renderCase() {
  if (!cases.length) return;

  cases.forEach((item, index) => {
    item.classList.toggle("is-active", index === caseIndex);
  });

  if (counter) {
    counter.textContent =
      `${String(caseIndex + 1).padStart(2, "0")} / ${String(cases.length).padStart(2, "0")}`;
  }
}

prev?.addEventListener("click", () => {
  if (!cases.length) return;

  caseIndex = (caseIndex - 1 + cases.length) % cases.length;
  renderCase();
});

next?.addEventListener("click", () => {
  if (!cases.length) return;

  caseIndex = (caseIndex + 1) % cases.length;
  renderCase();
});

renderCase();


// =========================
// REVEAL ANIMATION
// =========================

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});


// =========================
// COURSE PUZZLE
// =========================

const coursePuzzle = document.querySelector("#coursePuzzle");

if (coursePuzzle) {
  let puzzlePlayed = false;

  const puzzleObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !puzzlePlayed) {
          puzzlePlayed = true;

          coursePuzzle.classList.add("is-visible");

          setTimeout(() => {
            coursePuzzle.classList.add("is-snapped");
          }, 900);

          puzzleObserver.unobserve(coursePuzzle);
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  puzzleObserver.observe(coursePuzzle);
}


// =========================
// SMOOTH INTERNAL LINKS
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    const headerHeight = header?.offsetHeight || 0;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});