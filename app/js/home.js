import API from "./API.js";
import { updateLikes } from "./API.js";
import { updateRT } from "./API.js";
import { postComment } from "./API.js";

const tweetContainer = document.querySelector(".tweet-container");
const storedUser = JSON.parse(localStorage.user);

const renderUserHeader = (user) => {
  const userContainer = document.querySelector(".user");
  userContainer.innerHTML = `
  <h2>${user.name}</h2>
  <div class="user-details">
    <p>@${user.name.replace(/\s/g, "").toLowerCase()}</p>
    <p>London, UK</p>
  </div>
  <div class="follow-details">
    <p><span class="num">245</span> Followers</p>
    <p><span class="num">132</span> Following</p>
  </div>
`;
};

const profilePic = () => {
  const avatarInput = document.querySelector("input[type=file]");
  const avatarImg = document.querySelector("#profilepic");
  const label = document.querySelector('label')
    avatarInput.addEventListener("change", () => {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          avatarImg.src = reader.result;
          avatarImg.classList.add("newpic");
          label.classList.add("newpic")
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });
};

const commentBox = (tweet) => {
  const replySection = document.querySelector(`.id-${tweet.id} .reply-section`);
  const comment = document.querySelector(`.id-${tweet.id} .comments`);
  const arrow = document.querySelector(`.id-${tweet.id} .arrow`);
  comment.addEventListener("click", () => {
    replySection.classList.toggle("active");
  });
  arrow.addEventListener("click", () => {
    replySection.classList.toggle("active");
  });
};

const commentInTweet = (tweet) => {
  const textarea = document.querySelector(`.id-${tweet.id} textarea`);
  const btn = document.querySelector(`.id-${tweet.id} button`);
  const comments = document.querySelector(`.id-${tweet.id} .comments span`);
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

const likeTweet = (tweet) => {
  const likes = document.querySelector(`.id-${tweet.id} .likes span`);
  const likeIcon = document.querySelector(`.id-${tweet.id} .likes img`);
  likeIcon.addEventListener("click", () => {
    likeIcon.src = "./img/liked.png";
    likes.innerText = tweet.likes + 1;
    updateLikes(tweet);
  });
};

const rtTweet = (tweet) => {
  const retweets = document.querySelector(`.id-${tweet.id} .retweets span`);
  const retweetIcon = document.querySelector(`.id-${tweet.id} .retweets img`);
  retweetIcon.addEventListener("click", () => {
    retweetIcon.src = "./img/retweeted.png";
    retweets.innerText = tweet.retweets + 1;
    updateRT(tweet);
  });
};

const renderTweets = async () => {
  const allTweets = (await API.getTweets()) || [];
  allTweets.forEach((tweet) => {
    const tweetUnit = document.createElement("div");
    tweetUnit.classList.add("tweet-unit", `id-${tweet.id}`);
    tweetUnit.innerHTML = ` 

    <a href = "./comment-page.html">
    <div class="yellow">
        <h5>${tweet.user.name}</h5>
        <p>${tweet.date}</p>
    </div>
    <div class="tweet-text">${tweet.content}</div>
    </a> 

    <div class="actions">
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
   </div>
  
    <div class="reply-section inactive">
      <textarea name="" id="" cols="30" rows="5" placeholder="Your comment"></textarea>
      <div class="reply-actions">
          <div class="arrow">
              <img src="./img/arrow-reply.png" alt="back">
          </div>
          <div class="btn-reply">
              <button type="submit">Reply</button>
          </div>
      </div>
    </div>
  `;
    tweetContainer.appendChild(tweetUnit);

    tweetUnit.addEventListener("click", () => {
      localStorage.tweet = JSON.stringify(tweet);
    });

    commentBox(tweet);
    commentInTweet(tweet);
    likeTweet(tweet);
    rtTweet(tweet);
  });
};

renderUserHeader(storedUser);
renderTweets();
profilePic();
