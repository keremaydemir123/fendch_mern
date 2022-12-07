import styles from './ChallengeCard.module.css';

function ChallengeCard(props: any) {
  return (
    <div className={`${styles.wrapper} ${props.backgroundColor}`} style={{backgroundColor: props.backgroundColor, borderColor: props.outerBorderColor}}>
      <div className={styles.card} style={{borderColor: props.innerBorderColor}}>
        <div className={styles.tech}>React</div>
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
