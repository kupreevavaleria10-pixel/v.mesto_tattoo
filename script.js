const telegramMessage =
  "Привет! Я с сайта v.mesto.tattoo. Хочу узнать подробнее про обучение и ближайший поток ✨";

const LINKS = {
  booking:
    "https://t.me/poli_vita?text=" +
    encodeURIComponent(telegramMessage),

  instagram:
    "https://www.instagram.com/polivitattoo?igsi=MW80eXF4MDV1Z3B6Ng==",

  studio:
    "https://www.instagram.com/v.mesto_tattoo?igsi=MXh0MDhiczhuMmkzMg=="
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
bindExternal(".js-instagram", LINKS.instagram);
bindExternal(".js-studio", LINKS.studio);


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

    const opening = !item.classList.contains("is-open");

    document.querySelectorAll(".faq-item").forEach(other => {
      other.classList.remove("is-open");

      const otherIcon = other.querySelector("button i");

      if (otherIcon) {
        otherIcon.textContent = "+";
      }
    });

    if (opening) {
      item.classList.add("is-open");

      const icon = button.querySelector("i");

      if (icon) {
        icon.textContent = "−";
      }
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

    // Не трогаем кнопки Telegram / Instagram
    if (
      link.classList.contains("js-book") ||
      link.classList.contains("js-instagram") ||
      link.classList.contains("js-studio")
    ) {
      return;
    }

    // Плавный скролл работает только для внутренних #ссылок
    if (!href || href === "#" || !href.startsWith("#")) return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    const headerHeight = header?.offsetHeight || 0;

    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight +
      4;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});

/* =========================================
   WORKS CAROUSELS
========================================= */

document.querySelectorAll("[data-works-slider]").forEach(slider => {

  const cards = [...slider.querySelectorAll(".works-card")];

  const prevBtn = slider.querySelector(".works-prev");
  const nextBtn = slider.querySelector(".works-next");

  const gallery = slider.closest(".works-gallery");
  const counter = gallery?.querySelector(".works-current");

  let index = 0;


  function renderWorks(){

    cards.forEach(card => {
      card.classList.remove(
        "is-active",
        "is-prev",
        "is-next"
      );
    });


    const prevIndex =
      (index - 1 + cards.length) % cards.length;

    const nextIndex =
      (index + 1) % cards.length;


    cards[index].classList.add("is-active");
    cards[prevIndex].classList.add("is-prev");
    cards[nextIndex].classList.add("is-next");


    if(counter){
      counter.textContent =
        String(index + 1).padStart(2,"0");
    }

  }


  prevBtn?.addEventListener("click", () => {

    index =
      (index - 1 + cards.length) %
      cards.length;

    renderWorks();

  });


  nextBtn?.addEventListener("click", () => {

    index =
      (index + 1) %
      cards.length;

    renderWorks();

  });


  renderWorks();

});

/* =========================================
   REVIEWS — POINTER EFFECTS
========================================= */

(() => {

  const section = document.querySelector(".reviews-section");

  if (!section) return;

  const canHover =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canHover || reduceMotion) return;


  section.addEventListener("pointerenter", () => {
    section.classList.add("is-pointer-active");
  });


  section.addEventListener("pointermove", event => {

    const rect = section.getBoundingClientRect();

    section.style.setProperty(
      "--review-x",
      `${event.clientX - rect.left}px`
    );

    section.style.setProperty(
      "--review-y",
      `${event.clientY - rect.top}px`
    );

  });


  section.addEventListener("pointerleave", () => {
    section.classList.remove("is-pointer-active");
  });


  document
    .querySelectorAll(".review-editorial-works")
    .forEach(work => {

      work.addEventListener("pointermove", event => {

        const rect = work.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) / rect.width - .5) * 20;

        const y =
          ((event.clientY - rect.top) / rect.height - .5) * 16;


        work.style.setProperty(
          "--review-photo-x",
          `${x}px`
        );

        work.style.setProperty(
          "--review-photo-y",
          `${y}px`
        );

      });


      work.addEventListener("pointerleave", () => {

        work.style.setProperty(
          "--review-photo-x",
          "0px"
        );

        work.style.setProperty(
          "--review-photo-y",
          "0px"
        );

      });

    });

})();

/* =========================================
   FAQ — POINTER EFFECT
========================================= */

(() => {

  const section = document.querySelector(".faq-section");

  if (!section) return;

  const canHover =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canHover || reduceMotion) return;


  section.addEventListener("pointerenter", () => {
    section.classList.add("is-pointer-active");
  });


  section.addEventListener("pointermove", event => {

    const rect = section.getBoundingClientRect();

    section.style.setProperty(
      "--faq-x",
      `${event.clientX - rect.left}px`
    );

    section.style.setProperty(
      "--faq-y",
      `${event.clientY - rect.top}px`
    );

  });


  section.addEventListener("pointerleave", () => {
    section.classList.remove("is-pointer-active");
  });

})();

/* =========================================================
   MOBILE SWIPE — WORKS + REVIEWS
========================================================= */

(() => {

  const isTouch =
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isTouch) return;


  function addSwipe(target, onSwipeLeft, onSwipeRight) {

    if (!target) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;

    const threshold = 45;


    target.addEventListener("touchstart", event => {

      if (!event.touches.length) return;

      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      currentX = startX;

    }, { passive:true });


    target.addEventListener("touchmove", event => {

      if (!event.touches.length) return;

      currentX = event.touches[0].clientX;

    }, { passive:true });


    target.addEventListener("touchend", event => {

      const diffX = currentX - startX;

      const endTouch = event.changedTouches[0];

      const diffY =
        endTouch.clientY - startY;


      /* если человек скроллил страницу вверх/вниз —
         свайп не срабатывает */
      if (Math.abs(diffY) > Math.abs(diffX)) return;


      if (Math.abs(diffX) < threshold) return;


      if (diffX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }

    });

  }


  /* ================= WORKS ================= */

  document
    .querySelectorAll("[data-works-slider]")
    .forEach(slider => {

      const windowEl =
        slider.querySelector(".works-carousel-window");

      const prev =
        slider.querySelector(".works-prev");

      const next =
        slider.querySelector(".works-next");


      addSwipe(
        windowEl,
        () => next?.click(),
        () => prev?.click()
      );

    });


  /* ================= REVIEWS ================= */

  const reviewSlider =
    document.querySelector(".review-slider");

  const reviewPrev =
    document.querySelector(".case-prev");

  const reviewNext =
    document.querySelector(".case-next");


  addSwipe(
    reviewSlider,
    () => reviewNext?.click(),
    () => reviewPrev?.click()
  );

})();

/* =========================================================
   MOBILE TAP FEEDBACK
========================================================= */

(() => {

  const isTouch =
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isTouch) return;


  const items = document.querySelectorAll(`
    .hero-points > div,
    .practice-step,
    .after-card,
    .mentor-principles > div,
    .final-social
  `);


  items.forEach(item => {

    item.addEventListener("touchstart", () => {
      item.classList.add("is-touching");
    }, { passive:true });


    item.addEventListener("touchend", () => {

      setTimeout(() => {
        item.classList.remove("is-touching");
      }, 160);

    });

  });

})();