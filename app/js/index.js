//import API from "./API.js";
import { getUsers } from "./API.js";
import { updateLikes } from "./API.js";
import { updateRT } from "./API.js";
import { createTweet } from "./create-tweet.js";

// Your code here

// API.getTweets();

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

const input = document.querySelector("#username");
const loginContainer = document.querySelector(".login-container");
const login = document.querySelector("form");
const loginInput = document.querySelector("#username");

const userError = () => {
  const errorMsg = document.createElement("span");
  errorMsg.classList.add("loginError");
  errorMsg.innerText = "user not found";
  loginContainer.appendChild(errorMsg);
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

// const userLoggedDetails = async () => {
//   const userLogged = localStorage.getItem("user");
//   const users = await getUsers().then((users) =>
//     users.filter((user) => user.name === userLogged)
//   );
//   console.log(users);
// };

//Render all tweets
// const tweetcontainer = document.querySelector(".tweet-container");

// const renderTweets = async () => {
//   const allTweets = await API.getTweets();
//   console.log(allTweets);
//   allTweets.forEach((tweet) => {
//     const tweetUnit = document.createElement("div");
//     tweetUnit.classList.add("tweet-unit", `id-${tweet.id}`);
//     tweetUnit.innerHTML = `  
  
//   <a href = "./tweet-focus.html">
//   <div class="yellow">
//   <h5>${tweet.user.name}</h5>
//   <p>${tweet.date}</p>
// </div>
// <div class="tweet-text">
// ${tweet.content}
// </div>
// </a>

// <div class="actions">
//   <div class="likes">
//   <img src="./img/likes.svg" alt="likes">
//       <span>${tweet.likes}</span>
//   </div>
//   <div class="retweets">
//   <img src="./img/retweets.svg" alt="retweets">
//     <span>${tweet.retweets}</span>
//   </div>
//   <div class="comments">
//   <img src="./img/comments.svg" alt="comments">
//       <span>${tweet.comments.length}</span>
//   </div>
// </div>


// <div class="reply-section inactive">
//     <textarea name="" id="" cols="30" rows="5" placeholder="Your comment"></textarea>
//     <div class="reply-actions">
//         <div class="arrow">
//             <img src="./img/arrow-reply.png" alt="back">
//         </div>
//         <div class="btn-reply">
//             <button type="submit">Reply</button>
//         </div>

//     </div>
// </div>
// `;

//     tweetcontainer.appendChild(tweetUnit);

//     // if(tweetUnit) {
//     // tweetUnit.addEventListener('click', () => renderTweetPage(tweet))
//     // }

//     // renderTweetPage(tweet)
//     renderComments(tweet);

//     commentBox(tweet);
//     likeTweet(tweet);
//     rtTweet(tweet);
//   });
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

// // const commentBox = (tweet) => {
// //   const replySection = document.querySelector(`.id-${tweet.id} .reply-section`);
// //   const comment = document.querySelector(`.id-${tweet.id} .comments`);
// //   const arrow = document.querySelector(`.id-${tweet.id} .arrow`);
// //   comment.addEventListener("click", () => {
// //     replySection.classList.toggle("active");
// //   });
// //   arrow.addEventListener("click", () => {
// //     replySection.classList.toggle("active");
// //   });

// //   //insert function to post comment inside tweet
// // };

// // const likeTweet = (tweet) => {
// //   const likes = document.querySelector(`.id-${tweet.id} .likes span`);
// //   const likeIcon = document.querySelector(`.id-${tweet.id} .likes img`);
// //   let imgSource = likeIcon.src;
// //   const oldSource = likeIcon.src;
// //   likeIcon.addEventListener("click", () => {
// //     console.log(likeIcon.src);
// //     // let imgSource = likeIcon.src
// //     if (imgSource) {
// //       likeIcon.src = "./img/liked.png";
// //       likes.innerText = tweet.likes + 1;
// //       updateLikes(tweet);
// //     } else {
// //       // imgSource = oldSource
// //       likeIcon.src = "./img/likes.svg";
// //     }
// //   });
// // };

// // const rtTweet = (tweet) => {
// //   const retweets = document.querySelector(`.id-${tweet.id} .retweets span`);
// //   const retweetIcon = document.querySelector(`.id-${tweet.id} .retweets img`);
// //   let imgSource = retweetIcon.src;
// //   // const oldSource = likeIcon.src;
// //   retweetIcon.addEventListener("click", () => {
// //     console.log(retweetIcon.src);
// //     // let imgSource = likeIcon.src
// //     if (imgSource) {
// //       retweetIcon.src = "./img/retweeted.png";
// //       retweets.innerText = tweet.retweets + 1;
// //       updateRT(tweet);
// //     } else {
// //       imgSource = oldSource;
// //       // likeIcon.src = "./img/likes.svg"
// //     }
// //   });
// // };

// const renderComments = async (tweet) => {
//   const commentlist = document.querySelector(".comment-list");
//   // const userId = getUsers().then((users) => users.map((user)=> (user.id)));
//   // const userPic = getUsers().then((users) =>  users.map((user)=> (user.avatar_url)));

//   tweet.comments.forEach((comment) => {
//     `<div class="comment-id${comment.id}">
// <div class="user-commenting">
//     <div class="avatar-comment">
//     <img src=" "
//     </div>
//     <div class="username-comment">
//         <span>Hater</span>
//         <span>@hater</span>
//     </div>
// </div>

// <div class="comment-text">
//     Lorem what?
// </div>

// </div>`;
//   });
// };

// const userId = getUsers().then((users) => users.map((user)=> console.log(user.id)));

// const comments = API.getTweets().
// then((tweet) => tweet.map(comment => console.log(comment)))

// const renderTweetPage = (tweet) => {
//  const commentlist = tweet.comments;

//  tweet.comments.forEach(comment => console.log(comment))

// // const avatarDiv = document.querySelector('.avatar')
// const avatarImg = document.createElement('img')
// avatarImg.src = tweet.user.avatar_url
// avatarDiv.appendChild(avatarImg);

// const userinfo = document.querySelector('userinfo');
// userinfo.innerHTML = `
// <h2>${tweet.user.name}</h2>
// <p>@${tweet.user.name.toLowerCase()}</p>
// `

// const tweetBody = document.querySelector('.tweet-body')
// const p = document.createElement('p');
// p.innerText = tweet.content;
// tweetBody.appendChild(p);

// const actions = document.querySelector('.actions')
// actions.innerHTML = `
// <div class="likes">
// <img src="./img/likes.svg" alt="likes">
// <span>${tweet.likes}</span>
// </div>
// <div class="retweets">
// <img src="./img/retweets.svg" alt="retweets">
// <span>${tweet.retweets}</span>
// </div>
// <div class="comments">
// <img src="./img/comments.svg" alt="comments">
// <span>${tweet.comments.length}</span>
// </div>

// `

// const commentList = document.querySelector('.comment-list')
// commentList.innerHTML = `
// <div class="comment-id1">
// <div class="user-commenting">
//     <div class="avatar-comment">
//     <img src=${tweet.user.avatar_url}
//     </div>
//     <div class="username-comment">
//         <span>Hater</span>
//         <span>@hater</span>
//     </div>
// </div>
// <div class="comment-text">
//     Lorem what?
// </div>

// </div>

// `
// }

//Change profile pic code bin
// const avatar = document.querySelector('.avatar > input');

// avatar.addEventListener('change', (event) => {

// console.log ((event.target.value).split('\\').pop())
// let fileName = (event.target.value).split('\\').pop()
// avatarImg.src = `./img/${fileName}`
// })

// var input = document.getElementById("inputFile");
// const fReader = new FileReader();
// fReader.readAsDataURL(avatar.files[0]);
// fReader.onloadend = function(event){
//     // var img = document.getElementById("yourImgTag");
//     const avatarImg = avatar.querySelector('img');
//     avatarImg.src = event.target.result;
// }
