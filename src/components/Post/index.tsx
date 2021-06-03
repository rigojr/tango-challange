import React, { useState } from 'react';
import { IPost, IComment } from '../../common/type';
import Comment from '../Comment';

import './Post.scss';

const Post: React.FC<IPost> = ({ userId, id, title, body, comments }) => {
  const [showComments, setShowComments] = useState<boolean>(false);

  return (
    <>
      <div className="post-container">
        <h1 className="post-container__title">{title}</h1>
        <p className="post-container__body">{body}</p>
        <div className="post-container__meta-data">
          <p className="post-container__user-id">User Id: {userId}</p>
          <p className="post-container__post-id">Post Id: {id}</p>
        </div>
        {comments && (
          <button onClick={() => setShowComments(!showComments)} type="button">
            {showComments ? 'Close Comments' : 'View Comments'}
          </button>
        )}
      </div>
      {comments && showComments && (
        <div className="comments-container">
          {comments.map((comment: IComment) => (
            <Comment {...comment} key={comment.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Post;
