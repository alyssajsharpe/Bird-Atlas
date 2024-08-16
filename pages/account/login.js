import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import { Carousel, Card, Col, Row, Container } from 'react-bootstrap';

export default function login(){
    return (
        <>
        <Layout>
            <Head><title>Login Page</title></Head>
            <section className='section max-width margin-auto main-content'>
                <Container className='text-align-center'>
                    <Row lg={12} className='center'>
                        <Col xs={2} md={3} lg={4} className="g-1">
                            <form>
                                <div className='form-group py-2'>
                                    <label className='text-left'>Email Address</label>
                                    <input type='email' className='form-control' id="email" placeholder='Email Address'></input>
                                </div>
                                <div className='form-group py-2'>
                                    <label className='text-left'>Password</label>
                                    <input type='password' className='form-control' id="password" placeholder='Password'></input>
                                </div>
                                <button type='submit' className='btn btn-primary mt-2 w-100'>Login</button>
                            </form>
                        </Col>
                    </Row>                   
                </Container>
            </section>
        </Layout>
        </>
       
    )
}