import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MainContent from '../components/MainContent'
import FilterBar from '../components/FilterBar';

export default function Home() {
  return (

    <Layout home id="root">
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <section className='section max-width margin-auto main-content'>
          <MainContent/>
        </section>
    </Layout>
  );
}