//import API from "./API.js";
import { getUsers } from "./API.js";

// const input = document.querySelector("#username");
const loginContainer = document.querySelector(".login-container");
const login = document.querySelector("form");
const loginInput = document.querySelector("#username");

const userError = () => {
  loginInput.classList.toggle('error')

  const errorMsg = document.createElement("span");
  errorMsg.classList.add("loginError");
  errorMsg.innerText = "user not found";
  login.append(errorMsg);
};

login.addEventListener("submit", async () => {
  event.preventDefault();
  const users = await getUsers();
  const user = users.find((user) => user.name === loginInput.value);

  if (user) {
    localStorage.user = JSON.stringify(user);
    login.submit();
  } else {
    userError();
  }
});














// const userData = async () => {
//   const users = await getUsers();
//   console.log(users);
//   let usersArray = users.map((user) => user.name);
//   return usersArray;
// };
// userData()

// const userData = async () => {
//   const users = await getUsers().then((users) =>
//     users.map((user) => user.name)
//   );

//   console.log(users);
//   // let usersArray = users.map((user) => user.name);
//   // return usersArray;
// };
// userData();

// const userLoggedDetails = async () => {
//   const userLogged = localStorage.getItem("user");
//   const users = await getUsers().then((users) =>
//     users.filter((user) => user.name === userLogged)
//   );
//   console.log(users);
// };


// //Change profile picture

// // const profilePic = () => {
// //   const avatarInput = document.querySelector("input[type=file]");
// //   const avatarImg = document.querySelector("#profilepic");

// //   if (avatarInput) {
// //     avatarInput.addEventListener("change", () => {
// //       const file = document.querySelector("input[type=file]").files[0];
// //       const reader = new FileReader();
// //       reader.addEventListener(
// //         "load",
// //         () => {
// //           avatarImg.src = reader.result;
// //           avatarImg.classList.add("newpic");
// //         },
// //         false
// //       );
// //       if (file) {
// //         reader.readAsDataURL(file);
// //       }
// //     });
// //   }
// // };
// // profilePic();

