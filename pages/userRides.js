import { getUpcomingCarpools, getOngoingCarpools, getPastCarpools } from "@/services/carpool";
import RideTabs from "@/components/RideTabs/RideTabs";
import Head from "next/head";
import styles from "@/styles/userRides.module.css";

const userId = "dlKJ2KqPEzc4wHStEOPOkK6fin33"; // Hardcoded for now (Vanessa's ID)

export default function UserRides({ upcomingRides, ongoingRides, pastRides }) {
  return (
    <>
      <Head>
        <title>Relay Schedule Checker</title>
        <meta name="description" content="The place to check your Relay rideshare schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/RelaySvg.svg" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.header}>User Rides</h1>
        {/* RideTabs dynamically switches between rides */}
        <RideTabs 
          ongoingRides={ongoingRides} 
          upcomingRides={upcomingRides} 
          pastRides={pastRides} 
        />
      </div>
    </>  
  );
}

// Fetch rides data for server-side rendering
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