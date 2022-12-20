import { PropagateLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;
