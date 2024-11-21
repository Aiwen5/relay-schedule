import styles from "@/styles/UserRides.module.css";
import { getUpcomingCarpools, getOngoingCarpools, getPastCarpools } from "@/services/carpool";

const userId = "hkdSMSsaZIg4tJE8q4fC8ejp1hO2"; // Hardcoded for now

export default function UserRides({ upcomingRides, ongoingRides, pastRides }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.container}>
      <h1>User Rides</h1>

      <h2>Current Rides</h2>
      <ul>
        {ongoingRides.length > 0 ? (
          ongoingRides.map((ride) => (
            <li key={ride.carpoolId} className={styles.card}>
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
          ))
        ) : (
          <p className={styles.nothingHere}>Nothing here</p>
        )}
      </ul>

      <h2>Upcoming Rides</h2>
      <ul>
        {upcomingRides.length > 0 ? (
          upcomingRides.map((ride) => (
            <li key={ride.carpoolId} className={styles.card}>
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
          ))
        ) : (
          <p className={styles.nothingHere}>Nothing here</p>
        )}
      </ul>

      <h2>Past Rides</h2>
      <ul>
        {pastRides.length > 0 ? (
          pastRides.map((ride) => (
            <li key={ride.carpoolId} className={styles.card}>
              <img src={ride.driver.imageUrl} alt={ride.driver.firstName} />
              <div className={styles.cardContent}>
                <h3>{ride.driver.firstName} {ride.driver.lastName}</h3>
                <p className={styles.date}>{formatDate(ride.startDate)}</p>
                <div className={styles.time}>
                <span className={styles.address}>{ride.startingAddress}</span>
                  <span className={styles.timeValue}> {ride.startTime || "Invalid"}</span>
                </div>
                <div className={styles.time}>
                  <span className={styles.address}>{ride.endingAddress}</span>
                  <span className={styles.timeValue}> {ride.endTime || "Invalid"}</span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.nothingHere}>Nothing here</p>
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const upcomingRides = await getUpcomingCarpools(userId);
  const ongoingRides = await getOngoingCarpools(userId);
  const pastRides = await getPastCarpools(userId);

  console.log("Fetched Upcoming Rides:", upcomingRides);
  console.log("Fetched Ongoing Rides:", ongoingRides);
  console.log("Fetched Past Rides:", pastRides);

  return {
    props: {
      upcomingRides,
      ongoingRides,
      pastRides,
    },
  };
}