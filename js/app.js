import { users } from "../data/data.js";

const usersEl = document.querySelector(`.users-container`);
const yopishEl = document.querySelector(`.modal__close`);
const moadlEl = document.querySelector(`#userModal`);
const ochisEl = document.querySelector(`.add-btn`);
const modal = document.querySelector(`.modal`);
const saqlashEl = document.querySelector(`#addUserForm`);
let modalTitle = document.querySelector(`.modal__title`);
let NameMOd = document.querySelector(`#userName`);
let EmailMOd = document.querySelector(`#userEmail`);
let checkMod = document.querySelector(`.modal__checkbox`);
let RoleMOd = document.querySelector(`#userRole`);
let editId = null;
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
              <button class="user-card__edit" onclick='editUser(${id}, event)' type="button" aria-label="Edit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="user-card__delete" onclick='deleteUser(${id})' type="button" aria-label="Delete">
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
  editId = null;
  saqlashEl.reset();
  moadlEl.classList.remove(`modalyopish`);
  modalTitle.textContent = `Yangi Foydalanuvchi qo'shish`;
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

window.editUser = function (id, e) {
  e.stopPropagation();
  moadlEl.classList.remove(`modalyopish`);
  modalTitle.textContent = `Foydalanuvchini tahrirlash`;
  let findIndex = users.findIndex((item) => item.id == id);
  let findUser = users[findIndex];
  NameMOd.value = `${findUser.name}`;
  EmailMOd.value = `${findUser.email}`;
  findUser.isActive
    ? checkMod.setAttribute(`checked`, ``)
    : checkMod.removeAttribute(`checked`);
  RoleMOd.value = findUser.role;
  editId = id;
};

saqlashEl.addEventListener(`submit`, (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let name = formData.get(`name`).trim();
  if (!name) {
    alert(`ismni kiriting`);
    return;
  }

  if (editId === null) {
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
  } else {
    let userData = {
      id: editId,
      name: name,
      email: formData.get(`email`),
      role: formData.get(`role`),
      isActive: formData.get(`isActive`) ? true : false,
    };
    let index = users.findIndex((item) => item.id == editId);
    users[index] = userData;
    usersCard(users);
    moadlEl.classList.add("modalyopish");
  }
});
