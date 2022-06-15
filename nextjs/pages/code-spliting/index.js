import Head from 'next/head'
import Link from 'next/link'

import {useState} from 'react'
import Footer from '../../components/Footer'
import Boxes from '../../components/Boxes'

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
        <div className={styles.grid}>
          
          <Link href="/">
            <a className={styles.menu}>
              &larr; Back to home
            </a>
          </Link>
          <Link href="/code-spliting/final">
            <a className={styles.menu}>
              Final version &rarr;
            </a>
          </Link>
          <Link href="/code-spliting/final-extra-1">
            <a className={styles.menu}>
              Final version Extra 1 &rarr;
            </a>
          </Link>
          <Link href="/code-spliting/final-extra-2">
            <a className={styles.menu}>
              Final version Extra 2 &rarr;
            </a>
          </Link>
        </div>

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

        {showBoxes ? <Boxes /> : null}

      </main>
      <Footer/>
    </div>
  )
}
