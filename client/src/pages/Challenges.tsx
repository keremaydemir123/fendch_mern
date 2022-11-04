import ChallengeCard from '../components/ChallengeCard';

function Challenges() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="text"
        placeholder="Search"
        className="w-5/6 rounded-md outline-none border-none h-16 my-8 px-8 text-dark font-semibold text-3xl"
      />
      <div className="flex flex-wrap justify-center items-center gap-12 w-5/6">
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
      </div>
    </div>
  );
}

export default Challenges;
