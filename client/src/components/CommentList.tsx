import Comment from './Comment';
import CommentCardForProject from './CommentCardForProject';
import { CommentProps } from '../types/Comment';

function CommentList({
  comments,
  place,
}: {
  comments: CommentProps[];
  place: 'project' | 'challenge';
}) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="comment-stack my-4">
          {place === 'project' ? (
            <CommentCardForProject {...comment} />
          ) : (
            <Comment {...comment} />
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
