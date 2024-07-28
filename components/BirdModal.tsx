import React from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';


interface Bird {
  id: number;
  name: string;
  sciName: string;
  images: string[];
  region: string[];
  family: string;
}

interface BirdPopupProps {
  show: boolean;
  bird: Bird | null;
  onClose: () => void;
  position: { top: number; left: number };
}

const BirdPopup: React.FC<BirdPopupProps> = ({ show, bird, onClose, position }) => {
  if (!show || !bird) return null;

  return (
    <div className="bird-popup" style={{ top: position.top, left: position.left }}>
          <Card className="bird-popup-card">
              <Card.Header onClick={onClose}>
                  <Card.Title>{bird.name}</Card.Title>
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
                  <p><strong>Region:</strong> {bird.region}</p>
                  <p><strong>Family:</strong> {bird.family}</p>
                  <Link href={`/birds/${bird.id}`} passHref>
                      <Button>Learn More</Button>
                  </Link>

              </Card.Body>
          </Card>
      </div>
  );
};

export default BirdPopup;
