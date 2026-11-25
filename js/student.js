import { students } from "../data/data.js";
const yopishEl = document.querySelector(`.close-btn`);
const moadlEl = document.querySelector(`#addUserModal`);
const ochisEl = document.querySelector(`.add-btn`);
const modal = document.querySelector(`.modal-content`);
const saqlashEl = document.querySelector(`.modal-form`);

const studentEl = document.querySelector(`.users-wrapper`);

function studentCard(arr) {
  studentEl.innerHTML = "";
  arr.forEach((item) => {
    let { id, fullName, age, course, grade, isGraduated } = item;
    studentEl.innerHTML += `
          <section class="users-wrapper">
           <div class="user-card">
              <div class="card-header">
                <div class="avatar" >KU</div>
                <div class="user-main">
                  <span class="user-id" name="userId">${id}</span>
                  <h2 class="user-name" name="userName">${fullName}</h2>
                  <p class="user-course" name="userCourse">${course}</p>
                </div>
              </div>

              <div class="card-divider"></div>

              <div class="card-stats">
                <div class="stat-item">
                  <span class="stat-label">Age</span>
                  <span class="stat-value" name="userAge">${age}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Grade</span>
                  <span class="stat-value" name="userGrade">${grade}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Status</span>
                  <span class="badge" name="userStatus">${isGraduated ? `Bitirgan ` : `Bitirmagan`}</span>
                </div>
              </div>
           </div>
           </section  
`;
  });
}
studentCard(students);

yopishEl.addEventListener(`click`, (e) => {
  moadlEl.classList.add("hidden");
});
ochisEl.addEventListener(`click`, (e) => {
  e.stopPropagation();
  moadlEl.classList.remove(`hidden`);
});
document.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    moadlEl.classList.add("hidden");
  }
});
document.addEventListener(`click`, (e) => {
  if (!moadlEl.classList.contains(`hidden`)) {
    if (!modal.contains(e.target)) {
      moadlEl.classList.add("hidden");
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
