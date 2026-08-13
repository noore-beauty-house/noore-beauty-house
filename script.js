/* =========================================================
   NOORÉ BEAUTY HOUSE
   PREMIUM INTERACTIONS — script.js
========================================================= */

"use strict";

/* =========================================================
   GLOBAL
========================================================= */

const body = document.body;
const preloader = document.querySelector(".preloader");

const isTouch =
  window.matchMedia("(pointer: coarse)").matches;

const isFinePointer =
  window.matchMedia("(pointer: fine)").matches;


/* =========================================================
   PRELOADER
========================================================= */

body.classList.add("locked");

window.addEventListener("load", () => {

  setTimeout(() => {

    if (preloader) {
      preloader.classList.add("hide");
    }

    body.classList.remove("locked");

  }, 1000);

});


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

progressBar.innerHTML = `
  <span></span>
`;

document.body.appendChild(progressBar);

const progressStyle = document.createElement("style");

progressStyle.textContent = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 9998;
    pointer-events: none;
    background: transparent;
  }

  .scroll-progress span {
    display: block;
    width: 0%;
    height: 100%;
    background: #c5a18e;
    transform-origin: left;
  }
`;

document.head.appendChild(progressStyle);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");

if (cursor && isFinePointer) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });

  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  const cursorTargets =
    document.querySelectorAll(
      "a, button, figure, img, .service-image, .booking-button"
    );


  cursorTargets.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      cursor.classList.add("large");

    });

    element.addEventListener("mouseleave", () => {

      cursor.classList.remove("large");

    });

  });

}


/* =========================================================
   NAVIGATION
========================================================= */

const siteNav =
  document.getElementById("siteNav");

const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.getElementById("navLinks");


/* NAV SCROLL */

function updateNavigation() {

  if (!siteNav) return;

  if (window.scrollY > 70) {

    siteNav.classList.add("scrolled");

  } else {

    siteNav.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  updateNavigation,
  { passive: true }
);

updateNavigation();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton && siteNav) {

  menuButton.addEventListener("click", () => {

    siteNav.classList.toggle("menu-open");

  });

}


if (navLinks) {

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        siteNav?.classList.remove(
          "menu-open"
        );

      });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navItems =
  document.querySelectorAll(
    ".nav-link"
  );


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const id =
          entry.target.id;

        navItems.forEach((item) => {

          item.classList.remove("active");

          if (
            item.dataset.section === id
          ) {

            item.classList.add("active");

          }

        });

      });

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navHeight =
        siteNav?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        25;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
  document.querySelector(".hero");

const heroImage =
  document.querySelector(
    ".hero-image img"
  );

let heroMouseX = 0;
let heroMouseY = 0;

if (hero && heroImage && isFinePointer) {

  hero.addEventListener(
    "mousemove",
    (event) => {

      heroMouseX =
        (event.clientX /
          window.innerWidth -
          0.5) * 10;

      heroMouseY =
        (event.clientY /
          window.innerHeight -
          0.5) * 7;

    }
  );

}


function updateHero() {

  if (!heroImage) return;

  const scrollAmount =
    Math.min(
      window.scrollY,
      window.innerHeight
    );

  if (isFinePointer) {

    heroImage.style.transform =
      `
      scale(1.08)
      translate3d(
        ${heroMouseX}px,
        ${heroMouseY + scrollAmount * 0.035}px,
        0
      )
      `;

  } else {

    heroImage.style.transform =
      `
      scale(1.08)
      translate3d(
        0,
        ${scrollAmount * 0.035}px,
        0
      )
      `;

  }

}

window.addEventListener(
  "scroll",
  updateHero,
  { passive: true }
);


/* =========================================================
   HERO TITLE ENHANCEMENT
========================================================= */

const heroWords =
  document.querySelectorAll(
    ".hero-word"
  );

heroWords.forEach((word, index) => {

  word.style.transitionDelay =
    `${0.2 + index * 0.12}s`;

});


/* =========================================================
   SERVICE DATA
========================================================= */

const serviceData = [

  {
    title:
      "Hair<br><em>Atelier</em>",

    counter:
      "01 / 04",

    description:
      "Cut, colour, styling and treatment — refined around the individual, never the trend.",

    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1800&q=90"
  },

  {
    title:
      "Skin<br><em>Rituals</em>",

    counter:
      "02 / 04",

    description:
      "Facials, glow treatments and deep cleansing rituals designed around calm, comfort and healthy-looking skin.",

    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=90"
  },

  {
    title:
      "Makeup<br><em>Artistry</em>",

    counter:
      "03 / 04",

    description:
      "Soft glam, event makeup and polished looks created to feel effortless, elegant and completely you.",

    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=90"
  },

  {
    title:
      "Bridal<br><em>House</em>",

    counter:
      "04 / 04",

    description:
      "A complete bridal experience with consultation, makeup, hair styling and finishing details for your special day.",

    image:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1800&q=90"
  }

];


const serviceTabs =
  document.querySelectorAll(
    ".service-tab"
  );

const serviceImage =
  document.getElementById(
    "serviceImage"
  );

const serviceTitle =
  document.getElementById(
    "serviceTitle"
  );

const serviceCounter =
  document.getElementById(
    "serviceCounter"
  );

const serviceDescription =
  document.getElementById(
    "serviceDescription"
  );


let currentService = 0;
let serviceTimer;


/* =========================================================
   CHANGE SERVICE
========================================================= */

function changeService(index) {

  if (
    !serviceData[index] ||
    !serviceImage ||
    !serviceTitle ||
    !serviceCounter ||
    !serviceDescription
  ) {
    return;
  }

  const data =
    serviceData[index];

  currentService = index;


  serviceTabs.forEach((tab, tabIndex) => {

    tab.classList.toggle(
      "active",
      tabIndex === index
    );

  });


  const imageBox =
    serviceImage.closest(
      ".service-image"
    );


  if (imageBox) {

    imageBox.style.opacity = "0";

    imageBox.style.transform =
      "scale(.96)";

  }


  setTimeout(() => {

    serviceImage.src =
      data.image;

    serviceImage.alt =
      data.title
        .replace("<br>", " ")
        .replace("<em>", "")
        .replace("</em>", "");


    serviceTitle.innerHTML =
      data.title;

    serviceCounter.textContent =
      data.counter;

    serviceDescription.textContent =
      data.description;


    if (imageBox) {

      imageBox.style.opacity = "1";

      imageBox.style.transform =
        "scale(1)";

    }

  }, 260);

}


/* =========================================================
   SERVICE TABS
========================================================= */

function startServiceRotation() {

  clearInterval(serviceTimer);

  serviceTimer =
    setInterval(() => {

      currentService++;

      if (
        currentService >=
        serviceData.length
      ) {

        currentService = 0;

      }

      changeService(
        currentService
      );

    }, 6500);

}


serviceTabs.forEach((tab, index) => {

  tab.addEventListener("click", () => {

    changeService(index);

    startServiceRotation();

  });

});


startServiceRotation();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.08,
      rootMargin:
        "0px 0px -40px 0px"
    }
  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   IMAGE PARALLAX
========================================================= */

const parallaxImages =
  document.querySelectorAll(
    ".wide-image img, .booking-image"
  );


function updateParallax() {

  if (isTouch) return;

  parallaxImages.forEach((image) => {

    const rect =
      image.getBoundingClientRect();

    const center =
      window.innerHeight / 2;

    const distance =
      rect.top - center;

    const movement =
      Math.max(
        -30,
        Math.min(
          30,
          distance * -0.025
        )
      );

    image.style.transform =
      `
      scale(1.08)
      translate3d(0, ${movement}px, 0)
      `;

  });

}

window.addEventListener(
  "scroll",
  updateParallax,
  { passive: true }
);


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (isFinePointer) {

  const magneticElements =
    document.querySelectorAll(
      ".nav-cta, .booking-button, .text-link, .service-link"
    );


  magneticElements.forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `
          translate(
            ${x * 0.08}px,
            ${y * 0.08}px
          )
          `;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform =
          "";

      }
    );

  });

}


/* =========================================================
   IMAGE HOVER EFFECT
========================================================= */

if (isFinePointer) {

  const imageContainers =
    document.querySelectorAll(
      ".wide-image, .service-image-wrap, .collage-main, .collage-card, .journal-grid figure"
    );


  imageContainers.forEach((container) => {

    container.addEventListener(
      "mousemove",
      (event) => {

        const image =
          container.querySelector("img");

        if (!image) return;

        const rect =
          container.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        image.style.transform =
          `
          scale(1.06)
          translate(
            ${x * 8}px,
            ${y * 8}px
          )
          `;

      }
    );


    container.addEventListener(
      "mouseleave",
      () => {

        const image =
          container.querySelector("img");

        if (!image) return;

        image.style.transform =
          "";

      }
    );

  });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const statNumbers =
  document.querySelectorAll(
    ".house-stats strong"
  );


function animateNumber(
  element,
  target
) {

  const duration = 1100;

  const startTime =
    performance.now();


  function update(currentTime) {

    const progress =
      Math.min(
        (currentTime - startTime) /
        duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.floor(
        eased * target
      );


    element.textContent =
      String(value).padStart(
        2,
        "0"
      );


    if (progress < 1) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(update);

}


const statsObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        statNumbers.forEach((element) => {

          const value =
            parseInt(
              element.textContent
            );


          if (!isNaN(value)) {

            animateNumber(
              element,
              value
            );

          }

        });


        statsObserver.disconnect();

      });

    },
    {
      threshold: 0.4
    }
  );


const houseStats =
  document.querySelector(
    ".house-stats"
  );


if (houseStats) {

  statsObserver.observe(
    houseStats
  );

}


/* =========================================================
   WHATSAPP BOOKING
========================================================= */

const whatsappNumber =
  "923013719817";


const whatsappMessage =
  "Hello NOORÉ Beauty House! ✨\n\nI would like to book a visit.\n\nPlease share the available appointment timings.\n\nThank you.";


const whatsappURL =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;


/* BOOK A VISIT BUTTONS */

const bookingLinks =
  document.querySelectorAll(
    ".nav-cta, .booking-button, .service-link"
  );


bookingLinks.forEach((button) => {

  button.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

});


/* =========================================================
   CONTACT WHATSAPP
========================================================= */

const contactLinks =
  document.querySelectorAll(
    ".social-links a"
  );


contactLinks.forEach((link) => {

  const text =
    link.textContent
      .trim()
      .toLowerCase();


  if (text === "whatsapp") {

    link.href =
      whatsappURL;

    link.target =
      "_blank";

    link.rel =
      "noopener noreferrer";

  }

});


/* =========================================================
   PHONE NUMBER
========================================================= */

const phoneLinks =
  document.querySelectorAll(
    'a[href^="tel:"]'
  );


phoneLinks.forEach((link) => {

  link.href =
    "tel:+923013719817";

  link.textContent =
    "+92 301 3719817";

});


/* =========================================================
   CONTACT EMAIL
========================================================= */

const emailLinks =
  document.querySelectorAll(
    'a[href^="mailto:"]'
  );


emailLinks.forEach((link) => {

  link.href =
    "mailto:hello@noorebeauty.pk";

});


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      siteNav?.classList.remove(
        "menu-open"
      );

    }

  }
);


/* =========================================================
   REDUCED MOTION
========================================================= */

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (reducedMotion.matches) {

  document.documentElement.style
    .scrollBehavior = "auto";

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      clearInterval(
        serviceTimer
      );

    } else {

      startServiceRotation();

    }

  }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

window.addEventListener(
  "load",
  () => {

    updateNavigation();

    updateHero();

    updateParallax();

  }
);

console.log(
  "NOORÉ Beauty House — Premium website loaded ✦"
);
