import { BsTrophyFill } from 'react-icons/bs';
import { FaComment, FaFileCode, FaHeart, FaMedal } from 'react-icons/fa';
import GradientTitle from './GradientTitle';

type TopUserCardProps = {
  rank: number;
};

function TopUser({ rank }: TopUserCardProps) {
  let trophy;
  let rankH1Styles;

  switch (rank) {
    case 1: {
      trophy = 'trophy';
      rankH1Styles = 'text-gold';
      break;
    }
    case 2: {
      trophy = 'trophy';
      rankH1Styles = 'text-silver';
      break;
    }
    case 3: {
      trophy = 'trophy';
      rankH1Styles = 'text-bronze';
      break;
    }
    case 4: {
      trophy = 'medal';
      rankH1Styles = 'text-gold';
      break;
    }
    case 5: {
      trophy = 'medal';
      rankH1Styles = 'text-silver';
      break;
    }

    default:
      break;
  }
  return (
    <li className="flex flex-col py-2 px-4 rounded-md bg-gradient-to-t from-primary to-gray shadow-lg shadow-dark">
      <div className="flex items-center gap-2">
        <h1 className={rankH1Styles}>1.</h1>
        {trophy === 'trophy' ? (
          <BsTrophyFill className={`${rankH1Styles} text-3xl relative`} />
        ) : (
          <FaMedal className={`${rankH1Styles} text-3xl relative`} />
        )}
        <h3 className={rank === 1 ? 'text-gold' : 'text-light'}>
          Kerem Aydemir
        </h3>
      </div>
      <div className="h-12">
        <h5 className="w-full">304 Points</h5>
      </div>
      <div className="flex justify-start gap-2 h-12">
        <div className="flex gap-1 items-center">
          <FaHeart />
          <span>3</span>
        </div>
        <div className="flex gap-1 items-center">
          <FaComment />
          <span>3</span>
        </div>
        <div className="flex gap-1 items-center">
          <FaFileCode />
          <span>3</span>
        </div>
      </div>
    </li>
  );
}

function TopUsers() {
  return (
    <div className="min-h-96 w-96 rounded-md p-4 bg-gradient-to-b from-primary to-gray bg-opacity-70">
      <GradientTitle className="text-center w-full mb-4">
        Top Users
      </GradientTitle>
      <div>
        <ul className="flex flex-col gap-4">
          <TopUser rank={1} />
          <TopUser rank={2} />
          <TopUser rank={3} />
          <TopUser rank={4} />
          <TopUser rank={5} />
        </ul>
      </div>
    </div>
  );
}

export default TopUsers;
