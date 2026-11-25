import { users } from "../data/data.js";

const usersEl = document.querySelector(`.users-container`);
const yopishEl = document.querySelector(`.modal__close`);
const moadlEl = document.querySelector(`#userModal`);
const ochisEl = document.querySelector(`.add-btn`);
const modal = document.querySelector(`.modal`);
const saqlashEl = document.querySelector(`#addUserForm`);
function usersCard(arr) {
  usersEl.innerHTML = "";
  arr.forEach((item) => {
    let { id, name, email, role, isActive } = item;
    usersEl.innerHTML += `
     <div class="user-card">
            <div class="user-card__header">
              <div class="user-card__avatar">AV</div>
              <div class="user-card__info">
                <h3 class="user-card__name">${name}</h3>
                <p class="user-card__email">${email}</p>
              </div>
              <button class="user-card__delete" onclick=deleteUser(${id}) type="button" aria-label="Delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>

            <div class="user-card__footer">
              <span class="user-card__role">${role}</span>
              <span class="user-card__status user-card__status--active"
                >${isActive ? "faol" : "no faol"}</span
              >
            </div>`;
  });
}
window.deleteUser = function (id) {
  let findUser = users.findIndex((item) => item.id == id);
  users.splice(findUser, 1);

  usersCard(users);
};

usersCard(users);
yopishEl.addEventListener(`click`, (e) => {
  moadlEl.classList.add("modalyopish");
  console.log(1);
});
ochisEl.addEventListener(`click`, (e) => {
  e.stopPropagation();
  moadlEl.classList.remove(`modalyopish`);
});
document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    moadlEl.classList.add("modalyopish");
  }
});
document.addEventListener(`click`, (e) => {
  if (!moadlEl.classList.contains(`modalyopish`)) {
    if (!modal.contains(e.target)) {
      moadlEl.classList.add("modalyopish");
    }
  }
});
saqlashEl.addEventListener(`submit`, (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let name = formData.get(`name`).trim();
  if (!name) {
    alert(`ismni kiriting`);
    return;
  }

  let userData = {
    id: Math.max(...users.map((users) => users.id)) + 1,
    name: name,
    email: formData.get(`email`),
    role: formData.get(`role`),
    isActive: formData.get(`isActive`) ? true : false,
  };

  users.push(userData);
  usersCard(users);
  moadlEl.classList.add("modalyopish");
});
