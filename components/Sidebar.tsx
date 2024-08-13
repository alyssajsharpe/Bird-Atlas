import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState, useCallback } from 'react';
import React from 'react';

const birdColors = ['Blue','Red','Black','White','Yellow'];
const birdSizes = ['Tiny','Small','Medium','Large']
const birdRegions = ['North America','Western Europe'];
const birdStatus = ['Low Concern', 'Restricted Range', 'Common Bird in Steep Decline', 'Declining', 'Red Watch List']
const birdLocation = ['Ocean','Trees','Pond','Ground','Soaring'];

interface Bird {
  id: number;
  name: string;
  sciName: string; 
  description: string;
  images: [];
  region: string[];
  lengthMin: string;
  lengthMax: string;
  status: string;
}

const Sidebar = ({ birdSize, birds, updateFilteredBirds, searchQuery, setSearchQuery }) => {
  const [selectedRegions, setSelectedRegions] = useState<String[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<String[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<String[]>([]);


  const handleRegionChange = useCallback((region) => {
    setSelectedRegions((prevSelectedRegions) => {
      if (prevSelectedRegions.includes(region)) {
        return prevSelectedRegions.filter((r) => r !== region);
      } else {
        return [...prevSelectedRegions, region];
      }
    });
  }, []);

  const handleSizeChange = useCallback((size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        return prevSelectedSizes.filter((s) => s !== size);
      } else {
        return [...prevSelectedSizes, size];
      }
    });
  }, []);

  const handleStatusChange = useCallback((status) => {
    setSelectedStatuses((prevSelectedStatues) => {
      if (prevSelectedStatues.includes(status)) {
        return prevSelectedStatues.filter((s) => s !== status);
      } else {
        return [...prevSelectedStatues, status];
      }
    });
  }, []);

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedSizes([]);
    setSelectedRegions([]);
  }
  
  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const getSizeCategory = (lengthMin, lengthMax) => {
    const avgLength = (parseFloat(lengthMin) + parseFloat(lengthMax)) / 2;
    if (avgLength < 12) return 'Tiny';
    if (avgLength < 20) return 'Small';
    if (avgLength < 35) return 'Medium';
    return 'Large';
  };

  useEffect(() => {
    const filtered = birds.filter((bird) => {
      const matchesRegion = selectedRegions.length === 0 || bird.region.some(r => selectedRegions.includes(r));
      const birdSizeCategory = getSizeCategory(bird.lengthMin, bird.lengthMax);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(birdSizeCategory);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(bird.status);
      return matchesRegion && matchesSize && matchesStatus;
    });

    updateFilteredBirds(filtered);
  }, [selectedRegions, selectedSizes, selectedStatuses, birds, updateFilteredBirds]);

  return (
    <>

      <div className='white-bg black-text'>
          <div className='filter-header padding-top-small text-align-center padding-small'>Search from {birdSize} birds</div>
          <div className='center'>
            <Row>
              <Col xs='auto' className='p-2'>
                <InputGroup className='mb-3'>
                  <Form.Control
                    type='text'
                    placeholder='Search for Birds'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    aria-label='Search for birds'
                  />
                </InputGroup>
              </Col>
              <Col xs='auto' className='p-2'>
                <Form.Select onChange={(e) => handleRegionChange(e.target.value)} aria-label='Select Region'>
                  <option value=''>Select a Region</option>
                  {birdRegions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs='auto' className='p-2'>
                <Form.Select onChange={(e) => handleSizeChange(e.target.value)} aria-label='Select Size'>
                  <option value=''>Select a Size</option>
                  {birdSizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs='auto' className='p-2'>
                <Form.Select onChange={(e) => handleStatusChange(e.target.value)} aria-label='Select Status'>
                  <option value=''>Select a Status</option>
                  {birdStatus.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs='auto' className='p-2'>
              <Button onChange={(e) => clearFilters()} aria-label='Clear Filters' className=''> Clear Filters</Button>
              </Col>
            </Row>
          </div>
      </div>
    </>
  );
};

export default Sidebar;
