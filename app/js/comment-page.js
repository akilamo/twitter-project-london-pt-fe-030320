import API from "./API.js";
import { getUsers, updateLikes, updateRT, postComment } from "./API.js";

const storedTweet = JSON.parse(localStorage.tweet);

console.log(storedTweet)


const replySection = document.querySelector(`.reply-section`);
const bubbleComment = document.querySelector(".bubble");

const commentPageBox = () => {
  const comment = document.querySelector(`.comments`);
  const arrow = document.querySelector(`.arrow`);
  comment.addEventListener("click", () => {
    replySection.classList.toggle("active");
  });
  arrow.addEventListener("click", () => {
    replySection.classList.toggle("active");
  });
};

bubbleComment.addEventListener("click", () => {
  replySection.classList.toggle("active");
});

const commentPageLike = (tweet) => {
  const likes = document.querySelector(`.likes span`);
  const likeIcon = document.querySelector(`.likes img`);
  likeIcon.addEventListener("click", () => {
    likeIcon.src = "./img/liked.png";
    likes.innerText = tweet.likes + 1;
    updateLikes(tweet);
  });
};

const commentPageRT = (tweet) => {
  const retweets = document.querySelector(`.retweets span`);
  const retweetIcon = document.querySelector(`.retweets img`);
  retweetIcon.addEventListener("click", () => {
    retweetIcon.src = "./img/retweeted.png";
    retweets.innerText = tweet.retweets + 1;
    updateRT(tweet);
  });
};

const commentPageComment = (tweet) => {
  const textarea = document.querySelector("textarea");
  const btn = document.querySelector("button");
  const comments = document.querySelector(".comments span");
  btn.addEventListener("click", () => {
    if (textarea.value.length !== 0) {
      let currentDate = new Date().toLocaleDateString();
      const newComment = {
        // id: tweet.comments.length + 1,
        userId: JSON.parse(localStorage.user).id,
        tweetId: tweet.id,
        content: textarea.value,
        date: currentDate,
      };
      comments.innerText = tweet.comments.length + 1;
      postComment(newComment);
    }
  });
};

const renderMainTweet = (tweet) => {
  const avatar = document.querySelector(".avatar");
  const img = document.createElement("img");
  img.src = tweet.user.avatar_url;
  avatar.appendChild(img);

  const userInfo = document.querySelector(".user-info");
  userInfo.innerHTML = `
    <h2>${tweet.user.name}</h2>
    <p>@${tweet.user.name.replace(/\s/g, "").toLowerCase()}</p>
`;
  const tweetBody = document.querySelector(".tweet-body");
  tweetBody.innerHTML = `<p>${tweet.content}</p>`;

  const actions = document.querySelector(".actions");
  actions.innerHTML = `
    <div class="likes">
        <img src="./img/likes.svg" alt="likes">
        <span>${tweet.likes}</span>
    </div>
    <div class="retweets">
        <img src="./img/retweets.svg" alt="retweets">
        <span>${tweet.retweets}</span>
        </div>
    <div class="comments">
        <img src="./img/comments.svg" alt="comments">
        <span>${tweet.comments.length}</span>
    </div>
    `;
  const replySection = document.querySelector(".reply-section");
  replySection.innerHTML = `
        <textarea name="" id="" cols="30" rows="5" placeholder="Your comment"></textarea>
        <div class="reply-actions">
            <div class="arrow">
                <img src="./img/arrow-reply.png" alt="back">
            </div>
            <div class="btn-reply">
                <button type="submit">Tweet</button>
            </div>
        </div> `;

  commentPageBox();
  commentPageComment(tweet);
  commentPageLike(tweet);
  commentPageRT(tweet);
};

const renderComments = async (tweet) => {
  const commentList = document.querySelector(".comment-list");
  const users = await getUsers();
   
  // need to find way to retrieve user commenting details...

  tweet.comments.forEach((comment) => {
    const commentUnit = document.createElement("div");
    commentUnit.classList.add("comment-unit", `id-${comment.id}`);
    commentUnit.innerHTML = `
        <div class="user-commenting">
            <div class="avatar-comment">
                <img src="./img/avatar 1.png" alt="likes">
            </div>
            <div class="username-comment">
                <span>hater</span>
                <span>@hater</span>
            </div>
        </div>
        <div class="comment-text">${comment.content}</div>
`;
    commentList.appendChild(commentUnit);
  });
};

renderMainTweet(storedTweet);
renderComments(storedTweet);
