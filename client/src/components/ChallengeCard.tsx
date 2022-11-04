import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import styles from './ChallengeCard.module.css';

type ChallengeCardProps = {
  onProggress: boolean;
};

function ChallengeCard({ onProggress }: ChallengeCardProps) {
  const id = '1';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.front}>
          <div className={styles.frontHeader}>
            <p className={styles.frontWeek}>week 1</p>
            <h1 className={styles.frontTech}>React</h1>
            <h3 className={styles.frontTask}>Todo App</h3>
            {onProggress && (
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
          <h1>back of card</h1>
          <p>bla bla</p>
          <Link to={`/challenges/${id}`}>See Details</Link>
        </div>
      </div>
    </div>
  );
}

ChallengeCard.defaultProps = {
  onProggress: false,
};

export default ChallengeCard;
