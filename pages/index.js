import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Relay Schedule Checker</title>
        <meta name="description" content="The place to check your Relay rideshare schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Relay Schedule Checker! Routing and logging in isnt set up yet so type /userRides after the URL to see the example rides.
        </h1>
      </main>
    </>
  );
}
