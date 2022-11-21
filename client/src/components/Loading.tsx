import { PropagateLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
