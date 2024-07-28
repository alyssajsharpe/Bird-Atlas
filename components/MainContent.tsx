import { useCallback, useEffect, useState } from 'react';
import { Carousel, Card, Col, Row, Container } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import Image from 'next/image';
import BirdPopup from './BirdModal';

export interface Bird {
  id: number;
  name: string;
  sciName: string;
  description: string;
  images: string[];
  lengthMin: string;
  lengthMax: string;
  region: string[];
  family: string;
}


function MainContent() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>([]);
  const [selectedBird, setSelectedBird] = useState<Bird | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });

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
    setCurrentPage(1); 
  }, [searchQuery, birds]);

   // Calculate pagination variables after filtering
   const startIndex = (currentPage - 1) * birdsPerPage;
   const endIndex = Math.min(startIndex + birdsPerPage, filteredBirds.length);
   const currentBirds = filteredBirds.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredBirds.length / birdsPerPage);

  // Callback to update filtered birds from Sidebar
  const updateFilteredBirds = useCallback((filtered) => {
    setFilteredBirds(filtered);
    setCurrentPage(1); // Reset current page when filters change
  }, []);

  // Handle popup open
  const handleImageClick = (event, bird) => {
    const rect = event.target.getBoundingClientRect();
    setClickPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedBird(bird);
    setShowPopup(true);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBird(null);
  };

  return (
    <>
    <div className='display-flex text-align-center '>
      <Col xs={3}>
        <Sidebar birdSize={birds.length} birds={birds} updateFilteredBirds={updateFilteredBirds} />
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
                          <div className='bird-image-container' onClick={(event) => handleImageClick(event, bird)}>
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
                          <div className='bird-image-container' onClick={(event) => handleImageClick(event, bird)}>
                            <Image
                              key={imgIndex}
                              width={375}
                              height={250}
                              src={image ? image : '../../public/data/bird.jpg'}
                              alt={`Image ${imgIndex}`}/>
                          </div>
                        ))
                      ) : (

                        <div className='bird-image-container' onClick={(event) => handleImageClick(event, bird)}>
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
      
      {/* Bird Details Popup */}
      <BirdPopup
        show={showPopup}
        bird={selectedBird}
        onClose={handleClosePopup}
        position={clickPosition}
      />
    </>
  );
}

export default MainContent;
