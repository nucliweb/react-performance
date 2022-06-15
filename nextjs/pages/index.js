import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Performance</title>
        <meta name="description" content="Next.js Performance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Next.js Performance
        </h1>

        <p className={styles.description}>
          ...
        </p>

        <div className={styles.grid}>
          <Link href="/code-spliting">
            <a className={styles.card}>
              <h2>Code Spliting &rarr;</h2>
              <p>With <span className={styles.code}>React.lazy</span></p>
            </a>
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
