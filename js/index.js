let comments = [];
const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", (event) => {
  const commentName = document.querySelector(".input-name");
  const commentDate = document.querySelector(".input-date");
  const commentText = document.querySelector(".textarea");
  const inputs = document.querySelectorAll(".input");

  event.preventDefault();
  //**валидация */

  inputs.forEach((input) => {
    if (input.value === "") {
      validationComment(input);
    } else {
      input.classList.remove("error");
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.remove();
      }
    }
  });

  if (commentName.value === "") {
    commentName.classList.add("error");
    validationComment(commentName);
    return;
  } else {
    commentName.classList.remove("error");
    const errorMessage = commentName.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
    }
  }

  if (commentName.value === "" || commentText.value === "") {
    return;
  }

  let comment = {
    name: commentName.value,
    text: commentText.value,
    time: Math.floor(Date.now() / 1000),
  };

  comments.push(comment);
  renderComment();
  commentName.value = "";
  commentText.value = "";
});

function validationComment(outer) {
  outer.classList.add("error");
  const errorMessage = outer.nextElementSibling;
  if (!errorMessage || !errorMessage.classList.contains("error-message")) {
    const newErrorMessage = document.createElement("span");
    newErrorMessage.innerText = "Поле обязательно для заполнения";
    newErrorMessage.classList.add("error-message");
    outer.insertAdjacentElement("afterend", newErrorMessage);
  }
}

function renderComment() {
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

//! Второй вариант рендера коментария

// function renderComment() {
//   let commentList = document.querySelector(".comments__list");

//   let commentBlock = document.createElement("div");
//   commentBlock.className = "comment-block";
//   commentList.append(commentBlock);

//   let commentMessage = "";

//   let item = comments[comments.length - 1]; // Здесь Получаем последний комментарий.
//   commentMessage += `<p class="comment-date"><em>${timeConverter(item.time)}</em></p>`;
//   commentMessage += `<p class="comment-name">${item.name}</p>`;
//   commentMessage += `<p class="comment-text">${item.text}</p>`;
//   commentMessage += `<svg class="icon-delete" data-time=${item.time} width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#131313;">
//   <g id="SVGRepo_bgCarrier" stroke-width="0"/>
//   <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
//   <g id="SVGRepo_iconCarrier">
//   <path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#131313;"/>
//   </g>
//   </svg>`;
//   commentMessage += `<svg data-time""class="icon-favorite" fill="#000000" height="20px" width="20px" version="1.1" id="XMLID_298_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
//   viewBox="0 0 24 24" xml:space="preserve">
// <g id="favorite">
//  <path d="M12,23.2l-0.6-0.5C8.7,20.7,0,13.5,0,7.3C0,3.8,2.9,1,6.5,1c2.2,0,4.3,1.1,5.5,2.9l0,0l0,0C13.2,2.1,15.3,1,17.5,1
//    C21.1,1,24,3.8,24,7.3c0,6.3-8.7,13.4-11.4,15.5L12,23.2z M6.5,2.9C4,2.9,2,4.8,2,7.2c0,4.1,5.1,9.5,10,13.4
//    c4.9-3.9,10-9.3,10-13.4c0-2.4-2-4.3-4.5-4.3c-1.6,0-3,0.8-3.8,2L12,7.6L10.3,5C9.5,3.7,8.1,2.9,6.5,2.9z"/>
// </g>
// </svg>`;

//   commentBlock.innerHTML = commentMessage;
// }

//****/

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

//**** Удаление коментария*/

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

const popupButton = document.querySelector(".popup-btn");
const popup = document.querySelector(".comments__popup");

const text = document.querySelector(".input-text");

// popupButton.addEventListener("click", () => {
//   // popup.classList.toggle("hidden");
//   // popupButton.classList.add("hidden");
// });

//*

// commentName.addEventListener("input", () => {
//
//   if (valueLength < 3) {
//     commentName.setCustomValidity("Введите имя");
//   } else {
//     commentName.setCustomValidity("");
//   }
//   commentName.reportValidity();
// });
