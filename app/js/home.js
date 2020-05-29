const tweetcontainer = document.querySelector(".tweet-container");
import API from "./API.js";

const renderComments = async (tweet) => {
  const commentlist = document.querySelector(".comment-list");
  // const userId = getUsers().then((users) => users.map((user)=> (user.id)));
  // const userPic = getUsers().then((users) =>  users.map((user)=> (user.avatar_url)));

  tweet.comments.forEach((comment) => {
    `<div class="comment-id${comment.id}">
<div class="user-commenting">
    <div class="avatar-comment">
    <img src=" "
    </div>
    <div class="username-comment">
        <span>Hater</span>
        <span>@hater</span>
    </div>
</div>

<div class="comment-text">
    Lorem what?
</div>

</div>`;
  });
};
const profilePic = () => {
  const avatarInput = document.querySelector("input[type=file]");
  const avatarImg = document.querySelector("#profilepic");

  if (avatarInput) {
    avatarInput.addEventListener("change", () => {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          avatarImg.src = reader.result;
          avatarImg.classList.add("newpic");
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }
};
profilePic();

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

  //insert function to post comment inside tweet
};

const likeTweet = (tweet) => {
  const likes = document.querySelector(`.id-${tweet.id} .likes span`);
  const likeIcon = document.querySelector(`.id-${tweet.id} .likes img`);
  let imgSource = likeIcon.src;
  const oldSource = likeIcon.src;
  likeIcon.addEventListener("click", () => {
    console.log(likeIcon.src);
    // let imgSource = likeIcon.src
    if (imgSource) {
      likeIcon.src = "./img/liked.png";
      likes.innerText = tweet.likes + 1;
      updateLikes(tweet);
    } else {
      // imgSource = oldSource
      likeIcon.src = "./img/likes.svg";
    }
  });
};

const rtTweet = (tweet) => {
  const retweets = document.querySelector(`.id-${tweet.id} .retweets span`);
  const retweetIcon = document.querySelector(`.id-${tweet.id} .retweets img`);
  let imgSource = retweetIcon.src;
  // const oldSource = likeIcon.src;
  retweetIcon.addEventListener("click", () => {
    console.log(retweetIcon.src);
    // let imgSource = likeIcon.src
    if (imgSource) {
      retweetIcon.src = "./img/retweeted.png";
      retweets.innerText = tweet.retweets + 1;
      updateRT(tweet);
    } else {
      imgSource = oldSource;
      // likeIcon.src = "./img/likes.svg"
    }
  });
};

const renderTweets = async () => {
  const allTweets = await API.getTweets() || [];
  console.log(allTweets);
  allTweets.forEach((tweet) => {
    const tweetUnit = document.createElement("div");
    tweetUnit.classList.add("tweet-unit", `id-${tweet.id}`);
    tweetUnit.innerHTML = `  
    <a href = "./tweet-focus.html">
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

    tweetcontainer.appendChild(tweetUnit);

    // if(tweetUnit) {
    // tweetUnit.addEventListener('click', () => renderTweetPage(tweet))
    // }

    // renderTweetPage(tweet)
    renderComments(tweet);

    commentBox(tweet);
    likeTweet(tweet);
    rtTweet(tweet);
  });
};
renderTweets();
