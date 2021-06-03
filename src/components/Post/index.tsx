import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPost, IComment } from '../../common/type';
import Comment from '../Comment';
import { addComment } from '../../app/reducers/postsReducer';

import './Post.scss';

const Post: React.FC<IPost> = ({ userId, id, title, body, comments, commentCounts }) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const dispatch = useDispatch();

  const handleAddComment = () => {
    const tempComment: IComment = {
      postId: id,
      id: commentCounts + 1,
      name,
      body: comment,
      email: email,
    };
    dispatch(addComment({ postId: id - 1, comment: tempComment }));
    setEmail('');
    setComment('');
    setName('');
  };

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
        <>
          <div className="comments-container">
            {comments.map((comment: IComment) => (
              <Comment {...comment} key={comment.id} />
            ))}
          </div>
          <div className="add-comment">
            <input
              type="text"
              placeholder="title"
              name="title"
              className="add-comment__element"
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <textarea
              placeholder="comment"
              name="comment"
              className="add-comment__element"
              onChange={e => setComment(e.target.value)}
              value={comment}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              className="add-comment__element"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <button onClick={handleAddComment} type="button">
              Add Comment
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
