import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MainContent from '../components/MainContent'
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (

    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <NavBar />

      <section >
        <MainContent/>
      </section>
    </Layout>
  );
}