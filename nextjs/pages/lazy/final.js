import { lazy, Suspense } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import {useState} from 'react'
import Footer from '../../components/Footer'

const Boxes = lazy(() => import('../../components/Boxes'))

import styles from '../../styles/Home.module.css'

export default function Lazy() {
  const [showBoxes, setShowBoxes] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>React Lazy Demo</title>
        <meta name="description" content="React Lazy Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          React Lazy Demo
        </h1>

        <Link href="/">
          <a className={styles.description}>
            &larr; Back to the React Lazy Demo
          </a>
        </Link>

        <div className={styles.grid}>
          <label style={{marginBottom: '1rem'}}>
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={e => setShowBoxes(e.target.checked)}
              />
            {' show 3D Boxes'}
          </label>
        </div>

        <Suspense fallback={<div>loading globe...</div>}>
          {showBoxes ? <Boxes /> : null}
        </Suspense>

      </main>
      <Footer/>
    </div>
  )
}
