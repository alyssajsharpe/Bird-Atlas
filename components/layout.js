import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import NavBar from './NavBar';
import Footer from './Footer';

export const siteTitle = 'Bird Atlas App';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="This is a site featuring a large index of Birds from North America and Western Europe."
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}></header>

      <NavBar/>
        <main>{children}</main>

    </div>
  );
}