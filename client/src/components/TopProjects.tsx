import { BsTrophyFill } from 'react-icons/bs';
import { FaMedal, FaHeart, FaComment, FaGithub } from 'react-icons/fa';
import CustomLink from './CustomLink';
import GradientTitle from './GradientTitle';
import LogoContainer from './LogoContainer';

type TopProjectCardProps = {
  rank: number;
};

function TopProjectCard({ rank }: TopProjectCardProps) {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className={rankH1Styles}>{rank}.</h1>
          {trophy === 'trophy' ? (
            <BsTrophyFill className={`${rankH1Styles} text-3xl relative`} />
          ) : (
            <FaMedal className={`${rankH1Styles} text-3xl relative`} />
          )}

          <h3 className={rank === 1 ? 'text-gold' : 'text-light'}>Todo App</h3>
        </div>
        <h5 className="text-muted">WEEK 1</h5>
      </div>
      <div className="flex items-center justify-between h-12 w-full">
        <h5 className="w-full text-sm">by keremaydemir123</h5>
        <div className="flex items-center justify-start gap-2">
          <div className="flex gap-1 items-center">
            <FaHeart />
            <span>3</span>
          </div>
          <div className="flex gap-1 items-center">
            <FaComment />
            <span>3</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full h-12">
        <CustomLink to="#">Details</CustomLink>
        <div className="flex items-center gap-1">
          <div className="flex items-center bg-dark bg-opacity-30 p-2 rounded-lg justify-center mr-2">
            <FaGithub className="w-6 h-6" />
          </div>
          <LogoContainer tags={['react', 'redux']} />
        </div>
      </div>
    </li>
  );
}

function TopProjects() {
  return (
    <div className="min-h-96 w-96 rounded-md p-4 bg-gradient-to-b from-primary to-gray bg-opacity-70">
      <GradientTitle className="text-center w-full mb-4">
        Top Projects
      </GradientTitle>
      <ul className="flex flex-col gap-4">
        <TopProjectCard rank={1} />
        <TopProjectCard rank={2} />
        <TopProjectCard rank={3} />
        <TopProjectCard rank={4} />
        <TopProjectCard rank={5} />
      </ul>
    </div>
  );
}

export default TopProjects;
