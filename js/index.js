let comments = [];
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const commentName = document.querySelector(".input-name");
  const commentDate = document.querySelector(".input-date");
  const commentText = document.querySelector(".textarea");

  let comment = {
    name: commentName.value,
    text: commentText.value,
    time: Math.floor(Date.now() / 1000),
    icons: {
      delete: "icons/delete-icon.svg",
      favorite: "icons/favorite-icon.svg",
    },
  };
  commentName.value = "";
  commentText.value = "";
  comments.push(comment);
  renderComment();

  console.log(comment.icons.delete);
});

function renderComment() {
  let commentList = document.querySelector(".comments__list");

  let commentMessage = "";

  comments.forEach((item) => {
    commentMessage += `<p class="comment-date"><em>${timeConverter(item.time)}</em></p>`;
    commentMessage += `<p class="comment-name">${item.name}</p>`;
    commentMessage += `<p class="comment-text">${item.text}</p>`;
    commentMessage += `<img src="${item.icons.delete}" class="icon-delete"></img>`;
    commentMessage += `<img src="${item.icons.favorite}" class="icon-favorite"></img>`;
  });

  commentList.innerHTML = commentMessage;
}

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

//

// const popupButton = document.querySelector(".popup-btn");
// const popup = document.querySelector(".comments__popup");

// const text = document.querySelector(".input-text");

// popupButton.addEventListener("click", () => {
//   popup.classList.toggle("hidden");
//   popupButton.classList.toggle("hidden");
// });

// console.log(text.value);
