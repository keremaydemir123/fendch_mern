import { AiFillCloseCircle } from 'react-icons/ai';

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) {
    document.body.className = 'overflow-visible';
    return null;
  }
  document.body.className = 'overflow-hidden';

  return (
    <div
      className="overlay absolute w-screen h-screen top-0 left-0 bottom-0 right-0 bg-dark bg-opacity-80 z-10"
      onClick={onClose}
    >
      <div
        className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-max bg-gray p-8 z-50 rounded-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <>
          <AiFillCloseCircle
            onClick={onClose}
            className="absolute right-1 top-1 cursor-pointer text-2xl text-light hover:text-light-gray transition-all"
          />

          {children}
        </>
      </div>
    </div>
  );
}

export default Modal;
