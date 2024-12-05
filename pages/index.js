import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import InputField from "@/components/InputField/InputField";

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
        <div className={styles.leftBox}>
          <Image src="/Relay_Logo.svg" alt="relay logo" width={150} height={50} className={styles.relayLogo}/>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.inputContainer}>
            <h1>Welcome Back!</h1>
            <p>Please enter your details</p>
            <form>
              <InputField 
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={FormData.email}
                pattern=".+@example\.com"
                required
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={FormData.password}
                required
              />
              <div className={styles.placeholder}>
                <div>
                  <input
                    type="checkbox"
                    id="Remember this account"
                    name="Remember this account"
                    checked
                  />
                  <label>Remember this account</label>
                </div>
                <button>Forgot password</button>
              </div>
            </form>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.googleButton}><Image src='/Google_Logo.svg'width={24} height={24} style={{marginRight:10}}/>Login with google</button>
            <p>© 2024 RELAY ALL RIGHTS RESERVED</p>
            <p className={styles.title}>
              Welcome to the Relay Schedule Checker! Routing and logging in isnt set up yet so type /userRides after the URL to see the example rides.
           </p>
          </div>
        </div>
      </main>
    </>
  );
}
