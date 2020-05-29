import API from "./API.js";
import { postTweet } from "./API.js";
// import {getUsers} from './API.js';
// import {getTweets} from './API.js';
// //
//API.getTweets();

const tweetBtn = document.querySelector("#postTweet");
const textarea = document.querySelector("textarea");

tweetBtn.addEventListener("click", async () => {
  const tweets = await API.getTweets();
  let currentDate = new Date().toLocaleDateString();
  const user = localStorage.user;
  console.log("hello");
  const newTweet = {
    id: tweets[tweets.length - 1].id + 1,
    userId: user.id,
    content: textarea.value,
    likes: 0,
    retweets: 0,
    date: currentDate,
  };
  postTweet(newTweet);
});
