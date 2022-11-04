import YoutubePlayer from '../components/YoutubePlayer';

function ChallengeDetails() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[700px] rounded-lg my-16 bg-gray p-20">
        <h1 className="text-center">Title</h1>
        <YoutubePlayer embedId="E1E08i2UJGI" />
      </div>
    </div>
  );
}

export default ChallengeDetails;
