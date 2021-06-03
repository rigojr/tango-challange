import React from 'react';
import { IPost } from '../../common/type';

const Post: React.FC<IPost> = ({ userId, id, title, body }) => {
  return (
    <div className="post-container">
      <h1 className="post-container__title">{title}</h1>
      <p className="post-container__body">{body}</p>
      <div className="post-container__meta-data">
        <p className="post-container__user-id">User Id: {userId}</p>
        <p className="post-container__post-id">Post Id: {id}</p>
      </div>
    </div>
  );
};

export default Post;
