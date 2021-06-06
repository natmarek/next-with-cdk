import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [message, setMessage] = useState("Something is not working!");

  useEffect(() => {
    const url = "https://hn6kcsm0yb.execute-api.eu-west-1.amazonaws.com/prod/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMessage(JSON.stringify(data)));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App with CDK</title>
        <link rel="icon" href="/amplify.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js </a>with{" "}
          <a href="https://docs.aws.amazon.com/cdk/latest/guide/home.html">
            CDK!
          </a>
        </h1>
        <h1>{message}</h1>
        <div className={styles.grid}>
          <a
            href="https://docs.aws.amazon.com/cdk/latest/guide/home.html"
            className={styles.card}
          >
            <h2>CDK Documentation &rarr;</h2>
            <p>Information about CDK</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>CDK API reference &rarr;</h2>
            <p>
              Here you will find all the API references and modules, including
              the ones we used to deploy this application
            </p>
          </a>

          <a href="https://cdkworkshop.com/" className={styles.card}>
            <h2>CDK workshop &rarr;</h2>
            <p>If you are new to CDK, this a great place to start!</p>
          </a>

          <a href="https://cdk-advanced.workshop.aws/" className={styles.card}>
            <h2>Advanced CDK Workshop &rarr;</h2>
            <p>
              Build a non-symetrical multi-region application using the AWS CDK
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Amplify{" "}
          <img src="/amplify.png" alt="Amplify Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
