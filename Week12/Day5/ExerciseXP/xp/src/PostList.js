/*Exercise 2 : Display JSON Data in React JS
Create a json file, and copy/paste this data.

Create a component named PostList.js that displays the title and the content of each object from the json file.

Render the PostList component in your App.js file.*/

import React, { useEffect, useState } from 'react';
import postsData from './posts.json';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postsData);
  }, []);

  return (
    <div className="container mt-4">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;    