const API_URL = 'http://localhost:1337';
const formatImageUrl = (url) => `${API_URL}${url}`;

export const Post = ({ description, likes, url }) => {
  return (
    <div className="Post">
      <img className="Post__Image" src={formatImageUrl(url)} alt="" />
      <h4>{description}</h4>
      <div>
        <span>Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Post;
