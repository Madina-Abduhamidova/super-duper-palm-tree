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
                  <span class="user-id" >${id}</span>
                  <h2 class="user-name">${fullName}</h2>
                  <p class="user-course">${course}</p>

                </div>
                 <button class="user-card__delete" onclick=deleteStudent(${id}) type="button" aria-label="Delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
              </div>
 
              <div class="card-divider"></div>

              <div class="card-stats">
                <div class="stat-item">
                  <span class="stat-label">Age</span>
                  <span class="stat-value" >${age}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Grade</span>
                  <span class="stat-value" >${grade}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Status</span>
                  <span class="badge" >${isGraduated ? `Bitirgan ` : `Bitirmagan`}</span>
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

  let studentData = {
    id: Math.max(...students.map((students) => students.id)) + 1,
    fullName: formData.get(`fullName`),
    course: formData.get(`course`),
    age: formData.get(`age`),
    grade: formData.get(`grade`),
    isGraduated: formData.get(`isGraduated`) ? true : false,
  };
  console.log(studentData);

  students.push(studentData);
  studentCard(students);
  moadlEl.classList.add("hidden");
});

window.deleteStudent = function (id) {
  let findStudent = students.findIndex((item) => item.id == id);
  students.splice(findStudent, 1);
  console.log(findStudent);

  studentCard(students);
};
