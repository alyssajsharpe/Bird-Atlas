import { useEffect, useState } from 'react';
import { Carousel, Card, Col, Row, Container } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';

interface Bird {
  id: number;
  name: string;
  sciName: string; 
  description: string;
  images: [];
}

function MainContent() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>([]);

  // Pagination Variables
  const birdsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Get the bird data and map it on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('/data/birds.json')
        .then(response => {
          if(!response.ok){
            throw new Error('Error fetching API request.')
          }
          return response.json();
        })
        .then(data => {
          if(data){
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
            setBirds(sortedData);
          }
        })
      } catch (e) {
        console.error('Error has occurred inside of fetchData:', e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = birds.filter((bird) =>
      bird.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bird.sciName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBirds(filtered);
    setCurrentPage(1); // Reset current page when search query changes
  }, [searchQuery, birds]);

   // Calculate pagination variables after filtering
   const startIndex = (currentPage - 1) * birdsPerPage;
   const endIndex = Math.min(startIndex + birdsPerPage, filteredBirds.length);
   const currentBirds = filteredBirds.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredBirds.length / birdsPerPage);

  return (
    <>
    <div className='display-flex text-align-center '>
      <Col xs={3}>
        <Sidebar birdSize={birds.length}/>
      </Col>
      <Col xs={9}>
        <div className='search-bar-container'>
          <input
            type="text"
            placeholder="Search for birds..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
      
          <Row xs={1} md={2} lg={3} className="g-1">
          {currentBirds.map((bird, index) => (          
            <Col key={index}>
              <div className="column-wrapper">
                <Card className="d-flex flex-column h-100">
                  
                  {bird.images.length > 1 ? (
                    <Carousel interval={null}>
                      {bird.images.map((image, imgIndex) => (
                        <Carousel.Item key={imgIndex}>
                          <div className='bird-image-container'>
                            <Image
                                width={375}
                                height={250}
                                src={image ? image : '/images/bird.jpg'}
                                alt={`Slide ${imgIndex}`}
                              />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div>
                      {bird.images.length !== 0 ? (
                        bird.images.map((image, imgIndex) => (
                          <div className='bird-image-container'>
                            <Image
                              key={imgIndex}
                              width={375}
                              height={250}
                              src={image ? image : '../../public/data/bird.jpg'}
                              alt={`Image ${imgIndex}`}/>
                          </div>
                        ))
                      ) : (

                        <div className='bird-image-container'>
                          <Image
                              width={375}
                              height={250}
                              src='/images/bird.jpg'
                            alt="Default Bird Image"
                            />
                        </div>
                      )}
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title className='bird-title'>{bird.name}</Card.Title>
                    <Card.Text className='bird-desc'>{bird.description}</Card.Text>
                    <Card.Text className='bird-desc'>{bird.sciName}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
        {/* Pagination */}
          <Container>
            <Row>
                <Pagination
                  className='center margin-top-small'
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
            </Row>
        </Container>
      </Col>
      </div>
    </>
  );
}

export default MainContent;
