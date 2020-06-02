const API_ENDPOINT = "http://localhost:3000";
const USERS_URL = `${API_ENDPOINT}/users?_embed=tweets`;
const TWEETS_URL = `${API_ENDPOINT}/tweets?_expand=user&_embed=comments`;

const getTweets = async () => {
  return await fetch(TWEETS_URL)
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
export default { getTweets };

const getUsers = async () => {
  return await fetch(USERS_URL).then((res) => res.json());
};

const updateLikes = async (tweet) => {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: tweet.likes + 1 }),
  };
  return await fetch(`${API_ENDPOINT}/tweets/${tweet.id}`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw `Oops we couldn't update that!`;
      }
    })
    .catch((error) => error);
};

const updateRT = async (tweet) => {
  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ retweets: tweet.retweets + 1 }),
  };
  return await fetch(`${API_ENDPOINT}/tweets/${tweet.id}`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw `Oops we couldn't update that!`;
      }
    })
    .catch((error) => error);
};

const postComment = async (newComment) => {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newComment),
  };
  return await fetch(`${API_ENDPOINT}/comments`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};

const postTweet = async (newTweet) => {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newTweet),
  };
  return await fetch(`${API_ENDPOINT}/tweets`, configObject)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Oops something went wrong!";
      }
    })
    .catch((error) => error);
};

export { getUsers, updateLikes, updateRT, postTweet, postComment };
