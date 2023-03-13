let comments = [];
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const commentText = document.querySelector(".textarea");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createFullComment();
});

commentText.addEventListener("keypress", (evt) => {
  console.log(evt);
  if (evt.key === "Enter") {
    createFullComment();
  }
});

function createFullComment() {
  const commentName = document.querySelector(".input-name");
  const commentDate = document.querySelector(".input-date");
  const commentText = document.querySelector(".textarea");
  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    if (input.value === "") {
      validationError(input);
    } else {
      input.classList.remove("error");
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.remove();
      }
    }
  });

  if (commentName.value === "" || commentText.value === "") {
    return;
  }

  let comment = {
    name: commentName.value,
    text: commentText.value,
    time: Math.floor(Date.now() / 1000),
  };

  comments.push(comment);
  renderCommentText();
  commentName.value = "";
  commentText.value = "";
}

function validationError(outer) {
  outer.classList.add("error");
  const errorMessage = outer.nextElementSibling;
  if (!errorMessage || !errorMessage.classList.contains("error-message")) {
    const newErrorMessage = document.createElement("span");
    newErrorMessage.innerText = "Поле обязательно для заполнения";
    newErrorMessage.classList.add("error-message");
    outer.insertAdjacentElement("afterend", newErrorMessage);
  }
}

function renderCommentText() {
  let commentList = document.querySelector(".comments__list");
  let out = "";

  comments.forEach(function (item) {
    out += `
        <div class="comment-block">
            <p class="comment-date">${timeConverter(item.time)}</p>
            <p class="comment-name" role="alert">${item.name}</p>
            <p class="comment-text" role="alert">${item.text}</p>
            <svg class="icon-delete" data-time=${
              item.time
            } width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#131313;">
  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
  <g id="SVGRepo_iconCarrier">
  <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#131313;"/>
  </g>
  </svg>
  <svg class="icon-favorite" data-time=${
    item.time
  } fill="#000000" width="22px" height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"/></svg>
  
 <span class="like-count"></span>
        </div>
    `;
  });

  commentList.innerHTML = out;

  favoriteIcons = document.querySelectorAll(".icon-favorite");

  favoriteIcons.forEach((icon) => {
    // const likeCount = document.querySelector(".like-count");
    // let isLiked = false;
    // let count = 0;
    icon.addEventListener("click", () => {
      icon.classList.toggle("liked");

      // if (!isLiked) {
      //   icon.classList.add("liked");
      //   count++;
      //   isLiked = true;
      // } else {
      //   icon.classList.remove("liked");
      //   count--;
      //   isLiked = false;
      // }
      // if (count === 0) {
      //   likeCount.textContent = "";
      // } else {
      //   likeCount.textContent = count;
      // }
    });
  });
}

// Эта функция приобразовывает дату к читаемому виду

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

document.querySelector(".comments__list").addEventListener("click", (evt) => {
  if (evt.target.matches(".icon-delete")) {
    evt.preventDefault();
    deleteComments(evt.target);
  }
});

function deleteComments(deleteButton) {
  comments.splice(
    comments.findIndex((i) => i.time == deleteButton.getAttribute("data-time")),
    1
  );
  deleteButton.closest("div").remove();
  console.log(comments);
}
