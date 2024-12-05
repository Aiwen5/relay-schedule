import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import InputField from "@/components/InputField/InputField";

export default function Home() {
  const router = useRouter();

  // Hardcoded credentials
  const hardcodedEmail = "vanessa@gmail.com";
  const hardcodedPassword = "abc123";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.email === hardcodedEmail && formData.password === hardcodedPassword) {
      router.push("/userRides");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const areInputsFilled = formData.email.trim() !== "" && formData.password.trim() !== "";

  return (
    <>
      <Head>
        <title>Relay Schedule Checker</title>
        <meta name="description" content="The place to check your Relay rideshare schedule" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/RelaySvg.svg" />
      </Head>
      <main className={styles.main}>
        <div className={styles.leftBox}>
          <Image src="/Relay_Logo.svg" alt="relay logo" width={150} height={50} className={styles.relayLogo}/>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.inputContainer}>
            <h1>Welcome Back!</h1>
            <p>Please enter your details</p>
            <form onSubmit={handleLogin}>
              <InputField 
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className={styles.placeholder}>
                <div>
                  <input
                    type="checkbox"
                    id="Remember this account"
                    name="Remember this account"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="Remember this account">Remember this account</label>
                </div>
                <button type="button" className={styles.forgotPassword}>Forgot password</button>
              </div>
              {errorMessage && (
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className={styles.loginButton}
                style={{
                  background: areInputsFilled
                    ? "linear-gradient(to right, #f76b1c, #f85d49)"
                    : "linear-gradient(to right, #9f4510, #9d382a)",
                  cursor: areInputsFilled ? "pointer" : "not-allowed",
                }}
                disabled={!areInputsFilled}
              >
                Login
              </button>
            </form>
            <button className={styles.googleButton}>
              <Image src='/Google_Logo.svg' alt='Google icon' width={24} height={24} style={{marginRight:10}} />
              Login with Google
            </button>
            <p>© 2024 RELAY ALL RIGHTS RESERVED</p>
            <p className={styles.title}>
              Welcome to the Relay Schedule Checker! Login with vanessa@gmail.com and abc123 to get started.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}