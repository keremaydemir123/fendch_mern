import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import styles from './ChallengeCard.module.css';
import CustomCTA from './CustomCTA';
import CustomLink from './CustomLink';
import { ChallengeProps } from '../types/Challenge';

function ChallengeCard({
  challenge,
  isActive = false,
}: {
  challenge: ChallengeProps;
  isActive?: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.front}>
          <div className={styles.frontHeader}>
            <p className={styles.frontWeek}>week {challenge.week}</p>
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
          {challenge._id ? (
            <CustomLink to={`/challenges/${challenge._id}`}>
              See Details
            </CustomLink>
          ) : (
            <CustomLink to={``}>See Details</CustomLink>
          )}
        </div>
      </div>
    </div>
  );
}

ChallengeCard.defaultProps = {
  onProggress: false,
};

export default ChallengeCard;
