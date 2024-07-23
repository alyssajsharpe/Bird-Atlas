import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function nearbyBirds(){
    return (
        <>
        <Layout>
            <Head><title>Birds near you</title></Head>
            <section className='section max-width margin-auto main-content'>
                <div className='display-flex text-align-center '>
                    <div>
                        This page will eventually grab the persons IP address (after approval) and display birds nearby.
                        <Link href="/"><h2>Head back to the homepage</h2></Link>
                    </div>
                </div>
            </section>
        </Layout>
        </>
       
    )
}