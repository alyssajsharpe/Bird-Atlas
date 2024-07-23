import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function aboutApp(){
    return (
        <>
        <Layout>
            <Head><title>About the Bird Atlas App</title></Head>
            <section className='section max-width margin-auto main-content'>
                <div className='display-flex text-align-center '>
                    <div>
                        This is an about page to tell you more about the features in this app!
                        <Link href="/"><h2>Head back to the homepage</h2></Link>
                    </div>
                </div>
            </section>
        </Layout>
        </>
       
    )
}