const axios = require("axios");
function fetchPosts() {
  return axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching posts:", error);
      throw error;
    });
}
module.exports = { fetchPosts };