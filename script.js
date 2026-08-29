/* =========================================================
   INVITATION DE MARIAGE
   Fatima & Cherif
========================================================= */

/* =========================================================
   NAVIGATION
========================================================= */

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

/*
 * Change l'apparence du header lorsque
 * l'utilisateur descend dans la page.
 */
function handleHeaderScroll() {
  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();

/*
 * Menu mobile
 */
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.classList.toggle("active", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

/*
 * Fermer le menu lorsqu'un lien est sélectionné.
 */
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   BOUTONS DE SCROLL
========================================================= */

const scrollButtons = document.querySelectorAll("[data-scroll]");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =========================================================
   ANIMATIONS AU SCROLL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   COMPTE À REBOURS
========================================================= */

/*
 * Date du mariage :
 * Samedi 12 septembre 2026 à 15h00.
 *
 * Le fuseau horaire utilisé est celui du Sénégal :
 * UTC+00:00.
 */
const weddingDate = new Date("2026-09-12T15:00:00+00:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const countdownElement = document.getElementById("countdown");
const weddingDayMessage = document.getElementById("weddingDayMessage");

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();

  const difference = weddingDate - now;

  /*
   * Lorsque la date est dépassée.
   */
  if (difference <= 0) {
    countdownElement.hidden = true;
    weddingDayMessage.hidden = false;

    clearInterval(countdownInterval);

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  daysElement.textContent = formatNumber(days);
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
}

let countdownInterval;

updateCountdown();

countdownInterval = setInterval(updateCountdown, 1000);

/* =========================================================
   GALERIE / LIGHTBOX
========================================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCounter = document.getElementById("lightboxCounter");

const galleryImages = [
  {
    src: "image/img3.jpeg",
    alt: "Fatima et Cherif vêtus élégamment",
  },
  {
    src: "image/img1.jpeg",
    alt: "Fatima et Cherif - Moment de complicitée",
  },
  {
    src: "image/img2.jpeg",
    alt: "Souvenir de Fatima et Cherif - Photo de moments heureux",
  },
  {
    src: "image/img4.jpeg",
    alt: "Fatima et Cherif - Photo souvenirs récente",
  },
];

let currentImageIndex = 0;

function showLightboxImage(index) {
  /*
   * Permet de boucler :
   * dernière photo -> première photo
   */
  if (index < 0) {
    index = galleryImages.length - 1;
  }

  if (index >= galleryImages.length) {
    index = 0;
  }

  currentImageIndex = index;

  const image = galleryImages[currentImageIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function openLightbox(index) {
  showLightboxImage(index);

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const index = Number(item.dataset.index);

    openLightbox(index);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
  showLightboxImage(currentImageIndex - 1);
});

lightboxNext.addEventListener("click", () => {
  showLightboxImage(currentImageIndex + 1);
});

/*
 * Fermer en cliquant sur l'arrière-plan.
 */
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/*
 * Navigation clavier.
 */
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showLightboxImage(currentImageIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showLightboxImage(currentImageIndex + 1);
  }
});

/* =========================================================
   RSVP / WHATSAPP
========================================================= */

const rsvpForm = document.getElementById("rsvpForm");

/*
 * Numéro WhatsApp des mariés Fatima & Cherif
 * Format international sans + ni espaces
 */
const whatsappNumber = "221777877147";

/*
 * Valider un champ
 */
function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest(".form-group");
  const errorElement = document.getElementById(`${fieldId}Error`);

  let isValid = false;
  let errorMessage = "";

  if (fieldId === "guestName") {
    const value = field.value.trim();
    if (!value) {
      errorMessage = "Veuillez entrer votre nom et prénom";
    } else if (value.length < 3) {
      errorMessage = "Le nom doit contenir au moins 3 caractères";
    } else {
      isValid = true;
    }
  } else if (fieldId === "guestCount") {
    const value = field.value;
    if (!value) {
      errorMessage = "Veuillez sélectionner le nombre de personnes";
    } else {
      isValid = true;
    }
  }

  if (isValid) {
    formGroup.classList.remove("invalid");
    formGroup.classList.add("valid");
    if (errorElement) errorElement.textContent = "";
  } else {
    formGroup.classList.remove("valid");
    if (!value && fieldId !== "guestName") {
      formGroup.classList.remove("invalid");
    } else {
      formGroup.classList.add("invalid");
      if (errorElement) errorElement.textContent = errorMessage;
    }
  }

  return isValid;
}

/*
 * Afficher un message
 */
function showMessage(text, type = "success") {
  const messagesContainer = document.getElementById("formMessages");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;

  messagesContainer.innerHTML = "";
  messagesContainer.appendChild(message);

  if (type === "success") {
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

/*
 * Gérer la soumission du formulaire
 */
rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const guestNameField = document.getElementById("guestName");
  const guestCountField = document.getElementById("guestCount");
  const guestMessageField = document.getElementById("guestMessage");
  const submitBtn = document.getElementById("submitBtn");

  // Valider les champs requis
  const isNameValid = validateField("guestName");
  const isCountValid = validateField("guestCount");

  if (!isNameValid || !isCountValid) {
    showMessage("Veuillez remplir tous les champs obligatoires", "error");
    return;
  }

  // Récupérer les valeurs
  const guestName = guestNameField.value.trim();
  const guestCount = Number(guestCountField.value);
  const guestMessage = guestMessageField.value.trim();

  // Désactiver le bouton et afficher le loader
  submitBtn.disabled = true;
  document.querySelector(".btn-text").hidden = true;
  document.querySelector(".btn-icon").hidden = true;
  document.querySelector(".btn-loader").hidden = false;

  // Construire le message
  let message =
    `Bonjour, je suis ${guestName}. ` +
    `Je confirme ma présence au mariage de ` +
    `Fatima & Cherif. ` +
    `Nous serons ${guestCount} personne${guestCount > 1 ? "s" : ""}.`;

  if (guestMessage) {
    message += `\n\nMessage : ${guestMessage}`;
  }

  const encodedMessage = encodeURIComponent(message);

  // Délai pour montrer l'animation du loader
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Afficher un message de succès
  showMessage(
    "Merci pour votre confirmation ! WhatsApp s'ouvre maintenant...",
    "success",
  );

  // Réactiver le bouton
  submitBtn.disabled = false;
  document.querySelector(".btn-text").hidden = false;
  document.querySelector(".btn-icon").hidden = false;
  document.querySelector(".btn-loader").hidden = true;

  // Ouvrir WhatsApp
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  // Réinitialiser le formulaire après 2 secondes
  setTimeout(() => {
    rsvpForm.reset();
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("valid", "invalid");
    });
  }, 2000);
});

/* =========================================================
   EFFET DE FOCUS ET VALIDATION EN TEMPS RÉEL
========================================================= */

const formInputs = document.querySelectorAll(
  ".rsvp-form input, .rsvp-form select, .rsvp-form textarea",
);

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("focused");
    // Valider le champ au moment de la perte de focus
    if (input.id === "guestName" || input.id === "guestCount") {
      validateField(input.id);
    }
  });

  // Validation en temps réel pour les champs requis
  if (input.id === "guestName" || input.id === "guestCount") {
    input.addEventListener("input", () => {
      if (input.value.trim() || input.value !== "") {
        validateField(input.id);
      }
    });
  }
});

/* =========================================================
   TOUCH / SWIPE LIGHTBOX
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true },
);

lightbox.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance > 0) {
      showLightboxImage(currentImageIndex - 1);
    } else {
      showLightboxImage(currentImageIndex + 1);
    }
  },
  { passive: true },
);

/* =========================================================
   FIN
========================================================= */
