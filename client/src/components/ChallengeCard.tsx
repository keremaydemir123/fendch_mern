import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import styles from './ChallengeCard.module.css';
import CustomCTA from './CustomCTA';
import CustomLink from './CustomLink';

type ChallengeProps = {
  challenge: {
    isActive: boolean;
    tech: string;
    _id: string;
    description: string;
    tags: string[];
    tasks: string[];
    createdAt: string;
    updatedAt: string;
    objective: string;
    liveExample: string;
  };
  isActive?: boolean;
};

function ChallengeCard({ challenge, isActive = false }: ChallengeProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.front}>
          <div className={styles.frontHeader}>
            <p className={styles.frontWeek}>week 1</p>
            <h1 className={styles.frontTech}>{challenge.tech}</h1>
            <h3 className={styles.frontTask}>{challenge.objective}</h3>
            {isActive && (
              <h1>
                On Proggress
                <span className="ml-1">
                  <PulseLoader
                    color="#36d7b7"
                    loading={true}
                    speedMultiplier={0.8}
                    size={10}
                  />
                </span>
              </h1>
            )}
          </div>
        </div>
        <div className={styles.back}>
          <h1>{challenge.description}</h1>
          <CustomCTA href={`${challenge.liveExample}`}>LiveExample</CustomCTA>
          <CustomLink to={`/challenges/${challenge._id}`}>
            See Details
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

ChallengeCard.defaultProps = {
  onProggress: false,
};

export default ChallengeCard;
