import { Form } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState, useCallback } from 'react';
import React from 'react';

const birdColors = ["Blue","Red","Black","White","Yellow"];
const birdSizes = ["Tiny","Small","Medium","Large"]
const birdRegions = ["North America","Western Europe"];
const birdStatus = ["Low Concern", "Restricted Range", "Common Bird in Steep Decline", "Declining", "Red Watch List"]
const birdLocation = ["Ocean","Trees","Pond","Ground","Soaring"];

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

const Sidebar = ({ birdSize, birds, updateFilteredBirds }) => {
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

  const getSizeCategory = (lengthMin, lengthMax) => {
    const avgLength = (parseFloat(lengthMin) + parseFloat(lengthMax)) / 2;
    if (avgLength < 12) return "Tiny";
    if (avgLength < 20) return "Small";
    if (avgLength < 35) return "Medium";
    return "Large";
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

      <div className="white-bg black-text grey-border custom-height">
          <div className='filter-header padding-top-small text-align-center'>Bird Specifics</div>
          <div className="p-1">Index size: {birdSize} birds</div>
          <Container>
            <Row>
              <div className="p-4">
                  {/* Region */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Region</h3>
                      <Stack direction="horizontal" gap={3} className="filter-checkboxes">
                        {birdRegions.map((region, index) => (
                            <div key={index} className="p-1 custom-cursor">
                              <Form.Check
                                type="checkbox"
                                id={`default-checkbox-${index}`}
                                label={region}
                                onChange={() => handleRegionChange(region)}
                              />
                            </div>
                          ))}
                      </Stack>
                  </div>
                  {/* Size */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Size</h3>
                    <Stack direction="horizontal" gap={3} className="filter-checkboxes">
                      {birdSizes.map((size, index) => (
                        <div key={index} className="p-1 custom-cursor">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-size-${index}`}
                            label={size}
                            onChange={() => handleSizeChange(size)}
                          />
                        </div>
                      ))}
                    </Stack>
                  </div>
                  {/* Status */}
                  <div className="p-2">
                    <h3 className='filter-section-header padding-bottom-xsmall'>Status</h3>
                    <Stack direction="horizontal" gap={3} className="filter-checkboxes">
                      {birdStatus.map((size, index) => (
                        <div key={index} className="p-1 custom-cursor">
                          <Form.Check
                            type="checkbox"
                            id={`default-checkbox-size-${index}`}
                            label={size}
                            onChange={() => handleStatusChange(size)}
                          />
                        </div>
                      ))}
                    </Stack>
                  </div>
              </div>
              </Row>
          </Container>
      </div>
    </>
  );
};

export default Sidebar;
