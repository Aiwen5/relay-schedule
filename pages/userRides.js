import styles from "@/styles/userRides.module.css";
import { getUpcomingCarpools, getOngoingCarpools, getPastCarpools } from "@/services/carpool";
import RideCard from "@/components/RideCard/RideCard";

const userId = "dlKJ2KqPEzc4wHStEOPOkK6fin33"; // Hardcoded for now (Vanessa's ID)

export default function UserRides({ upcomingRides, ongoingRides, pastRides }) {
  return (
    <div className={styles.container}>
      <h1>User Rides</h1>

      <h2>Current Rides</h2>
      <ul>
        {ongoingRides.length > 0 ? (
          ongoingRides.map((ride) => (
            <RideCard key={ride.carpoolId} ride={ride} />
          ))
        ) : (
          <p className={styles.nothingHere}>Nothing here</p>
        )}
      </ul>

      <h2>Upcoming Rides</h2>
      <ul>
        {upcomingRides.length > 0 ? (
          upcomingRides.map((ride) => (
            <RideCard key={ride.carpoolId} ride={ride} />
          ))
        ) : (
          <p className={styles.nothingHere}>Nothing here</p>
        )}
      </ul>

      <h2>Past Rides</h2>
      <ul>
        {pastRides.length > 0 ? (
          pastRides.map((ride) => (
            <RideCard key={ride.carpoolId} ride={ride} />
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
  
  const requests = await getPastCarpools('dlKJ2KqPEzc4wHStEOPOkK6fin33');

  pastRides.forEach((ride, rideIndex) => {
    console.log(`Ride ${rideIndex + 1}:`);
    if (ride.requests) {
      ride.requests.forEach((request, reqIndex) => {
        console.log(`  Request ${reqIndex + 1}:`, request);
      });
    } else {
      console.log(`  No requests for Ride ${rideIndex + 1}`);
    }
  });

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