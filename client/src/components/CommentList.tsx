import { motion, AnimatePresence } from 'framer-motion';
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
    <AnimatePresence>
      {comments.map((comment) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: { duration: 0.3 },
            animation: 'easeInOut',
          }}
          className="comment-stack my-4"
        >
          {place === 'project' ? (
            <CommentCardForProject {...comment} />
          ) : (
            <Comment {...comment} />
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default CommentList;
