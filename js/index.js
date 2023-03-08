const name = document.querySelector(".commentator-name");
const date = document.querySelector(".commentator-date");
const comment = document.querySelector(".commentator-text");

const popupButton = document.querySelector(".popup-btn");
const popup = document.querySelector(".comments__popup");
const submitBtn = document.querySelector(".submit-btn");

const text = document.querySelector(".input-text");

popupButton.addEventListener("click", () => {
  popup.classList.toggle("hidden");
  popupButton.classList.toggle("hidden");
});

console.log(text.value);
