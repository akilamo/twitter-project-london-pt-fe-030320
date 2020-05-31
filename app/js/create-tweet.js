import API from "./API.js";
import { postTweet } from "./API.js";

const tweetBtn = document.querySelector("#postTweet");
const textarea = document.querySelector("textarea");

tweetBtn.addEventListener("click", async () => {
  const tweets = await API.getTweets();
  let currentDate = new Date().toLocaleDateString();
  const newTweet = {
    // id: tweets[tweets.length - 1].id + 1,
    userId: JSON.parse(localStorage.user).id,
    content: textarea.value,
    likes: 0,
    retweets: 0,
    date: currentDate,
  };
  postTweet(newTweet);

});
