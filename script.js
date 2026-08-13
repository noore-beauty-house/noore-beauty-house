/* =========================================
   PRELOADER
========================================= */

const body = document.body;
const preloader = document.querySelector(".preloader");

body.classList.add("locked");

window.addEventListener("load", () => {

  setTimeout(() => {

    preloader.classList.add("hide");

    body.classList.remove("locked");

  }, 900);

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");

if (
  cursor &&
  window.matchMedia("(pointer:fine)").matches
) {

  window.addEventListener("mousemove", (event) => {

    cursor.style.left =
      `${event.clientX}px`;

    cursor.style.top =
      `${event.clientY}px`;

  });


  const cursorTargets =
    document.querySelectorAll(
      "a, button, figure, .service-image"
    );


  cursorTargets.forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add("large");

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove("large");

      }
    );

  });

}


/* =========================================
   NAVIGATION
========================================= */

const siteNav =
  document.getElementById("siteNav");

const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.getElementById("navLinks");


/* SCROLL NAV */

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 60) {

      siteNav.classList.add(
        "scrolled"
      );

    } else {

      siteNav.classList.remove(
        "scrolled"
      );

    }

  },
  { passive: true }
);


/* MOBILE MENU */

menuButton.addEventListener(
  "click",
  () => {

    siteNav.classList.toggle(
      "menu-open"
    );

  }
);


/* CLOSE MOBILE MENU */

navLinks
  .querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        siteNav.classList.remove(
          "menu-open"
        );

      }
    );

  });


/* =========================================
   ACTIVE NAVIGATION
========================================= */

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

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            const id =
              entry.target.id;


            navItems.forEach(
              (item) => {

                item.classList.remove(
                  "active"
                );


                if (
                  item.dataset.section ===
                  id
                ) {

                  item.classList.add(
                    "active"
                  );

                }

              }
            );

          }

        }
      );

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach(
  (section) => {

    sectionObserver.observe(
      section
    );

  }
);


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage =
  document.querySelector(
    ".hero-image img"
  );


window.addEventListener(
  "scroll",
  () => {

    if (!heroImage) return;

    const value =
      Math.min(
        window.scrollY,
        window.innerHeight
      );


    heroImage.style.transform =
      `scale(1.08)
       translate3d(0, ${value * 0.035}px, 0)`;

  },
  { passive: true }
);


/* =========================================
   SERVICE DATA
========================================= */

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
      "Facials, glow treatments and deep cleansing rituals designed for calm, healthy-looking skin.",

    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1800&q=90"
  },


  {
    title:
      "Makeup<br><em>Artistry</em>",

    counter:
      "03 / 04",

    description:
      "Soft glam, event makeup and polished looks built to feel like you — only more luminous.",

    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1800&q=90"
  },


  {
    title:
      "Bridal<br><em>House</em>",

    counter:
      "04 / 04",

    description:
      "A complete bridal experience with private consultation, makeup, hair styling and finishing details.",

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


/* CHANGE SERVICE */

function changeService(index) {

  const data =
    serviceData[index];


  serviceTabs.forEach(
    (tab) => {

      tab.classList.remove(
        "active"
      );

    }
  );


  serviceTabs[index]
    .classList.add(
      "active"
    );


  const imageBox =
    serviceImage
      .closest(
        ".service-image"
      );


  imageBox.style.opacity =
    "0";

  imageBox.style.transform =
    "scale(.97)";


  setTimeout(
    () => {

      serviceImage.src =
        data.image;

      serviceTitle.innerHTML =
        data.title;

      serviceCounter.textContent =
        data.counter;

      serviceDescription.textContent =
        data.description;


      imageBox.style.opacity =
        "1";

      imageBox.style.transform =
        "scale(1)";

    },
    260
  );

}


/* TAB CLICKS */

serviceTabs.forEach(
  (tab, index) => {

    tab.addEventListener(
      "click",
      () => {

        changeService(
          index
        );

      }
    );

  }
);


/* AUTO SERVICE ROTATION */

let currentService = 0;

let serviceTimer =
  setInterval(
    () => {

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

    },
    6500
  );


serviceTabs.forEach(
  (tab, index) => {

    tab.addEventListener(
      "click",
      () => {

        currentService =
          index;

        clearInterval(
          serviceTimer
        );

        serviceTimer =
          setInterval(
            () => {

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

            },
            6500
          );

      }
    );

  }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: .12
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================
   IMAGE PARALLAX
========================================= */

const parallaxImages =
  document.querySelectorAll(
    ".wide-image img, .booking-image"
  );


window.addEventListener(
  "scroll",
  () => {

    parallaxImages.forEach(
      (image) => {

        const rect =
          image.getBoundingClientRect();


        const center =
          window.innerHeight / 2;


        const distance =
          rect.top -
          center;


        image.style.transform =
          `scale(1.08)
           translateY(${distance * -0.025}px)`;

      }
    );

  },
  { passive: true }
);


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            targetId === "#" ||
            !targetId
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth"
          });

        }
      );

    }
  );


/* =========================================
   HERO MOUSE MOVEMENT
========================================= */

const hero =
  document.querySelector(
    ".hero"
  );


hero?.addEventListener(
  "mousemove",
  (event) => {

    if (
      !window.matchMedia(
        "(pointer:fine)"
      ).matches
    ) {

      return;

    }


    const x =
      (event.clientX /
      window.innerWidth -
      .5) * 10;


    const y =
      (event.clientY /
      window.innerHeight -
      .5) * 7;


    if (heroImage) {

      heroImage.style.transform =
        `scale(1.08)
         translate(${x}px, ${y}px)`;

    }

  }
);
