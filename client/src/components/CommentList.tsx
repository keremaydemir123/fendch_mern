import React from 'react';
import Comment from './Comment';
import { CommentProps } from '../types/Comment';

function CommentList({ comments }: { comments: CommentProps[] }) {
  return comments.map((comment) => {
    return (
      <div key={comment._id} className="comment-stack my-4">
        <Comment {...comment} />
      </div>
    );
  });
}

export default CommentList;
