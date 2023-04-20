// ================== data ==================

let users = [
  { id: 1, name: 'user1', email: 'user1@mail.com', age: 14, isEdit: false },
  { id: 2, name: 'User2', email: 'user2@mail.com', age: 22, isEdit: false },
  { id: 3, name: 'uSer3', email: 'user3@mail.com', age: 65, isEdit: false },
];

// ================== END : data ==================

// ================== Additional Funcs ==================

const checkEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// ================== END : Additional Funcs ==================

const table = document.querySelector('#table');
const helperText = document.querySelector('.helper-text');

// ================== Render Table ==================
const renderTable = () => {
  table.innerHTML = '';
  const emptyElement = document.createElement('div');
  if (!users.length) {
    emptyElement.innerHTML = `
    <div class="table-main-empty">
      <h3 class="table-main-empty__title">Table is empty</h3>
    </div>
  `;
    table.appendChild(emptyElement);
    return;
  }

  users.forEach((user) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = `
              <ul class="table-main">
                <li class="table-main__item">
                <div class="item__data">${user.id}</div>
                </li>
          
          ${
            user.isEdit
              ? `
                <li class="table-main__item">
                  <input type="text" class="common__input table-main__input " id="change_input_name" placeholder="Change name..." />
                </li>
                <li class="table-main__item">
                  <input type="text" class="common__input table-main__input" id="change_input_email" placeholder="Change email..." />
                </li>
                <li class="table-main__item">
                  <input type="text" class="common__input table-main__input" id="change_input_age" placeholder="Change age..." />
                </li>
                <li class="table-main__item">
                  <div class="button-group">
                    <button class="button-group__button" onclick="confirmEdit(${user.id})">Confirm</button>
                    <button class="button-group__button" onclick='deleteUser(${user.id})'>Delete</button>
                  </div> 
                </li>`
              : `
                <li class="table-main__item">
                  <div class="item__data">${user.name}</div>
                </li>
                <li class="table-main__item">
                  <div class="item__data">${user.email}</div>
                </li>
                <li class="table-main__item">
                  <div class="item__data">${user.age}</div>
                </li>
                <li class="table-main__item">
                  <div class="button-group">
                    <button class="button-group__button" onclick="startEditing(${user.id})">Edit</button>
                    <button class="button-group__button" onclick='deleteUser(${user.id})'>Delete</button>
                  </div> 
                </li>`
          }
              </ul>
          `;
    table.appendChild(newElement);
  });
};
// ================== END : Render Table ==================

// ================== Add a user in table ==================

const addUser = () => {
  const inputsAdd = document.querySelectorAll('.add-main_input');
  const id = users.length + 1;
  let name = document.querySelector('#input_name');
  let email = document.querySelector('#input_email');
  let age = document.querySelector('#input_age');

  if (name.value === '' || email.value === '' || age.value === '' || !checkEmail(email.value)) {
    inputsAdd.forEach((input) => input.classList.add('error'));
    helperText.style.display = 'flex';
    return;
  }
  inputsAdd.forEach((input) => input.classList.remove('error'));
  helperText.style.display = 'none';

  const newUser = { id, name: name.value, email: email.value, age: age.value };

  users.push(newUser);

  name.value = '';
  email.value = '';
  age.value = '';

  renderTable();
};

// ================== END : Add a user in table ==================

// ================== Editing a user in a table ==================

const startEditing = (id) => {
  users.forEach((user) => {
    if (user.id === id) {
      user.isEdit = true;
      renderTable();
    }
  });
};

const confirmEdit = (id) => {
  let name = document.querySelector('#change_input_name');
  let email = document.querySelector('#change_input_email');
  let age = document.querySelector('#change_input_age');
  const inputsEdit = document.querySelectorAll('.table-main__input');

  if (name.value === '' || email.value === '' || age.value === '' || !checkEmail(email.value)) {
    users.forEach((user) => {
      if (user.id === id) {
        inputsEdit.forEach((input) => input.classList.add('error'));
        helperText.style.display = 'flex';
      }
    });
    return;
  }

  inputsEdit.forEach((input) => input.classList.remove('error'));
  helperText.style.display = 'none';

  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, name: name.value, email: email.value, age: age.value, isEdit: false };
    }

    return user;
  });

  name.value = '';
  email.value = '';
  age.value = '';

  renderTable();
};

// ================== END : Editing a user in a table ==================

// ================== Removing a user from a table ==================

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    renderTable();
  }
};

// ================== END : Removing a user from a table ==================

// ================== Removing all users from a table ==================

const deleteAllUsers = () => {
  users = [];

  renderTable();
};

// ================== END : Removing all users from a table ==================

renderTable();
renderHelperText();
