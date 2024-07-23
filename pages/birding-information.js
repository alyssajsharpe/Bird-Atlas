import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function birdingInfo(){
    return (
        <>
        <Layout>
            <Head><title>How to bird</title></Head>
            <section className='section max-width margin-auto main-content'>
                <div className='display-flex text-align-center '>
                    <div>
                        This is an about page to tell you more about how you can bird!
                        <Link href="/"><h2>Head back to the homepage</h2></Link>
                    </div>
                </div>
            </section>
        </Layout>
        </>
       
    )
}