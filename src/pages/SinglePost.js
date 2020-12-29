import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/Post';

import { UserContext } from '../context/UserContext';

export const SinglePost = ({ match, history }) => {
  const { id } = match.params;

  const { user, setUser } = useContext(UserContext);
  console.log(UserContext, user, setUser)

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  // Used for edit form
  const [description, setDescription] = useState('');

  const getPost = async () => {
    try {
      const response = await fetch(`http://localhost:1337/posts/${id}`)
      const data = await response.json();
      setPost(data);
      setDescription(data.description);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    history.push('/');
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description
      })
    });
    const data = await response.json();
    console.log('handleEditSubmit data', data);
    getPost();
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="SinglePost">
      {loading &&
        <p>Loading...</p>
      }
      {!loading && 
        <>
          {post.id && 
            <>
              <Post
                description={post.description}
                likes={post.likes}
                url={post.image?.url}
              />
              <button onClick={handleDelete}>Delete this Post</button>
              <button onClick={() => setEdit(!edit)}>Edit</button>
              {edit && 
                <form onSubmit={handleEditSubmit}>
                  <input 
                    value={description} 
                    onChange={(event) => setDescription(event.target.value)} 
                    placeholder="New description" 
                  />
                  <button>Confirm</button>
                </form>
              }
            </>
          }
          {!post.id && 
            <p>404 Not Found</p>
          }
        </>
      }
    </div>
  )
};

export default SinglePost;
