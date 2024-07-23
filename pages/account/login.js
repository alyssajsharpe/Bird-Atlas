import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function login(){
    return (
        <>
        <Layout>
            <Head><title>Login Page</title></Head>
            <section className='section max-width margin-auto main-content'>
                <div className='display-flex text-align-center '>
                    <div>
                        This is a page to log into your account.
                        <Link href="/"><h2>Head back to the homepage</h2></Link>
                    </div>
                </div>
            </section>
        </Layout>
        </>
       
    )
}