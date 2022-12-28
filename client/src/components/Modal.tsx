/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center p-8 bg-dark bg-opacity-80 z-10 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        className="modal relative h-max bg-secondary border-2 border-gray shadow-md shadow-gray mt-16 p-4 z-50 rounded-lg md:w-[1000px] w-11/12"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <AiFillCloseCircle
          onClick={onClose}
          className="absolute right-2 top-2 cursor-pointer text-2xl text-light hover:text-light-gray transition-all"
        />

        {children}
      </motion.div>
    </div>
  );
}

export default Modal;
