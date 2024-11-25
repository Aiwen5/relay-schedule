import styles from './RideCard.module.css';

const RideCard = ({ ride }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <li key={ride.carpoolId} className={styles.card}>
      <img src={ride.driver.imageUrl} alt={ride.driver.firstName} />
      <div className={styles.cardContent}>
        <h3>{ride.driver.firstName} {ride.driver.lastName}</h3>
        <p className={styles.date}>{formatDate(ride.startDate)}</p>
        <div className={styles.time}>
          <span className={styles.address}>{ride.startingAddress}</span>
          <span className={styles.timeValue}>{ride.startTime || "Invalid"}</span>
        </div>
        <div className={styles.time}>
          <span className={styles.address}>{ride.endingAddress}</span>
          <span className={styles.timeValue}>{ride.endTime || "Invalid"}</span>
        </div>
      </div>
    </li>
  );
};

export default RideCard;