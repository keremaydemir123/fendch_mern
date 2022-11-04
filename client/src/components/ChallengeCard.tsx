import { Link } from 'react-router-dom';
import styles from './ChallengeCard.module.css';

function ChallengeCard() {
  const id = '1';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.front}>
          <div className={styles.frontHeader}>
            <p className={styles.frontWeek}>week 1</p>
            <h1 className={styles.frontTech}>React</h1>
            <h3 className={styles.frontTask}>Todo App</h3>
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

export default ChallengeCard;
