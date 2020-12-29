import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts')
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, []);

  return (
    <div className="Home">
      {posts.map(post => (
        <Link to={`/${post.id}`}>
          <Post
            description={post.description}
            likes={post.likes}
            url={post.image?.url}
          />
        </Link>
      ))}
    </div>
  )
};

export default Home;
