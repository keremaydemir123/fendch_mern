import styles from './ChallengeCard.module.css';

function ChallengeCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.tech}>Challenge Title</div>
        <div className={styles.body}>
          <div className={styles['image-holder']}>
            <img
              src="https://viteconf.org/images/viteconf.svg"
              width="183"
              height="150"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.main}>
            <div className={styles.objective}>Challenge Objective</div>
            <div className={styles.description}>Challenge Description</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
