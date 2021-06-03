import React from 'react';
import { IComment } from '../../common/type';

import './Comment.scss';

const Comment: React.FC<IComment> = ({ name, email, body }) => {
  return (
    <div className="comment-container">
      <h2 className="comment-container__title">{name}</h2>
      <p className="comment-container__author">{email}</p>
      <p className="comment-container__body">{body}</p>
    </div>
  );
};

export default Comment;
