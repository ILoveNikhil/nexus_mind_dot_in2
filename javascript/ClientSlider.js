const slider = document.querySelector(".our_client_slider");
const slides = document.querySelectorAll(".our_client_slide");
const dots = document.querySelectorAll(".our_client_slider_dot");

let currentIndex = 1; // Start with the 2nd figure active
let autoSlideInterval;
let isMouseDown = false;
let initialMouseX = 0;
let initialSliderX = 0;

function updateSlider() {
  const translateX = -currentIndex * 30 + "%";
  slider.style.transform = `translateX(${translateX})`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
}

function setActiveSlide(index) {
  currentIndex = index;
  updateSlider();
}

function moveSlider(direction) {
  if (direction === "left") {
    currentIndex = Math.max(currentIndex - 1, 0);
  } else if (direction === "right") {
    currentIndex = Math.min(currentIndex + 1, slides.length - 1);
  }

  updateSlider();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }, 3000); // Change slide every 10 seconds
}

startAutoSlide(); // Start the auto slide

slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval); // Stop auto slide on hover
  if (!isMouseDown) {
    slider.style.cursor = "grab";
  }
});

slider.addEventListener("mouseleave", () => {
  if (!isMouseDown) {
    slider.style.cursor = "default";
    startAutoSlide(); // Resume auto slide on mouse leave
  }
});

//   slider.addEventListener("mousedown", (e) => {
//     isMouseDown = true;
//     initialMouseX = e.clientX;
//     initialSliderX = currentIndex * -30;

//     slider.style.cursor = "grabbing";
//   });

//   slider.addEventListener("mousemove", (e) => {
//     if (isMouseDown) {
//       const deltaX = e.clientX - initialMouseX;
//       slider.style.transform = `translateX(${initialSliderX + deltaX}px)`;
//     }
//   });

//   slider.addEventListener("mouseup", () => {
//     isMouseDown = false;
//     slider.style.cursor = "grab";

//     // Determine the new active slide based on the slider's position
//     currentIndex = Math.round(
//       Math.abs(parseFloat(slider.style.transform)) / 30
//     );
//     updateSlider();
//   });
