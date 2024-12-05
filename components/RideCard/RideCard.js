import styles from './RideCard.module.css';

const RideCard = ({ ride }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <li key={ride.carpoolId} className={styles.card}>
      {/* Top Section: Driver Info */}
      <div className={styles.topSection}>
        <div className={styles.fakeNumber}>RN: T20240322004</div>
        <div className={styles.finishedTag}>Finished</div>
      </div>

      {/* Driver Details */}
      <div className={styles.driverSection}>
        <img
          src={ride.driver.imageUrl}
          alt={ride.driver.firstName}
          className={styles.driverImage}
        />
        <div className={styles.driverInfo}>
          <p className={styles.driverLabel}>Driver</p>
          <h3 className={styles.driverName}>{ride.driver.firstName} {ride.driver.lastName}</h3>
          <div className={styles.likes}>
            <span className={styles.heart} />
            <p>{ride.driver.likes} likes</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Ride Details */}
      <div className={styles.detailsSection}>
        <p className={styles.date}>{formatDate(ride.startDate)}</p>

        <div className={styles.location}>
          <span className={styles.bulletOrange} />
          <p>{ride.startingAddress}</p>
          <span className={styles.time}>{ride.startTime}</span>
        </div>

        <div className={styles.location}>
          <span className={styles.bulletRed} />
          <p>{ride.endingAddress}</p>
          <span className={styles.time}>03: 52 PM</span>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.childImages}>
            {ride.requests?.map((request, index) =>
              request.child?.imageUrl ? (
                <img
                  key={index}
                  src={request.child.imageUrl}
                  alt={request.child.firstName}
                  className={styles.childImage}
                  style={{ zIndex: 10 - index }}
                />
              ) : null
            )}
          </div>
          <div className={styles.recurringTag}>Recurring</div>
        </div>
      </div>
    </li>
  );
};

export default RideCard;