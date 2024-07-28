import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Card, Carousel, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

export interface Recording {
    date: string;
    loc: string;
    birdId: number;
    lic: string;
    type: string;
    ssp: string;
    rmk: string;
    gen: string;
    rec: string;
    file: string;
    uploaded: string;
    playbackUsed: string;
    id: string;
    sp: string;
    lat: string;
    lng: string;
    birdSeen: string;
    sono: {
      small: string;
      large: string;
      med: string;
      full: string;
    };
    alt: string;
    length: string;
    cnt: string;
    en: string;
    also: string[];
    url: string;
    fileName: string;
    time: string;
  }

interface Bird {
  id: number;
  name: string;
  sciName: string;
  images: string[];
  lengthMin: string;
  lengthMax: string;
  wingspanMin: string;
  wingspanMax: string;
  status: string;
  region: string[];
  family: string;
  order: string;
  recordings?: Recording[];
  
}

interface BirdProps {
  bird: Bird;
}

const BirdPage: React.FC<BirdProps> = ({ bird }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <NavBar />
    <Container className='container-margins'>
          <Card className="mt-4">
              <Card.Header>
                  <Card.Title>{bird.name}</Card.Title>
                  <Link href={'/'}>
                      <Button className="back-button">Back to homepage</Button>
                  </Link>
              </Card.Header>
              <Card.Body>
                  <Carousel interval={null}>
                      {bird.images.map((image, index) => (
                          <Carousel.Item key={index}>
                              <Image width={500} height={300} src={image} alt={`Bird Image ${index}`} />
                          </Carousel.Item>
                      ))}
                  </Carousel>
                  <p><strong>Scientific Name:</strong> {bird.sciName}</p>
                  <p><strong>Length:</strong> {bird.lengthMin} - {bird.lengthMax} inches</p>
                  <p><strong>Wingspan:</strong> {bird.wingspanMin} - {bird.wingspanMax} inches</p>
                  <p><strong>Status:</strong> {bird.status}</p>
                  <p><strong>Family:</strong> {bird.family}</p>
                  <p><strong>Region:</strong> {bird.region}</p>
                  <p><strong>Order:</strong> {bird.order}</p>
                  {bird.recordings && bird.recordings.length > 0 && (
                      <div>
                          <h3>Recordings</h3>
                          {bird.recordings.map((recording, index) => (
                              <div key={index} className="recording">
                                  <p><strong>Date:</strong> {recording.date}</p>
                                  <p><strong>Location:</strong> {recording.loc}</p>
                                  <audio controls>
                                      <source src={recording.file} type="audio/mpeg" />
                                      Your browser does not support the audio element.
                                  </audio>
                              </div>
                          ))}
                      </div>
                  )}
              </Card.Body>
          </Card>
      </Container>
      <Footer />
      </>
  );
};

export default BirdPage;

// Fetch all bird IDs to generate static pages
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/data/birds.json');
  const birds: Bird[] = await res.json();

  const paths = birds.map((bird) => ({
    params: { id: bird.id.toString() },
  }));

  return { paths, fallback: true };
};

// Fetch bird data based on ID
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/data/birds.json`);
  const birds: Bird[] = await res.json();
  const bird = birds.find((bird) => bird.id.toString() === id);

  return { props: { bird } };
};
