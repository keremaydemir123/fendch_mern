import Comment from './Comment';
import { CommentProps } from '../types/Comment';

function CommentList({ comments }: { comments: CommentProps[] }) {
  console.log(comments);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment-stack my-4">
          <Comment {...comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentList;
