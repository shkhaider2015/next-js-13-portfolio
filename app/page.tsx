import Image from 'next/image'
import styles from './page.module.css'
import { Navbar } from './_components'

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
    </main>
  )
}
