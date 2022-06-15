import { lazy, Suspense } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import {useState} from 'react'
import Footer from '../../components/Footer'

const loadBoxes = () => import('../../components/Boxes')
const Boxes = lazy(loadBoxes)

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

        <Link href="/code-spliting">
          <a className={styles.menu}>
          &larr; Back to the React Lazy Demo
          </a>
        </Link>

        <div className={styles.grid}>
          <label
            style={{marginBottom: '1rem'}}
            onMouseEnter={loadBoxes}
            onFocus={loadBoxes}
          >
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={e => setShowBoxes(e.target.checked)}
              />
            {' show 3D Boxes'}
          </label>
        </div>

        <Suspense fallback={<div>loading Boxes...</div>}>
          {showBoxes ? <Boxes /> : null}
        </Suspense>

      </main>
      <Footer/>
    </div>
  )
}
