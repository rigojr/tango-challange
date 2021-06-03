import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IPost, IComment } from '../../common/type';
import Comment from '../Comment';
import { addComment } from '../../app/reducers/postsReducer';

import './Post.scss';

const Post: React.FC<IPost> = ({ userId, id, title, body, comments, commentCounts }) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const form = useRef(null);
  const dispatch = useDispatch();

  const handleAddComment = () => {
    const formData = new FormData(form.current || undefined);
    const tempComment: IComment = {
      postId: id,
      id: commentCounts + 1,
      name: formData.get('title')?.toString() ?? '',
      body: formData.get('comment')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
    };
    dispatch(addComment(tempComment));
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
          <form className="add-comment" ref={form}>
            <input type="text" placeholder="title" name="title" className="add-comment__element" />
            <textarea placeholder="comment" name="comment" className="add-comment__element" />
            <input type="email" placeholder="email" name="email" className="add-comment__element" />
            <button onClick={handleAddComment} type="button">
              Add Comment
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Post;
