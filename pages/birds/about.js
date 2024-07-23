import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function aboutMe(){
    return (
        <>
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <div>
                This is a detailed page about a specific bird you clicked. 
                <Link href="/"><h2>Head back to the homepage</h2></Link>
            </div>
        </Layout>
        </>
       
    )
}